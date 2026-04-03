"use client";

// 本の一覧・検索画面（要件3.1, 3.2, 3.3, 3.4）
// クライアントコンポーネントとして実装し、useState + useEffect でデータ取得・検索を管理する

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// APIから返ってくるBook_Listingの型定義
interface BookListing {
  id: string;
  title: string;
  author: string | null;
  isbn: string | null;
  condition: string;
  location: string;
  availableTime: string | null;
  status: "AVAILABLE" | "RESERVED";
  giver: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

// ステータスバッジのスタイルとラベルを返す（要件3.3）
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

export default function BooksPage() {
  // 取得した本の一覧
  const [books, setBooks] = useState<BookListing[]>([]);
  // 検索フォームの入力値
  const [query, setQuery] = useState("");
  // 実際にAPIに送るキーワード（送信時に更新）
  const [searchQuery, setSearchQuery] = useState("");
  // ローディング状態
  const [isLoading, setIsLoading] = useState(true);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  // APIから本の一覧を取得する
  const fetchBooks = useCallback(async (q: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = q ? `/api/books?q=${encodeURIComponent(q)}` : "/api/books";
      const res = await fetch(url);
      if (!res.ok) throw new Error("一覧の取得に失敗しました");
      const data: BookListing[] = await res.json();
      setBooks(data);
    } catch {
      setError("本の一覧を取得できませんでした。再度お試しください。");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初回マウント時および検索キーワード変更時にデータ取得
  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery, fetchBooks]);

  // 検索フォーム送信ハンドラー（送信時にAPIを呼ぶ）
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query.trim());
  };

  // 検索クリアハンドラー
  const handleClear = () => {
    setQuery("");
    setSearchQuery("");
  };

  return (
    <div className="max-w-lg mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">本の一覧</h1>

      {/* 検索フォーム（要件3.2） */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="タイトル・著者名・ISBNで検索"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          検索
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            クリア
          </button>
        )}
      </form>

      {/* 検索中のキーワード表示 */}
      {searchQuery && (
        <p className="mb-3 text-sm text-gray-500">
          「{searchQuery}」の検索結果：{books.length}件
        </p>
      )}

      {/* ローディング表示 */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* エラー表示 */}
      {error && !isLoading && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
          <button
            onClick={() => fetchBooks(searchQuery)}
            className="ml-2 underline hover:no-underline"
          >
            再試行
          </button>
        </div>
      )}

      {/* 本の一覧（要件3.1, 3.3） */}
      {!isLoading && !error && (
        <>
          {books.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-sm">
              {searchQuery ? "該当する本が見つかりませんでした" : "出品されている本はありません"}
            </p>
          ) : (
            <ul className="space-y-3">
              {books.map((book) => (
                // カードクリックで詳細画面へ遷移（要件3.4）
                <li key={book.id}>
                  <Link href={`/books/${book.id}`} className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                        {book.title}
                      </h2>
                      <StatusBadge status={book.status} />
                    </div>
                    {book.author && (
                      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    )}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span>状態：{book.condition || "未記入"}</span>
                      <span>場所：{book.location}</span>
                      {book.availableTime && (
                        <span>時間：{book.availableTime}</span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
