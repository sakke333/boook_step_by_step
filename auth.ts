// NextAuth.js v5 設定ファイル
// Google OAuth認証とUserレコード管理を担う

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Google OAuthプロバイダーの設定
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  // コールバック設定
  callbacks: {
    // サインイン時のコールバック
    // Userレコードの存在確認・新規作成を行う
    async signIn({ user, account }) {
      // Googleアカウント以外は拒否
      if (account?.provider !== "google") {
        return false;
      }

      // メールアドレスが取得できない場合は拒否
      if (!user.email) {
        return false;
      }

      try {
        console.log("サインイン試行:", user.email);
        // Userレコードの存在確認
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // 新規ユーザーの場合はレコードを作成する
        // tokenBalance=10, walletAddress=null で初期化（要件1.2, 1.3, 1.4）
        if (!existingUser) {
          console.log("新規ユーザー作成:", user.email);
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? null,
              image: user.image ?? null,
              tokenBalance: 10,
              walletAddress: null,
            },
          });
        }

        console.log("サインイン成功:", user.email);
        return true;
      } catch (error) {
        // DB操作エラー時はサインインを拒否
        console.error("サインイン時のDBエラー:", error);
        return false;
      }
    },

    // JWTコールバック
    // トークンにDBのユーザーIDを保存する（useSessionで参照できるようにするため）
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true },
        });
        if (dbUser) {
          token.userId = dbUser.id;
        }
      }
      return token;
    },

    // セッションコールバック
    // JWTトークンからセッションにユーザーIDを追加する
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },

  // カスタムページ設定
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
