/**
 * Claude Code 情報収集スクリプト
 *
 * 収集ソース:
 *   1. Anthropic 公式ブログ RSS
 *   2. claude-code GitHub リリース
 *
 * 新情報があれば:
 *   - src/content/news/ に Markdown ファイルを生成
 *   - Resend 経由でメール配信
 */

import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'ccnews <news@ccnews.dev>';
const SITE_URL = process.env.SITE_URL || 'https://ccnews.dev';

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const resend = new Resend(RESEND_API_KEY);

const CONTENT_DIR = path.join(process.cwd(), 'src/content/news');
const SEEN_FILE = path.join(process.cwd(), 'scripts/.seen.json');

// ── 既出チェック ──────────────────────────────────────────────
function loadSeen(): Set<string> {
  if (!fs.existsSync(SEEN_FILE)) return new Set();
  const data = JSON.parse(fs.readFileSync(SEEN_FILE, 'utf-8'));
  return new Set(data);
}

function saveSeen(seen: Set<string>) {
  fs.writeFileSync(SEEN_FILE, JSON.stringify([...seen], null, 2));
}

function hash(str: string) {
  return crypto.createHash('sha256').update(str).digest('hex').slice(0, 12);
}

// ── ソース1: Anthropic ブログ RSS ────────────────────────────
interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

async function fetchAnthropicBlog(): Promise<RssItem[]> {
  const res = await fetch('https://www.anthropic.com/rss.xml');
  const xml = await res.text();

  const items: RssItem[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of itemMatches) {
    const block = match[1];
    const title = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      || block.match(/<title>(.*?)<\/title>/)?.[1] || '';
    const link = block.match(/<link>(.*?)<\/link>/)?.[1] || '';
    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
    const description = block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1]
      || block.match(/<description>(.*?)<\/description>/)?.[1] || '';

    if (title && link) {
      items.push({ title, link, pubDate, description });
    }
  }

  // Claude Code 関連のみフィルタ
  return items.filter(item => {
    const text = (item.title + item.description).toLowerCase();
    return text.includes('claude') && (
      text.includes('code') ||
      text.includes('developer') ||
      text.includes('api') ||
      text.includes('model') ||
      text.includes('release') ||
      text.includes('update')
    );
  });
}

// ── ソース2: claude-code GitHub リリース ─────────────────────
interface GithubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
}

async function fetchGithubReleases(): Promise<GithubRelease[]> {
  const res = await fetch(
    'https://api.github.com/repos/anthropics/claude-code/releases?per_page=10',
    { headers: { Accept: 'application/vnd.github+json' } }
  );
  if (!res.ok) return [];
  return res.json();
}

// ── Claude API で要約 ─────────────────────────────────────────
async function summarize(title: string, body: string, source: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `以下の${source}の情報を、Claude Codeユーザー向けに日本語で1〜2文で簡潔に要約してください。技術的な内容は正確に、不要な前置きは不要です。

タイトル: ${title}
内容: ${body.slice(0, 2000)}`,
    }],
  });

  return (message.content[0] as { text: string }).text.trim();
}

// ── Markdown ファイル生成 ─────────────────────────────────────
function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function writeNewsFile(params: {
  title: string;
  date: Date;
  source: 'Anthropic Blog' | 'GitHub Release' | 'Docs' | 'Official';
  sourceUrl: string;
  summary: string;
}) {
  const dateStr = params.date.toISOString().split('T')[0];
  const slug = `${dateStr}-${toSlug(params.title).slice(0, 40)}`;
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) return filePath;

  const content = `---
title: "${params.title.replace(/"/g, '\\"')}"
date: ${dateStr}
source: "${params.source}"
sourceUrl: "${params.sourceUrl}"
summary: "${params.summary.replace(/"/g, '\\"')}"
---

${params.summary}
`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${slug}.md`);
  return filePath;
}

// ── メール配信 ───────────────────────────────────────────────
async function sendNewsletter(items: Array<{
  title: string;
  date: Date;
  source: string;
  sourceUrl: string;
  summary: string;
}>) {
  const listItems = items.map(item => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #f3f3f3;">
        <p style="margin: 0 0 4px 0; font-size: 11px; color: #aaa; font-family: monospace;">
          ${item.date.toLocaleDateString('ja-JP')} · ${item.source}
        </p>
        <a href="${item.sourceUrl}" style="color: #111; text-decoration: none; font-size: 14px; font-weight: 500;">
          ${item.title}
        </a>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #555; line-height: 1.6;">
          ${item.summary}
        </p>
      </td>
    </tr>
  `).join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; background: #fff; font-family: 'Inter', system-ui, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width: 560px;">
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid #f0f0f0;">
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #aaa; letter-spacing: 2px; text-transform: uppercase;">ccnews</p>
              <p style="margin: 0; font-size: 16px; color: #111; font-weight: 500;">Claude Code アップデート</p>
            </td>
          </tr>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${listItems}
          </table>
          <tr>
            <td style="padding-top: 32px; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 12px; color: #ccc;">
                <a href="${SITE_URL}" style="color: #999;">ccnews</a> ·
                <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #ccc;">配信停止</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const subject = items.length === 1
    ? items[0].title
    : `Claude Code: ${items.length}件の新着情報`;

  await resend.broadcasts.create({
    audienceId: RESEND_AUDIENCE_ID,
    from: RESEND_FROM_EMAIL,
    subject,
    html,
  }).then(async ({ data }) => {
    if (data?.id) {
      await resend.broadcasts.send(data.id);
      console.log(`📧 Newsletter sent: ${subject}`);
    }
  });
}

// ── メイン ───────────────────────────────────────────────────
async function main() {
  console.log('🔍 Collecting Claude Code news...');

  const seen = loadSeen();
  const newItems: Array<{
    title: string;
    date: Date;
    source: 'Anthropic Blog' | 'GitHub Release';
    sourceUrl: string;
    summary: string;
  }> = [];

  // Anthropic ブログ
  try {
    const blogItems = await fetchAnthropicBlog();
    for (const item of blogItems) {
      const id = hash(item.link);
      if (seen.has(id)) continue;

      const summary = await summarize(item.title, item.description, 'Anthropic Blog');
      const date = item.pubDate ? new Date(item.pubDate) : new Date();

      writeNewsFile({
        title: item.title,
        date,
        source: 'Anthropic Blog',
        sourceUrl: item.link,
        summary,
      });

      newItems.push({ title: item.title, date, source: 'Anthropic Blog', sourceUrl: item.link, summary });
      seen.add(id);
    }
  } catch (e) {
    console.error('Blog fetch error:', e);
  }

  // GitHub リリース
  try {
    const releases = await fetchGithubReleases();
    for (const release of releases) {
      const id = hash(release.html_url);
      if (seen.has(id)) continue;

      const title = release.name || release.tag_name;
      const summary = await summarize(title, release.body || '', 'GitHub Release');
      const date = new Date(release.published_at);

      writeNewsFile({
        title: `Claude Code ${title}`,
        date,
        source: 'GitHub Release',
        sourceUrl: release.html_url,
        summary,
      });

      newItems.push({ title: `Claude Code ${title}`, date, source: 'GitHub Release', sourceUrl: release.html_url, summary });
      seen.add(id);
    }
  } catch (e) {
    console.error('GitHub fetch error:', e);
  }

  saveSeen(seen);
  console.log(`\n📰 New items: ${newItems.length}`);

  if (newItems.length > 0 && RESEND_API_KEY && RESEND_AUDIENCE_ID) {
    await sendNewsletter(newItems);
  }
}

main().catch(console.error);
