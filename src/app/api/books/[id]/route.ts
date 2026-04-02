// 本の詳細取得・更新・削除API
// GET    /api/books/:id - 本の詳細取得（認証不要）
// PUT    /api/books/:id - 本の情報更新（Giver・AVAILABLEのみ）
// DELETE /api/books/:id - 本の削除（Giver・AVAILABLE/RESERVED制約あり）

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";

type RouteParams = { params: { id: string } };

/**
 * GET /api/books/:id
 * 本の詳細取得
 * 認証不要 - 誰でも取得可能
 */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  const book = await prisma.bookListing.findUnique({
    where: { id: params.id },
    include: {
      giver: {
        select: { id: true, name: true, image: true },
      },
      reservation: {
        select: {
          id: true,
          status: true,
          receiverId: true,
        },
      },
    },
  });

  if (!book) {
    return Errors.notFound("本");
  }

  return NextResponse.json(book);
}

/**
 * PUT /api/books/:id
 * 本の情報更新
 * 要件2.5: AVAILABLEのとき、GiverがBook_Listingを編集できる
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  // 認証チェック
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  // 対象のBook_Listingを取得
  const book = await prisma.bookListing.findUnique({
    where: { id: params.id },
  });

  if (!book) {
    return Errors.notFound("本");
  }

  // 権限チェック: GiverのみがBook_Listingを編集できる（要件2.5）
  if (book.giverId !== session.user.id) {
    return Errors.forbidden();
  }

  // ステータス制約: AVAILABLEのときのみ編集可能（要件2.5）
  if (book.status !== "AVAILABLE") {
    return Errors.forbidden();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Errors.validationError("リクエストボディが不正です");
  }

  const data = body as Record<string, unknown>;

  // 必須項目バリデーション（更新時も必須項目は必須）
  const title = typeof data.title === "string" ? data.title.trim() : book.title;
  const location =
    typeof data.location === "string" ? data.location.trim() : book.location;

  if (!title) {
    return Errors.validationError("タイトルは必須です");
  }
  if (!location) {
    return Errors.validationError("受け渡し希望場所は必須です");
  }

  // Book_Listingを更新
  const updated = await prisma.bookListing.update({
    where: { id: params.id },
    data: {
      title,
      author:
        "author" in data
          ? typeof data.author === "string"
            ? data.author.trim() || null
            : null
          : book.author,
      isbn:
        "isbn" in data
          ? typeof data.isbn === "string"
            ? data.isbn.trim() || null
            : null
          : book.isbn,
      condition:
        typeof data.condition === "string"
          ? data.condition.trim()
          : book.condition,
      location,
      availableTime:
        "availableTime" in data
          ? typeof data.availableTime === "string"
            ? data.availableTime.trim() || null
            : null
          : book.availableTime,
      description:
        "description" in data
          ? typeof data.description === "string"
            ? data.description.trim() || null
            : null
          : book.description,
    },
    include: {
      giver: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  return NextResponse.json(updated);
}

/**
 * DELETE /api/books/:id
 * 本の削除
 * 要件2.5: AVAILABLEのとき、GiverがBook_Listingを削除できる
 * 要件4.5: RESERVED（有効な予約あり）の場合は409エラー
 * 要件6.4: COMPLETEDの場合は409エラー
 */
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  // 認証チェック
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  // 対象のBook_Listingを予約情報ごと取得
  const book = await prisma.bookListing.findUnique({
    where: { id: params.id },
    include: {
      reservation: {
        where: { status: "ACTIVE" },
      },
    },
  });

  if (!book) {
    return Errors.notFound("本");
  }

  // ステータス制約チェック（権限チェックより先に行う）
  if (book.status === "COMPLETED") {
    // 要件6.4: COMPLETEDな本はGiverもReceiverも削除不可
    return Errors.listingCompleted();
  }

  // 権限チェック: GiverのみがBook_Listingを削除できる（要件2.5）
  if (book.giverId !== session.user.id) {
    return Errors.forbidden();
  }

  if (book.status === "RESERVED" && book.reservation) {
    // 要件4.5: 有効な予約がある本は削除不可
    return Errors.hasActiveReservation();
  }

  // Book_Listingを削除
  await prisma.bookListing.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}
