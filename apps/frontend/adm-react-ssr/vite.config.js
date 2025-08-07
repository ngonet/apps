import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: [
      'remu.ngo.k3s.lab.cautiva',
      'localhost',
      '127.0.0.1'
    ],
//    hmr: {
//      host: 'localhost',
//      port: 5173,
//      protocol: 'ws',
//      clientPort: 5173 
//    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
