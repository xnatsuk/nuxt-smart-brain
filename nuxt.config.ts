// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  runtimeConfig: {
    userId: '',
    appId: '',
    pat: '',
    public: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
    },
  },
  supabase: {
    client: {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    },
  },
  pinia: {
    autoImports: ['defineStore'],
  },
  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },
  unocss: {
    uno: false,
    icons: {
      scale: 2,
    },
    shortcuts: [],
    rules: [],
  },
  nitro: {
    preset: 'vercel',
    externals: {
      inline: ['@nuxtjs/supabase'],
    },
  },
})
