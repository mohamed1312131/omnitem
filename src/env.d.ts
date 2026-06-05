/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly SUPABASE_SERVICE_KEY?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly TURNSTILE_SECRET?: string;
  readonly BREVO_API_KEY?: string;
  readonly CONTACT_NOTIFY_TO?: string;
  readonly CONTACT_NOTIFY_FROM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
