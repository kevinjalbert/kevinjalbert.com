import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['test/**/*.{test,spec}.{js,mjs,ts}'],
    exclude: ['node_modules/**', 'dist/**'],
  },
});
