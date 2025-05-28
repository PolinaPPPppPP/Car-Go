import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: '/', // Открывать конкретный путь
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 3001 // Порт для preview-режима (npm run preview)
  },
  optimizeDeps: {
    exclude: ['@mantine/core', '@mantine/hooks', 'chart.js', 'react-chartjs-2']
  }
})