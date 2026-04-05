"use client";

// 本の一覧・検索画面
// 「渡せる本」と「ほしい本」をプルダウンで切り替えて表示する

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// 表示モードの型
type ViewMode = "available" | "wishlist";

// 渡せる本の型定義
interface BookListing {
  id: string;
  title: string;
  author: string | null;
  isbn: string | null;
  condition: string;
  location: string;
  availableTime: string | null;
  status: "AVAILABLE" | "RESERVED";
  giver: { id: string; name: string | null; image: string | null };
}

// ほしい本の型定義
interface WishListing {
  id: string;
  title: string;
  author: string | null;
  isbn: string | null;
  description: string | null;
  createdAt: string;
  requester: { id: string; name: string | null; image: string | null };
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

export default function BooksPage() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const [viewMode, setViewMode] = useState<ViewMode>("available");
  const [books, setBooks] = useState<BookListing[]>([]);
  const [wishlists, setWishlists] = useState<WishListing[]>([]);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 渡せる本の一覧を取得する
  const fetchBooks = useCallback(async (q: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = q ? `/api/books?q=${encodeURIComponent(q)}` : "/api/books";
      const res = await fetch(url);
      if (!res.ok) throw new Error("一覧の取得に失敗しました");
      setBooks(await res.json());
    } catch {
      setError("本の一覧を取得できませんでした。再度お試しください。");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ほしい本の一覧を取得する
  const fetchWishlists = useCallback(async (q: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = q ? `/api/wishlists?q=${encodeURIComponent(q)}` : "/api/wishlists";
      const res = await fetch(url);
      if (!res.ok) throw new Error("一覧の取得に失敗しました");
      setWishlists(await res.json());
    } catch {
      setError("ほしい本の一覧を取得できませんでした。再度お試しください。");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // モードまたは検索キーワード変更時にデータ取得
  useEffect(() => {
    if (viewMode === "available") {
      fetchBooks(searchQuery);
    } else {
      fetchWishlists(searchQuery);
    }
  }, [viewMode, searchQuery, fetchBooks, fetchWishlists]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    setSearchQuery("");
  };

  // モード切り替え時に検索をリセットする
  const handleModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setQuery("");
    setSearchQuery("");
  };

  // ほしい本を削除する
  const handleDeleteWish = async (id: string) => {
    if (!confirm("このほしい本の登録を削除しますか？")) return;
    try {
      const res = await fetch(`/api/wishlists/${id}`, { method: "DELETE" });
      if (res.ok) {
        setWishlists((prev) => prev.filter((w) => w.id !== id));
      }
    } catch {
      // 削除失敗は無視（再取得で対応）
    }
  };

  const isEmpty = viewMode === "available" ? books.length === 0 : wishlists.length === 0;
  const emptyMessage = viewMode === "available"
    ? (searchQuery ? "該当する本が見つかりませんでした" : "出品されている本はありません")
    : (searchQuery ? "該当するほしい本が見つかりませんでした" : "ほしい本の登録はありません");

  return (
    <div className="max-w-lg mx-auto p-4 pb-24">
      {/* プルダウン切り替え */}
      <div className="mb-4">
        <select
          value={viewMode}
          onChange={(e) => handleModeChange(e.target.value as ViewMode)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="表示切り替え"
        >
          <option value="available">渡せる本の一覧</option>
          <option value="wishlist">ほしい本の一覧</option>
        </select>
      </div>

      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className="mb-5 flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="タイトル・著者名・ISBNで検索"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
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

      {searchQuery && (
        <p className="mb-3 text-sm text-gray-500">
          「{searchQuery}」の検索結果：{viewMode === "available" ? books.length : wishlists.length}件
        </p>
      )}

      {/* ローディング */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* エラー */}
      {error && !isLoading && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 一覧 */}
      {!isLoading && !error && (
        <>
          {isEmpty ? (
            <p className="text-center text-gray-500 py-12 text-sm">{emptyMessage}</p>
          ) : viewMode === "available" ? (
            // 渡せる本の一覧
            <ul className="space-y-3">
              {books.map((book) => (
                <li key={book.id}>
                  <Link
                    href={`/books/${book.id}`}
                    className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
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
                      {book.availableTime && <span>時間：{book.availableTime}</span>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            // ほしい本の一覧
            <ul className="space-y-3">
              {wishlists.map((wish) => (
                <li key={wish.id}>
                  <div className="block bg-white rounded-xl border border-purple-200 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                        {wish.title}
                      </h2>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                          ほしい
                        </span>
                        {/* 登録者本人のみ削除ボタンを表示 */}
                        {wish.requester.id === currentUserId && (
                          <button
                            onClick={() => handleDeleteWish(wish.id)}
                            className="text-xs text-red-500 hover:text-red-700 transition-colors"
                            aria-label="削除"
                          >
                            削除
                          </button>
                        )}
                      </div>
                    </div>
                    {wish.author && (
                      <p className="text-sm text-gray-600 mb-2">{wish.author}</p>
                    )}
                    {wish.isbn && (
                      <p className="text-xs text-gray-500 mb-1">ISBN: {wish.isbn}</p>
                    )}
                    {wish.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">{wish.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      登録者: {wish.requester.id}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
