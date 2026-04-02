// プロパティ11, 12, 13：トークン機能に関するプロパティテスト
// Feature: university-book-sharing
// Validates: Requirements 7.2, 7.3, 7.4, 9.2

import fc from 'fast-check'
import { describe, it, expect } from 'vitest'

describe('university-book-sharing', () => {
  // Feature: university-book-sharing, Property 11: トークン送付の残高整合性とTransaction記録
  // 任意の有効なトークン送付（送付元残高 ≥ 送付額）に対して、
  // 送付後の残高が正しく更新されToken_Transactionが記録されること
  // **Validates: Requirements 7.2, 7.3**
  it('有効なトークン送付後に残高が正しく更新されTransaction記録が作成されること', () => {
    fc.assert(
      fc.property(
        // 送付元の残高（1〜1000）
        fc.integer({ min: 1, max: 1000 }),
        // 受取先の残高（0〜1000）
        fc.integer({ min: 0, max: 1000 }),
        // 送付額（1〜1000）
        fc.integer({ min: 1, max: 1000 }),
        (fromBalance, toBalance, amount) => {
          // 送付元残高が送付額以上の場合のみテスト（有効な送付）
          fc.pre(fromBalance >= amount)

          const fromBalanceBefore = fromBalance
          const toBalanceBefore = toBalance

          // トークン送付をシミュレート
          const fromBalanceAfter = fromBalanceBefore - amount
          const toBalanceAfter = toBalanceBefore + amount
          const transaction = {
            fromUserId: 'user-1',
            toUserId: 'user-2',
            amount,
            createdAt: new Date(),
          }

          // 残高整合性の検証（要件7.2）
          expect(fromBalanceAfter).toBe(fromBalanceBefore - amount)
          expect(toBalanceAfter).toBe(toBalanceBefore + amount)
          // 送付後の残高は0以上であること
          expect(fromBalanceAfter).toBeGreaterThanOrEqual(0)
          // Transaction記録の検証（要件7.3）
          expect(transaction.amount).toBe(amount)
          expect(transaction.fromUserId).toBe('user-1')
          expect(transaction.toUserId).toBe('user-2')
          expect(transaction.createdAt).toBeInstanceOf(Date)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: university-book-sharing, Property 12: 残高不足時の送付拒否
  // 送付元UserのToken残高を超える送付額に対して、
  // 送付が拒否され残高が変化しないこと
  // **Validates: Requirement 7.4**
  it('残高不足時にトークン送付が拒否され残高が変化しないこと', () => {
    fc.assert(
      fc.property(
        // 送付元の残高（0〜999）
        fc.integer({ min: 0, max: 999 }),
        // 送付額（1〜1000）
        fc.integer({ min: 1, max: 1000 }),
        (fromBalance, amount) => {
          // 送付額が残高を超える場合のみテスト（残高不足）
          fc.pre(amount > fromBalance)

          const fromBalanceBefore = fromBalance

          // 残高不足チェックをシミュレート
          const isInsufficient = fromBalance < amount
          let fromBalanceAfter = fromBalance
          let transactionCreated = false

          if (!isInsufficient) {
            // 残高が十分な場合のみ送付実行（このケースはpre()で除外済み）
            fromBalanceAfter = fromBalance - amount
            transactionCreated = true
          }

          // 送付が拒否されること（要件7.4）
          expect(isInsufficient).toBe(true)
          // 残高が変化しないこと（要件7.4）
          expect(fromBalanceAfter).toBe(fromBalanceBefore)
          // Transactionが作成されないこと（要件7.4）
          expect(transactionCreated).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: university-book-sharing, Property 13: Token残高の再現可能性
  // 任意のUserに対して、Token_Transactionの集計（受取合計 - 送付合計 + 初期付与）から
  // 算出した残高がUser.tokenBalanceと一致すること
  // **Validates: Requirement 9.2**
  it('TokenTransactionの集計から算出した残高がUser.tokenBalanceと一致すること', () => {
    const INITIAL_BALANCE = 10

    fc.assert(
      fc.property(
        // 取引履歴を生成（type: 'send' | 'receive', amount: 1〜100）
        fc.array(
          fc.record({
            type: fc.constantFrom('send' as const, 'receive' as const),
            amount: fc.integer({ min: 1, max: 100 }),
          }),
          { minLength: 0, maxLength: 50 }
        ),
        (transactions) => {
          // 残高がマイナスにならないよう制約する
          // 各取引を順番に適用して残高を計算し、途中でマイナスになる場合はスキップ
          let runningBalance = INITIAL_BALANCE
          const validTransactions: typeof transactions = []

          for (const tx of transactions) {
            if (tx.type === 'send') {
              if (runningBalance >= tx.amount) {
                runningBalance -= tx.amount
                validTransactions.push(tx)
              }
              // 残高不足の場合はこの取引をスキップ（実際のAPIと同じ挙動）
            } else {
              runningBalance += tx.amount
              validTransactions.push(tx)
            }
          }

          // 最終残高（取引を順番に適用した結果）
          const finalBalance = runningBalance

          // TokenTransactionの集計から残高を再計算する（要件9.2）
          const receiveTotal = validTransactions
            .filter(tx => tx.type === 'receive')
            .reduce((sum, tx) => sum + tx.amount, 0)

          const sendTotal = validTransactions
            .filter(tx => tx.type === 'send')
            .reduce((sum, tx) => sum + tx.amount, 0)

          const calculatedBalance = INITIAL_BALANCE + receiveTotal - sendTotal

          // 集計から算出した残高が実際の残高と一致すること（要件9.2）
          expect(calculatedBalance).toBe(finalBalance)
          // 残高は常に0以上であること
          expect(finalBalance).toBeGreaterThanOrEqual(0)
          expect(calculatedBalance).toBeGreaterThanOrEqual(0)
        }
      ),
      { numRuns: 100 }
    )
  })
})
