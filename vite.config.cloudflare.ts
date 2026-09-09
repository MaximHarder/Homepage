import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { cloudflare } from "@cloudflare/vite-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [tailwindcss(), vue(), cloudflare()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: true,
    // Vite 8 / Rolldown: object-form manualChunks entfernt → codeSplitting.groups
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules\/(?:vue|vue-router|vue-i18n|pinia)(?:\/|$)/,
            },
          ],
        },
      },
    },
  },
  ssr: {
    target: 'webworker',
    noExternal: ['vue', 'vue-router', 'vue-i18n', 'pinia']
  }
})
