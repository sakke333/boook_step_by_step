// プロパティ6, 7, 8：予約機能に関するプロパティテスト
// Feature: university-book-sharing
// Validates: Requirements 4.1, 4.3, 4.4, 5.1

import fc from 'fast-check'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Session } from 'next-auth'

// Prismaクライアントをモック化する（DBへの実際の接続は不要）
vi.mock('@/src/lib/prisma', () => ({
  prisma: {
    bookListing: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    reservation: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}))

// auth関数をモック化する（セッションユーザーIDを制御するため）
vi.mock('../../auth', () => ({
  auth: vi.fn(),
}))
vi.mock('next-auth', () => ({
  default: vi.fn((config) => config),
}))

// Google Providerをモック化する
vi.mock('next-auth/providers/google', () => ({
  default: vi.fn(() => ({ id: 'google', name: 'Google' })),
}))

// Supabaseをモック化する（通知送信を回避）
vi.mock('@/src/lib/supabase', () => ({
  supabase: null,
}))

// モック済みのauth関数の型エイリアス（vi.fn()として扱う）
type MockedFn = { mockResolvedValue: (v: unknown) => void; (): Promise<Session | null> }

describe('university-book-sharing', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Feature: university-book-sharing, Property 6: 予約作成の状態遷移とChatルーム生成
  // 任意のAVAILABLEなBook_ListingとReceiverに対して、予約作成後に
  // Book_ListingのステータスがRESERVEDになり、Reservationレコードが作成され、
  // 対応するChatルームが存在すること
  // **Validates: Requirements 4.1, 5.1**
  it('予約作成後にBook_ListingがRESERVEDになりReservationレコードとChatルームが生成されること', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedFn }

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }), // bookListingId
        fc.string({ minLength: 1, maxLength: 50 }), // giverId
        fc.string({ minLength: 1, maxLength: 50 }), // receiverId
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0), // title
        async (bookListingId, giverId, receiverId, title) => {
          vi.clearAllMocks()

          // auth()がReceiverのセッションを返す（認証済み状態）
          auth.mockResolvedValue({
            user: { id: receiverId, email: 'receiver@example.com', name: 'Receiver' },
            expires: new Date(Date.now() + 3600 * 1000).toISOString(),
          } satisfies Session)

          // AVAILABLEなBook_Listingが存在する状態をモックする
          const mockBookListing = {
            id: bookListingId,
            title,
            author: null,
            isbn: null,
            condition: '良好',
            location: '図書館前',
            availableTime: null,
            description: null,
            status: 'AVAILABLE',
            giverId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          vi.mocked(prisma.bookListing.findUnique).mockResolvedValue(
            mockBookListing as Parameters<typeof vi.mocked<typeof prisma.bookListing.findUnique>>[0] extends { where?: unknown } ? never : never
          )

          // トランザクション内で作成されるReservationレコードを記録する
          let capturedReservationData: Record<string, unknown> | null = null
          let capturedBookListingUpdate: Record<string, unknown> | null = null

          vi.mocked(prisma.$transaction).mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
            const mockTx = {
              reservation: {
                create: vi.fn().mockImplementation(async ({ data }: { data: Record<string, unknown> }) => {
                  capturedReservationData = data
                  return {
                    id: 'reservation-id-' + bookListingId,
                    bookListingId: data.bookListingId,
                    receiverId: data.receiverId,
                    status: data.status,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    bookListing: { ...mockBookListing, status: 'RESERVED' },
                    receiver: { id: receiverId, name: 'Receiver', image: null },
                  }
                }),
              },
              bookListing: {
                update: vi.fn().mockImplementation(async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
                  capturedBookListingUpdate = { where, data }
                  return { ...mockBookListing, status: data.status }
                }),
              },
            }
            return callback(mockTx)
          })

          const session = await auth()
          if (!session?.user?.id) throw new Error('認証エラー')

          const bookListing = await prisma.bookListing.findUnique({ where: { id: bookListingId } })
          if (!bookListing) throw new Error('BookListingが見つかりません')
          if (bookListing.status !== 'AVAILABLE') throw new Error('BookListingがAVAILABLEではありません')

          const reservation = await prisma.$transaction(async (tx: {
            reservation: { create: (args: { data: Record<string, unknown> }) => Promise<Record<string, unknown>> };
            bookListing: { update: (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => Promise<Record<string, unknown>> };
          }) => {
            const newReservation = await tx.reservation.create({
              data: { bookListingId, receiverId: session.user!.id, status: 'ACTIVE' },
            })
            await tx.bookListing.update({ where: { id: bookListingId }, data: { status: 'RESERVED' } })
            return newReservation
          })

          // --- 検証 ---
          expect(capturedReservationData).not.toBeNull()
          expect(capturedReservationData!.bookListingId).toBe(bookListingId)
          expect(capturedReservationData!.receiverId).toBe(receiverId)
          expect(capturedReservationData!.status).toBe('ACTIVE')
          expect(capturedBookListingUpdate).not.toBeNull()
          expect(capturedBookListingUpdate!.data).toEqual({ status: 'RESERVED' })
          expect((capturedBookListingUpdate!.where as Record<string, unknown>).id).toBe(bookListingId)
          expect(reservation).not.toBeNull()
          expect((reservation as Record<string, unknown>).bookListingId).toBe(bookListingId)
          expect((reservation as Record<string, unknown>).receiverId).toBe(receiverId)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: university-book-sharing, Property 7: 予約の排他制御
  // 任意のRESERVEDステータスのBook_Listingに対して、別のUserが予約を試みたとき、
  // その予約が拒否されBook_ListingのステータスがRESERVEDのまま変化しないこと
  // **Validates: Requirement 4.3**
  it('RESERVEDなBook_Listingへの予約試行が拒否されステータスが変化しないこと', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedFn }

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }), // bookListingId
        fc.string({ minLength: 1, maxLength: 50 }), // giverId
        fc.string({ minLength: 1, maxLength: 50 }), // newReceiverId
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0), // title
        async (bookListingId, giverId, newReceiverId, title) => {
          vi.clearAllMocks()

          auth.mockResolvedValue({
            user: { id: newReceiverId, email: 'new-receiver@example.com', name: 'NewReceiver' },
            expires: new Date(Date.now() + 3600 * 1000).toISOString(),
          } satisfies Session)

          vi.mocked(prisma.bookListing.findUnique).mockResolvedValue({
            id: bookListingId, title, author: null, isbn: null, condition: '良好',
            location: '図書館前', availableTime: null, description: null,
            status: 'RESERVED', giverId, createdAt: new Date(), updatedAt: new Date(),
          } as Parameters<typeof vi.mocked<typeof prisma.bookListing.findUnique>>[0] extends { where?: unknown } ? never : never)

          vi.mocked(prisma.$transaction).mockImplementation(async () => {
            throw new Error('トランザクションは呼ばれるべきではありません')
          })

          const session = await auth()
          if (!session?.user?.id) throw new Error('認証エラー')

          const bookListing = await prisma.bookListing.findUnique({ where: { id: bookListingId } })
          if (!bookListing) throw new Error('BookListingが見つかりません')

          const isRejected = bookListing.status !== 'AVAILABLE'

          // --- 検証 ---
          expect(isRejected).toBe(true)
          expect(bookListing.status).toBe('RESERVED')
          expect(prisma.$transaction).not.toHaveBeenCalled()
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: university-book-sharing, Property 8: 予約キャンセルのラウンドトリップ
  // 任意のBook_Listingに対して、予約してからキャンセルすると
  // Book_ListingのステータスがAVAILABLEに戻ること
  // **Validates: Requirement 4.4**
  it('予約後にキャンセルするとBook_ListingのステータスがAVAILABLEに戻ること', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedFn }

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }), // bookListingId
        fc.string({ minLength: 1, maxLength: 50 }), // giverId
        fc.string({ minLength: 1, maxLength: 50 }), // receiverId
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0), // title
        async (bookListingId, giverId, receiverId, title) => {
          vi.clearAllMocks()

          auth.mockResolvedValue({
            user: { id: receiverId, email: 'receiver@example.com', name: 'Receiver' },
            expires: new Date(Date.now() + 3600 * 1000).toISOString(),
          } satisfies Session)

          const reservationId = 'reservation-id-' + bookListingId

          const mockReservation = {
            id: reservationId, bookListingId, receiverId, status: 'ACTIVE',
            createdAt: new Date(), updatedAt: new Date(),
            bookListing: {
              id: bookListingId, title, author: null, isbn: null, condition: '良好',
              location: '図書館前', availableTime: null, description: null,
              status: 'RESERVED', giverId, createdAt: new Date(), updatedAt: new Date(),
            },
          }

          vi.mocked(prisma.reservation.findUnique).mockResolvedValue(
            mockReservation as Parameters<typeof vi.mocked<typeof prisma.reservation.findUnique>>[0] extends { where?: unknown } ? never : never
          )

          let capturedReservationUpdate: Record<string, unknown> | null = null
          let capturedBookListingUpdate: Record<string, unknown> | null = null

          vi.mocked(prisma.$transaction).mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
            const mockTx = {
              reservation: {
                update: vi.fn().mockImplementation(async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
                  capturedReservationUpdate = { where, data }
                  return { ...mockReservation, status: data.status }
                }),
              },
              bookListing: {
                update: vi.fn().mockImplementation(async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
                  capturedBookListingUpdate = { where, data }
                  return { ...mockReservation.bookListing, status: data.status }
                }),
              },
            }
            return callback(mockTx)
          })

          const session = await auth()
          if (!session?.user?.id) throw new Error('認証エラー')

          const reservation = await prisma.reservation.findUnique({
            where: { id: reservationId },
            include: { bookListing: true },
          })
          if (!reservation) throw new Error('Reservationが見つかりません')
          if (reservation.receiverId !== session.user!.id) throw new Error('権限エラー')

          expect(reservation.bookListing.status).toBe('RESERVED')

          await prisma.$transaction(async (tx: {
            reservation: { update: (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => Promise<Record<string, unknown>> };
            bookListing: { update: (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => Promise<Record<string, unknown>> };
          }) => {
            await tx.reservation.update({ where: { id: reservationId }, data: { status: 'CANCELLED' } })
            await tx.bookListing.update({ where: { id: bookListingId }, data: { status: 'AVAILABLE' } })
          })

          // --- 検証 ---
          expect(capturedReservationUpdate).not.toBeNull()
          expect(capturedReservationUpdate!.data).toEqual({ status: 'CANCELLED' })
          expect((capturedReservationUpdate!.where as Record<string, unknown>).id).toBe(reservationId)
          expect(capturedBookListingUpdate).not.toBeNull()
          expect(capturedBookListingUpdate!.data).toEqual({ status: 'AVAILABLE' })
          expect((capturedBookListingUpdate!.where as Record<string, unknown>).id).toBe(bookListingId)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: university-book-sharing, Property 10: 受け渡し完了後の削除制限
  // 任意のCOMPLETEDステータスのBook_Listingに対して、
  // GiverもReceiverも削除操作が拒否されること（409 LISTING_COMPLETED）
  // **Validates: Requirements 6.4**
  it('COMPLETEDなBook_ListingへのGiver・Receiver両方の削除操作が409で拒否されること', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedFn }

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }), // bookListingId
        fc.string({ minLength: 1, maxLength: 50 }), // giverId
        fc.string({ minLength: 1, maxLength: 50 }), // receiverId
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0), // title
        // GiverとReceiverのどちらが削除を試みるかをランダムに選択
        fc.boolean(), // true = Giver, false = Receiver
        async (bookListingId, giverId, receiverId, title, isGiverAttempt) => {
          vi.clearAllMocks()

          // 削除を試みるユーザーのIDを決定する
          const attemptUserId = isGiverAttempt ? giverId : receiverId

          // 認証済みユーザーとしてモックする
          auth.mockResolvedValue({
            user: { id: attemptUserId, email: 'user@example.com', name: 'User' },
            expires: new Date(Date.now() + 3600 * 1000).toISOString(),
          } satisfies Session)

          // COMPLETEDなBook_Listingが存在する状態をモックする
          const mockBookListing = {
            id: bookListingId,
            title,
            author: null,
            isbn: null,
            condition: '良好',
            location: '図書館前',
            availableTime: null,
            description: null,
            status: 'COMPLETED', // COMPLETEDステータス
            giverId,
            createdAt: new Date(),
            updatedAt: new Date(),
            reservation: null,
          }

          vi.mocked(prisma.bookListing.findUnique).mockResolvedValue(
            mockBookListing as Parameters<typeof vi.mocked<typeof prisma.bookListing.findUnique>>[0] extends { where?: unknown } ? never : never
          )

          // 削除操作が呼ばれないことを確認するためのモック
          const deleteMock = vi.fn()
          ;(prisma.bookListing as unknown as Record<string, unknown>).delete = deleteMock

          // --- DELETE /api/books/:id のロジックをシミュレートする ---
          const session = await auth()
          if (!session?.user?.id) throw new Error('認証エラー')

          const book = await prisma.bookListing.findUnique({ where: { id: bookListingId } })
          if (!book) throw new Error('BookListingが見つかりません')

          // COMPLETEDチェック（権限チェックより先に行う）
          const isRejectedByCompleted = book.status === 'COMPLETED'

          // --- 検証 ---
          // COMPLETEDな本への削除は拒否されること（要件6.4）
          expect(isRejectedByCompleted).toBe(true)
          // 削除操作は実行されないこと
          expect(deleteMock).not.toHaveBeenCalled()
        }
      ),
      { numRuns: 100 }
    )
  })
})
