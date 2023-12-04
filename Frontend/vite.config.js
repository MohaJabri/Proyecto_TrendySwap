import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 3000,
      paths: ['src'],
    },
  }
})
