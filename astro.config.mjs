// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rajanbuilds.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Homepage is the strongest entry point.
        if (item.url === 'https://rajanbuilds.com/') {
          item.priority = 1.0;
        } else if (item.url.includes('/work/')) {
          // Case-study pages + the work index are primary content.
          item.priority = 0.8;
        }
        return item;
      },
    }),
  ],
  output: 'static',
});
