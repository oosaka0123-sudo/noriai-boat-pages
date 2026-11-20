# 東丸 AZUMAMARU — 独立サイト構築（2026-11-20）

## 正本・公開先
- 正本 GitHub: oosaka0123-sudo/noriai-boat-pages
- 既存デモ: https://oosaka0123-sudo.github.io/noriai-boat-pages/
- 新しいロリポップ公開予定: https://azuma.rss7.net/ 公開フォルダ azuma
- 和歌山雑賀クラブとは別の船宿サイト。写真、釣果、会員、個人情報、予約管理を一切共用しない。
- このブランチはデモ。GitHub Pages本番へマージしない。船の確定情報を勝手に書かない。

## 画面構成
- index.html：既存トップの背景動画、出船案内、船の紹介、釣果サンプル、予約導線を維持。
- plans.html：乗船プラン概念。乗合・仕立て可否も未確定。
- catches.html：釣果情報。実釣果とサンプル画像を明確に分離。
- guide.html：一般的な出船前の準備・安全ガイド。
- access.html：港名・集合場所・駐車場の確定待ち。
- reservation.html：個人情報を送信しない予約UIデモ。予約・空席確保・決済は一切実行しない。
- api/catches.php：東丸独立の読み取り専用釣果API。登録が無い場合は空配列を返す。
- api/data/.htaccess：直接データを読むことを禁止。LINE連携や管理機能は未接続。

## ロリポップ配備
1. サブドメイン azuma.rss7.net の公開フォルダ azuma が保存されたか管理画面で確認。
2. 無料独自SSLを有効化してHTTPS接続確認。
3. Actionsの azumamaru-lolipop-staging-zip からZIPを入手し、内部ファイルを /azuma/ に展開。/azuma/azuma/ にしない。
4. トップ・各ページ・動画・モバイルメニュー・PHP読み取りAPIを実機確認。
5. このデモの .htaccess と robots.txt は noindex を意図的に設定。実情報が整うまで解除しない。
6. 雑賀クラブ用ZIPと混同しない。ソース共有も禁止。

## 本番前に確定すべき情報
- 出船港・集合場所・駐車位置と出船時刻
- 船写真・船体仕様・定員・設備・料金・魚種
- 乗合・仕立て可否、レンタルと持ち物
- 予約方法、連絡先、決済・キャンセル規定
- 承諾を得た実際の釣果写真と投稿担当者

本ドキュメントはデモサイトの配備準備であり、公開・実予約・LINE連携の完了を示さない。
