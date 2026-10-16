import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteOutput } from './build-support/site-output.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteOutput()],
})
