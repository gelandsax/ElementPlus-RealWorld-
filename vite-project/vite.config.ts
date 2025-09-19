import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // 允许IP访问
    host: "0.0.0.0",
    // 应用端口 (默认:3000)
    port: Number(3000),
    // 运行是否自动打开浏览器
    open: true,
    
    proxy: {
      /** 代理前缀为 /dev-api 的请求  */
      ['/dev-api']: {
        changeOrigin: true,
        // 接口地址
        target: 'http://localhost:8080/api',
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.removeHeader('referer')
            proxyReq.removeHeader('origin')
          });
        },
        rewrite: (path) =>
          path.replace(new RegExp("^" + '/dev-api'), ""),
      },
    },
  }
})
