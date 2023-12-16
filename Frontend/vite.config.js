import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const CLIENT_PORT = process.env.VITE_CLIENT_PORT

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: true,
    port: CLIENT_PORT,
    watch: {
      usePolling: true,
      interval: 3000,
      paths: ['src'],
    },
  }
})
