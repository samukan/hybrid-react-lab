/// <reference types="vitest/config" />
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/~samukan/zustand',
  //base: '',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest-setup.js',
  },
});
