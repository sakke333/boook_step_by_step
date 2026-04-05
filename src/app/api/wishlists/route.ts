// ほしい本リストAPI
// GET /api/wishlists  - ほしい本一覧取得
// POST /api/wishlists - ほしい本登録

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";

/**
 * GET /api/wishlists
 * ほしい本一覧取得（全ユーザーの登録を返す）
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

  const wishlists = await prisma.wishListing.findMany({
    where: searchCondition,
    include: {
      requester: {
        select: { id: true, name: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(wishlists);
}

/**
 * POST /api/wishlists
 * ほしい本登録
 */
export async function POST(request: NextRequest) {
  // 認証チェック
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
  const title = typeof data.title === "string" ? data.title.trim() : "";

  if (!title) {
    return Errors.validationError("タイトルは必須です");
  }

  const wishListing = await prisma.wishListing.create({
    data: {
      title,
      author: typeof data.author === "string" ? data.author.trim() || null : null,
      isbn: typeof data.isbn === "string" ? data.isbn.trim() || null : null,
      description: typeof data.description === "string" ? data.description.trim() || null : null,
      requesterId: session.user.id,
    },
    include: {
      requester: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  return NextResponse.json(wishListing, { status: 201 });
}
