import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // スマホ実機など同一ネットワーク内の他端末からアクセス可能にする
  },
  define: {
    global: 'globalThis', // aws-amplify の Node グローバル対応
  },
})
