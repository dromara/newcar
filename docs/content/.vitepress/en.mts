import { defineConfig } from 'vitepress'

export const enConfig = defineConfig({
  lang: 'en-US',
  description: 'The modern animation engine',

  themeConfig: {
    siteTitle: 'Newcar Official Docs',
    outline: {
      label: 'On this page',
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    editLink: {
      text: 'Suggest to this page',
      pattern: 'https://github.com/Bug-Duck/newcar-docs/tree/main/docs/:path',
    },
    nav: [
      {
        text: 'Tutorials',
        link: '/getting-started',
      },
      {
        text: 'Members',
        link: '/members',
      },
      {
        text: 'API References',
        link: 'https://apis.newcarjs.org',
      },
      {
        text: 'Playground',
        link: 'https://playground.newcarjs.org',
      },
      {
        text: 'Sponsor',
        link: 'https://afdian.net/a/newcar',
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Examples',
          link: '/examples',
        },
        {
          text: 'Getting Started',
          link: '/getting-started',
        },
        {
          text: 'Advanced',
          items: [
            {
              text: 'Animation',
              link: '/advanced/animation',
            },
            {
              text: 'Parents-Children Widget',
              link: '/advanced/parents-children-widget',
            },
            {
              text: 'Color System',
              link: '/advanced/color-system',
            },
            {
              text: 'Frame-by-Frame called',
              link: '/advanced/update-function',
            },
            {
              text: 'Resource Preloading',
              link: '/advanced/preload',
            },
            {
              text: 'Event System',
              link: '/advanced/event-system',
            },
            {
              text: 'Recorder',
              link: '/advanced/recorder',
            },
            {
              text: 'Local Mode',
              link: '/advanced/local-mode',
            },
          ],
        },
        {
          text: 'API',
          items: [
            {
              text: 'Basic',
              link: '/api/basic',
            },
            {
              text: 'Animations',
              link: '/api/animations',
            },
            {
              text: 'Others',
              link: '/api/others',
            },
          ],
          link: '/api/',
        },
        {
          text: 'Custom',
          items: [
            {
              text: 'Basic Widget',
              link: '/dev/basic-widget',
            },
            {
              text: 'Advanced Widget',
              link: '/dev/advanced-widget',
            },
            {
              text: 'Animation Defination',
              link: '/dev/animation-defination',
            },
          ],
        },
      ],
    },
  },
})
