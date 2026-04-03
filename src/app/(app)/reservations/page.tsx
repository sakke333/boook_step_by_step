"use client";

// 予約・出品管理画面
// タブ1: 受け取り待ち（自分がGiverの本で予約されているもの）
// タブ2: 予約中（自分がReceiverとして予約した本）
// タブ3: 出品中（自分が登録したAVAILABLEな本）

import { useState, useEffect } from "react";
import Link from "next/link";

// 予約情報の型（タブ1・タブ2共通）
interface Reservation {
  id: string;
  createdAt: string;
  bookListing: {
    id: string;
    title: string;
    author: string | null;
    condition: string;
    location: string;
    availableTime: string | null;
    status: string;
    giver: { id: string; name: string | null; image: string | null };
  };
  receiver?: { id: string; name: string | null; image: string | null };
}

// 出品中の本の型（タブ3）
interface BookListing {
  id: string;
  title: string;
  author: string | null;
  condition: string;
  location: string;
  availableTime: string | null;
  status: string;
}

type Tab = "incoming" | "outgoing" | "listed";

// タブの定義
const TABS: { id: Tab; label: string }[] = [
  { id: "incoming", label: "受け取り待ち" },
  { id: "outgoing", label: "予約中" },
  { id: "listed",   label: "出品中" },
];

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("incoming");

  // タブ1: 自分がGiverの予約一覧
  const [incoming, setIncoming] = useState<Reservation[]>([]);
  const [incomingLoading, setIncomingLoading] = useState(true);
  const [incomingError, setIncomingError] = useState<string | null>(null);

  // タブ2: 自分がReceiverの予約一覧
  const [outgoing, setOutgoing] = useState<Reservation[]>([]);
  const [outgoingLoading, setOutgoingLoading] = useState(true);
  const [outgoingError, setOutgoingError] = useState<string | null>(null);

  // タブ3: 自分の出品中の本
  const [listed, setListed] = useState<BookListing[]>([]);
  const [listedLoading, setListedLoading] = useState(true);
  const [listedError, setListedError] = useState<string | null>(null);

  useEffect(() => {
    // タブ1: 受け取り待ち
    fetch("/api/reservations?role=giver", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: Reservation[]) => setIncoming(data))
      .catch(() => setIncomingError("取得に失敗しました"))
      .finally(() => setIncomingLoading(false));

    // タブ2: 予約中
    fetch("/api/reservations", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: Reservation[]) => setOutgoing(data))
      .catch(() => setOutgoingError("取得に失敗しました"))
      .finally(() => setOutgoingLoading(false));

    // タブ3: 出品中
    fetch("/api/books?mine=true", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: BookListing[]) => setListed(data))
      .catch(() => setListedError("取得に失敗しました"))
      .finally(() => setListedLoading(false));
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">予約・出品管理</h1>

      {/* タブナビゲーション */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* タブ1: 受け取り待ち */}
      {activeTab === "incoming" && (
        <TabContent
          isLoading={incomingLoading}
          error={incomingError}
          isEmpty={incoming.length === 0}
          emptyMessage="受け取り待ちの予約はありません"
        >
          <ul className="space-y-3">
            {incoming.map((r) => (
              <li key={r.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">{r.bookListing.title}</p>
                    {r.bookListing.author && (
                      <p className="text-sm text-gray-500 mt-0.5">{r.bookListing.author}</p>
                    )}
                  </div>
                  <span className="flex-shrink-0 inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    受け取り待ち
                  </span>
                </div>
                <div className="text-xs text-gray-500 space-y-1 mb-4">
                  <p>予約者: {r.receiver?.name ?? "不明"}</p>
                  <p>受け渡し場所: {r.bookListing.location}</p>
                  {r.bookListing.availableTime && <p>受け渡し可能時間: {r.bookListing.availableTime}</p>}
                </div>
                <Link
                  href={`/chat/${r.id}`}
                  className="block w-full text-center py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  チャットで日程調整する
                </Link>
              </li>
            ))}
          </ul>
        </TabContent>
      )}

      {/* タブ2: 予約中 */}
      {activeTab === "outgoing" && (
        <TabContent
          isLoading={outgoingLoading}
          error={outgoingError}
          isEmpty={outgoing.length === 0}
          emptyMessage="予約中の本はありません"
          emptyLink={{ href: "/books", label: "本の一覧を見る →" }}
        >
          <ul className="space-y-3">
            {outgoing.map((r) => (
              <li key={r.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">{r.bookListing.title}</p>
                    {r.bookListing.author && (
                      <p className="text-sm text-gray-500 mt-0.5">{r.bookListing.author}</p>
                    )}
                  </div>
                  <span className="flex-shrink-0 inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                    予約済み
                  </span>
                </div>
                <div className="text-xs text-gray-500 space-y-1 mb-4">
                  <p>出品者: {r.bookListing.giver.name ?? "不明"}</p>
                  <p>受け渡し場所: {r.bookListing.location}</p>
                  {r.bookListing.availableTime && <p>受け渡し可能時間: {r.bookListing.availableTime}</p>}
                </div>
                <Link
                  href={`/chat/${r.id}`}
                  className="block w-full text-center py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  チャットで日程調整する
                </Link>
              </li>
            ))}
          </ul>
        </TabContent>
      )}

      {/* タブ3: 出品中 */}
      {activeTab === "listed" && (
        <TabContent
          isLoading={listedLoading}
          error={listedError}
          isEmpty={listed.length === 0}
          emptyMessage="出品中の本はありません"
          emptyLink={{ href: "/register", label: "本を出品する →" }}
        >
          <ul className="space-y-3">
            {listed.map((book) => (
              <li key={book.id}>
                <Link
                  href={`/books/${book.id}`}
                  className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">{book.title}</p>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      受け取り可能
                    </span>
                  </div>
                  {book.author && <p className="text-sm text-gray-600 mb-2">{book.author}</p>}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>状態：{book.condition || "未記入"}</span>
                    <span>場所：{book.location}</span>
                    {book.availableTime && <span>時間：{book.availableTime}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </TabContent>
      )}
    </div>
  );
}

// タブコンテンツの共通ラッパー
function TabContent({
  isLoading,
  error,
  isEmpty,
  emptyMessage,
  emptyLink,
  children,
}: {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyMessage: string;
  emptyLink?: { href: string; label: string };
  children: React.ReactNode;
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
        {error}
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-sm mb-4">{emptyMessage}</p>
        {emptyLink && (
          <Link href={emptyLink.href} className="text-blue-600 text-sm hover:underline">
            {emptyLink.label}
          </Link>
        )}
      </div>
    );
  }
  return <>{children}</>;
}
