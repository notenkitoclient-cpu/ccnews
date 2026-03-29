import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    source: z.enum(['Anthropic Blog', 'GitHub Release', 'Docs', 'Official']),
    sourceUrl: z.string().url(),
    summary: z.string(),
  }),
});

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiments' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    startDate: z.date(),
    status: z.enum(['設計中', '進行中', '完了', '中断']),
    budget: z.string().optional(),
    hypothesis: z.string(),
    summary: z.string(),
  }),
});

const logs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
  schema: z.object({
    experiment: z.string(),
    day: z.number(),
    date: z.date(),
    title: z.string(),
    summary: z.string(),
    decision: z.string().optional(),
  }),
});

const meetings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/meetings' }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    messages: z.array(z.object({
      role: z.enum(['ceo', 'human', 'system']),
      name: z.string(),
      time: z.string(),
      content: z.string(),
    })),
  }),
});

export const collections = { news, experiments, logs, meetings };
