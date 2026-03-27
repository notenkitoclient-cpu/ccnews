import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    source: z.enum(['Anthropic Blog', 'GitHub Release', 'Docs', 'Official']),
    sourceUrl: z.string().url(),
    summary: z.string(),
  }),
});

export const collections = { news };
