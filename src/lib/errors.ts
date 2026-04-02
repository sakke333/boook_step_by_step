// 統一エラーレスポンス形式の定義
// 設計書のエラーハンドリング仕様に準拠する

import { NextResponse } from "next/server";

/**
 * APIエラーレスポンスの型定義
 * すべてのAPIエラーはこの形式で返す
 */
export interface ApiError {
  error: string;   // エラーコード（例: "INSUFFICIENT_BALANCE"）
  message: string; // ユーザー向けメッセージ（日本語）
}

/**
 * エラーコード定数
 */
export const ErrorCode = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  ALREADY_RESERVED: "ALREADY_RESERVED",
  HAS_ACTIVE_RESERVATION: "HAS_ACTIVE_RESERVATION",
  LISTING_COMPLETED: "LISTING_COMPLETED",
  INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
} as const;

export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode];

/**
 * 統一エラーレスポンスを生成するヘルパー関数
 * @param status HTTPステータスコード
 * @param error エラーコード
 * @param message ユーザー向けメッセージ（日本語）
 */
export function createErrorResponse(
  status: number,
  error: ErrorCodeType,
  message: string
): NextResponse<ApiError> {
  return NextResponse.json({ error, message }, { status });
}

/**
 * よく使うエラーレスポンスのショートカット
 */
export const Errors = {
  unauthorized: () =>
    createErrorResponse(401, ErrorCode.UNAUTHORIZED, "認証が必要です"),

  forbidden: () =>
    createErrorResponse(403, ErrorCode.FORBIDDEN, "この操作を行う権限がありません"),

  notFound: (resource = "リソース") =>
    createErrorResponse(404, ErrorCode.NOT_FOUND, `${resource}が見つかりません`),

  validationError: (message: string) =>
    createErrorResponse(422, ErrorCode.VALIDATION_ERROR, message),

  hasActiveReservation: () =>
    createErrorResponse(
      409,
      ErrorCode.HAS_ACTIVE_RESERVATION,
      "有効な予約があるため削除できません"
    ),

  listingCompleted: () =>
    createErrorResponse(
      409,
      ErrorCode.LISTING_COMPLETED,
      "受け渡し完了済みの本は削除できません"
    ),

  // 要件4.3: RESERVEDな本への重複予約を拒否する
  alreadyReserved: () =>
    createErrorResponse(
      409,
      ErrorCode.ALREADY_RESERVED,
      "この本はすでに予約済みです"
    ),
};
