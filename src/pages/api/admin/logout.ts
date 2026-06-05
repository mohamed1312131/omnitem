import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabaseServer';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient(context);
  await supabase.auth.signOut();

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store',
    },
  });
};
