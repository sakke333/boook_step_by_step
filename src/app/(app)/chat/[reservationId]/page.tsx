"use client";

// チャット画面
// Supabase Realtimeを使ったリアルタイムチャット
// 要件5.1, 5.2, 5.4, 6.1, 6.2, 6.3

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// メッセージの型定義
interface Message {
  id: string;
  content: string;
  createdAt: string;
  reservationId: string;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

// 予約情報の型定義
interface ReservationInfo {
  id: string;
  status: string;
  receiverId: string;
  bookListing: {
    id: string;
    title: string;
    giverId: string;
    status: string;
  };
}

// アプリ内通知の型定義
interface AppNotification {
  id: string;
  message: string;
}

type Props = {
  params: { reservationId: string };
};

export default function ChatPage({ params }: Props) {
  const { reservationId } = params;
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // 予約情報の状態
  const [reservation, setReservation] = useState<ReservationInfo | null>(null);

  // 受け渡し完了フローの状態
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);

  // アプリ内通知の状態（要件5.4）
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // メッセージ末尾へのスクロール用ref
  const bottomRef = useRef<HTMLDivElement>(null);

  // 予約情報を取得する
  const fetchReservation = useCallback(async () => {
    try {
      const res = await fetch(`/api/reservations/${reservationId}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data: ReservationInfo = await res.json();
        setReservation(data);
        // すでにCOMPLETEDの場合は完了済み状態にする
        if (data.status === "COMPLETED") {
          setIsCompleted(true);
        }
      }
    } catch {
      // 予約情報取得失敗は無視（チャット機能には影響しない）
    }
  }, [reservationId]);

  // メッセージ一覧を取得する
  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/messages?reservationId=${reservationId}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { message?: string }).message ?? "メッセージの取得に失敗しました");
        return;
      }
      const data: Message[] = await res.json();
      setMessages(data);
    } catch {
      setError("メッセージの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, [reservationId]);

  // 初回ロード時にメッセージと予約情報を取得する
  useEffect(() => {
    fetchMessages();
    fetchReservation();
  }, [fetchMessages, fetchReservation]);

  // 新着メッセージ受信時に末尾へスクロールする
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // アプリ内通知を一定時間後に自動削除する（要件5.4）
  useEffect(() => {
    if (notifications.length === 0) return;
    const timer = setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [notifications]);

  // Supabase Realtimeチャンネルへの接続（要件5.2, 5.4）
  useEffect(() => {
    if (!supabase) return;

    // chat:{reservationId} チャンネルに接続する（設計書のチャンネル名仕様）
    const channel = supabase
      .channel(`chat:${reservationId}`)
      .on("broadcast", { event: "new_message" }, (payload) => {
        // new_message イベントを受信したらメッセージ一覧に追加する（要件5.2）
        const newMessage = payload.payload as Message;

        setMessages((prev) => {
          // 重複を防ぐ（自分が送信したメッセージはAPIレスポンスで既に追加済みの場合がある）
          if (prev.some((m) => m.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });

        // 自分以外からのメッセージの場合はアプリ内通知を表示する（要件5.4）
        if (newMessage.sender.id !== currentUserId) {
          const notificationId = `notif-${Date.now()}`;
          setNotifications((prev) => [
            ...prev,
            {
              id: notificationId,
              message: `${newMessage.sender.name ?? "相手"}からメッセージが届きました`,
            },
          ]);
        }
      })
      .subscribe();

    // クリーンアップ時にチャンネルを解除する
    return () => {
      supabase!.removeChannel(channel);
    };
  }, [reservationId, currentUserId]);

  // 受け渡し完了ハンドラー（要件6.1）
  const handleComplete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);
    setCompleteError(null);

    try {
      const res = await fetch(`/api/reservations/${reservationId}/complete`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setCompleteError((data as { message?: string }).message ?? "完了処理に失敗しました");
        return;
      }

      // 完了後にトークン送付促進UIを表示する（要件6.2）
      setIsCompleted(true);
    } catch {
      setCompleteError("完了処理に失敗しました。再度お試しください。");
    } finally {
      setIsCompleting(false);
    }
  };

  // スキップして終了ハンドラー（要件6.3）
  const handleSkip = () => {
    router.push("/books");
  };

  // メッセージ送信ハンドラー（要件5.2, 5.3）
  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);
    setSendError(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId, content: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSendError((data as { message?: string }).message ?? "送信に失敗しました");
        return;
      }

      const newMessage: Message = await res.json();

      // 送信したメッセージをすぐに表示する（楽観的UI更新）
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });

      setInputText("");
    } catch {
      setSendError("送信に失敗しました。再度お試しください。");
    } finally {
      setIsSending(false);
    }
  };

  // Enterキーで送信（Shift+Enterは改行）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 日時のフォーマット
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  };

  // 現在のユーザーがReceiverかどうか
  const isReceiver = reservation?.receiverId === currentUserId;

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-white">
      {/* ヘッダー */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
        <Link
          href="/books"
          className="text-sm text-blue-600 hover:text-blue-800"
          aria-label="一覧に戻る"
        >
          ← 戻る
        </Link>
        <h1 className="text-base font-semibold text-gray-900">チャット</h1>
      </header>

      {/* アプリ内通知エリア（要件5.4） */}
      <div
        aria-live="polite"
        aria-label="通知"
        className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4"
      >
        {notifications.map((notif) => (
          <div
            key={notif.id}
            role="status"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg text-center"
          >
            {notif.message}
          </div>
        ))}
      </div>

      {/* 受け渡し完了後のトークン送付促進UI（要件6.2, 6.3） */}
      {isCompleted && (
        <div
          role="region"
          aria-label="受け渡し完了"
          className="mx-4 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl"
        >
          <p className="text-sm font-semibold text-green-800 mb-1">
            🎉 受け渡しが完了しました！
          </p>
          {/* トークン送付促進メッセージ（要件6.2） */}
          <p className="text-sm text-green-700 mb-3">
            Giver にトークンを送ることができます！本の循環が広がるかも。
          </p>
          <div className="flex flex-col gap-2">
            {/* トークン送付画面への遷移ボタン（要件6.2） */}
            <Link
              href="/tokens"
              className="block w-full text-center bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              aria-label="トークンを送る"
            >
              トークンを送る
            </Link>
            {/* スキップして終了ボタン（要件6.3） */}
            <button
              onClick={handleSkip}
              className="w-full text-center text-sm text-gray-500 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="スキップして終了"
            >
              スキップして終了
            </button>
          </div>
        </div>
      )}

      {/* メッセージ一覧エリア */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-4">
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p role="alert" className="text-center text-sm text-red-600 py-4">
            {error}
          </p>
        )}

        {!isLoading && !error && messages.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">
            まだメッセージはありません。最初のメッセージを送ってみましょう。
          </p>
        )}

        {messages.map((msg) => {
          const isMine = msg.sender.id === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}
            >
              {/* 送信者名（相手のメッセージのみ表示） */}
              {!isMine && (
                <span className="text-xs text-gray-500 px-1">
                  {msg.sender.name ?? "ユーザー"}
                </span>
              )}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                  isMine
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-900 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
              {/* 送信時刻 */}
              <span className="text-xs text-gray-400 px-1">
                {formatTime(msg.createdAt)}
              </span>
            </div>
          );
        })}

        {/* スクロール末尾のアンカー */}
        <div ref={bottomRef} />
      </div>

      {/* 受け渡し完了ボタン（Receiverのみ表示・要件6.1） */}
      {isReceiver && !isCompleted && (
        <div className="px-4 py-2 border-t border-gray-100">
          {completeError && (
            <p role="alert" className="text-xs text-red-600 mb-2">
              {completeError}
            </p>
          )}
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            aria-label="受け渡し完了"
            className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isCompleting ? "処理中..." : "受け渡し完了"}
          </button>
        </div>
      )}

      {/* メッセージ入力エリア */}
      {!isCompleted && (
        <div className="border-t border-gray-200 px-4 py-3 bg-white">
          {sendError && (
            <p role="alert" className="text-xs text-red-600 mb-2">
              {sendError}
            </p>
          )}
          <div className="flex items-end gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="メッセージを入力..."
              rows={1}
              aria-label="メッセージ入力"
              className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 overflow-y-auto"
              style={{ minHeight: "40px" }}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isSending}
              aria-label="送信"
              className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isSending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
