import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // For your API calls
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/laravel_storage': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/laravel_storage/, '/storage'),
      }
    }
  },
  optimizeDeps: {
    include: ['swiper/react', 'swiper/modules'],
  },
});