// トークン履歴取得API
// GET /api/tokens/history - 現在のユーザーのトークン取引履歴と残高を返す

import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";

/**
 * GET /api/tokens/history
 * トークン取引履歴取得
 * 要件7.5: ユーザーのトークン送付・受取履歴を一覧表示する
 */
export async function GET() {
  // 1. 認証チェック
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  const userId = session.user.id;

  // 2. 現在のユーザー情報（tokenBalance）を取得
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tokenBalance: true },
  });

  if (!user) {
    return Errors.notFound("ユーザー");
  }

  // 3. TokenTransaction 一覧を取得（送付・受取両方）
  //    fromUserId または toUserId が自分のものを取得
  //    createdAt 降順でソート
  const transactions = await prisma.tokenTransaction.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId },
      ],
    },
    orderBy: { createdAt: "desc" },
    include: {
      fromUser: { select: { id: true, name: true, image: true } },
      toUser: { select: { id: true, name: true, image: true } },
    },
  });

  // 4. レスポンス: { balance, transactions }
  return NextResponse.json({
    balance: user.tokenBalance,
    transactions,
  });
}
