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
      pattern: 'https://github.com/dromara/newcar/tree/main/docs/content/:path',
    },
    nav: [
      {
        text: 'Tutorials',
        link: '/getting-started',
      },
      {
        text: 'Guide',
        items: [
          {
            text: 'Basic Graphics Package',
            link: '/guide/basic'
          },
          {
            text: 'Mathematics Module',
            link: '/'
          },
          {
            text: 'Geometry Module',
            link: '/'
          },
          {
            text: 'Chart Module',
            link: '/guide/chart'
          },
          {
            text: 'Other Module',
            link: '/'
          }
        ]
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
          text: 'Basic',
          items: [
            {
              text: 'Getting Started',
              link: '/getting-started',
            },
            {
              text: 'Property Animation',
              link: '/basic/property-animation',
            },
            {
              text: 'Parents-Children Widget',
              link: '/basic/parents-children-widget',
            },
            {
              text: 'Color System',
              link: '/basic/color-system',
            },
            {
              text: 'Setup Syntax',
              link: '/basic/setup',
            },
            {
              text: 'Unit',
              link: '/basic/unit',
            },
            {
              text: 'Frame-by-Frame called',
              link: '/basic/update-function',
            },
            {
              text: 'Resource Preloading',
              link: '/basic/preload',
            },
            {
              text: 'Event System',
              link: '/basic/event-system',
            },
            {
              text: 'Recorder',
              link: '/basic/recorder',
            },
            {
              text: 'Local Mode',
              link: '/basic/local-mode',
            },
          ],
        },
        {
          text: 'Customization',
          items: [
            {
              text: 'Basic Widget',
              link: '/dev/basic-widget',
            },
            {
              text: 'Composite Widget',
              link: '/dev/composite-widget',
            },
            {
              text: 'Advanced Animation',
              link: '/dev/advanced-animation',
            },
            {
              text: 'Common Event',
              link: '/dev/common-event',
            },
            {
              text: 'Widget Event',
              link: '/dev/widget-event',
            },
          ],
        },
      ],
      '/guide/basic': [
        {
          text: 'Text and TextGroup',
          link: '/guide/basic/text',
        }
      ],
      '/guide/chart': [
        {
          text: 'Getting Started',
          link: '/guide/chart/getting-started',
        },
        {
          text: 'General Concepts',
          link: '/guide/chart/general-concepts',
          items: [
            {
              text: 'Data Structure',
              link: '/guide/chart/data-structure',
            },
            {
              text: 'Time Axis',
              link: '/guide/chart/time-axis',
            },
            {
              text: 'Layout',
              link: '/guide/chart/layout',
            },
          ],
        },
        {
          text: 'Chart Types',
          items: [
            {
              text: 'Bar Chart',
              link: '/guide/chart/bar-chart',
            },
            {
              text: 'Line Chart',
              link: '/guide/chart/line-chart',
            },
            {
              text: 'Scatter Chart',
              link: '/guide/chart/scatter-chart',
            },
            {
              text: 'Bubble Chart',
              link: '/guide/chart/bubble-chart',
            },
            {
              text: 'Mixed Chart',
              link: '/guide/chart/mixed-chart',
            },
          ],
        },
      ],
    },
  },
})
