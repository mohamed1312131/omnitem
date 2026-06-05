import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { APIContext } from 'astro';

type CookiePair = {
  name: string;
  value: string;
};

type CookieSetter = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

type ServerContext = Pick<APIContext, 'request' | 'cookies'>;

function parseCookieHeader(cookieHeader: string | null): CookiePair[] {
  if (!cookieHeader) return [];

  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const eq = part.indexOf('=');
      if (eq === -1) return null;
      const name = part.slice(0, eq).trim();
      const rawValue = part.slice(eq + 1);
      if (!name) return null;

      try {
        return { name, value: decodeURIComponent(rawValue) };
      } catch {
        return { name, value: rawValue };
      }
    })
    .filter((cookie): cookie is CookiePair => cookie !== null);
}

function normalizeCookieOptions(options: Record<string, unknown>) {
  return {
    ...options,
    path: typeof options.path === 'string' ? options.path : '/',
  };
}

export function createSupabaseServerClient(context: ServerContext): SupabaseClient {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error('Missing public Supabase configuration.');
  }

  return createServerClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    cookies: {
      getAll() {
        return parseCookieHeader(context.request.headers.get('cookie'));
      },
      setAll(cookiesToSet: CookieSetter[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          context.cookies.set(name, value, normalizeCookieOptions(options));
        });
      },
    },
  });
}

export async function getVerifiedUser(context: ServerContext) {
  const supabase = createSupabaseServerClient(context);
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { supabase, user: null };
  }

  return { supabase, user: data.user };
}
