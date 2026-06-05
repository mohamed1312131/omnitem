# OmniTel Astro

Production Astro port of the approved OmniTel static design.

## Phase 1

- Astro + TypeScript project scaffolded with `@astrojs/sitemap`.
- Public site renders as static HTML from `src/pages/index.astro`.
- Approved `styles.css` is imported globally unchanged from `src/styles/styles.css`.
- Approved `script.js` runs as one vanilla client script from `public/script.js`.

## Phase 2

- Canonical, robots, theme-color, Open Graph, and Twitter Card tags are rendered from `src/data/content.ts`.
- JSON-LD uses the provided `Organization` + `ProfessionalService` graph. No `LocalBusiness` or physical address is included until a real registered address exists.
- Sitemap output is configured for `https://www.omnitel.fr`.
- `public/robots.txt` allows public crawling, disallows `/admin`, and references the sitemap index.
- `public/og-image.png` is a 1200×630 placeholder and should be replaced with the final supplied asset.
- French user-facing copy is centralized where practical in `src/data/content.ts` for a future i18n layer.

## Phase 3

- Astro uses v6 static output with the Node adapter: the homepage is prerendered and `/api/contact` is server-rendered.
- `POST /api/contact` verifies the honeypot and Cloudflare Turnstile token, validates the existing form fields, inserts through Supabase with the service-role key, and sends a Brevo notification.
- The Supabase service-role key is only referenced in `src/pages/api/contact.ts` and is never imported by client code.
- The contact form keeps the approved success UI and shows an inline error on failures.

## Phase 4

- `/admin` is server-rendered only (`prerender = false`) and is not emitted as client HTML.
- The admin page includes `noindex,nofollow`; `robots.txt` continues to disallow `/admin`.
- Supabase Auth handles email/password login. There is no signup UI; create the admin user manually in the Supabase dashboard.
- Every admin page/API request validates the Supabase session server-side with `@supabase/ssr`.
- Admin reads and status updates use the logged-in user's session and Supabase RLS policies. The service-role key is not used in the admin path.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

For the standalone Node server build:

```bash
npm run build
node dist/server/entry.mjs
```

## Environment

Create `.env` from `.env.example` and fill real values:

```bash
PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET=your_turnstile_secret
BREVO_API_KEY=your_brevo_key
CONTACT_NOTIFY_TO=Nabegh.bensalah@omnitel.fr
CONTACT_NOTIFY_FROM=notifications@omnitel.fr
```

`CONTACT_NOTIFY_FROM` must be a Brevo-verified sender. Do not commit real secrets.

## Supabase SQL

Run this in the Supabase SQL editor:

```sql
create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null,
  societe text,
  email text not null,
  telephone text,
  message text not null,
  status text not null default 'new',
  ip text,
  user_agent text
);

alter table public.contact_requests enable row level security;

-- No anon policies at all = anon role can neither read nor write.
-- The server endpoint uses the service_role key, which BYPASSES RLS, to insert.
-- RLS policies still require normal Postgres privileges for authenticated admins:
grant select, update on public.contact_requests to authenticated;

-- Authenticated admins may read and update (not via anon/public):
create policy "admin_read" on public.contact_requests
  for select to authenticated using (true);

create policy "admin_update" on public.contact_requests
  for update to authenticated using (true) with check (true);

-- Status is constrained to known values:
alter table public.contact_requests
  add constraint status_check check (status in ('new','contacted','archived'));
```

There is intentionally no insert policy. Public visitors submit through `/api/contact`, which uses the server-only service-role key. Authenticated admins can read/update later through RLS; anon cannot touch the table.

## Manual Phase 1 verification

Open `http://127.0.0.1:4321/` after `npm run dev` and compare against the approved `OmniTel.html`:

- Desktop and mobile responsive layout matches.
- Burger menu opens/closes and anchor links scroll to the right sections.
- Hero fiber canvas, hero SVG network, vision mesh, contact mesh, and founder mesh render.
- Scroll reveal animations run smoothly.
- Contact form shows the existing success state after a valid server submission.
- View Source contains the fully rendered public content sections.

## Manual Phase 3 verification

- Submit with the honeypot field filled in dev tools: the API returns `{ "ok": true }`, but no row/email should be created.
- Submit without a Turnstile token: the API rejects the request.
- Submit valid fields with Turnstile solved: a row is inserted into `contact_requests` and a Brevo email is sent.
- Check the built client output for absence of `SUPABASE_SERVICE_KEY`.

## Manual Phase 4 verification

- Open `/admin` without logging in: only the login form should render, with no table data.
- Log in with the manually-created Supabase Auth admin user.
- Confirm rows appear newest-first and email/phone links work.
- Change a row status between `new`, `contacted`, and `archived`; the UI should update without a full page reload.
- Click logout and confirm the login form returns.
- Check the built client output for absence of `SUPABASE_SERVICE_KEY`.

## Notes

The public site URL is configured as `https://www.omnitel.fr` in `astro.config.mjs` for sitemap generation.
