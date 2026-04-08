"use client";

// ランディングページコンポーネント
// 未ログインユーザーに渡せる本の一覧を見せ、ログインを促す

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

// 渡せる本の型定義
interface BookListing {
  id: string;
  title: string;
  author: string | null;
  condition: string;
  location: string;
  availableTime: string | null;
  status: "AVAILABLE" | "RESERVED";
}

// ステータスバッジ
function StatusBadge({ status }: { status: "AVAILABLE" | "RESERVED" }) {
  if (status === "AVAILABLE") {
    return (
      <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
        受け取り可能
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
      予約済み
    </span>
  );
}

export default function LandingPage() {
  const [books, setBooks] = useState<BookListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // 本の一覧を取得する（認証不要のAPIを使用）
  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    await signIn("google", { callbackUrl: "/books" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 固定ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">Book シェアリング</span>
          <button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {/* Googleアイコン */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isSigningIn ? "ログイン中..." : "ログイン"}
          </button>
        </div>
      </header>

      {/* メインコンテンツ（ヘッダー分の余白） */}
      <main className="max-w-lg mx-auto px-4 pt-20 pb-8">
        {/* キャッチコピー */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 mb-1">大学生のための</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book シェアリング</h1>
          <p className="text-sm text-gray-600">
            不要になった教科書を必要な人へ。<br />
            予約・受け渡しはログイン後に利用できます。
          </p>
        </div>


        {/* 本の一覧 */}
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          渡せる本の一覧
          {!isLoading && (
            <span className="ml-2 text-sm font-normal text-gray-500">{books.length}件</span>
          )}
        </h2>

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && books.length === 0 && (
          <p className="text-center text-gray-500 py-12 text-sm">
            現在出品されている本はありません
          </p>
        )}

        {!isLoading && books.length > 0 && (
          <ul className="space-y-3">
            {books.map((book) => (
              <li key={book.id}>
                {/* 未ログインのためカードはクリック不可（予約はログイン後） */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                      {book.title}
                    </h3>
                    <StatusBadge status={book.status} />
                  </div>
                  {book.author && (
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  )}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                    <span>状態：{book.condition || "未記入"}</span>
                    <span>場所：{book.location}</span>
                    {book.availableTime && <span>時間：{book.availableTime}</span>}
                  </div>
                  {/* 予約ボタン（ログイン促進） */}
                  {book.status === "AVAILABLE" && (
                    <button
                      onClick={handleSignIn}
                      className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      ログインして予約する
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
