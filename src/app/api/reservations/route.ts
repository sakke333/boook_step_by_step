// 予約作成API
// POST /api/reservations - 予約作成（AVAILABLE確認・Reservationレコード作成・BookListingステータスをRESERVEDに更新）
// 設計書: Reservationレコード自体がChatルームを兼ねる設計（要件5.1）

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";
import { supabase } from "@/lib/supabase";

// Prisma 7: トランザクションクライアントの型をインスタンスから取得
type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

/**
 * POST /api/reservations
 * 予約作成
 * 要件4.1: ReceiverがAVAILABLEなBook_Listingに予約ボタンを押したとき、
 *          Reservationレコードを作成しBook_ListingのステータスをRESERVEDに変更する
 * 要件4.3: RESERVEDのとき、他のUserが同じBook_Listingを予約できないようにする（409 ALREADY_RESERVED）
 * 要件5.1: Reservationが作成されたとき、GiverとReceiverの間にChatルームを自動生成する
 *          （Reservationレコード自体がChatルームを兼ねる設計）
 */
export async function POST(request: NextRequest) {
  // 1. 認証チェック
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  // 2. リクエストボディから bookListingId を取得
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Errors.validationError("リクエストボディが不正です");
  }

  const data = body as Record<string, unknown>;
  const bookListingId = typeof data.bookListingId === "string" ? data.bookListingId.trim() : "";

  if (!bookListingId) {
    return Errors.validationError("bookListingIdは必須です");
  }

  // 3. BookListingを取得（404チェック）
  const bookListing = await prisma.bookListing.findUnique({
    where: { id: bookListingId },
  });

  if (!bookListing) {
    return Errors.notFound("本");
  }

  // 4. ステータスがAVAILABLEでない場合は409 ALREADY_RESERVED（要件4.3）
  if (bookListing.status !== "AVAILABLE") {
    return Errors.alreadyReserved();
  }

  // 5. Prismaトランザクションで:
  //    - Reservationレコード作成（Chatルームを兼ねる）
  //    - BookListing.status = RESERVED を同時実行
  const reservation = await prisma.$transaction(async (tx: TransactionClient) => {
    // Reservationレコードを作成（要件4.1, 5.1）
    const newReservation = await tx.reservation.create({
      data: {
        bookListingId,
        receiverId: session.user.id,
        status: "ACTIVE",
      },
      include: {
        bookListing: {
          include: {
            giver: { select: { id: true, name: true, image: true } },
          },
        },
        receiver: { select: { id: true, name: true, image: true } },
      },
    });

    // BookListingのステータスをRESERVEDに更新（要件4.1）
    await tx.bookListing.update({
      where: { id: bookListingId },
      data: { status: "RESERVED" },
    });

    return newReservation;
  });

  // 6. Supabase Realtimeで通知を発行する（要件4.2）
  // notification チャンネルにGiver向け通知イベントを送信する
  // 通知の失敗はAPIレスポンスに影響させない
  try {
    if (supabase) {
      await supabase.channel(`notification`).send({
        type: "broadcast",
        event: "notification",
        payload: {
          type: "RESERVATION_CREATED",
          reservationId: reservation.id,
          bookListingId: reservation.bookListingId,
          receiverName: reservation.receiver.name,
          bookTitle: reservation.bookListing.title,
          targetUserId: reservation.bookListing.giverId, // Giver向け
        },
      });
    }
  } catch {
    // 通知の失敗はログに記録するが、APIレスポンスには影響させない
    console.warn("Supabase Realtime通知の送信に失敗しました");
  }

  // 7. 201で作成したReservationを返す
  return NextResponse.json(reservation, { status: 201 });
}

/**
 * GET /api/reservations
 * - role=giver: 自分がGiverの本に対するACTIVEな予約一覧（受け取り待ち）
 * - role=receiver（デフォルト）: 自分がReceiverとして持つACTIVEな予約一覧
 */
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  if (role === "giver") {
    // 自分がGiverの本に対するACTIVEな予約一覧
    const reservations = await prisma.reservation.findMany({
      where: {
        status: "ACTIVE",
        bookListing: { giverId: session.user.id },
      },
      include: {
        bookListing: {
          include: {
            giver: { select: { id: true, name: true, image: true } },
          },
        },
        receiver: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations);
  }

  // デフォルト: 自分がReceiverとして持つACTIVEな予約一覧
  const reservations = await prisma.reservation.findMany({
    where: {
      receiverId: session.user.id,
      status: "ACTIVE",
    },
    include: {
      bookListing: {
        include: {
          giver: { select: { id: true, name: true, image: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reservations);
}
