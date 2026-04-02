// トークン送付API
// POST /api/tokens/transfer - トークン送付（残高チェック・トランザクション処理）

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors, createErrorResponse, ErrorCode } from "@/lib/errors";

// Prisma 7: トランザクションクライアントの型をインスタンスから取得
type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

/**
 * POST /api/tokens/transfer
 * トークン送付
 * 要件7.2: トークン送付時に送付元残高を減算し受取先残高を加算する
 * 要件7.3: Token_Transaction として送付元・受取先・送付額・日時を保存する
 * 要件7.4: 残高不足時は送付を拒否し422 INSUFFICIENT_BALANCE を返す
 */
export async function POST(request: NextRequest) {
  // 1. 認証チェック
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  // 2. リクエストボディを取得
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Errors.validationError("リクエストボディが不正です");
  }

  const data = body as Record<string, unknown>;
  const toUserId = typeof data.toUserId === "string" ? data.toUserId.trim() : "";
  const amount = data.amount;

  // 3. バリデーション
  if (!toUserId) {
    return Errors.validationError("toUserIdは必須です");
  }

  if (
    typeof amount !== "number" ||
    !Number.isInteger(amount) ||
    amount < 1
  ) {
    return Errors.validationError("amountは1以上の整数である必要があります");
  }

  // 4. 自分自身への送付は拒否（422 VALIDATION_ERROR）
  if (toUserId === session.user.id) {
    return Errors.validationError("自分自身にトークンを送付することはできません");
  }

  // 5. 送付先ユーザーの存在確認（404）
  const toUser = await prisma.user.findUnique({
    where: { id: toUserId },
  });

  if (!toUser) {
    return Errors.notFound("送付先ユーザー");
  }

  // 6. 送付元の残高チェック（要件7.4）
  const fromUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tokenBalance: true },
  });

  if (!fromUser || fromUser.tokenBalance < amount) {
    return createErrorResponse(
      422,
      ErrorCode.INSUFFICIENT_BALANCE,
      "トークン残高が不足しています"
    );
  }

  // 7. Prismaトランザクションで同時実行（要件7.2, 7.3）
  const transaction = await prisma.$transaction(async (tx: TransactionClient) => {
    // 送付元の tokenBalance を減算
    await tx.user.update({
      where: { id: session.user.id },
      data: { tokenBalance: { decrement: amount } },
    });

    // 受取先の tokenBalance を加算
    await tx.user.update({
      where: { id: toUserId },
      data: { tokenBalance: { increment: amount } },
    });

    // TokenTransaction レコードを作成
    const newTransaction = await tx.tokenTransaction.create({
      data: {
        fromUserId: session.user.id,
        toUserId,
        amount,
        note: "トークン送付",
      },
      include: {
        fromUser: { select: { id: true, name: true, image: true } },
        toUser: { select: { id: true, name: true, image: true } },
      },
    });

    return newTransaction;
  });

  // 8. 201で作成した TokenTransaction を返す
  return NextResponse.json(transaction, { status: 201 });
}
