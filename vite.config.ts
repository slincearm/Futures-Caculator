import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  base: '/Futures-Caculator/',
  plugins: [react(), viteSingleFile()],
  server: {
    host: '192.168.200.171',
  },
})
