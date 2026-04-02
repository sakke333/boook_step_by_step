// NextAuth.js v5 の型拡張
// セッションにカスタムフィールドを追加する

import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
