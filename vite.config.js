import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/aika/', // base path for GitHub Pages (repository name)
  plugins: [react()]
})