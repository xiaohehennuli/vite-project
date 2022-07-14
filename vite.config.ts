import { defineConfig } from 'vite'
//解决windows下的路径问题
import { normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from 'autoprefixer'
import viteEslint from 'vite-plugin-eslint'
import viteStylelint from '@amatlash/vite-plugin-stylelint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgr from 'vite-plugin-svgr'
import viteImagemin from 'vite-plugin-imagemin'

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'))

// 判断当前环境是哪个环境

const isProduction = process.env.NODE_ENV === 'production'

// 填入项目的 CDN 域名地址
const CDN_URL = 'https://xiaohe.oss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/
    }),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  },
  resolve: {
    // 别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  // 静态文件的前缀
  base: isProduction ? CDN_URL : '/',
  build: {
    // 静态文件超过8kb的时候，打包成单文件，否则生成base64内嵌到代码中
    // svg文件不受这个限制，它始终会打包成单文件，它和普通图片不一样，它需要一些动态属性
    assetsInlineLimit: 8 * 1024
  },
  // 配置预构建参数
  optimizeDeps: {
    // 入口
    entries: [],
    // 强制预构建参数
    include: [],
    //Vite 提供了esbuildOptions 参数来让我们自定义 Esbuild 本身的配置，常用的场景是加入一些 Esbuild 插件
    esbuildOptions: {}
  }
})
