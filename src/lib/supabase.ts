// Supabaseクライアントのシングルトン
// Supabase Realtimeによるリアルタイム通信に使用する

import { createClient } from "@supabase/supabase-js";

// 環境変数が設定されている場合のみクライアントを生成する
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
