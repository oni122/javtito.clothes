import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react(), tailwind({ applyBaseStyles: true })],
  srcDir: 'src',
  server: {
    host: true,
  },
});
