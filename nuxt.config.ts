// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@sidebase/nuxt-pdf',
    '@ant-design-vue/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
  ],
  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en-US', iso: 'en-US', name: 'English(US)', file: 'en-US.json' },
      { code: 'zh-CN', iso: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'zh-TW', iso: 'zh-TW', name: '繁體中文', file: 'zh-TW.json' },
    ],
    defaultLocale: 'zh-TW',
  },
})