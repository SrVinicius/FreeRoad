import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/__tests__/setupTest.ts',
    coverage: {
      reporter: ['text', 'html'], 
      exclude: ['src/__tests__/**'], // Exclui arquivos de teste
      include: ['src/**/*.{ts,tsx}'], // Inclui apenas arquivos dentro de src
    },
  },
});