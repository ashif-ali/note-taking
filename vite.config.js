import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    // Use the variable from the 'env' object
    base: env.VITE_BASE_PATH || "/note-taking"
  }
})