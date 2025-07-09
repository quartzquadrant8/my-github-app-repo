import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // <-- ADD THIS LINE

export default defineConfig({
  plugins: [
    react(), // <-- ADD THIS LINE
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
