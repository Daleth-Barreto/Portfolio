import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://daleth-hb.dev',
  output: 'static',
  vite: {
    ssr: {
      noExternal: ['three']
    }
  }
});
