// ほしい本削除API
// DELETE /api/wishlists/:id - 登録者本人のみ削除可能

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { Errors } from "@/lib/errors";

type RouteParams = { params: { id: string } };

/**
 * DELETE /api/wishlists/:id
 * ほしい本の削除（登録者本人のみ）
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

  // 対象レコードを取得
  const wish = await prisma.wishListing.findUnique({
    where: { id: params.id },
  });

  if (!wish) {
    return Errors.notFound("ほしい本");
  }

  // 登録者本人かチェック
  if (wish.requesterId !== session.user.id) {
    return Errors.forbidden();
  }

  await prisma.wishListing.delete({ where: { id: params.id } });

  return new NextResponse(null, { status: 204 });
}
