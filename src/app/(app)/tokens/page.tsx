"use client";

// トークン残高・履歴・送付画面
// 要件7.1: QRコードまたはuser_id直接入力でトークン送付先を指定できる
// 要件7.5: トークン残高とToken_Transaction履歴を確認できる画面を提供する

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

interface TokenTransaction {
  id: string;
  amount: number;
  note: string | null;
  createdAt: string;
  fromUserId: string | null;
  fromUser: { id: string; name: string | null; image: string | null } | null;
  toUserId: string;
  toUser: { id: string; name: string | null; image: string | null };
}

interface TokenHistoryResponse {
  balance: number;
  transactions: TokenTransaction[];
}

export default function TokensPage() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [toUserId, setToUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tokens/history", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { message?: string }).message ?? "データの取得に失敗しました");
        return;
      }
      const data: TokenHistoryResponse = await res.json();
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch {
      setError("データの取得に失敗しました。再度お試しください。");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    setSendSuccess(null);

    const trimmedUserId = toUserId.trim();
    if (!trimmedUserId) {
      setSendError("送付先のユーザーIDを入力してください");
      return;
    }

    const parsedAmount = parseInt(amount, 10);
    if (!amount || isNaN(parsedAmount) || parsedAmount < 1 || String(parsedAmount) !== amount.trim()) {
      setSendError("送付額は1以上の整数を入力してください");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/tokens/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toUserId: trimmedUserId, amount: parsedAmount }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSendError((data as { message?: string }).message ?? "送付に失敗しました");
        return;
      }

      setToUserId("");
      setAmount("");
      setSendSuccess(`${parsedAmount} トークンを送付しました`);
      await fetchHistory();
    } catch {
      setSendError("送付に失敗しました。再度お試しください。");
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">トークン</h1>

      {!isLoading && !error && (
      <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
        <p style={{ fontSize: "12px", color: "#713f12", marginBottom: "4px", fontWeight: 600 }}>あなたのユーザーID</p>
        <p style={{ fontSize: "13px", fontFamily: "monospace", color: "#1c1917", wordBreak: "break-all" }}>
          {currentUserId !== undefined ? currentUserId : "セッション読み込み中..."}
        </p>
        <p style={{ fontSize: "11px", color: "#92400e", marginTop: "4px" }}>このIDを相手に伝えるとトークンを受け取れます</p>
      </div>
      )}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && !isLoading && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
          <button onClick={fetchHistory} className="ml-2 underline hover:no-underline">
            再試行
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">現在のトークン残高</p>
            <p className="text-5xl font-bold text-blue-700">{balance}</p>
            <p className="text-sm text-blue-500 mt-1">トークン</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">トークンを送付する</h2>

            <button
              type="button"
              disabled
              className="w-full mb-4 py-2 px-4 border border-dashed border-gray-300 rounded-lg text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
            >
              QRコード読み取り（準備中）
            </button>

            <form onSubmit={handleSend} noValidate>
              <div className="mb-3">
                <label htmlFor="toUserId" className="block text-sm font-medium text-gray-700 mb-1">
                  送付先ユーザーID
                </label>
                <input
                  id="toUserId"
                  type="text"
                  value={toUserId}
                  onChange={(e) => setToUserId(e.target.value)}
                  placeholder="送付先のユーザーIDを入力"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  送付額
                </label>
                <input
                  id="amount"
                  type="number"
                  min={1}
                  step={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1以上の整数を入力"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {sendError && (
                <p role="alert" className="text-sm text-red-600 mb-3">{sendError}</p>
              )}

              {sendSuccess && (
                <p role="status" className="text-sm text-green-600 mb-3">{sendSuccess}</p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {isSending ? "送付中..." : "送付する"}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">取引履歴</h2>

            {transactions.length === 0 ? (
              <p className="text-center text-gray-500 py-8 text-sm">
                取引履歴はありません
              </p>
            ) : (
              <ul className="space-y-2">
                {transactions.map((tx) => {
                  const isSent = tx.fromUserId === currentUserId;
                  const counterpart = isSent ? tx.toUser : tx.fromUser;
                  const counterpartName = counterpart?.name ?? "不明なユーザー";

                  return (
                    <li
                      key={tx.id}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{counterpartName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{formatDate(tx.createdAt)}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-1 ${
                            isSent ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                          }`}
                        >
                          {isSent ? "送付" : "受取"}
                        </span>
                        <p className={`text-sm font-bold ${isSent ? "text-red-600" : "text-green-600"}`}>
                          {isSent ? "-" : "+"}{tx.amount}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
