import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { VitePWA } from 'vite-plugin-pwa'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  const isDevelopment = env.VITE_APP_ENV === 'development'

  return defineConfig({
    plugins: [
      react(),

      // Copy CH5 + WebXPanel libs into /assets for GitHub Pages
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/@crestron/ch5-crcomlib/build_bundles/umd/cr-com-lib.js',
            dest: 'assets'
          },
          {
            src: 'node_modules/@crestron/ch5-webxpanel/dist/umd/index.js',
            dest: 'assets'
          },
          {
            src: 'node_modules/@crestron/ch5-webxpanel/dist/umd/d4412f0cafef4f213591.worker.js',
            dest: 'assets'
          },
          {
            src: 'src/assets/images/*',
            dest: 'assets'
          }
        ]
      }),

      // PWA config (Pages-safe)
      VitePWA({
        base: '/ch5-react-ts-template/',
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,ico,png,svg,jpg}'],
          globIgnores: ['**/index.html'],
          maximumFileSizeToCacheInBytes: 20 * 1024 * 1024
        },
        manifest: {
          start_url: '/ch5-react-ts-template/',
          id: '/ch5-react-ts-template/',
          name: 'Crestron CH5 React PWA',
          short_name: 'CH5 React',
          description: 'Crestron CH5 project using React + Vite',
          theme_color: '#696969',
          background_color: '#121212',
          display: 'standalone',
          lang: 'en',
          icons: [
            {
              src: '/ch5-react-ts-template/assets/vite.png',
              sizes: '800x800',
              type: 'image/png'
            }
          ]
        }
      })
    ],

    // 🔑 CRITICAL for GitHub Pages
    base: '/ch5-react-ts-template/',

    build: {
      sourcemap: isDevelopment,
      cssTarget: 'chrome61',
      outDir: 'dist'
    }
  })
}

