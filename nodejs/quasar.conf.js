const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv');





module.exports = function (ctx) {

  if (!ctx.dev) {
    const envConfig = dotenv.parse(fs.readFileSync('.env'))
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }
  const env = {
    TG_BOT_NAME: JSON.stringify(process.env.TG_BOT_NAME)
  }
  return {
    sourceFiles: {
      router: 'src/router/index.ts',
      store: 'src/backStore/index.ts'
    },
    boot: [
      "index"
    ],

    css: [
      'app.styl'
    ],

    extras: [
      //'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      components: ['QPage', 'QPageContainer', 'QLayout',
        'QCard', 'QCardSection',
        'QBtnDropdown',
        'QPopupProxy',
        'QList', 'QItem', 'QIcon', 'QItemLabel', 'QItemSection',],
      directives: [
        'ClosePopup'
      ]
      //config: {
      //  dark: 'true' // or Boolean true/false
      //}
    },

    supportIE: false,

    build: {
      env,
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: true,
      analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '~shared': path.resolve(__dirname, './src-shared'),
          '~': path.resolve(__dirname, './src'),
          //'@helpers': path.resolve(__dirname, './src/helpers'),
          //'@module1': path.resolve(__dirname, './src/domains/module1),
        }

        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: "Firefox Developer Edition" // opens browser window automatically
    },

    //animations: 'all', // --- includes all animations
    animations: ['fadeIn', 'fadeOut'],

    ssr: {
      pwa: false
    },

    pwax: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },


  }
}
