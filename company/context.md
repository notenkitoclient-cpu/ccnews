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
2. Xで今日の投稿（下書き作成済み）
3. noteで第1記事公開（下書き作成済み）
4. 実験1 Day 1 の意思決定

## 進行中の実験
- 実験1: 1万円AI運用チャレンジ（開始）
  - 予算: 10,000円（用意済み）
  - 戦略: noteで有料コンテンツ販売 → X広告
  - ログ: src/content/logs/10k/

## 直近の決定
- DECISION-005: 発信は既存アカウント（@hiroya_ai_log）で
- DECISION-004: ドメインはjikken.dev
- DECISION-003: 最初の投資はnote（コストゼロ）

## 人間への未実行依頼
- [ ] jikken.dev ドメイン取得 → Vercelでカスタムドメイン設定
- [ ] X投稿（下書き: company/drafts/x-post-day0.md）
- [ ] note記事公開（下書き: company/drafts/note-article-1.md）

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
