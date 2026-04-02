// 予約詳細取得・キャンセルAPI
// GET    /api/reservations/:id - 予約詳細取得
// DELETE /api/reservations/:id - 予約キャンセル（BookListingステータスをAVAILABLEに戻す）

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";

// Prisma 7: トランザクションクライアントの型をインスタンスから取得
type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

type RouteParams = { params: { id: string } };

/**
 * GET /api/reservations/:id
 * 予約詳細取得
 * チャット画面でReceiver判定に使用する
 */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  // 認証チェック
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: params.id },
    include: {
      bookListing: {
        select: {
          id: true,
          title: true,
          giverId: true,
          status: true,
        },
      },
    },
  });

  if (!reservation) {
    return Errors.notFound("予約");
  }

  // GiverまたはReceiverのみアクセス可能
  const isGiver = reservation.bookListing.giverId === session.user.id;
  const isReceiver = reservation.receiverId === session.user.id;
  if (!isGiver && !isReceiver) {
    return Errors.forbidden();
  }

  return NextResponse.json(reservation);
}

/**
 * DELETE /api/reservations/:id
 * 予約キャンセル
 * 要件4.4: ReceiverがReservationをキャンセルしたとき、
 *          Book_ListingのステータスをAVAILABLEに戻す
 */
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  // 1. 認証チェック
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  // 2. Reservationを取得（404チェック）
  const reservation = await prisma.reservation.findUnique({
    where: { id: params.id },
    include: {
      bookListing: true,
    },
  });

  if (!reservation) {
    return Errors.notFound("予約");
  }

  // 3. receiverIdが一致するか確認（403）
  if (reservation.receiverId !== session.user.id) {
    return Errors.forbidden();
  }

  // 4. Prismaトランザクションで:
  //    - Reservation.status = CANCELLED
  //    - BookListing.status = AVAILABLE を同時実行（要件4.4）
  await prisma.$transaction(async (tx: TransactionClient) => {
    // Reservationをキャンセル状態に更新
    await tx.reservation.update({
      where: { id: params.id },
      data: { status: "CANCELLED" },
    });

    // BookListingのステータスをAVAILABLEに戻す（要件4.4）
    await tx.bookListing.update({
      where: { id: reservation.bookListingId },
      data: { status: "AVAILABLE" },
    });
  });

  // 5. 204を返す
  return new NextResponse(null, { status: 204 });
}
