import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.omnitel.fr',
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [sitemap()],
});
