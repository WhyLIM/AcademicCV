/*
 * @Author: Mli-TB mli.bio@outlook.com
 * @Date: 2025-07-11 12:42:37
 * @LastEditors: Mli-TB mli.bio@outlook.com
 * @LastEditTime: 2025-07-15 16:56:01
 * @FilePath: \AcademicCV\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, import.meta.url, '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    define: {
      // 更安全的环境变量处理方式
      'process.env': env,
      'import.meta.env': JSON.stringify(env)
    },
    build: {
      // 生产构建配置
      outDir: 'dist',
      assetsInlineLimit: 4096
    }
  }
})

