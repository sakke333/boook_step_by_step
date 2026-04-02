// Vitestのグローバルセットアップファイル
// テスト実行前に共通の初期化処理を行う

import '@testing-library/jest-dom'

// jsdom環境でscrollIntoViewが未定義のためポリフィルを追加する
window.HTMLElement.prototype.scrollIntoView = function () {}
