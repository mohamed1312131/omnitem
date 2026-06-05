import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const HONEYPOT_FIELD = 'entreprise_url';
const TURNSTILE_FIELD = 'cf-turnstile-response';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  nom: string;
  societe: string | null;
  email: string;
  telephone: string | null;
  message: string;
  ip: string | null;
  user_agent: string | null;
};

function json(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function nullable(value: string) {
  return value.length > 0 ? value : null;
}

function getIp(request: Request) {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp;

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || null;

  return request.headers.get('x-real-ip');
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = import.meta.env.TURNSTILE_SECRET;
  if (!secret) {
    return { ok: false, status: 500, message: 'Configuration Turnstile manquante.' };
  }

  if (!token) {
    return { ok: false, status: 400, message: 'Validation anti-spam requise.' };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip) body.set('remoteip', ip);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });

    if (!response.ok) {
      return { ok: false, status: 502, message: 'Validation anti-spam indisponible.' };
    }

    const result = (await response.json()) as { success?: boolean };
    if (!result.success) {
      return { ok: false, status: 400, message: 'Validation anti-spam invalide.' };
    }

    return { ok: true, status: 200, message: '' };
  } catch {
    return { ok: false, status: 502, message: 'Validation anti-spam indisponible.' };
  }
}

async function insertContactRequest(payload: ContactPayload) {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceKey = import.meta.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing Supabase configuration.');
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { error } = await supabase.from('contact_requests').insert({
    nom: payload.nom,
    societe: payload.societe,
    email: payload.email,
    telephone: payload.telephone,
    message: payload.message,
    ip: payload.ip,
    user_agent: payload.user_agent,
  });

  if (error) throw error;
}

async function sendBrevoNotification(payload: ContactPayload) {
  const apiKey = import.meta.env.BREVO_API_KEY;
  const to = import.meta.env.CONTACT_NOTIFY_TO;
  const from = import.meta.env.CONTACT_NOTIFY_FROM;

  if (!apiKey || !to || !from) {
    throw new Error('Missing Brevo configuration.');
  }

  const htmlContent = `
    <h2>Nouvelle demande de contact OmniTel</h2>
    <p><strong>Nom :</strong> ${escapeHtml(payload.nom)}</p>
    <p><strong>Société :</strong> ${escapeHtml(payload.societe || '-')}</p>
    <p><strong>Email :</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(payload.telephone || '-')}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(payload.message).replaceAll('\n', '<br>')}</p>
    <hr>
    <p><small>IP : ${escapeHtml(payload.ip || '-')}<br>User-Agent : ${escapeHtml(payload.user_agent || '-')}</small></p>
  `;

  const textContent = [
    'Nouvelle demande de contact OmniTel',
    '',
    `Nom : ${payload.nom}`,
    `Société : ${payload.societe || '-'}`,
    `Email : ${payload.email}`,
    `Téléphone : ${payload.telephone || '-'}`,
    '',
    'Message :',
    payload.message,
    '',
    `IP : ${payload.ip || '-'}`,
    `User-Agent : ${payload.user_agent || '-'}`,
  ].join('\n');

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: {
        email: from,
        name: 'OmniTel',
      },
      to: [{ email: to }],
      subject: `Nouvelle demande OmniTel — ${payload.nom}`,
      htmlContent,
      textContent,
      replyTo: {
        email: payload.email,
        name: payload.nom,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Brevo notification failed with status ${response.status}.`);
  }
}

export const POST: APIRoute = async ({ request }) => {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return json(400, { ok: false, error: 'Requête invalide.' });
  }

  const nom = getField(formData, 'nom');
  const societe = getField(formData, 'societe');
  const email = getField(formData, 'email');
  const telephone = getField(formData, 'telephone');
  const message = getField(formData, 'message');
  const honeypot = getField(formData, HONEYPOT_FIELD);
  const turnstileToken = getField(formData, TURNSTILE_FIELD) || getField(formData, 'turnstile_token');

  if (honeypot) {
    return json(200, { ok: true });
  }

  const ip = getIp(request);
  const userAgent = request.headers.get('user-agent');

  const turnstile = await verifyTurnstile(turnstileToken, ip);
  if (!turnstile.ok) {
    return json(turnstile.status, { ok: false, error: turnstile.message });
  }

  if (!nom || !email || !message) {
    return json(400, { ok: false, error: 'Nom, email et message sont requis.' });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return json(400, { ok: false, error: 'Adresse email invalide.' });
  }

  const payload: ContactPayload = {
    nom,
    societe: nullable(societe),
    email,
    telephone: nullable(telephone),
    message,
    ip,
    user_agent: userAgent,
  };

  try {
    await insertContactRequest(payload);
  } catch {
    return json(500, { ok: false, error: "Impossible d'enregistrer la demande." });
  }

  try {
    await sendBrevoNotification(payload);
  } catch {
    return json(502, { ok: false, error: "La notification email n'a pas pu être envoyée." });
  }

  return json(200, { ok: true });
};
