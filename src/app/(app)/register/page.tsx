"use client";

// 本の登録フォーム画面
// 「渡せる本」と「ほしい本」をタブで切り替えて登録できる

import { useState } from "react";
import { useRouter } from "next/navigation";

// 登録モードの型
type RegisterMode = "give" | "wish";

// 本の状態の選択肢（渡せる本のみ使用）
const CONDITION_OPTIONS = [
  { value: "", label: "選択してください" },
  { value: "良好", label: "良好（書き込みなし・きれい）" },
  { value: "普通", label: "普通（多少の使用感あり）" },
  { value: "傷あり", label: "傷あり（書き込み・折れ目あり）" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [mode, setMode] = useState<RegisterMode>("give");

  // 渡せる本フォームの状態
  const [giveValues, setGiveValues] = useState({
    title: "", author: "", isbn: "", condition: "",
    location: "", availableTime: "", description: "",
  });
  const [giveErrors, setGiveErrors] = useState<{ title?: string; location?: string }>({});

  // ほしい本フォームの状態
  const [wishValues, setWishValues] = useState({
    title: "", author: "", isbn: "", description: "",
  });
  const [wishErrors, setWishErrors] = useState<{ title?: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // モード切り替え時にエラーをリセット
  const handleModeChange = (newMode: RegisterMode) => {
    setMode(newMode);
    setApiError(null);
    setGiveErrors({});
    setWishErrors({});
  };

  // 渡せる本フォームの送信
  const handleGiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const errors: { title?: string; location?: string } = {};
    if (!giveValues.title.trim()) errors.title = "タイトルは必須です";
    if (!giveValues.location.trim()) errors.location = "受け渡し希望場所は必須です";
    setGiveErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: giveValues.title.trim(),
          author: giveValues.author.trim() || undefined,
          isbn: giveValues.isbn.trim() || undefined,
          condition: giveValues.condition,
          location: giveValues.location.trim(),
          availableTime: giveValues.availableTime.trim() || undefined,
          description: giveValues.description.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "登録に失敗しました");
      }
      router.push("/books");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "登録中にエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ほしい本フォームの送信
  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const errors: { title?: string } = {};
    if (!wishValues.title.trim()) errors.title = "タイトルは必須です";
    setWishErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wishlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: wishValues.title.trim(),
          author: wishValues.author.trim() || undefined,
          isbn: wishValues.isbn.trim() || undefined,
          description: wishValues.description.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "登録に失敗しました");
      }
      router.push("/books?mode=wishlist");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "登録中にエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">本を登録</h1>

      {/* タブ切り替え */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-6">
        <button
          type="button"
          onClick={() => handleModeChange("give")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === "give"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          渡せる本を登録
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("wish")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === "wish"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          ほしい本を登録
        </button>
      </div>

      {/* APIエラー */}
      {apiError && (
        <div role="alert" className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {apiError}
        </div>
      )}

      {/* 渡せる本フォーム */}
      {mode === "give" && (
        <form onSubmit={handleGiveSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              id="title" name="title" type="text"
              value={giveValues.title}
              onChange={(e) => setGiveValues((p) => ({ ...p, title: e.target.value }))}
              placeholder="例：線形代数学入門"
              className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${giveErrors.title ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
            />
            {giveErrors.title && <p role="alert" className="mt-1 text-xs text-red-600">{giveErrors.title}</p>}
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">著者名</label>
            <input id="author" name="author" type="text" value={giveValues.author}
              onChange={(e) => setGiveValues((p) => ({ ...p, author: e.target.value }))}
              placeholder="例：山田 太郎"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
            <input id="isbn" name="isbn" type="text" value={giveValues.isbn}
              onChange={(e) => setGiveValues((p) => ({ ...p, isbn: e.target.value }))}
              placeholder="例：978-4-XXXXXXXXX-X"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">状態</label>
            <select id="condition" name="condition" value={giveValues.condition}
              onChange={(e) => setGiveValues((p) => ({ ...p, condition: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CONDITION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              受け渡し希望場所 <span className="text-red-500">*</span>
            </label>
            <input id="location" name="location" type="text" value={giveValues.location}
              onChange={(e) => setGiveValues((p) => ({ ...p, location: e.target.value }))}
              placeholder="例：A棟1階ロビー、図書館前"
              className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${giveErrors.location ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
            />
            {giveErrors.location && <p role="alert" className="mt-1 text-xs text-red-600">{giveErrors.location}</p>}
          </div>
          <div>
            <label htmlFor="availableTime" className="block text-sm font-medium text-gray-700 mb-1">受け渡し可能時間</label>
            <input id="availableTime" name="availableTime" type="text" value={giveValues.availableTime}
              onChange={(e) => setGiveValues((p) => ({ ...p, availableTime: e.target.value }))}
              placeholder="例：月〜金の12時〜13時"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">説明文</label>
            <textarea id="description" name="description" value={giveValues.description}
              onChange={(e) => setGiveValues((p) => ({ ...p, description: e.target.value }))}
              rows={4} placeholder="本の状態や補足情報を入力してください"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <button type="submit" disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "登録中..." : "渡せる本として登録する"}
          </button>
        </form>
      )}

      {/* ほしい本フォーム */}
      {mode === "wish" && (
        <form onSubmit={handleWishSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="wish-title" className="block text-sm font-medium text-gray-700 mb-1">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input id="wish-title" type="text" value={wishValues.title}
              onChange={(e) => setWishValues((p) => ({ ...p, title: e.target.value }))}
              placeholder="例：線形代数学入門"
              className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 ${wishErrors.title ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
            />
            {wishErrors.title && <p role="alert" className="mt-1 text-xs text-red-600">{wishErrors.title}</p>}
          </div>
          <div>
            <label htmlFor="wish-author" className="block text-sm font-medium text-gray-700 mb-1">著者名</label>
            <input id="wish-author" type="text" value={wishValues.author}
              onChange={(e) => setWishValues((p) => ({ ...p, author: e.target.value }))}
              placeholder="例：山田 太郎"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="wish-isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
            <input id="wish-isbn" type="text" value={wishValues.isbn}
              onChange={(e) => setWishValues((p) => ({ ...p, isbn: e.target.value }))}
              placeholder="例：978-4-XXXXXXXXX-X"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="wish-description" className="block text-sm font-medium text-gray-700 mb-1">補足情報</label>
            <textarea id="wish-description" value={wishValues.description}
              onChange={(e) => setWishValues((p) => ({ ...p, description: e.target.value }))}
              rows={4} placeholder="どんな状態でも可、など補足があれば"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>
          <button type="submit" disabled={isSubmitting}
            className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "登録中..." : "ほしい本として登録する"}
          </button>
        </form>
      )}
    </div>
  );
}
