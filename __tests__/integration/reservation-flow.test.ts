// 統合テスト：予約〜完了フロー
// 要件4.1, 5.1, 6.1 に対応
// 予約作成→チャット→受け渡し完了の一連のフローを検証する

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import type { Session } from 'next-auth'

// Prismaクライアントをモック化する（DBへの実際の接続は不要）
vi.mock('@/src/lib/prisma', () => ({
  prisma: {
    bookListing: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    reservation: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    message: {
      create: vi.fn(),
      findMany: vi.fn(),
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

// モック済みのauth関数の型エイリアス
type MockedAuth = { mockResolvedValue: (v: unknown) => void; (): Promise<Session | null> }

// テスト用ユーザーデータ
const GIVER = {
  id: 'giver-user-id',
  email: 'giver@example.com',
  name: 'Giver User',
  image: null,
}

const RECEIVER = {
  id: 'receiver-user-id',
  email: 'receiver@example.com',
  name: 'Receiver User',
  image: null,
}

// テスト用Book_Listingデータ
const BOOK_LISTING_ID = 'book-listing-id-001'
const RESERVATION_ID = 'reservation-id-001'

describe('予約〜完了フロー統合テスト', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー1: GiverがBook_Listingを登録する（AVAILABLE状態）
  // 要件2.2, 2.3 の確認
  // ─────────────────────────────────────────────────────────────────────────
  it('Step1: GiverがBook_Listingを登録するとAVAILABLE状態で作成される', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // GiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: GIVER.id, email: GIVER.email, name: GIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // 作成されるBook_Listingのモックデータ
    const mockCreatedBook = {
      id: BOOK_LISTING_ID,
      title: '線形代数学入門',
      author: '山田太郎',
      isbn: '978-4-000-00000-0',
      condition: '良好',
      location: '図書館前',
      availableTime: '月〜金の12時〜13時',
      description: '書き込みなし',
      status: 'AVAILABLE',
      giverId: GIVER.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      giver: { id: GIVER.id, name: GIVER.name, image: null },
    }

    vi.mocked(prisma.bookListing.create).mockResolvedValue(
      mockCreatedBook as Parameters<typeof vi.mocked<typeof prisma.bookListing.create>>[0] extends { data?: unknown } ? never : never
    )

    // POST /api/books を呼び出す
    const { POST } = await import('@/src/app/api/books/route')
    const request = new NextRequest('http://localhost/api/books', {
      method: 'POST',
      body: JSON.stringify({
        title: '線形代数学入門',
        author: '山田太郎',
        isbn: '978-4-000-00000-0',
        condition: '良好',
        location: '図書館前',
        availableTime: '月〜金の12時〜13時',
        description: '書き込みなし',
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 201が返り、ステータスがAVAILABLEであること（要件2.2）
    expect(response.status).toBe(201)
    expect(body.status).toBe('AVAILABLE')
    // 検証: giverId がGiverのIDと一致すること（要件2.3）
    expect(body.giverId).toBe(GIVER.id)
    expect(body.title).toBe('線形代数学入門')
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー2: ReceiverがBook_Listingを予約する
  // 要件4.1: Reservationレコード作成・BookListingステータスをRESERVEDに変更
  // 要件5.1: Chatルームが自動生成される（Reservationレコード自体がChatルームを兼ねる）
  // ─────────────────────────────────────────────────────────────────────────
  it('Step2: ReceiverがAVAILABLEなBook_Listingを予約するとRESERVEDになりReservationが作成される', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // AVAILABLEなBook_Listingが存在する状態をモックする
    const mockBookListing = {
      id: BOOK_LISTING_ID,
      title: '線形代数学入門',
      author: '山田太郎',
      isbn: '978-4-000-00000-0',
      condition: '良好',
      location: '図書館前',
      availableTime: '月〜金の12時〜13時',
      description: '書き込みなし',
      status: 'AVAILABLE',
      giverId: GIVER.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    vi.mocked(prisma.bookListing.findUnique).mockResolvedValue(
      mockBookListing as Parameters<typeof vi.mocked<typeof prisma.bookListing.findUnique>>[0] extends { where?: unknown } ? never : never
    )

    // トランザクション内でReservationを作成しBookListingをRESERVEDに更新するモック
    const mockReservation = {
      id: RESERVATION_ID,
      bookListingId: BOOK_LISTING_ID,
      receiverId: RECEIVER.id,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
      bookListing: {
        ...mockBookListing,
        status: 'RESERVED',
        giver: { id: GIVER.id, name: GIVER.name, image: null },
      },
      receiver: { id: RECEIVER.id, name: RECEIVER.name, image: null },
    }

    vi.mocked(prisma.$transaction).mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
      const mockTx = {
        reservation: {
          create: vi.fn().mockResolvedValue(mockReservation),
        },
        bookListing: {
          update: vi.fn().mockResolvedValue({ ...mockBookListing, status: 'RESERVED' }),
        },
      }
      return callback(mockTx)
    })

    // POST /api/reservations を呼び出す
    const { POST } = await import('@/src/app/api/reservations/route')
    const request = new NextRequest('http://localhost/api/reservations', {
      method: 'POST',
      body: JSON.stringify({ bookListingId: BOOK_LISTING_ID }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 201が返ること（要件4.1）
    expect(response.status).toBe(201)
    // 検証: ReservationレコードのbookListingIdとreceiverIdが正しいこと（要件4.1）
    expect(body.bookListingId).toBe(BOOK_LISTING_ID)
    expect(body.receiverId).toBe(RECEIVER.id)
    expect(body.status).toBe('ACTIVE')
    // 検証: BookListingのステータスがRESERVEDに変更されていること（要件4.1）
    expect(body.bookListing.status).toBe('RESERVED')
    // 検証: Reservationレコード自体がChatルームを兼ねる（要件5.1）
    // Reservationが作成されることでChatルームが自動生成される設計
    expect(body.id).toBe(RESERVATION_ID)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー3: RESERVEDなBook_Listingへの重複予約が拒否される
  // 要件4.3: 他のUserが同じBook_Listingを予約できないようにする
  // ─────────────────────────────────────────────────────────────────────────
  it('Step3: RESERVEDなBook_Listingへの重複予約が409で拒否される', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // 別のユーザーがReceiverとして予約を試みる
    const anotherReceiverId = 'another-receiver-id'
    auth.mockResolvedValue({
      user: { id: anotherReceiverId, email: 'another@example.com', name: 'Another User' },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // RESERVEDなBook_Listingが存在する状態をモックする
    vi.mocked(prisma.bookListing.findUnique).mockResolvedValue({
      id: BOOK_LISTING_ID,
      title: '線形代数学入門',
      author: '山田太郎',
      isbn: null,
      condition: '良好',
      location: '図書館前',
      availableTime: null,
      description: null,
      status: 'RESERVED', // すでにRESERVED
      giverId: GIVER.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Parameters<typeof vi.mocked<typeof prisma.bookListing.findUnique>>[0] extends { where?: unknown } ? never : never)

    // POST /api/reservations を呼び出す
    const { POST } = await import('@/src/app/api/reservations/route')
    const request = new NextRequest('http://localhost/api/reservations', {
      method: 'POST',
      body: JSON.stringify({ bookListingId: BOOK_LISTING_ID }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 409が返ること（要件4.3）
    expect(response.status).toBe(409)
    expect(body.error).toBe('ALREADY_RESERVED')
    // 検証: トランザクションが呼ばれていないこと（DBの状態が変化しない）
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー4: GiverとReceiverがメッセージを送受信する
  // 要件5.2: GiverとReceiverの双方がメッセージを送受信できる
  // 要件5.3: 各メッセージに送信者のuser_idと送信日時を保存する
  // ─────────────────────────────────────────────────────────────────────────
  it('Step4a: GiverがReservationに紐づくチャットでメッセージを送信できる', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // GiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: GIVER.id, email: GIVER.email, name: GIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // Reservationが存在する状態をモックする（GiverはbookListing.giverIdで判定）
    vi.mocked(prisma.reservation.findUnique).mockResolvedValue({
      id: RESERVATION_ID,
      bookListingId: BOOK_LISTING_ID,
      receiverId: RECEIVER.id,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
      bookListing: {
        giverId: GIVER.id,
        title: '線形代数学入門',
      },
      receiver: { id: RECEIVER.id, name: RECEIVER.name },
    } as Parameters<typeof vi.mocked<typeof prisma.reservation.findUnique>>[0] extends { where?: unknown } ? never : never)

    // 作成されるMessageのモックデータ
    const mockMessage = {
      id: 'message-id-001',
      content: '受け渡し場所はどこにしますか？',
      reservationId: RESERVATION_ID,
      senderId: GIVER.id,
      createdAt: new Date(),
      sender: { id: GIVER.id, name: GIVER.name, image: null },
    }

    vi.mocked(prisma.message.create).mockResolvedValue(
      mockMessage as Parameters<typeof vi.mocked<typeof prisma.message.create>>[0] extends { data?: unknown } ? never : never
    )

    // POST /api/messages を呼び出す
    const { POST } = await import('@/src/app/api/messages/route')
    const request = new NextRequest('http://localhost/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        reservationId: RESERVATION_ID,
        content: '受け渡し場所はどこにしますか？',
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 201が返ること（要件5.2）
    expect(response.status).toBe(201)
    // 検証: senderId がGiverのIDと一致すること（要件5.3）
    expect(body.senderId).toBe(GIVER.id)
    expect(body.content).toBe('受け渡し場所はどこにしますか？')
    expect(body.reservationId).toBe(RESERVATION_ID)
    // 検証: createdAtが設定されていること（要件5.3）
    expect(body.createdAt).toBeDefined()
  })

  it('Step4b: ReceiverがReservationに紐づくチャットでメッセージを送信できる', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // Reservationが存在する状態をモックする
    vi.mocked(prisma.reservation.findUnique).mockResolvedValue({
      id: RESERVATION_ID,
      bookListingId: BOOK_LISTING_ID,
      receiverId: RECEIVER.id,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
      bookListing: {
        giverId: GIVER.id,
        title: '線形代数学入門',
      },
      receiver: { id: RECEIVER.id, name: RECEIVER.name },
    } as Parameters<typeof vi.mocked<typeof prisma.reservation.findUnique>>[0] extends { where?: unknown } ? never : never)

    // 作成されるMessageのモックデータ
    const mockMessage = {
      id: 'message-id-002',
      content: '図書館前でお願いします！',
      reservationId: RESERVATION_ID,
      senderId: RECEIVER.id,
      createdAt: new Date(),
      sender: { id: RECEIVER.id, name: RECEIVER.name, image: null },
    }

    vi.mocked(prisma.message.create).mockResolvedValue(
      mockMessage as Parameters<typeof vi.mocked<typeof prisma.message.create>>[0] extends { data?: unknown } ? never : never
    )

    // POST /api/messages を呼び出す
    const { POST } = await import('@/src/app/api/messages/route')
    const request = new NextRequest('http://localhost/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        reservationId: RESERVATION_ID,
        content: '図書館前でお願いします！',
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 201が返ること（要件5.2）
    expect(response.status).toBe(201)
    // 検証: senderId がReceiverのIDと一致すること（要件5.3）
    expect(body.senderId).toBe(RECEIVER.id)
    expect(body.content).toBe('図書館前でお願いします！')
    // 検証: createdAtが設定されていること（要件5.3）
    expect(body.createdAt).toBeDefined()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー5: Receiverが受け渡し完了ボタンを押す
  // 要件6.1: Book_ListingのステータスをCOMPLETEDに変更する
  // ─────────────────────────────────────────────────────────────────────────
  it('Step5: Receiverが受け渡し完了を押すとBook_ListingがCOMPLETEDになる', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // Reservationが存在する状態をモックする
    vi.mocked(prisma.reservation.findUnique).mockResolvedValue({
      id: RESERVATION_ID,
      bookListingId: BOOK_LISTING_ID,
      receiverId: RECEIVER.id,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
      bookListing: {
        id: BOOK_LISTING_ID,
        title: '線形代数学入門',
        author: '山田太郎',
        isbn: null,
        condition: '良好',
        location: '図書館前',
        availableTime: null,
        description: null,
        status: 'RESERVED',
        giverId: GIVER.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    } as Parameters<typeof vi.mocked<typeof prisma.reservation.findUnique>>[0] extends { where?: unknown } ? never : never)

    // トランザクション内でBookListingとReservationをCOMPLETEDに更新するモック
    let capturedBookListingUpdate: Record<string, unknown> | null = null
    let capturedReservationUpdate: Record<string, unknown> | null = null

    vi.mocked(prisma.$transaction).mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
      const mockTx = {
        bookListing: {
          update: vi.fn().mockImplementation(async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
            capturedBookListingUpdate = { where, data }
            return { id: BOOK_LISTING_ID, status: 'COMPLETED' }
          }),
        },
        reservation: {
          update: vi.fn().mockImplementation(async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
            capturedReservationUpdate = { where, data }
            return { id: RESERVATION_ID, status: 'COMPLETED' }
          }),
        },
      }
      return callback(mockTx)
    })

    // POST /api/reservations/:id/complete を呼び出す
    const { POST } = await import('@/src/app/api/reservations/[id]/complete/route')
    const request = new NextRequest(`http://localhost/api/reservations/${RESERVATION_ID}/complete`, {
      method: 'POST',
    })

    const response = await POST(request, { params: { id: RESERVATION_ID } })
    const body = await response.json()

    // 検証: 200が返ること（要件6.1）
    expect(response.status).toBe(200)
    expect(body.success).toBe(true)
    // 検証: BookListingのステータスがCOMPLETEDに更新されていること（要件6.1）
    expect(capturedBookListingUpdate).not.toBeNull()
    expect(capturedBookListingUpdate!.data).toEqual({ status: 'COMPLETED' })
    expect((capturedBookListingUpdate!.where as Record<string, unknown>).id).toBe(BOOK_LISTING_ID)
    // 検証: ReservationのステータスもCOMPLETEDに更新されていること
    expect(capturedReservationUpdate).not.toBeNull()
    expect(capturedReservationUpdate!.data).toEqual({ status: 'COMPLETED' })
    expect((capturedReservationUpdate!.where as Record<string, unknown>).id).toBe(RESERVATION_ID)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー6: Giver以外が受け渡し完了を押すと403が返る
  // 要件6.1: ReceiverのみがPOSTできる
  // ─────────────────────────────────────────────────────────────────────────
  it('Step6: Receiver以外が受け渡し完了を押すと403が返る', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // GiverのセッションをモックするS（Giverは完了操作できない）
    auth.mockResolvedValue({
      user: { id: GIVER.id, email: GIVER.email, name: GIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // Reservationが存在する状態をモックする
    vi.mocked(prisma.reservation.findUnique).mockResolvedValue({
      id: RESERVATION_ID,
      bookListingId: BOOK_LISTING_ID,
      receiverId: RECEIVER.id, // ReceiverはRECEIVER.id
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
      bookListing: {
        id: BOOK_LISTING_ID,
        title: '線形代数学入門',
        author: null,
        isbn: null,
        condition: '良好',
        location: '図書館前',
        availableTime: null,
        description: null,
        status: 'RESERVED',
        giverId: GIVER.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    } as Parameters<typeof vi.mocked<typeof prisma.reservation.findUnique>>[0] extends { where?: unknown } ? never : never)

    // POST /api/reservations/:id/complete を呼び出す
    const { POST } = await import('@/src/app/api/reservations/[id]/complete/route')
    const request = new NextRequest(`http://localhost/api/reservations/${RESERVATION_ID}/complete`, {
      method: 'POST',
    })

    const response = await POST(request, { params: { id: RESERVATION_ID } })
    const body = await response.json()

    // 検証: 403が返ること（ReceiverのみがPOSTできる）
    expect(response.status).toBe(403)
    expect(body.error).toBe('FORBIDDEN')
    // 検証: トランザクションが呼ばれていないこと
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー7: 未認証ユーザーが各APIにアクセスすると401が返る
  // 要件8.4: 認証ガード
  // ─────────────────────────────────────────────────────────────────────────
  it('Step7: 未認証ユーザーが予約APIにアクセスすると401が返る', async () => {
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // 未認証状態をモックする
    auth.mockResolvedValue(null)

    // POST /api/reservations を呼び出す
    const { POST } = await import('@/src/app/api/reservations/route')
    const request = new NextRequest('http://localhost/api/reservations', {
      method: 'POST',
      body: JSON.stringify({ bookListingId: BOOK_LISTING_ID }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 401が返ること
    expect(response.status).toBe(401)
    expect(body.error).toBe('UNAUTHORIZED')
  })

  it('Step7b: 未認証ユーザーが受け渡し完了APIにアクセスすると401が返る', async () => {
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // 未認証状態をモックする
    auth.mockResolvedValue(null)

    // POST /api/reservations/:id/complete を呼び出す
    const { POST } = await import('@/src/app/api/reservations/[id]/complete/route')
    const request = new NextRequest(`http://localhost/api/reservations/${RESERVATION_ID}/complete`, {
      method: 'POST',
    })

    const response = await POST(request, { params: { id: RESERVATION_ID } })
    const body = await response.json()

    // 検証: 401が返ること
    expect(response.status).toBe(401)
    expect(body.error).toBe('UNAUTHORIZED')
  })
})
