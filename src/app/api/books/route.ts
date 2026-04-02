// 本の出品一覧・登録API
// GET /api/books  - 本の一覧取得（検索クエリ対応）
// POST /api/books - 本の出品登録

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";

/**
 * GET /api/books
 * 本の一覧取得（AVAILABLE/RESERVEDのみ、キーワード検索対応）
 * 認証不要 - 誰でも取得可能
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  // キーワード検索条件の構築（タイトル・著者名・ISBNを対象）
  const searchCondition = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" as const } },
          { author: { contains: query, mode: "insensitive" as const } },
          { isbn: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  const books = await prisma.bookListing.findMany({
    where: {
      // 要件3.1: AVAILABLE/RESERVEDのみ表示（COMPLETEDは除外）
      status: { in: ["AVAILABLE", "RESERVED"] },
      ...searchCondition,
    },
    include: {
      giver: {
        select: { id: true, name: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(books);
}

/**
 * POST /api/books
 * 本の出品登録
 * 認証必須 - セッションユーザーがGiverとなる
 */
export async function POST(request: NextRequest) {
  // 認証チェック（要件2.3: GiverのユーザーIDに紐づけて保存）
  const session = await auth();
  if (!session?.user?.id) {
    return Errors.unauthorized();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Errors.validationError("リクエストボディが不正です");
  }

  const data = body as Record<string, unknown>;

  // 必須項目バリデーション（要件2.4: タイトル・受け渡し希望場所）
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const location = typeof data.location === "string" ? data.location.trim() : "";

  if (!title) {
    return Errors.validationError("タイトルは必須です");
  }
  if (!location) {
    return Errors.validationError("受け渡し希望場所は必須です");
  }

  // Book_Listingをデータベースに保存
  // 要件2.2: 初期ステータスをAVAILABLEに設定
  // 要件2.3: giverIdをセッションユーザーのIDに設定
  const book = await prisma.bookListing.create({
    data: {
      title,
      author: typeof data.author === "string" ? data.author.trim() || null : null,
      isbn: typeof data.isbn === "string" ? data.isbn.trim() || null : null,
      condition: typeof data.condition === "string" ? data.condition.trim() : "",
      location,
      availableTime:
        typeof data.availableTime === "string"
          ? data.availableTime.trim() || null
          : null,
      description:
        typeof data.description === "string"
          ? data.description.trim() || null
          : null,
      status: "AVAILABLE",
      giverId: session.user.id,
    },
    include: {
      giver: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  return NextResponse.json(book, { status: 201 });
}
