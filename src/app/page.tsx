import { redirect } from 'next/navigation'

// ルートページはログイン画面へリダイレクトする
export default function Home() {
  redirect('/login')
}
