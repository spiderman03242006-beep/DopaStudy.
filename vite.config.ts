import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/DopaStudy/'   // ★リポジトリ名を入れる
})
