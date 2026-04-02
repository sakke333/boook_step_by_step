// ログイン画面
// Googleログインボタンのみのシンプルな実装（要件1.1, 1.5, 1.6）

import { signIn } from "../../../../auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// URLパラメータの型定義
interface LoginPageProps {
  searchParams: { error?: string };
}

// エラーコードに対応する日本語メッセージ
function getErrorMessage(error: string | undefined): string | null {
  if (!error) return null;

  switch (error) {
    case "OAuthSignin":
    case "OAuthCallback":
    case "OAuthCreateAccount":
      return "Googleログインに失敗しました。もう一度お試しください。";
    case "AccessDenied":
      return "アクセスが拒否されました。";
    case "Configuration":
      return "認証設定にエラーがあります。管理者にお問い合わせください。";
    default:
      return "ログインに失敗しました。もう一度お試しください。";
  }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const errorMessage = getErrorMessage(searchParams.error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* アプリタイトル */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            教科書シェアリング
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            大学生のための教科書シェアリングアプリ
          </p>
        </div>

        {/* エラーメッセージ（認証失敗時に表示） */}
        {errorMessage && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
          >
            {errorMessage}
          </div>
        )}

        {/* Googleログインフォーム */}
        <form
          action={async () => {
            "use server";
            try {
              // Google OAuthフローを開始する（要件1.1）
              await signIn("google", { redirectTo: "/books" });
            } catch (error) {
              // NextAuthのリダイレクトエラーは再スローする
              if (error instanceof AuthError) {
                redirect(`/login?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {/* Googleアイコン */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Googleでログイン
          </button>
        </form>
      </div>
    </div>
  );
}
