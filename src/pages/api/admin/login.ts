import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabaseServer';

export const prerender = false;

function json(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store',
    },
  });
}

function getField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

export const POST: APIRoute = async (context) => {
  let formData: FormData;

  try {
    formData = await context.request.formData();
  } catch {
    return json(400, { ok: false, error: 'Requête invalide.' });
  }

  const email = getField(formData, 'email');
  const password = getField(formData, 'password');

  if (!email || !password) {
    return json(400, { ok: false, error: 'Email et mot de passe requis.' });
  }

  try {
    const supabase = createSupabaseServerClient(context);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return json(401, { ok: false, error: 'Identifiants invalides.' });
    }

    return json(200, { ok: true });
  } catch {
    return json(500, { ok: false, error: 'Connexion indisponible.' });
  }
};
