import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // CRUCIAL: This ensures paths map cleanly to translate101.online
})
