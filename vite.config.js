import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/amino-ia/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'source.html',
    },
  },
})
