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

export const collections = { news };
