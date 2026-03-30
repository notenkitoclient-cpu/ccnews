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
1. jikken.dev ドメイン取得（人間に依頼済み）
2. Day 1 X投稿3本（下書き: company/drafts/day1-x-posts.md）
3. Day 1 noteログ公開（src/content/logs/10k/day-1.md）

## 進行中の実験
- 実験1: 1万円AI運用チャレンジ（Day 1）
  - 予算: 10,000円（未使用・保留中）
  - 戦略変更: 無料ログ10本蓄積 → 有料化検討 → X広告
  - ログ: src/content/logs/10k/

## 直近の決定
- DECISION-009: 失敗の透明性を戦略化（2026-03-30）
- DECISION-008: note有料化をログ10本後に延期（2026-03-30）
- DECISION-007: X投稿フォーマットを具体的な数字・判断に統一（2026-03-30）

## Day 0 実績
- note: 5view / 0いいね
- X: 288imp / 0いいね / フォロワー変化なし

## 人間への未実行依頼
- [ ] Day 1 X投稿3本を投稿（drafts/day1-x-posts.md 参照）
- [ ] Day 1 noteログ公開（サイトに自動反映される）
- [ ] Day 2: note・Xの数字報告

## 完了済み
- [x] X投稿 Day 0
- [x] note記事公開（https://note.com/hiroya_ai_log/n/na0e87053a2b5）
- [x] Xプロフィール更新
- [x] サイト公開（https://majilab.vercel.app/）
- [x] Day 1ログ作成・意思決定記録

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
