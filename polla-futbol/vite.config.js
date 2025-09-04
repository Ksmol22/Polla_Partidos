import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Polla_Partidos/', // Nombre de tu repositorio
  build: {
    outDir: 'dist'
  }
})
