import { resolve } from 'path';

export default {
  head: {
    title: 'nuxt-auth-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'test' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css' }
    ]
  },
  alias: {
    '~': resolve(__dirname),
    '@': resolve(__dirname),
  },
  loading: { color: '#3B8070' },
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: 'http://127.0.0.1:4000' // Ensure this matches your server configuration
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: '',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          user: { url: '/me', method: 'get' },
          logout: false
        }
      }
    }
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server-middleware/auth.js' }
  ]
};
