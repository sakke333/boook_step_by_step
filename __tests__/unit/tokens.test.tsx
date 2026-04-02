// トークン機能のユニットテスト
// 要件7.1, 7.5 に対応

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// next-auth/react をモック化する（セッション情報を制御するため）
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: {
      user: { id: 'user-1', name: 'テストユーザー' },
    },
    status: 'authenticated',
  })),
}))

// TokensPage コンポーネントをインポートする
import TokensPage from '../../src/app/(app)/tokens/page'

// ============================================================
// テスト 12.6: QRコードとuser_id直接入力によるトークン送付先指定（要件7.1）
// ============================================================

describe('TokensPage - 送付フォーム（要件7.1）', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // fetchをモック化してローディングが完了するようにする
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ balance: 0, transactions: [] }),
    })
  })

  it('user_id直接入力フィールドが存在すること（id="toUserId"）', async () => {
    render(<TokensPage />)
    // ローディング完了まで待機する
    await waitFor(() => {
      expect(document.getElementById('toUserId')).not.toBeNull()
    })
    const input = document.getElementById('toUserId')
    expect(input).not.toBeNull()
  })

  it('送付額入力フィールドが存在すること（id="amount"）', async () => {
    render(<TokensPage />)
    await waitFor(() => {
      expect(document.getElementById('amount')).not.toBeNull()
    })
    const input = document.getElementById('amount')
    expect(input).not.toBeNull()
  })

  it('QRコード読み取りボタンが存在すること（準備中）', async () => {
    render(<TokensPage />)
    await waitFor(() => {
      expect(screen.getByText('QRコード読み取り（準備中）')).toBeDefined()
    })
    const button = screen.getByText('QRコード読み取り（準備中）')
    expect(button).toBeDefined()
  })

  it('送付ボタンが存在すること', async () => {
    render(<TokensPage />)
    await waitFor(() => {
      expect(screen.getByText('送付する')).toBeDefined()
    })
    const button = screen.getByText('送付する')
    expect(button).toBeDefined()
  })

  it('送付先ユーザーIDが空の場合にエラーが表示されること', async () => {
    render(<TokensPage />)
    // 送付ボタンが表示されるまで待機する
    const sendButton = await screen.findByText('送付する')
    // toUserId を空のまま送付ボタンをクリックする
    fireEvent.click(sendButton)
    // エラーメッセージが表示されることを確認する
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined()
    })
    const alert = screen.getByRole('alert')
    expect(alert.textContent).toContain('ユーザーID')
  })
})

// ============================================================
// テスト 12.7: トークン残高・履歴画面の表示（要件7.5）
// ============================================================

describe('TokensPage - 残高・履歴表示（要件7.5）', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('ローディング中にスピナーが表示されること', async () => {
    // fetchが解決しないPromiseを返してローディング状態を維持する
    global.fetch = vi.fn().mockReturnValue(new Promise(() => {}))
    render(<TokensPage />)
    // スピナー要素（animate-spin クラス）が存在することを確認する
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).not.toBeNull()
  })

  it('トークン残高が表示されること', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ balance: 42, transactions: [] }),
    })
    render(<TokensPage />)
    // 残高「42」が表示されるまで非同期待機する
    await screen.findByText('42')
    expect(screen.getByText('42')).toBeDefined()
  })

  it('取引履歴がない場合に「取引履歴はありません」が表示されること', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ balance: 10, transactions: [] }),
    })
    render(<TokensPage />)
    // 「取引履歴はありません」が表示されるまで待機する
    await screen.findByText('取引履歴はありません')
    expect(screen.getByText('取引履歴はありません')).toBeDefined()
  })

  it('取引履歴が表示されること（相手ユーザー名と受取バッジ）', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        balance: 15,
        transactions: [
          {
            id: 'tx-1',
            amount: 5,
            note: 'トークン送付',
            createdAt: '2024-01-01T12:00:00.000Z',
            fromUserId: 'user-2',
            fromUser: { id: 'user-2', name: '送付者', image: null },
            toUserId: 'user-1',
            toUser: { id: 'user-1', name: 'テストユーザー', image: null },
          },
        ],
      }),
    })
    render(<TokensPage />)
    // 相手ユーザー名「送付者」が表示されるまで待機する
    await screen.findByText('送付者')
    expect(screen.getByText('送付者')).toBeDefined()
    // 「受取」バッジが表示されることを確認する
    expect(screen.getByText('受取')).toBeDefined()
  })
})
