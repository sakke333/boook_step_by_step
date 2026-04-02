// 予約機能のユニットテスト
// 要件4.5: 有効なReservationがある本の削除時の確認ダイアログ

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// next/link をモック化する
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// next/navigation をモック化する
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({ push: mockPush })),
}));

// next-auth/react をモック化する
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({
    data: { user: { id: "giver-user-id", name: "Giver User" } },
    status: "authenticated",
  })),
}));

// BookDetailPage コンポーネントをインポートする
import BookDetailPage from "../../src/app/(app)/books/[id]/page";

// ============================================================
// 要件4.5: 有効なReservationがある本の削除時の確認ダイアログ
// ============================================================

describe("BookDetailPage コンポーネント", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mockPush.mockClear();
    // 各テスト前にGiverとしてのセッションモックをリセットする
    const { useSession } = await import("next-auth/react");
    vi.mocked(useSession).mockReturnValue({
      data: { user: { id: "giver-user-id", name: "Giver User", email: "g@test.com" }, expires: "" },
      status: "authenticated",
      update: vi.fn(),
    });
  });

  describe("要件4.5: 有効なReservationがある本の削除時の確認ダイアログ", () => {
    // ACTIVEな予約がある場合、削除ボタン押下で確認ダイアログが表示されること
    it("ACTIVEな予約がある場合、削除ボタン押下で確認ダイアログが表示されること", async () => {
      // GiverとしてログインしてACTIVEな予約がある本を表示する
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          id: "book-1",
          title: "線形代数学入門",
          author: "山田太郎",
          isbn: null,
          condition: "良好",
          location: "図書館前",
          availableTime: null,
          description: null,
          status: "RESERVED",
          createdAt: new Date().toISOString(),
          giver: { id: "giver-user-id", name: "Giver User", image: null },
          reservation: { id: "res-1", status: "ACTIVE", receiverId: "receiver-user-id" },
        }),
      });

      render(<BookDetailPage params={{ id: "book-1" }} />);

      // 削除ボタンが表示されるまで待機する
      const deleteButton = await screen.findByRole("button", { name: /この出品を削除する/ });
      expect(deleteButton).toBeDefined();

      // 削除ボタンをクリックする
      fireEvent.click(deleteButton);

      // 確認ダイアログが表示されることを確認する
      const dialog = await screen.findByRole("dialog");
      expect(dialog).toBeDefined();

      // ダイアログに確認メッセージが表示されること
      expect(screen.getByText(/有効な予約があります/)).toBeDefined();
    });

    // 確認ダイアログで「削除する」を選択した場合のみDELETE APIが呼ばれること
    it("確認ダイアログで「削除する」を選択した場合のみDELETE APIが呼ばれること", async () => {
      const fetchMock = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({
            id: "book-1",
            title: "線形代数学入門",
            author: null,
            isbn: null,
            condition: "良好",
            location: "図書館前",
            availableTime: null,
            description: null,
            status: "RESERVED",
            createdAt: new Date().toISOString(),
            giver: { id: "giver-user-id", name: "Giver User", image: null },
            reservation: { id: "res-1", status: "ACTIVE", receiverId: "receiver-user-id" },
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 204,
          json: async () => ({}),
        });

      global.fetch = fetchMock;

      render(<BookDetailPage params={{ id: "book-1" }} />);

      // 削除ボタンが表示されるまで待機する
      const deleteButton = await screen.findByRole("button", { name: /この出品を削除する/ });
      fireEvent.click(deleteButton);

      // 確認ダイアログが表示されることを確認する
      await screen.findByRole("dialog");

      // 「削除する」ボタンをクリックする
      const confirmButton = screen.getByRole("button", { name: /^削除する$/ });
      fireEvent.click(confirmButton);

      // DELETE APIが呼ばれることを確認する
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith("/api/books/book-1", { method: "DELETE" });
      });
    });

    // 確認ダイアログで「キャンセル」を選択した場合はDELETE APIが呼ばれないこと
    it("確認ダイアログで「キャンセル」を選択した場合はDELETE APIが呼ばれないこと", async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          id: "book-1",
          title: "線形代数学入門",
          author: null,
          isbn: null,
          condition: "良好",
          location: "図書館前",
          availableTime: null,
          description: null,
          status: "RESERVED",
          createdAt: new Date().toISOString(),
          giver: { id: "giver-user-id", name: "Giver User", image: null },
          reservation: { id: "res-1", status: "ACTIVE", receiverId: "receiver-user-id" },
        }),
      });

      global.fetch = fetchMock;

      render(<BookDetailPage params={{ id: "book-1" }} />);

      // 削除ボタンが表示されるまで待機する
      const deleteButton = await screen.findByRole("button", { name: /この出品を削除する/ });
      fireEvent.click(deleteButton);

      // 確認ダイアログが表示されることを確認する
      await screen.findByRole("dialog");

      // 「キャンセル」ボタンをクリックする
      const cancelButton = screen.getByRole("button", { name: /キャンセル/ });
      fireEvent.click(cancelButton);

      // ダイアログが閉じることを確認する
      await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
      });

      // DELETE APIが呼ばれていないことを確認する（初回のGETのみ）
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    // AVAILABLEな本（予約なし）の場合、削除ボタン押下で確認ダイアログが表示されないこと
    it("予約がない本の場合、削除ボタン押下で確認ダイアログが表示されないこと", async () => {
      const fetchMock = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({
            id: "book-2",
            title: "微分積分学",
            author: null,
            isbn: null,
            condition: "普通",
            location: "工学部棟",
            availableTime: null,
            description: null,
            status: "AVAILABLE",
            createdAt: new Date().toISOString(),
            giver: { id: "giver-user-id", name: "Giver User", image: null },
            reservation: null,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 204,
          json: async () => ({}),
        });

      global.fetch = fetchMock;

      render(<BookDetailPage params={{ id: "book-2" }} />);

      // 削除ボタンが表示されるまで待機する
      const deleteButton = await screen.findByRole("button", { name: /この出品を削除する/ });
      fireEvent.click(deleteButton);

      // 確認ダイアログが表示されないことを確認する
      expect(screen.queryByRole("dialog")).toBeNull();

      // DELETE APIが直接呼ばれることを確認する
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith("/api/books/book-2", { method: "DELETE" });
      });
    });

    // AVAILABLEな本でGiverでない場合、予約ボタンが表示されること（要件4.1）
    it("AVAILABLEな本でGiverでない場合、予約ボタンが表示されること", async () => {
      // Receiverとしてログインする
      const { useSession } = await import("next-auth/react");
      vi.mocked(useSession).mockReturnValue({
        data: { user: { id: "receiver-user-id", name: "Receiver User", email: "r@test.com" }, expires: "" },
        status: "authenticated",
        update: vi.fn(),
      });

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          id: "book-3",
          title: "物理学概論",
          author: null,
          isbn: null,
          condition: "良好",
          location: "理学部棟",
          availableTime: null,
          description: null,
          status: "AVAILABLE",
          createdAt: new Date().toISOString(),
          giver: { id: "giver-user-id", name: "Giver User", image: null },
          reservation: null,
        }),
      });

      render(<BookDetailPage params={{ id: "book-3" }} />);

      // 予約ボタンが表示されることを確認する
      const reserveButton = await screen.findByRole("button", { name: /予約する/ });
      expect(reserveButton).toBeDefined();

      // 削除ボタンが表示されないことを確認する
      expect(screen.queryByRole("button", { name: /この出品を削除する/ })).toBeNull();
    });

    // GiverはAVAILABLEな本でも予約ボタンが表示されないこと（要件4.1）
    it("GiverはAVAILABLEな本でも予約ボタンが表示されないこと", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          id: "book-4",
          title: "化学基礎",
          author: null,
          isbn: null,
          condition: "良好",
          location: "化学棟",
          availableTime: null,
          description: null,
          status: "AVAILABLE",
          createdAt: new Date().toISOString(),
          giver: { id: "giver-user-id", name: "Giver User", image: null },
          reservation: null,
        }),
      });

      render(<BookDetailPage params={{ id: "book-4" }} />);

      // 本のタイトルが表示されるまで待機する
      await screen.findByText("化学基礎");

      // 予約ボタンが表示されないことを確認する
      expect(screen.queryByRole("button", { name: /予約する/ })).toBeNull();

      // 削除ボタンが表示されることを確認する
      expect(screen.getByRole("button", { name: /この出品を削除する/ })).toBeDefined();
    });
  });
});