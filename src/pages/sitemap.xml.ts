import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const [experiments, logs, meetings] = await Promise.all([
    getCollection('experiments'), getCollection('logs'), getCollection('meetings'),
  ]);
  const routes = ['/', '/news/', '/decisions/', '/experiments/', '/meeting/', '/meeting/archive/',
    ...experiments.map(item => '/experiments/' + encodeURIComponent(item.data.slug) + '/'),
    ...logs.map(item => '/logs/' + item.id.split('/').map(encodeURIComponent).join('/') + '/'),
    ...meetings.map(item => '/meeting/' + encodeURIComponent(item.id) + '/'),
  ];
  const urls = [...new Set(routes)].map(route => '<url><loc>' + new URL(route, site).href.replaceAll('&', '&amp;') + '</loc></url>');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.join('') + '</urlset>', { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
