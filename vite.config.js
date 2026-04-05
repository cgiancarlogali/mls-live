import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/espn': {
        target: 'https://site.api.espn.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/espn/, '')
      }
    }
  }
})
