/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "ui": path.resolve(__dirname, "./src/shared/ui"),
      "lib": path.resolve(__dirname, "./src/shared/lib"),
      "hooks": path.resolve(__dirname, "./src/shared/hooks"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/shared/lib/test-setup.ts',
    css: true,
  },
})
