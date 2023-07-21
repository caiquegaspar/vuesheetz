import { defineConfig } from 'vitepress'
import { version } from '../../package.json'
import {
  vueSheetzName,
  vueSheetzDescription,
  socialMediaDescription,
  ogUrl,
  ogImage,
  vueSheetzAuthor,
  vueSheetzKeywords,
  github,
  changelog,
  releases
} from './meta'

export default defineConfig({
  lang: 'en-US',
  title: vueSheetzName,
  description: vueSheetzDescription,

  head: [
    ['meta', { name: 'theme-color', content: '#059669' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: vueSheetzAuthor }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'keywords', content: vueSheetzKeywords }],
    ['meta', { property: 'og:title', content: socialMediaDescription }],
    ['meta', { property: 'og:description', content: vueSheetzDescription }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: socialMediaDescription }],
    ['meta', { name: 'twitter:description', content: vueSheetzDescription }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#ffffff' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }]
  ],

  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/caiquegaspar/vuesheetz/tree/main/docs/:path',
      text: 'Suggest changes to this page'
    },

    search: {
      provider: 'local'
    },

    socialLinks: [{ icon: 'github', link: github }],

    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'API', link: '/api/', activeMatch: '/api/' },
      { text: 'Config', link: '/config/', activeMatch: '/config/' },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Changelog',
            link: changelog
          },
          {
            text: 'Release Notes ',
            link: releases
          }
        ]
      }
    ],

    sidebar: {
      '/': [
        {
          text: 'Guide',
          collapsed: false,
          items: [
            {
              text: 'What is VueSheetz',
              link: '/guide/what'
            },
            {
              text: 'Getting Started',
              link: '/guide/'
            },
            {
              text: 'Features',
              link: '/guide/features'
            },
            {
              text: 'Demo',
              link: '/guide/demo'
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
      copyright: 'Copyright © 2023-PRESENT Caíque Gaspar'
    }
  }
})
