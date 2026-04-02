import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // テスト環境の設定
    environment: 'jsdom',
    
    // グローバル設定
    globals: true,
    
    // セットアップファイル
    setupFiles: ['./vitest.setup.ts'],
    
    // カバレッジ設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'vitest.config.ts',
        'vitest.setup.ts',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/types/**',
      ],
    },
    
    // タイムアウト設定
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: [
      // @/src/* → ./src/* （既存プロパティテストの @/src/lib/prisma 等に対応）
      { find: /^@\/src\/(.*)$/, replacement: path.resolve(__dirname, './src/$1') },
      // @/auth → ./auth （プロジェクトルートのauth.tsに対応）
      { find: '@/auth', replacement: path.resolve(__dirname, './auth') },
      // @/* → ./src/* （tsconfig.jsonの @/*: ./src/* に合わせる）
      { find: /^@\/(.*)$/, replacement: path.resolve(__dirname, './src/$1') },
    ],
  },
})
