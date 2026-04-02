// 統合テスト：トークン送付フロー
// 要件7.2, 7.3 に対応
// 受け渡し完了後のトークン送付フローを一連のテストとして検証する

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import type { Session } from 'next-auth'

// Prismaクライアントをモック化する（DBへの実際の接続は不要）
vi.mock('@/src/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    tokenTransaction: {
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

// テスト用トークン残高
const RECEIVER_INITIAL_BALANCE = 10
const GIVER_INITIAL_BALANCE = 5
const TRANSFER_AMOUNT = 3

// テスト用TokenTransactionデータ
const TOKEN_TRANSACTION_ID = 'token-tx-id-001'

describe('トークン送付フロー統合テスト', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー1: ReceiverがGiverへトークンを送付する
  // 要件7.2: 送付元UserのToken残高から指定額を減算し、受取先UserのToken残高に加算する
  // 要件7.3: 送付元user_id・受取先user_id・送付額・日時をToken_Transactionとして保存する
  // ─────────────────────────────────────────────────────────────────────────
  it('Step1: ReceiverがGiverへトークンを送付すると201が返りTransactionが記録される', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // 送付先ユーザー（Giver）が存在することをモックする
    vi.mocked(prisma.user.findUnique)
      .mockResolvedValueOnce({
        id: GIVER.id,
        email: GIVER.email,
        name: GIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: GIVER_INITIAL_BALANCE,
      })
      // 送付元ユーザー（Receiver）の残高チェック用
      .mockResolvedValueOnce({
        id: RECEIVER.id,
        email: RECEIVER.email,
        name: RECEIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: RECEIVER_INITIAL_BALANCE,
      })

    // 作成されるTokenTransactionのモックデータ
    const mockTransaction = {
      id: TOKEN_TRANSACTION_ID,
      fromUserId: RECEIVER.id,
      toUserId: GIVER.id,
      amount: TRANSFER_AMOUNT,
      note: 'トークン送付',
      createdAt: new Date(),
      fromUser: { id: RECEIVER.id, name: RECEIVER.name, image: null },
      toUser: { id: GIVER.id, name: GIVER.name, image: null },
    }

    // トランザクション内での処理をモックする
    vi.mocked(prisma.$transaction).mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
      const mockTx = {
        user: {
          update: vi.fn().mockResolvedValue({}),
        },
        tokenTransaction: {
          create: vi.fn().mockResolvedValue(mockTransaction),
        },
      }
      return callback(mockTx)
    })

    // POST /api/tokens/transfer を呼び出す
    const { POST } = await import('@/src/app/api/tokens/transfer/route')
    const request = new NextRequest('http://localhost/api/tokens/transfer', {
      method: 'POST',
      body: JSON.stringify({
        toUserId: GIVER.id,
        amount: TRANSFER_AMOUNT,
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 201が返ること
    expect(response.status).toBe(201)
    // 検証: Token_Transactionが正しく記録されること（要件7.3）
    expect(body.fromUserId).toBe(RECEIVER.id)
    expect(body.toUserId).toBe(GIVER.id)
    expect(body.amount).toBe(TRANSFER_AMOUNT)
    expect(body.createdAt).toBeDefined()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー2: 送付元（Receiver）のToken残高が減算されること
  // 要件7.2: 送付元UserのToken残高から指定額を減算する
  // ─────────────────────────────────────────────────────────────────────────
  it('Step2: トークン送付後に送付元（Receiver）のToken残高が減算される', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // 送付先ユーザー（Giver）が存在することをモックする
    vi.mocked(prisma.user.findUnique)
      .mockResolvedValueOnce({
        id: GIVER.id,
        email: GIVER.email,
        name: GIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: GIVER_INITIAL_BALANCE,
      })
      // 送付元ユーザー（Receiver）の残高チェック用
      .mockResolvedValueOnce({
        id: RECEIVER.id,
        email: RECEIVER.email,
        name: RECEIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: RECEIVER_INITIAL_BALANCE,
      })

    // トランザクション内でのuser.updateの呼び出しを記録する
    let capturedFromUserUpdate: Record<string, unknown> | null = null
    let capturedToUserUpdate: Record<string, unknown> | null = null

    vi.mocked(prisma.$transaction).mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
      const mockTx = {
        user: {
          update: vi.fn().mockImplementation(async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
            if (where.id === RECEIVER.id) {
              capturedFromUserUpdate = { where, data }
            } else if (where.id === GIVER.id) {
              capturedToUserUpdate = { where, data }
            }
            return {}
          }),
        },
        tokenTransaction: {
          create: vi.fn().mockResolvedValue({
            id: TOKEN_TRANSACTION_ID,
            fromUserId: RECEIVER.id,
            toUserId: GIVER.id,
            amount: TRANSFER_AMOUNT,
            note: 'トークン送付',
            createdAt: new Date(),
            fromUser: { id: RECEIVER.id, name: RECEIVER.name, image: null },
            toUser: { id: GIVER.id, name: GIVER.name, image: null },
          }),
        },
      }
      return callback(mockTx)
    })

    // POST /api/tokens/transfer を呼び出す
    const { POST } = await import('@/src/app/api/tokens/transfer/route')
    const request = new NextRequest('http://localhost/api/tokens/transfer', {
      method: 'POST',
      body: JSON.stringify({
        toUserId: GIVER.id,
        amount: TRANSFER_AMOUNT,
      }),
    })

    await POST(request)

    // 検証: 送付元（Receiver）のtokenBalanceが減算されること（要件7.2）
    expect(capturedFromUserUpdate).not.toBeNull()
    expect(capturedFromUserUpdate!.data).toEqual({ tokenBalance: { decrement: TRANSFER_AMOUNT } })
    expect((capturedFromUserUpdate!.where as Record<string, unknown>).id).toBe(RECEIVER.id)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー3: 受取先（Giver）のToken残高が加算されること
  // 要件7.2: 受取先UserのToken残高に加算する
  // ─────────────────────────────────────────────────────────────────────────
  it('Step3: トークン送付後に受取先（Giver）のToken残高が加算される', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // 送付先ユーザー（Giver）が存在することをモックする
    vi.mocked(prisma.user.findUnique)
      .mockResolvedValueOnce({
        id: GIVER.id,
        email: GIVER.email,
        name: GIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: GIVER_INITIAL_BALANCE,
      })
      // 送付元ユーザー（Receiver）の残高チェック用
      .mockResolvedValueOnce({
        id: RECEIVER.id,
        email: RECEIVER.email,
        name: RECEIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: RECEIVER_INITIAL_BALANCE,
      })

    // トランザクション内でのuser.updateの呼び出しを記録する
    let capturedToUserUpdate: Record<string, unknown> | null = null

    vi.mocked(prisma.$transaction).mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
      const mockTx = {
        user: {
          update: vi.fn().mockImplementation(async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
            if (where.id === GIVER.id) {
              capturedToUserUpdate = { where, data }
            }
            return {}
          }),
        },
        tokenTransaction: {
          create: vi.fn().mockResolvedValue({
            id: TOKEN_TRANSACTION_ID,
            fromUserId: RECEIVER.id,
            toUserId: GIVER.id,
            amount: TRANSFER_AMOUNT,
            note: 'トークン送付',
            createdAt: new Date(),
            fromUser: { id: RECEIVER.id, name: RECEIVER.name, image: null },
            toUser: { id: GIVER.id, name: GIVER.name, image: null },
          }),
        },
      }
      return callback(mockTx)
    })

    // POST /api/tokens/transfer を呼び出す
    const { POST } = await import('@/src/app/api/tokens/transfer/route')
    const request = new NextRequest('http://localhost/api/tokens/transfer', {
      method: 'POST',
      body: JSON.stringify({
        toUserId: GIVER.id,
        amount: TRANSFER_AMOUNT,
      }),
    })

    await POST(request)

    // 検証: 受取先（Giver）のtokenBalanceが加算されること（要件7.2）
    expect(capturedToUserUpdate).not.toBeNull()
    expect(capturedToUserUpdate!.data).toEqual({ tokenBalance: { increment: TRANSFER_AMOUNT } })
    expect((capturedToUserUpdate!.where as Record<string, unknown>).id).toBe(GIVER.id)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー4: Token_Transactionレコードが正しく記録されること
  // 要件7.3: 送付元user_id・受取先user_id・送付額・日時をToken_Transactionとして保存する
  // ─────────────────────────────────────────────────────────────────────────
  it('Step4: Token_Transactionレコードに送付元・受取先・送付額・日時が正しく記録される', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // 送付先ユーザー（Giver）が存在することをモックする
    vi.mocked(prisma.user.findUnique)
      .mockResolvedValueOnce({
        id: GIVER.id,
        email: GIVER.email,
        name: GIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: GIVER_INITIAL_BALANCE,
      })
      // 送付元ユーザー（Receiver）の残高チェック用
      .mockResolvedValueOnce({
        id: RECEIVER.id,
        email: RECEIVER.email,
        name: RECEIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: RECEIVER_INITIAL_BALANCE,
      })

    // tokenTransaction.createの呼び出し引数を記録する
    let capturedTransactionCreate: Record<string, unknown> | null = null

    vi.mocked(prisma.$transaction).mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
      const mockTx = {
        user: {
          update: vi.fn().mockResolvedValue({}),
        },
        tokenTransaction: {
          create: vi.fn().mockImplementation(async ({ data }: { data: Record<string, unknown> }) => {
            capturedTransactionCreate = { data }
            return {
              id: TOKEN_TRANSACTION_ID,
              fromUserId: RECEIVER.id,
              toUserId: GIVER.id,
              amount: TRANSFER_AMOUNT,
              note: 'トークン送付',
              createdAt: new Date(),
              fromUser: { id: RECEIVER.id, name: RECEIVER.name, image: null },
              toUser: { id: GIVER.id, name: GIVER.name, image: null },
            }
          }),
        },
      }
      return callback(mockTx)
    })

    // POST /api/tokens/transfer を呼び出す
    const { POST } = await import('@/src/app/api/tokens/transfer/route')
    const request = new NextRequest('http://localhost/api/tokens/transfer', {
      method: 'POST',
      body: JSON.stringify({
        toUserId: GIVER.id,
        amount: TRANSFER_AMOUNT,
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: Token_Transactionの作成データに送付元・受取先・送付額が含まれること（要件7.3）
    expect(capturedTransactionCreate).not.toBeNull()
    const txData = capturedTransactionCreate!.data as Record<string, unknown>
    expect(txData.fromUserId).toBe(RECEIVER.id)
    expect(txData.toUserId).toBe(GIVER.id)
    expect(txData.amount).toBe(TRANSFER_AMOUNT)
    // 検証: レスポンスにcreatedAtが含まれること（日時の記録）（要件7.3）
    expect(body.createdAt).toBeDefined()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー5: 残高不足時に送付が拒否されること
  // 要件7.4: 送付元UserのToken残高が送付額を下回るとき、送付を拒否する
  // ─────────────────────────────────────────────────────────────────────────
  it('Step5: 残高不足時にトークン送付が422で拒否される', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // 送付先ユーザー（Giver）が存在することをモックする
    vi.mocked(prisma.user.findUnique)
      .mockResolvedValueOnce({
        id: GIVER.id,
        email: GIVER.email,
        name: GIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: GIVER_INITIAL_BALANCE,
      })
      // 送付元ユーザー（Receiver）の残高が不足している状態をモックする
      .mockResolvedValueOnce({
        id: RECEIVER.id,
        email: RECEIVER.email,
        name: RECEIVER.name,
        image: null,
        walletAddress: null,
        createdAt: new Date(),
        tokenBalance: 1, // 残高1トークンしかない
      })

    // POST /api/tokens/transfer を呼び出す（送付額は5で残高1を超える）
    const { POST } = await import('@/src/app/api/tokens/transfer/route')
    const request = new NextRequest('http://localhost/api/tokens/transfer', {
      method: 'POST',
      body: JSON.stringify({
        toUserId: GIVER.id,
        amount: 5, // 残高(1)を超える送付額
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 422が返ること（要件7.4）
    expect(response.status).toBe(422)
    expect(body.error).toBe('INSUFFICIENT_BALANCE')
    // 検証: トランザクションが呼ばれていないこと（DBの状態が変化しない）
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー6: 未認証ユーザーがトークン送付APIにアクセスすると401が返ること
  // 要件8.4: 認証ガード
  // ─────────────────────────────────────────────────────────────────────────
  it('Step6: 未認証ユーザーがトークン送付APIにアクセスすると401が返る', async () => {
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // 未認証状態をモックする
    auth.mockResolvedValue(null)

    // POST /api/tokens/transfer を呼び出す
    const { POST } = await import('@/src/app/api/tokens/transfer/route')
    const request = new NextRequest('http://localhost/api/tokens/transfer', {
      method: 'POST',
      body: JSON.stringify({
        toUserId: GIVER.id,
        amount: TRANSFER_AMOUNT,
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    // 検証: 401が返ること
    expect(response.status).toBe(401)
    expect(body.error).toBe('UNAUTHORIZED')
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー7: トークン履歴APIで送受信履歴が取得できること
  // 要件7.5: UserのToken残高とToken_Transaction履歴を確認できる
  // ─────────────────────────────────────────────────────────────────────────
  it('Step7: トークン履歴APIで送受信履歴と残高が取得できる', async () => {
    const { prisma } = await import('@/src/lib/prisma')
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // ReceiverのセッションをモックするS
    auth.mockResolvedValue({
      user: { id: RECEIVER.id, email: RECEIVER.email, name: RECEIVER.name },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    } satisfies Session)

    // ユーザー情報（残高）のモックデータ
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: RECEIVER.id,
      email: RECEIVER.email,
      name: RECEIVER.name,
      image: null,
      walletAddress: null,
      createdAt: new Date(),
      tokenBalance: RECEIVER_INITIAL_BALANCE - TRANSFER_AMOUNT, // 送付後の残高
    })

    // TokenTransaction履歴のモックデータ
    const mockTransactions = [
      {
        id: TOKEN_TRANSACTION_ID,
        fromUserId: RECEIVER.id,
        toUserId: GIVER.id,
        amount: TRANSFER_AMOUNT,
        note: 'トークン送付',
        createdAt: new Date(),
        fromUser: { id: RECEIVER.id, name: RECEIVER.name, image: null },
        toUser: { id: GIVER.id, name: GIVER.name, image: null },
      },
    ]

    vi.mocked(prisma.tokenTransaction.findMany).mockResolvedValue(
      mockTransactions as Parameters<typeof vi.mocked<typeof prisma.tokenTransaction.findMany>>[0] extends { where?: unknown } ? never : never
    )

    // GET /api/tokens/history を呼び出す
    const { GET } = await import('@/src/app/api/tokens/history/route')
    const response = await GET()
    const body = await response.json()

    // 検証: 200が返ること
    expect(response.status).toBe(200)
    // 検証: 残高が含まれること（要件7.5）
    expect(body.balance).toBe(RECEIVER_INITIAL_BALANCE - TRANSFER_AMOUNT)
    // 検証: 取引履歴が含まれること（要件7.5）
    expect(body.transactions).toHaveLength(1)
    // 検証: 取引履歴に送付元・受取先・送付額・日時が含まれること（要件7.3）
    const tx = body.transactions[0]
    expect(tx.fromUserId).toBe(RECEIVER.id)
    expect(tx.toUserId).toBe(GIVER.id)
    expect(tx.amount).toBe(TRANSFER_AMOUNT)
    expect(tx.createdAt).toBeDefined()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // フロー8: 未認証ユーザーがトークン履歴APIにアクセスすると401が返ること
  // 要件8.4: 認証ガード
  // ─────────────────────────────────────────────────────────────────────────
  it('Step8: 未認証ユーザーがトークン履歴APIにアクセスすると401が返る', async () => {
    const { auth } = await import('../../auth') as unknown as { auth: MockedAuth }

    // 未認証状態をモックする
    auth.mockResolvedValue(null)

    // GET /api/tokens/history を呼び出す
    const { GET } = await import('@/src/app/api/tokens/history/route')
    const response = await GET()
    const body = await response.json()

    // 検証: 401が返ること
    expect(response.status).toBe(401)
    expect(body.error).toBe('UNAUTHORIZED')
  })
})
