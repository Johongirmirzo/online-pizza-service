// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
  ],
  css: ['~/assets/styles/main.css'],
  piniaPersistedstate: {
    storage: 'localStorage',
  },
  auth: {
    // The module is enabled. Change this to disable the module
    isEnabled: true,
    // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
    origin: 'https://online-pizza-delivery.netlify.app/',
    // origin: 'http://localhost:3001',
    // The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
    basePath: '/api/auth',
    // Whether to add a global authentication middleware that will protect all pages without exclusion
    enableGlobalAppMiddleware: true,
  },
})
