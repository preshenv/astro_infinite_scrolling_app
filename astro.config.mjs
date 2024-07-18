import { defineConfig } from 'astro/config';

export default defineConfig({
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL,
  },
  output: 'hybrid'
});