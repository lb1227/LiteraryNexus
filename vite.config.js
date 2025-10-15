import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // If you publish to username.github.io/repo-name, set base: '/repo-name/'
  base: '/'
})
