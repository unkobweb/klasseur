import { faTrash, faHeart, faFileAlt, faUsers, faChartPie, faArrowLeft, faSave, faEye, faEyeSlash, faTrashAlt, faPencilAlt, faFileDownload, faFolderOpen, faHamburger } from '@fortawesome/free-solid-svg-icons'
console.log('nuxt.config.js')
console.log({ env: process.env.NODE_ENV})
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Klasseur',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  ssr: process.env.SSR || true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/infiniteloading', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  chakra: {
    config: {
      autoImport: true
    },
    icons: {
      iconPack: 'fa',
      iconSet: {
        faTrash,
        faHamburger,
        faFileDownload,
        faFolderOpen,
        faPencilAlt,
        faTrashAlt,
        faEye,
        faEyeSlash,
        faUsers,
        faSave,
        faArrowLeft,
        faChartPie,
        faFileAlt,
        faHeart
      }
    }
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'get' },
          user: { url: '/api/auth/user', method: 'get' }
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: process.env.NODE_ENV === 'development' ? 'http://localhost:3333/api' : 'http://api:3333/api',
      pathRewrite: { '^/api': '' }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
        pug: 'empty'
      }
    }
  }
}
