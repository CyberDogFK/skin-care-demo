import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // "/" locally; the deploy workflow sets BASE_PATH=/<repo>/ for GitHub Pages
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
