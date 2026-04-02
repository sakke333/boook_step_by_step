"use client";

// 本の詳細画面（要件3.3, 3.4, 4.1, 4.5）
// クライアントコンポーネントとして実装し、予約ボタン・削除確認ダイアログを提供する

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

// APIから返ってくるBook_Listingの詳細型定義
interface BookListingDetail {
  id: string;
  title: string;
  author: string | null;
  isbn: string | null;
  condition: string;
  location: string;
  availableTime: string | null;
  description: string | null;
  status: "AVAILABLE" | "RESERVED" | "COMPLETED";
  createdAt: string;
  giver: {
    id: string;
    name: string | null;
    image: string | null;
  };
  reservation: {
    id: string;
    status: "ACTIVE" | "CANCELLED" | "COMPLETED";
    receiverId: string;
  } | null;
}


// ステータスの表示ラベルとスタイルを返す
function StatusBadge({ status }: { status: BookListingDetail["status"] }) {
  const styles: Record<BookListingDetail["status"], string> = {
    AVAILABLE: "bg-green-100 text-green-700",
    RESERVED: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-gray-100 text-gray-600",
  };
  const labels: Record<BookListingDetail["status"], string> = {
    AVAILABLE: "受け取り可能",
    RESERVED: "予約済み",
    COMPLETED: "受け渡し完了",
  };
  return (
    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// 詳細情報の行コンポーネント
function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  );
}

type Props = {
  params: { id: string };
};

export default function BookDetailPage({ params }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const [book, setBook] = useState<BookListingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNotFound, setPageNotFound] = useState(false);

  // 予約処理の状態
  const [isReserving, setIsReserving] = useState(false);
  const [reserveError, setReserveError] = useState<string | null>(null);

  // 削除処理の状態
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // 本の詳細を取得する
  const fetchBook = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/books/${params.id}`, { cache: "no-store" });
      if (res.status === 404 || !res.ok) {
        setPageNotFound(true);
        return;
      }
      const data: BookListingDetail = await res.json();
      setBook(data);
    } catch {
      setPageNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);


  // 予約ボタン押下ハンドラー（要件4.1）
  const handleReserve = async () => {
    if (!book) return;
    setIsReserving(true);
    setReserveError(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookListingId: book.id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setReserveError((data as { message?: string }).message ?? "予約に失敗しました。再度お試しください。");
        return;
      }
      // 予約成功後にページを更新してステータスをRESERVEDに反映する
      await fetchBook();
    } catch {
      setReserveError("予約に失敗しました。再度お試しください。");
    } finally {
      setIsReserving(false);
    }
  };

  // 削除ボタン押下ハンドラー（要件4.5）
  const handleDeleteClick = () => {
    if (!book) return;
    // ACTIVEな予約が存在する場合は確認ダイアログを表示する（要件4.5）
    if (book.reservation && book.reservation.status === "ACTIVE") {
      setShowDeleteConfirm(true);
    } else {
      executeDelete();
    }
  };

  // 実際の削除処理
  const executeDelete = async () => {
    if (!book) return;
    setIsDeleting(true);
    setDeleteError(null);
    setShowDeleteConfirm(false);
    try {
      const res = await fetch(`/api/books/${book.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setDeleteError((data as { message?: string }).message ?? "削除に失敗しました。再度お試しください。");
        return;
      }
      // 削除成功後は一覧画面へ遷移する
      router.push("/books");
    } catch {
      setDeleteError("削除に失敗しました。再度お試しください。");
    } finally {
      setIsDeleting(false);
    }
  };

  // ローディング中
  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto p-4 pb-24 flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 本が見つからない場合
  if (pageNotFound || !book) {
    return (
      <div className="max-w-lg mx-auto p-4 pb-24">
        <Link href="/books" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-4">
          ← 一覧に戻る
        </Link>
        <p className="text-center text-gray-500 py-12 text-sm">本が見つかりませんでした</p>
      </div>
    );
  }

  // 自分がGiverかどうか
  const isGiver = currentUserId === book.giver.id;
  // 予約ボタンを表示するか（AVAILABLEかつGiverでない場合のみ）（要件4.1）
  const showReserveButton = book.status === "AVAILABLE" && !isGiver && !!currentUserId;
  // 削除ボタンを表示するか（Giverのみ、COMPLETEDは除く）
  const showDeleteButton = isGiver && book.status !== "COMPLETED";
  // チャットへのリンクを表示するか（RESERVEDかつ自分がGiverまたはReceiver）
  const activeReservation = book.reservation?.status === "ACTIVE" ? book.reservation : null;
  const isReceiver = activeReservation?.receiverId === currentUserId;
  const showChatLink = activeReservation && (isGiver || isReceiver);


  return (
    <div className="max-w-lg mx-auto p-4 pb-24">
      {/* 戻るリンク */}
      <Link href="/books" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-4">
        ← 一覧に戻る
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
        {/* タイトルとステータス */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-bold text-gray-900 leading-snug">{book.title}</h1>
          <StatusBadge status={book.status} />
        </div>

        {/* 詳細情報（要件3.3） */}
        <dl className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4">
          <DetailRow label="著者名" value={book.author} />
          <DetailRow label="ISBN" value={book.isbn} />
          <DetailRow label="状態" value={book.condition} />
          <DetailRow label="受け渡し希望場所" value={book.location} />
          <DetailRow label="受け渡し可能時間" value={book.availableTime} />
          <DetailRow label="出品者" value={book.giver.name} />
        </dl>

        {/* 説明文 */}
        {book.description && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-gray-500 mb-1">説明</p>
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{book.description}</p>
          </div>
        )}

        {/* チャットへのリンク（予約済みのGiver・Receiver向け） */}
        {showChatLink && (
          <div className="border-t border-gray-100 pt-4">
            <Link
              href={`/chat/${activeReservation.id}`}
              className="block w-full text-center py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              チャットで日程調整する
            </Link>
          </div>
        )}

        {/* 予約ボタン（AVAILABLEかつGiverでない場合のみ表示）（要件4.1） */}
        {showReserveButton && (
          <div className="border-t border-gray-100 pt-4">
            {reserveError && (
              <p role="alert" className="text-sm text-red-600 mb-2">{reserveError}</p>
            )}
            <button
              onClick={handleReserve}
              disabled={isReserving}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isReserving ? "予約中..." : "予約する"}
            </button>
          </div>
        )}

        {/* Giverの操作ボタン（削除） */}
        {showDeleteButton && (
          <div className="border-t border-gray-100 pt-4">
            {deleteError && (
              <p role="alert" className="text-sm text-red-600 mb-2">{deleteError}</p>
            )}
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="w-full py-3 bg-red-50 text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isDeleting ? "削除中..." : "この出品を削除する"}
            </button>
          </div>
        )}
      </div>

      {/* 削除確認ダイアログ（有効なReservationがある場合）（要件4.5） */}
      {showDeleteConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <h2 id="delete-confirm-title" className="text-lg font-bold text-gray-900">
              出品を削除しますか？
            </h2>
            <p className="text-sm text-gray-600">
              この本には有効な予約があります。削除すると予約も取り消されます。本当に削除しますか？
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
