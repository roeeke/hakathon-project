import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default {
  // other config options...
  server: {
    proxy: {
      '/auth': 'http://localhost:3001',
      
    },
  },
};