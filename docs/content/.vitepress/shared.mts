import { defineConfig } from 'vitepress'

export const sharedConfig = defineConfig({
  title: 'Newcar',
  titleTemplate: 'Newcar Docs',
  cleanUrls: true,
  appearance: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/newcar_uni.webp', type: 'image/webp' }]],

  themeConfig: {
    logo: {
      light: '/newcar_black.webp',
      dark: '/newcar_white.webp',
    },
    outline: [2, 3],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/dromara/newcar',
      },
      {
        icon: 'x',
        link: 'https://twitter.com/bugduckteam',
      },
    ],
    footer: {
      message: 'Released under the Apache-2.0 license',
      copyright: 'Copyright © 2023-present BugDuck Team & Dromara Community',
    },
  },
})
