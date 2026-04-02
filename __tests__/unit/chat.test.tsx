// チャット・受け渡し完了機能のユニットテスト
// 要件6.2, 6.3 に対応

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// next/navigation をモック化する
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: mockPush })),
  usePathname: vi.fn(() => '/chat/test-reservation-id'),
}))

// next/link をモック化する
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// next-auth/react をモック化する（セッション情報を制御するため）
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: {
      user: { id: 'receiver-user-id', name: 'テスト受取人', email: 'receiver@example.com' },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    },
    status: 'authenticated',
  })),
}))

// Supabaseをモック化する（リアルタイム通信を回避）
vi.mock('@/lib/supabase', () => ({
  supabase: null,
}))

// ChatPageコンポーネントをインポートする
import ChatPage from '../../src/app/(app)/chat/[reservationId]/page'

// ============================================================
// テスト用のfetchモックヘルパー
// ============================================================

/**
 * 予約情報（Receiver視点）とメッセージ一覧のfetchモックを設定する
 */
function setupFetchMocks({
  reservationStatus = 'ACTIVE',
  receiverId = 'receiver-user-id',
}: {
  reservationStatus?: string
  receiverId?: string
} = {}) {
  global.fetch = vi.fn().mockImplementation((url: string) => {
    // 予約情報取得
    if (url.includes('/api/reservations/')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          id: 'test-reservation-id',
          status: reservationStatus,
          receiverId,
          bookListing: {
            id: 'test-book-id',
            title: 'テスト教科書',
            giverId: 'giver-user-id',
            status: reservationStatus === 'COMPLETED' ? 'COMPLETED' : 'RESERVED',
          },
        }),
      })
    }
    // メッセージ一覧取得
    if (url.includes('/api/messages')) {
      return Promise.resolve({
        ok: true,
        json: async () => [],
      })
    }
    return Promise.resolve({ ok: true, json: async () => ({}) })
  })
}

// ============================================================
// 要件6.2: 受け渡し完了後のトークン送付促進UI表示
// ============================================================

describe('受け渡し完了後のトークン送付促進UI（要件6.2）', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPush.mockClear()
  })

  it('完了後にトークン送付促進メッセージが表示されること', async () => {
    // 予約情報取得とメッセージ取得のモックを設定する
    setupFetchMocks()

    // 完了APIのモックを追加する
    global.fetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      // 完了API
      if (url.includes('/complete') && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: async () => ({ success: true }) })
      }
      // 予約情報取得
      if (url.includes('/api/reservations/')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id: 'test-reservation-id',
            status: 'ACTIVE',
            receiverId: 'receiver-user-id',
            bookListing: {
              id: 'test-book-id',
              title: 'テスト教科書',
              giverId: 'giver-user-id',
              status: 'RESERVED',
            },
          }),
        })
      }
      // メッセージ一覧取得
      return Promise.resolve({ ok: true, json: async () => [] })
    })

    render(<ChatPage params={{ reservationId: 'test-reservation-id' }} />)

    // 受け渡し完了ボタンが表示されるまで待機する
    const completeButton = await screen.findByRole('button', { name: '受け渡し完了' })
    expect(completeButton).toBeDefined()

    // 受け渡し完了ボタンをクリックする
    fireEvent.click(completeButton)

    // トークン送付促進メッセージが表示されること（要件6.2）
    await waitFor(() => {
      expect(screen.getByText(/Giverにトークンを送りましょう/)).toBeDefined()
    })
  })

  it('完了後にトークン送付画面（/tokens）への遷移ボタンが表示されること', async () => {
    setupFetchMocks()

    global.fetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      if (url.includes('/complete') && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: async () => ({ success: true }) })
      }
      if (url.includes('/api/reservations/')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id: 'test-reservation-id',
            status: 'ACTIVE',
            receiverId: 'receiver-user-id',
            bookListing: {
              id: 'test-book-id',
              title: 'テスト教科書',
              giverId: 'giver-user-id',
              status: 'RESERVED',
            },
          }),
        })
      }
      return Promise.resolve({ ok: true, json: async () => [] })
    })

    render(<ChatPage params={{ reservationId: 'test-reservation-id' }} />)

    // 受け渡し完了ボタンをクリックする
    const completeButton = await screen.findByRole('button', { name: '受け渡し完了' })
    fireEvent.click(completeButton)

    // トークン送付画面への遷移ボタンが表示されること（要件6.2）
    await waitFor(() => {
      const tokenLink = screen.getByRole('link', { name: 'トークンを送る' })
      expect(tokenLink).toBeDefined()
      expect(tokenLink.getAttribute('href')).toBe('/tokens')
    })
  })

  it('すでにCOMPLETEDな予約の場合、初期表示からトークン送付促進UIが表示されること', async () => {
    // COMPLETEDステータスの予約情報を返すモックを設定する
    setupFetchMocks({ reservationStatus: 'COMPLETED' })

    render(<ChatPage params={{ reservationId: 'test-reservation-id' }} />)

    // トークン送付促進UIが表示されること
    await waitFor(() => {
      expect(screen.getByRole('region', { name: '受け渡し完了' })).toBeDefined()
    })
  })
})

// ============================================================
// 要件6.3: トークン送付なしでの完了フロー終了（スキップ）
// ============================================================

describe('トークン送付なしでの完了フロー終了（要件6.3）', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPush.mockClear()
  })

  it('スキップボタンが存在すること', async () => {
    setupFetchMocks()

    global.fetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      if (url.includes('/complete') && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: async () => ({ success: true }) })
      }
      if (url.includes('/api/reservations/')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id: 'test-reservation-id',
            status: 'ACTIVE',
            receiverId: 'receiver-user-id',
            bookListing: {
              id: 'test-book-id',
              title: 'テスト教科書',
              giverId: 'giver-user-id',
              status: 'RESERVED',
            },
          }),
        })
      }
      return Promise.resolve({ ok: true, json: async () => [] })
    })

    render(<ChatPage params={{ reservationId: 'test-reservation-id' }} />)

    // 受け渡し完了ボタンをクリックして完了状態にする
    const completeButton = await screen.findByRole('button', { name: '受け渡し完了' })
    fireEvent.click(completeButton)

    // スキップボタンが表示されること（要件6.3）
    await waitFor(() => {
      const skipButton = screen.getByRole('button', { name: 'スキップして終了' })
      expect(skipButton).toBeDefined()
    })
  })

  it('スキップボタン押下後に /books へ遷移すること', async () => {
    setupFetchMocks()

    global.fetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      if (url.includes('/complete') && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: async () => ({ success: true }) })
      }
      if (url.includes('/api/reservations/')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id: 'test-reservation-id',
            status: 'ACTIVE',
            receiverId: 'receiver-user-id',
            bookListing: {
              id: 'test-book-id',
              title: 'テスト教科書',
              giverId: 'giver-user-id',
              status: 'RESERVED',
            },
          }),
        })
      }
      return Promise.resolve({ ok: true, json: async () => [] })
    })

    render(<ChatPage params={{ reservationId: 'test-reservation-id' }} />)

    // 受け渡し完了ボタンをクリックして完了状態にする
    const completeButton = await screen.findByRole('button', { name: '受け渡し完了' })
    fireEvent.click(completeButton)

    // スキップボタンが表示されるまで待機する
    const skipButton = await screen.findByRole('button', { name: 'スキップして終了' })

    // スキップボタンをクリックする（要件6.3）
    fireEvent.click(skipButton)

    // /books へ遷移すること（要件6.3）
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/books')
    })
  })
})
