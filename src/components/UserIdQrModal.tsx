"use client";

// ユーザーIDのQRコードを表示するモーダル
// qrcode ライブラリを使ってcanvasにQRコードを描画する

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface UserIdQrModalProps {
  userId: string;
  onClose: () => void;
}

export default function UserIdQrModal({ userId, onClose }: UserIdQrModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, userId, {
        width: 240,
        margin: 2,
        color: { dark: "#1c1917", light: "#ffffff" },
      });
    }
  }, [userId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 mx-4 w-full max-w-xs text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-900">あなたのQRコード</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>

        {/* QRコードcanvas */}
        <div className="flex justify-center mb-4">
          <canvas ref={canvasRef} className="rounded-lg" />
        </div>

        <p className="text-xs text-gray-500 mb-2">
          このQRコードを相手にスキャンしてもらうと<br />トークンを送ってもらえます
        </p>
        <p className="text-xs font-mono text-gray-400 break-all">{userId}</p>
      </div>
    </div>
  );
}
