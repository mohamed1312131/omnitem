import type { APIRoute } from 'astro';
import { getVerifiedUser } from '../../../lib/supabaseServer';
import { isAdminStatus } from '../../../lib/admin';

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

export const POST: APIRoute = async (context) => {
  const { supabase, user } = await getVerifiedUser(context);

  if (!user) {
    return json(401, { ok: false, error: 'Session expirée.' });
  }

  let payload: { id?: unknown; status?: unknown };

  try {
    payload = await context.request.json();
  } catch {
    return json(400, { ok: false, error: 'Requête invalide.' });
  }

  const id = typeof payload.id === 'string' ? payload.id : '';
  const status = typeof payload.status === 'string' ? payload.status : '';

  if (!id || !isAdminStatus(status)) {
    return json(400, { ok: false, error: 'Statut invalide.' });
  }

  const { data, error } = await supabase
    .from('contact_requests')
    .update({ status })
    .eq('id', id)
    .select('id,status')
    .single();

  if (error || !data) {
    return json(403, { ok: false, error: 'Mise à jour refusée.' });
  }

  return json(200, { ok: true, id: data.id, status: data.status });
};
