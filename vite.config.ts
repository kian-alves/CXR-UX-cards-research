import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(() => ({
  // Use /CXR-UX/ only for GitHub Pages builds, root path for everything else
  base: process.env.GITHUB_PAGES ? '/CXR-UX/' : '/',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true, // Fail if port is already in use
    hmr: {
      overlay: true,  // Show errors as overlay
    },
    watch: {
      usePolling: true,  // Enable polling for file changes
      interval: 100,     // Check for changes every 100ms
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase the warning threshold to silence large chunk warnings
    // (no functional impact; adjust as needed)
    chunkSizeWarningLimit: 1500,
  },
}))
