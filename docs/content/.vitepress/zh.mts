import { defineConfig } from 'vitepress'

export const zhConfig = defineConfig({
  lang: 'zh-CN',
  description: '现代化的动画引擎',

  themeConfig: {
    siteTitle: 'Newcar 官方文档',
    outline: {
      label: '索引',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    editLink: {
      text: '编辑此页面',
      pattern: 'https://github.com/Bug-Duck/newcar-docs/tree/main/docs/:path',
    },
    nav: [
      {
        text: '文档',
        link: '/zh/getting-started',
      },
      {
        text: '项目成员',
        link: '/zh/members',
      },
      {
        text: 'API参考',
        link: 'https://apis.newcarjs.org',
      },
      {
        text: '试验场',
        link: 'https://playground.newcarjs.org',
      },
      {
        text: '赞助',
        link: 'https://afdian.net/a/newcar',
      },
    ],
    sidebar: {
      '/': [
        {
          text: '示例动画',
          link: '/zh/examples',
        },
        {
          text: '入门指南',
          link: '/zh/getting-started',
        },
        {
          text: '进阶',
          items: [
            {
              text: '动画',
              link: '/zh/advanced/animation',
            },
            {
              text: '父子组件',
              link: '/zh/advanced/parents-children-widget',
            },
            {
              text: '色彩系统',
              link: '/zh/advanced/color-system',
            },
            {
              text: '逐帧调用',
              link: '/zh/advanced/update-function',
            },
            {
              text: '资源预加载',
              link: '/zh/advanced/preload',
            },
            {
              text: '交互系统',
              link: '/zh/advanced/event-system',
            },
            {
              text: '录制器',
              link: '/zh/advanced/recorder',
            },
            {
              text: '本地模式',
              link: '/zh/advanced/local-mode',
            },
          ],
        },
        {
          text: 'API参考',
          items: [
            {
              text: '基础图形包',
              link: 'zh/api/basic',
            },
            {
              text: '基础动画',
              link: 'zh/api/animations',
            },
            {
              text: '其他',
              link: 'zh/api/others',
            },
          ],
          link: 'zh/zpi/',
        },
        {
          text: '自定义',
          items: [
            {
              text: '组件基础',
              link: '/zh/dev/basic-widget',
            },
            {
              text: '组件进阶',
              link: '/zh/dev/advanced-widget',
            },
            {
              text: '动画定义',
              link: '/zh/dev/animation-defination',
            },
          ],
        },
      ],
    },
  },
})
