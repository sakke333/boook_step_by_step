// タブバーコンポーネントのユニットテスト
// 要件8.1: タブバーの存在確認
// 要件8.2: 3タブの確認
// 要件8.3: タブ選択時の画面遷移

import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TabBar from '../../src/components/TabBar'

// next/navigationのモック（usePathnameを制御する）
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/books'),
}))

// next/linkをシンプルなaタグとして扱うモック
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// usePathnameのモック参照を取得するためにインポート
import { usePathname } from 'next/navigation'

describe('TabBar コンポーネント', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセットする
    vi.mocked(usePathname).mockReturnValue('/books')
  })

  // 要件8.1: タブバーの存在確認
  describe('要件8.1: タブバーの存在確認', () => {
    it('nav要素が存在すること', () => {
      render(<TabBar />)
      const nav = document.querySelector('nav')
      expect(nav).not.toBeNull()
    })

    it('aria-label="メインナビゲーション" が設定されていること', () => {
      render(<TabBar />)
      const nav = screen.getByRole('navigation', { name: 'メインナビゲーション' })
      expect(nav).toBeDefined()
    })
  })

  // 要件8.2: 3タブの確認
  describe('要件8.2: 3タブの確認', () => {
    it('「本の一覧」タブが存在すること', () => {
      render(<TabBar />)
      expect(screen.getByText('本の一覧')).toBeDefined()
    })

    it('「本を登録」タブが存在すること', () => {
      render(<TabBar />)
      expect(screen.getByText('本を登録')).toBeDefined()
    })

    it('「トークン」タブが存在すること', () => {
      render(<TabBar />)
      expect(screen.getByText('トークン')).toBeDefined()
    })

    it('タブが合計3つであること', () => {
      render(<TabBar />)
      // li要素（タブ）の数を確認する
      const listItems = document.querySelectorAll('nav ul li')
      expect(listItems).toHaveLength(3)
    })
  })

  // 要件8.3: タブ選択時の画面遷移
  describe('要件8.3: タブ選択時の画面遷移', () => {
    it('「本の一覧」タブのリンク先が /books であること', () => {
      render(<TabBar />)
      const link = screen.getByText('本の一覧').closest('a')
      expect(link?.getAttribute('href')).toBe('/books')
    })

    it('「本を登録」タブのリンク先が /register であること', () => {
      render(<TabBar />)
      const link = screen.getByText('本を登録').closest('a')
      expect(link?.getAttribute('href')).toBe('/register')
    })

    it('「トークン」タブのリンク先が /tokens であること', () => {
      render(<TabBar />)
      const link = screen.getByText('トークン').closest('a')
      expect(link?.getAttribute('href')).toBe('/tokens')
    })

    it('現在のパスが /books の場合、「本の一覧」タブがアクティブ（aria-current="page"）であること', () => {
      vi.mocked(usePathname).mockReturnValue('/books')
      render(<TabBar />)
      const link = screen.getByText('本の一覧').closest('a')
      expect(link?.getAttribute('aria-current')).toBe('page')
    })

    it('現在のパスが /books の場合、「本を登録」タブはアクティブでないこと', () => {
      vi.mocked(usePathname).mockReturnValue('/books')
      render(<TabBar />)
      const link = screen.getByText('本を登録').closest('a')
      expect(link?.getAttribute('aria-current')).toBeNull()
    })

    it('現在のパスが /register の場合、「本を登録」タブがアクティブ（aria-current="page"）であること', () => {
      vi.mocked(usePathname).mockReturnValue('/register')
      render(<TabBar />)
      const link = screen.getByText('本を登録').closest('a')
      expect(link?.getAttribute('aria-current')).toBe('page')
    })

    it('現在のパスが /register の場合、「本の一覧」タブはアクティブでないこと', () => {
      vi.mocked(usePathname).mockReturnValue('/register')
      render(<TabBar />)
      const link = screen.getByText('本の一覧').closest('a')
      expect(link?.getAttribute('aria-current')).toBeNull()
    })
  })
})
