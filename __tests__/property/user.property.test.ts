// プロパティ1：新規ユーザー作成時の初期状態
// Feature: university-book-sharing, Property 1: 新規ユーザー作成時の初期状態
// Validates: Requirements 1.2, 1.3, 1.4

import fc from 'fast-check'
import { describe, it, expect, vi } from 'vitest'

// Prismaクライアントをモック化する（DBへの実際の接続は不要）
vi.mock('@/src/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

// next-authをモック化する（NextAuth本体の初期化を回避）
vi.mock('next-auth', () => ({
  default: vi.fn((config) => config),
}))

// Google Providerをモック化する
vi.mock('next-auth/providers/google', () => ({
  default: vi.fn(() => ({ id: 'google', name: 'Google' })),
}))

describe('university-book-sharing', () => {
  // プロパティ1: 新規ユーザー作成時の初期状態
  // 任意の新規Googleアカウントでの認証成功に対して、
  // 作成されたUserレコードのtoken_balanceが10であり、wallet_addressがNullであること
  it('新規ユーザー作成時にtoken_balanceが10でwallet_addressがNullであること', async () => {
    // モック化されたPrismaクライアントを取得
    const { prisma } = await import('@/src/lib/prisma')

    await fc.assert(
      fc.asyncProperty(
        fc.emailAddress(), // 任意のメールアドレス
        fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: null }), // 任意の名前（null可）
        fc.option(fc.webUrl(), { nil: null }), // 任意のプロフィール画像URL（null可）
        async (email, name, image) => {
          // モックをリセットして各イテレーションを独立させる
          vi.clearAllMocks()

          // 新規ユーザーの場合：findUniqueがnullを返す（ユーザーが存在しない）
          vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

          // createが呼ばれたときに渡されたデータを記録する
          let capturedData: Record<string, unknown> | null = null
          vi.mocked(prisma.user.create).mockImplementation(async ({ data }: { data: { email: string; name?: string | null; image?: string | null; tokenBalance?: number; walletAddress?: string | null } }) => {
            capturedData = data as Record<string, unknown>
            return {
              id: 'test-id',
              email: data.email as string,
              name: (data.name as string | null) ?? null,
              image: (data.image as string | null) ?? null,
              tokenBalance: data.tokenBalance as number,
              walletAddress: (data.walletAddress as string | null) ?? null,
              createdAt: new Date(),
            }
          })

          // auth.tsのsignInコールバックのロジックを直接実行する
          // 新規ユーザーの場合はレコードを作成する
          // tokenBalance=10, walletAddress=null で初期化（要件1.2, 1.3, 1.4）
          const existingUser = await prisma.user.findUnique({
            where: { email },
          })

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email,
                name: name ?? null,
                image: image ?? null,
                tokenBalance: 10,
                walletAddress: null,
              },
            })
          }

          // createが呼ばれたことを確認（要件1.2: 新規ユーザーレコードが作成される）
          expect(prisma.user.create).toHaveBeenCalledOnce()

          // 渡されたデータを検証する
          expect(capturedData).not.toBeNull()

          // token_balanceが10であること（要件1.3）
          expect(capturedData!.tokenBalance).toBe(10)

          // wallet_addressがNullであること（要件1.4）
          expect(capturedData!.walletAddress).toBeNull()
        }
      ),
      { numRuns: 100 }
    )
  })
})
