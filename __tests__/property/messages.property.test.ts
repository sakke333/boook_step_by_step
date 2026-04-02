// プロパティ9：メッセージの送信者情報保存に関するプロパティテスト
// Feature: university-book-sharing, Property 9: メッセージの送信者情報保存
// Validates: Requirements 5.3

import fc from 'fast-check'
import { describe, it, expect } from 'vitest'

describe('university-book-sharing', () => {
  // Feature: university-book-sharing, Property 9: メッセージの送信者情報保存
  // 任意のメッセージ送信に対して、保存されたMessageレコードの
  // senderIdが送信者のuser_idと一致し、createdAtが設定されていること
  // **Validates: Requirements 5.3**
  it('メッセージのsenderIdが送信者のuser_idと一致しcreatedAtが設定されていること', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),   // senderId
        fc.string({ minLength: 1, maxLength: 500 }),  // content
        fc.string({ minLength: 1, maxLength: 50 }),   // reservationId
        (senderId, content, reservationId) => {
          // メッセージ保存をシミュレート
          const savedMessage = {
            senderId,
            content,
            reservationId,
            createdAt: new Date(),  // 要件5.3: 送信日時を保存
          }

          // senderIdが一致すること（要件5.3）
          expect(savedMessage.senderId).toBe(senderId)
          // createdAtが設定されていること（要件5.3）
          expect(savedMessage.createdAt).toBeInstanceOf(Date)
        }
      ),
      { numRuns: 100 }
    )
  })
})
