"use client";

// グローバル通知リスナー
// Supabase Realtimeの notification チャンネルを購読し、
// 自分宛の通知をトーストで表示する

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";

interface NotificationPayload {
  type: "RESERVATION_CREATED" | "NEW_MESSAGE";
  targetUserId: string;
  bookTitle?: string;
  receiverName?: string;
  senderName?: string;
  reservationId?: string;
}

interface Toast {
  id: string;
  message: string;
  icon: string;
}

export default function NotificationListener() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const [toasts, setToasts] = useState<Toast[]>([]);

  // トーストを追加する
  const addToast = (message: string, icon: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, icon }]);
    // 5秒後に自動削除
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  // Supabase Realtimeの notification チャンネルを購読する
  useEffect(() => {
    if (!supabase || !currentUserId) return;

    const channel = supabase
      .channel("notification")
      .on("broadcast", { event: "notification" }, (payload) => {
        const data = payload.payload as NotificationPayload;

        // 自分宛の通知のみ処理する
        if (data.targetUserId !== currentUserId) return;

        if (data.type === "RESERVATION_CREATED") {
          addToast(
            `「${data.bookTitle}」が予約されました`,
            "📚"
          );
        } else if (data.type === "NEW_MESSAGE") {
          addToast(
            `${data.senderName ?? "相手"}からメッセージが届きました`,
            "💬"
          );
        }
      })
      .subscribe();

    return () => {
      supabase!.removeChannel(channel);
    };
  }, [currentUserId]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="flex items-center gap-3 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg pointer-events-auto"
        >
          <span className="text-lg">{toast.icon}</span>
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="text-gray-400 hover:text-white ml-2 flex-shrink-0"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
