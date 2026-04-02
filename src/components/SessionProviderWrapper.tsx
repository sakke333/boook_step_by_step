"use client";

// SessionProviderのクライアントコンポーネントラッパー
// ルートレイアウト（サーバーコンポーネント）からSessionProviderを使うために必要

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
