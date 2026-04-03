"use client";

// QRコードスキャナーコンポーネント
// getUserMedia で取得したカメラ映像を <video> に表示しつつ、
// jsQR でフレームごとにQRコードを解析する

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

interface QrScannerProps {
  onScan: (text: string) => void;
  onClose: () => void;
}

export default function QrScanner({ onScan, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const scannedRef = useRef(false); // 二重コールバック防止
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    // カメラストリームを取得して <video> に接続
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        startScan();
      })
      .catch(() => {
        if (active) setCameraError("カメラへのアクセスが拒否されました");
      });

    // フレームごとにQRコードを解析するループ
    function startScan() {
      const tick = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || scannedRef.current) return;

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            scannedRef.current = true;
            stopCamera();
            onScan(code.data.trim());
            return;
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      active = false;
      stopCamera();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopCamera() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm mx-4">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-900">QRコードをスキャン</p>
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>

        {/* カメラ映像 */}
        {cameraError ? (
          <div className="p-6 text-center text-sm text-red-600">{cameraError}</div>
        ) : (
          <div className="relative w-full bg-black" style={{ aspectRatio: "1 / 1" }}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            {/* スキャン枠のオーバーレイ */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-white rounded-lg opacity-70" />
            </div>
          </div>
        )}

        {/* 非表示canvas（QR解析用） */}
        <canvas ref={canvasRef} className="hidden" />

        <p className="text-xs text-center text-gray-500 py-3 px-4">
          QRコードを枠内に合わせてください
        </p>
      </div>
    </div>
  );
}
