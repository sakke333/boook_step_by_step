// Prismaクライアントのシングルトン
// Prisma 7ではdriver adapterが必須のため、@prisma/adapter-pgを使用する
// 開発環境でのホットリロード時に複数インスタンスが生成されるのを防ぐ

import { PrismaClient } from "../../prisma/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// グローバル変数としてPrismaクライアントを保持する型定義
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// PostgreSQL接続アダプターを生成（Prisma 7必須）
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// シングルトンパターンでPrismaクライアントを生成
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// 開発環境ではグローバル変数に保持してホットリロード時の再生成を防ぐ
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
