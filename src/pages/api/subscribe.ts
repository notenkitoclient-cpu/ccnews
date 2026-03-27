import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    await resend.contacts.create({
      email,
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 });
  }
};
