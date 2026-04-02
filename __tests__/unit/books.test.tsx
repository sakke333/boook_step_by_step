// 本の出品・一覧・検索機能のユニットテスト
// 要件2.1, 3.4 に対応

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// next/link をモック化してシンプルなaタグとして扱う
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// next/navigation の useRouter と usePathname をモック化する
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  usePathname: vi.fn(() => '/books'),
}))

// RegisterPage コンポーネントをインポートする
import RegisterPage from '../../src/app/(app)/register/page'
// BooksPage コンポーネントをインポートする
import BooksPage from '../../src/app/(app)/books/page'

// ============================================================
// 要件2.1: 登録フォームの必須フィールド存在確認
// ============================================================

describe('RegisterPage コンポーネント', () => {
  describe('要件2.1: 登録フォームの必須フィールド存在確認', () => {
    // タイトル入力フィールドが存在すること
    it('タイトル入力フィールドが存在すること（id="title"）', () => {
      render(<RegisterPage />)
      // id="title" の input 要素を取得する
      const titleInput = document.getElementById('title')
      expect(titleInput).not.toBeNull()
    })

    // 著者名入力フィールドが存在すること
    it('著者名入力フィールドが存在すること（id="author"）', () => {
      render(<RegisterPage />)
      const authorInput = document.getElementById('author')
      expect(authorInput).not.toBeNull()
    })

    // ISBN入力フィールドが存在すること
    it('ISBN入力フィールドが存在すること（id="isbn"）', () => {
      render(<RegisterPage />)
      const isbnInput = document.getElementById('isbn')
      expect(isbnInput).not.toBeNull()
    })

    // 状態選択フィールドが存在すること
    it('状態選択フィールドが存在すること（id="condition"）', () => {
      render(<RegisterPage />)
      const conditionSelect = document.getElementById('condition')
      expect(conditionSelect).not.toBeNull()
    })

    // 受け渡し希望場所入力フィールドが存在すること
    it('受け渡し希望場所入力フィールドが存在すること（id="location"）', () => {
      render(<RegisterPage />)
      const locationInput = document.getElementById('location')
      expect(locationInput).not.toBeNull()
    })

    // 受け渡し可能時間入力フィールドが存在すること
    it('受け渡し可能時間入力フィールドが存在すること（id="availableTime"）', () => {
      render(<RegisterPage />)
      const availableTimeInput = document.getElementById('availableTime')
      expect(availableTimeInput).not.toBeNull()
    })

    // 説明文テキストエリアが存在すること
    it('説明文テキストエリアが存在すること（id="description"）', () => {
      render(<RegisterPage />)
      const descriptionTextarea = document.getElementById('description')
      expect(descriptionTextarea).not.toBeNull()
    })

    // 送信ボタンが存在すること
    it('送信ボタンが存在すること', () => {
      render(<RegisterPage />)
      // type="submit" のボタンを取得する
      const submitButton = screen.getByRole('button', { name: /登録する/ })
      expect(submitButton).toBeDefined()
    })
  })
})

// ============================================================
// 要件3.4: Book_Listing詳細画面への遷移
// ============================================================

describe('BooksPage コンポーネント', () => {
  // 各テスト前にfetchモックをリセットする
  beforeEach(() => {
    // fetchをモック化して本の一覧データを返す
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 'book-1',
          title: '線形代数学入門',
          author: '山田太郎',
          isbn: null,
          condition: '良好',
          location: '図書館前',
          availableTime: null,
          status: 'AVAILABLE',
          giver: { id: 'user-1', name: 'テストユーザー', image: null },
        },
      ],
    })
  })

  describe('要件3.4: 各カードが /books/:id へのリンクを持つこと', () => {
    // 本の一覧が表示されたとき、各カードが /books/:id へのリンクを持つこと
    it('本の一覧が表示されたとき、各カードが /books/:id へのリンクを持つこと', async () => {
      render(<BooksPage />)

      // 非同期データ取得後にリンクが表示されるまで待機する
      const link = await screen.findByRole('link', { name: /線形代数学入門/ })

      // リンクのhref属性が /books/book-1 であることを確認する
      expect(link).toHaveAttribute('href', '/books/book-1')
    })

    // 本のタイトルがリンクとして表示されること
    it('本のタイトルがリンクとして表示されること', async () => {
      render(<BooksPage />)

      // 非同期データ取得後にタイトルが表示されるまで待機する
      await waitFor(() => {
        expect(screen.getByText('線形代数学入門')).toBeDefined()
      })

      // タイトルを含むリンク要素が存在することを確認する
      const link = screen.getByRole('link', { name: /線形代数学入門/ })
      expect(link).toBeDefined()
    })
  })
})
