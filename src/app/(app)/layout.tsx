// 認証ガード付きアプリレイアウト（サーバーコンポーネント）
// 未認証ユーザーをログイン画面へリダイレクトし、タブバーを表示する（要件8.4）

import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import TabBar from "@/components/TabBar";
import NotificationListener from "@/components/NotificationListener";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // セッションを取得して認証状態を確認する（要件8.4）
  const session = await auth();

  // 未認証の場合はログイン画面へリダイレクトする
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* グローバル通知リスナー（予約・メッセージ通知） */}
      <NotificationListener />

      {/* メインコンテンツ（タブバー分の余白を下部に確保） */}
      <main className="pb-16">{children}</main>

      {/* 画面下部に固定表示されるタブバー（要件8.1, 8.2, 8.3） */}
      <TabBar />
    </div>
  );
}
