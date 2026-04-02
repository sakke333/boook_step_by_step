"use client";

// 本の出品登録フォーム画面（要件2.1, 2.4）
// クライアントコンポーネントとして実装し、useStateでフォーム状態を管理する

import { useState } from "react";
import { useRouter } from "next/navigation";

// 本の状態の選択肢
const CONDITION_OPTIONS = [
  { value: "", label: "選択してください" },
  { value: "良好", label: "良好（書き込みなし・きれい）" },
  { value: "普通", label: "普通（多少の使用感あり）" },
  { value: "傷あり", label: "傷あり（書き込み・折れ目あり）" },
];

// フォームの入力値の型定義
interface FormValues {
  title: string;
  author: string;
  isbn: string;
  condition: string;
  location: string;
  availableTime: string;
  description: string;
}

// バリデーションエラーの型定義
interface FormErrors {
  title?: string;
  location?: string;
}

export default function RegisterPage() {
  const router = useRouter();

  // フォームの入力値を管理するstate
  const [values, setValues] = useState<FormValues>({
    title: "",
    author: "",
    isbn: "",
    condition: "",
    location: "",
    availableTime: "",
    description: "",
  });

  // バリデーションエラーを管理するstate
  const [errors, setErrors] = useState<FormErrors>({});

  // API呼び出し中のローディング状態
  const [isSubmitting, setIsSubmitting] = useState(false);

  // APIエラーメッセージ（トースト的な表示）
  const [apiError, setApiError] = useState<string | null>(null);

  // 入力値の変更ハンドラー
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // 入力時にそのフィールドのエラーをクリアする
    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // フォームのバリデーション（要件2.4: 必須項目チェック）
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!values.title.trim()) {
      newErrors.title = "タイトルは必須です";
    }
    if (!values.location.trim()) {
      newErrors.location = "受け渡し希望場所は必須です";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // バリデーション失敗時は送信しない
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // POST /api/books で本の出品登録を行う
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title.trim(),
          author: values.author.trim() || undefined,
          isbn: values.isbn.trim() || undefined,
          condition: values.condition,
          location: values.location.trim(),
          availableTime: values.availableTime.trim() || undefined,
          description: values.description.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          (data as { message?: string }).message ?? "登録に失敗しました"
        );
      }

      // 登録成功後は本の一覧画面へリダイレクトする
      router.push("/books");
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "登録中にエラーが発生しました"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">本を登録</h1>

      {/* APIエラーメッセージ（トースト的な表示） */}
      {apiError && (
        <div
          role="alert"
          className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* タイトル（必須） */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            タイトル
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            placeholder="例：線形代数学入門"
            className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-white"
            }`}
          />
          {/* インラインバリデーションエラー */}
          {errors.title && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        {/* 著者名 */}
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            著者名
          </label>
          <input
            id="author"
            name="author"
            type="text"
            value={values.author}
            onChange={handleChange}
            placeholder="例：山田 太郎"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ISBN */}
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ISBN
          </label>
          <input
            id="isbn"
            name="isbn"
            type="text"
            value={values.isbn}
            onChange={handleChange}
            placeholder="例：978-4-XXXXXXXXX-X"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 状態 */}
        <div>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            状態
          </label>
          <select
            id="condition"
            name="condition"
            value={values.condition}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CONDITION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 受け渡し希望場所（必須） */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            受け渡し希望場所
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={values.location}
            onChange={handleChange}
            placeholder="例：A棟1階ロビー、図書館前"
            className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-white"
            }`}
          />
          {/* インラインバリデーションエラー */}
          {errors.location && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.location}
            </p>
          )}
        </div>

        {/* 受け渡し可能時間 */}
        <div>
          <label
            htmlFor="availableTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            受け渡し可能時間
          </label>
          <input
            id="availableTime"
            name="availableTime"
            type="text"
            value={values.availableTime}
            onChange={handleChange}
            placeholder="例：月〜金の12時〜13時、授業後の夕方なら可"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 説明文 */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            説明文
          </label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={4}
            placeholder="本の状態や補足情報を入力してください"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "登録中..." : "登録する"}
        </button>
      </form>
    </div>
  );
}
