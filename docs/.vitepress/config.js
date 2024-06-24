import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  head: [['link', { rel: 'icon', href: 'media/favicon.png' }]],
  title: 'payment-crypto',
  lastUpdated: true,
  locales: {
    root: {
      lang: 'en',
      label: 'English',
      description: 'Simple module based on Crypto Pay API for convenient use.',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Functions', link: '/methods' },
          { text: 'Examples', link: '/examples' },
        ],
        sidebar: [
          {
            text: 'Get started',
            items: [
              { text: 'Introduction', link: '/introduction' },
              {
                text: 'Methods',
                link: '/methods',
              },
              { text: 'Types', link: '/types' },
              { text: 'Testnet', link: '/testnet' },
              { text: 'Examples', link: '/examples' },
            ],
          },
          {
            text: 'Other',
            collapsed: true,
            items: [
              { text: 'Useful Links', link: '/useful-links' },
              { text: 'API Changelog', link: '/changelog/api' },
              { text: 'Module Changelog', link: '/changelog/module' },
            ],
          },
        ],
      },
    },

    // ru: {
    //   lang: 'ru',
    //   label: 'Русский',
    //   description:
    //     'Простой модуль основанный на Crypto Pay API для удобного использования.',
    //   themeConfig: {
    //     nav: [
    //       { text: 'Главная', link: '/ru' },
    //       { text: 'Функции', link: '/ru/functions' },
    //       { text: 'Примеры', link: '/ru/examples' },
    //     ],
    //     sidebar: [
    //       {
    //         text: 'Давай начнем',
    //         items: [
    //           { text: 'Вступление', link: '/ru/introduction' },
    //           {
    //             text: 'Функции',
    //             link: '/ru/functions',
    //           },
    //           { text: 'Типы', link: '/ru/types' },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },

  markdown: {
    image: {
      lazyLoading: true,
    },
  },

  themeConfig: {
    search: {
      provider: 'local',
    },
    logo: {
      src: './media/favicon.png',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kiogia/payment-crypto' },
      { icon: 'npm', link: 'https://npmjs.org/package/payment-crypto' },
    ],
  },
});
