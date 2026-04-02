// 受け渡し完了API
// POST /api/reservations/:id/complete - 受け渡し完了（BookListingとReservationのステータスをCOMPLETEDに更新）

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";

// Prisma 7: トランザクションクライアントの型をインスタンスから取得
type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

type RouteParams = { params: { id: string } };

/**
 * POST /api/reservations/:id/complete
 * 受け渡し完了
 * 要件6.1: ReceiverがReservationの受け渡し完了ボタンを押したとき、
 *          Book_ListingのステータスをCOMPLETEDに変更する
 * 要件6.4: COMPLETEDになった本はGiverもReceiverも削除できない
 */
export async function POST(
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

  // 3. ReceiverのみがPOSTできる（他人は403）
  if (reservation.receiverId !== session.user.id) {
    return Errors.forbidden();
  }

  // 4. Prismaトランザクションで:
  //    - BookListing.status = COMPLETED
  //    - Reservation.status = COMPLETED を同時実行（要件6.1）
  await prisma.$transaction(async (tx: TransactionClient) => {
    // BookListingのステータスをCOMPLETEDに更新（要件6.1）
    await tx.bookListing.update({
      where: { id: reservation.bookListingId },
      data: { status: "COMPLETED" },
    });

    // ReservationのステータスをCOMPLETEDに更新
    await tx.reservation.update({
      where: { id: params.id },
      data: { status: "COMPLETED" },
    });
  });

  // 5. 200を返す（完了後のUI表示に使用）
  return NextResponse.json({ success: true });
}
