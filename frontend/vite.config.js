import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Move off 5173 to force browser to drop old site policy rules
    host: true
  },
  build: {
    sourcemap: false // Ensure no production evaluation tags are compiled
  }
})