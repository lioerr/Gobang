import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/ws': {
        target: 'http://192.168.43.77:9001',
        changeOrigin: true, 
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, '')
      }
    }
  },
  plugins: [
    react()
  ]
})
