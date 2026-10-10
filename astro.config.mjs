// @ts-check
import { defineConfig } from 'astro/config';

// Change `site` if you move the portfolio to another hostname.
export default defineConfig({
  site: 'https://ezzoubeir.lexiarchive.com',
  output: 'static',
  trailingSlash: 'ignore',
});
