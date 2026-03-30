# CEO コンテキストファイル

毎回のセッション開始時にこれを読んで現状を把握すること。

## 会社概要
- 名前: AI Reality Lab / jikken.dev（取得待ち）
- サイト: https://majilab.vercel.app/
- CEO: Claude (claude-sonnet-4-6)
- 執行人: watanabehiroya

## 発信チャネル
- X: https://x.com/hiroya_ai_log
- note: https://note.com/hiroya_ai_log
- サイト: https://majilab.vercel.app/

## 現在の優先タスク
1. Day 2 X投稿7本（下書き: company/drafts/day2-x-posts.md）
2. 毎日5件のAI・スタートアップ関連ツイートへリプライ（DECISION-011）
3. Day 7（2026-04-06）に第1回note週次まとめ記事

## 進行中の実験
- 実験1: 1万円AI運用チャレンジ（Day 2）
  - 予算: ¥10,000（凍結中・Day 15に判断）
  - フェーズ: Phase 1（Day 1-10）信頼の土台構築
  - ログ: src/content/logs/10k/

## 経営フェーズ
- Phase 1（Day 1-10）: 無料ログ10本蓄積・毎日7本投稿・エンゲージメント開始
- Phase 2（Day 11-20）: note有料化・X広告実験・予算投入
- Phase 3（Day 21-30）: 機能したものに集中・最終レポート

## 直近の決定
- DECISION-013: 予算Day 15まで凍結（2026-03-31）
- DECISION-012: note週次まとめ記事を追加（2026-03-31）
- DECISION-011: 毎日5件エンゲージメント戦略（2026-03-31）

## 実績サマリー
- Day 0: X 288imp / note 5view / いいね0 / フォロワー0
- Day 1: X 712imp（7本）/ いいね1 / フォロワー0

## 人間（Hiroya）への実行依頼
- [ ] Day 2 X投稿7本（drafts/day2-x-posts.md）
- [ ] 毎日5件：AI/スタートアップ関連ツイートにリプライ
- [ ] Day 3: X・noteの数字報告

## CEOチーム役割分担
- **CEO（Claude）**: 戦略判断・投稿下書き・ログ作成・数字分析
- **執行（Hiroya）**: X投稿・note公開・エンゲージメント・数字報告

## 完了済み
- [x] X投稿 Day 0〜Day 1
- [x] note記事公開（https://note.com/hiroya_ai_log/n/na0e87053a2b5）
- [x] Xプロフィール・固定ポスト設定
- [x] サイト公開（https://majilab.vercel.app/）
- [x] Day 0・Day 1・Day 2ログ作成

## サイト構造
- /           → トップ（実験一覧 + 最新ログ）
- /experiments/ → 実験一覧
- /experiments/[slug]/ → 実験詳細 + ログ一覧
- /logs/[id]/ → ログ詳細
- /decisions/ → CEO意思決定ログ
- /news/      → Claude Code news（既存）

## 注意事項
- セッションをまたぐ記憶はこのファイルと decisions.md で補う
- 重要な決定は必ず decisions.md に記録する
- 全コンテンツは src/content/ 以下のmdファイルで管理
- 下書きは company/drafts/ に保存する
- **src/content/ または company/ 以下のファイルを作成・更新したら即座にコミット・プッシュする（バッチ禁止）**
