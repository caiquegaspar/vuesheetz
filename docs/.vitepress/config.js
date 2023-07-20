import { defineConfig } from 'vitepress'

// refer https://vitepress.vuejs.org/config/introduction for details
export default defineConfig({
  lang: 'en-US',
  title: 'VueSheetz',
  description: 'A Powerful spreadsheet-like Vue component',

  themeConfig: {
    logo: '/spreadsheet-vue.svg',

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'API', link: '/api/', activeMatch: '/api/' },
      { text: 'Config', link: '/config/', activeMatch: '/config/' }

      //   {
      //     text: 'Dropdown Menu',
      //     items: [
      //       { text: 'Item A', link: '/item-1' },
      //       { text: 'Item B', link: '/item-2' },
      //       { text: 'Item C', link: '/item-3' }
      //     ]
      //   }
    ],

    sidebar: {
      '/': [
        {
          text: 'Guide',
          collapsed: false,
          items: [
            {
              text: 'What is VueSheetz?',
              link: '/guide/why'
            },
            {
              text: 'Getting Started',
              link: '/guide/'
            },
            {
              text: 'Demo',
              link: '/guide/demo'
            },
            {
              text: 'Features',
              link: '/guide/features'
            }
          ]
        },
        {
          text: 'Config',
          collapsed: false,
          items: [
            {
              text: 'Config Reference',
              link: '/config/'
            }
          ]
        },

        {
          text: 'API',
          collapsed: false,
          items: [
            {
              text: 'API Reference',
              link: '/api/'
            }
          ]
        }
      ]
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-PRESENT Caíque Gaspar'
    }
  }
})
