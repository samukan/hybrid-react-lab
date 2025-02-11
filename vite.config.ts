import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // base: '/~samukan/tailwind/',
  base: '',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest-setup.js',
  },
});
