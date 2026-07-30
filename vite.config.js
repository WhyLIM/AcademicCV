/*
 * @Author: Mli-TB mli.bio@outlook.com
 * @Date: 2025-07-11 12:42:37
 * @LastEditors: Mli-TB mli.bio@outlook.com
 * @LastEditTime: 2025-07-15 16:56:01
 * @FilePath: \AcademicCV\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096
  }
})

