import { defineConfig } from 'vitepress'
import { sharedConfig } from './shared.mts'
import { enConfig } from './en.mts'
import { zhConfig } from './zh.mts'

import vite from './vite.config'

export default defineConfig({
  ...sharedConfig,

  locales: {
    root: {
      label: 'English',
      link: '/',
      ...enConfig,
    },
    zh: {
      label: '中文(简体)',
      link: '/zh',
      ...zhConfig,
    },
  },

  vite,
})
