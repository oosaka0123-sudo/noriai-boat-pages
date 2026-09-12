# 東丸 / AZUMAMARU — HANDOFF

更新日: 2026-09-12

## 正本
- Repository: `oosaka0123-sudo/noriai-boat-pages`
- Branch: `main`
- GitHub Pages: `https://oosaka0123-sudo.github.io/noriai-boat-pages/`

## 現在地
- トップページ: `index.html`
- 予約デモ: `reservation.html`
- 釣果ページ: `catches.html`
- トップのヒーローは船の動画 `media/hero-boat.mp4`
- 釣果サンプル画像は `media/catch-sample-01.webp` / `02.webp`
- 2026-09-11に釣果サンプル画像復旧とキャッシュ対策を実施
- 2026-09-12にトップページから専用釣果ページ `catches.html` への導線を強化

## 重要方針
- デモ段階では実在する船の確定情報を推測で追加しない
- デザイン性・見やすさ・使いやすさを優先
- ヒーローは海を進む船動画
- スクロール後にヘッダーを見せる構成
- 予約は「東丸専用予約 + 外部決済」のハイブリッド案を本命として検討
- 釣果はLINEを入口にし、東丸サイト側をデータの正本にする方針

## 次にやること
1. `catches.html` の古いナビリンク（`index.html#plans`, `index.html#access`）を現行トップ構成へ合わせる
2. 予約画面とトップのヘッダー/フッター表現を統一する
3. モバイル表示でトップ→釣果→予約の導線をQA
4. 実船情報（港、料金、定員、対象魚、電話/SNS等）が確定したらデモ表記を本番情報へ置換
5. 予約バックエンド、残席管理、通知、決済連携は本番仕様決定後に実装

## 最新コミット
- `d22345a5dd74be9e7bd8e714e6d9b4a4261f598a` — Improve catch page navigation from homepage
