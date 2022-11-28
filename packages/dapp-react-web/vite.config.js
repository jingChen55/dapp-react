import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"
console.log();
export default defineConfig({
  publicDir:resolve(__dirname, 'statics/'),
  plugins: [react()],
  server: {
    port:8080
  },
  preview: {
    port:8080
  },
  build: {
    assetsInlineLimit:30,
    outDir:resolve(__dirname,"../../","dist")
  }
})
