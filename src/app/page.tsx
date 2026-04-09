// ランディングページ（パブリック）
// ログイン不要で渡せる本の一覧を閲覧できる
// ログイン済みの場合は /books にリダイレクトする

import { auth } from "../../auth";
import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage";

export default async function Home() {
  // ログイン済みの場合はアプリ内の本一覧へ
  const session = await auth();
  if (session) {
    redirect("/books");
  }

  return <LandingPage />;
}
