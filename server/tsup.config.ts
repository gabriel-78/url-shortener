import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/infra/http/server.ts'],
  outDir: 'dist',
  format: ['esm'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: false, // Gera .d.ts
  outExtension: () => ({ js: '.mjs' }),
  loader: {
    '.sql': 'text',
  },
});
