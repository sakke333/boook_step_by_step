// メッセージAPI
// GET /api/messages?reservationId= : メッセージ一覧取得
// POST /api/messages : メッセージ送信（送信者ID・日時の保存）
// 要件5.2, 5.3

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/messages?reservationId=
 * メッセージ一覧取得
 * 要件5.2: GiverとReceiverの双方がメッセージを送受信できる
 */
export async function GET(request: NextRequest) {
  // 1. 認証チェック
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  // 2. クエリパラメータからreservationIdを取得
  const { searchParams } = new URL(request.url);
  const reservationId = searchParams.get("reservationId");

  if (!reservationId) {
    return Errors.validationError("reservationIdは必須です");
  }

  // 3. Reservationを取得して権限チェック（GiverまたはReceiverのみアクセス可）
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: {
      bookListing: { select: { giverId: true } },
    },
  });

  if (!reservation) {
    return Errors.notFound("予約");
  }

  const userId = session.user.id;
  const isGiver = reservation.bookListing.giverId === userId;
  const isReceiver = reservation.receiverId === userId;

  if (!isGiver && !isReceiver) {
    return Errors.forbidden();
  }

  // 4. メッセージ一覧を取得（古い順）
  const messages = await prisma.message.findMany({
    where: { reservationId },
    include: {
      sender: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

/**
 * POST /api/messages
 * メッセージ送信
 * 要件5.2: GiverとReceiverの双方がメッセージを送受信できる
 * 要件5.3: 各メッセージに送信者のuser_idと送信日時を保存する
 * 要件5.4: 新しいメッセージが届いたとき、受信者にアプリ内通知を送信する
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
  const reservationId = typeof data.reservationId === "string" ? data.reservationId.trim() : "";
  const content = typeof data.content === "string" ? data.content.trim() : "";

  if (!reservationId) {
    return Errors.validationError("reservationIdは必須です");
  }
  if (!content) {
    return Errors.validationError("contentは必須です");
  }

  // 3. Reservationを取得して権限チェック（GiverまたはReceiverのみ送信可）
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: {
      bookListing: { select: { giverId: true, title: true } },
      receiver: { select: { id: true, name: true } },
    },
  });

  if (!reservation) {
    return Errors.notFound("予約");
  }

  const userId = session.user.id;
  const giverId = reservation.bookListing.giverId;
  const isGiver = giverId === userId;
  const isReceiver = reservation.receiverId === userId;

  if (!isGiver && !isReceiver) {
    return Errors.forbidden();
  }

  // 4. Messageレコードを作成（要件5.3: senderId・createdAtを保存）
  const message = await prisma.message.create({
    data: {
      content,
      reservationId,
      senderId: userId, // 要件5.3: 送信者のuser_idを保存
      // createdAt はPrismaのデフォルト（@default(now())）で自動設定される
    },
    include: {
      sender: { select: { id: true, name: true, image: true } },
    },
  });

  // 5. Supabase Realtimeでリアルタイム配信（要件5.2, 5.4）
  // 通知の失敗はAPIレスポンスに影響させない
  try {
    if (supabase) {
      // chat:{reservationId} チャンネルに new_message イベントを送信（要件5.2）
      await supabase.channel(`chat:${reservationId}`).send({
        type: "broadcast",
        event: "new_message",
        payload: {
          id: message.id,
          content: message.content,
          createdAt: message.createdAt,
          reservationId: message.reservationId,
          sender: message.sender,
        },
      });

      // 受信者へのアプリ内通知（要件5.4）
      // 送信者がGiverならReceiverへ、ReceiverならGiverへ通知
      const recipientId = isGiver ? reservation.receiverId : giverId;
      await supabase.channel(`notification`).send({
        type: "broadcast",
        event: "notification",
        payload: {
          type: "NEW_MESSAGE",
          reservationId,
          bookTitle: reservation.bookListing.title,
          senderName: message.sender.name,
          targetUserId: recipientId,
        },
      });
    }
  } catch {
    // 通知の失敗はログに記録するが、APIレスポンスには影響させない
    console.warn("Supabase Realtime通知の送信に失敗しました");
  }

  // 6. 201で作成したメッセージを返す
  return NextResponse.json(message, { status: 201 });
}
