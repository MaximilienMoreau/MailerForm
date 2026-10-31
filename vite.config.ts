import { defineConfig } from 'vite'
import { staticPagesPlugin } from './scripts/static-pages'
import { securityHeadersPlugin } from './scripts/security-headers'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss(), staticPagesPlugin(), securityHeadersPlugin()],
  server: {
    fs: {
      // Preserve Vite's defaults and keep local credentials and agent state private.
      deny: [
        '.env',
        '.env.*',
        '*.{crt,pem}',
        '**/.git/**',
        '**/.aws/**',
        '**/.codex/**',
        '**/.agents/**',
        '**/.claude/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
