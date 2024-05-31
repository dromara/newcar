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
          text: '基础',
          items: [
            {
              text: '快速开始',
              link: '/zh/getting-started',
            },
            {
              text: '属性动画',
              link: '/zh/basic/property-animation',
            },
            {
              text: '父子组件',
              link: '/zh/basic/parents-children-widget',
            },
            {
              text: '色彩系统',
              link: '/zh/basic/color-system',
            },
            {
              text: 'Setup语法',
              link: '/zh/basic/setup',
            },
            {
              text: '单位制',
              link: '/zh/basic/unit',
            },
            {
              text: '逐帧调用',
              link: '/zh/basic/update-function',
            },
            {
              text: '资源预加载',
              link: '/zh/basic/preload',
            },
            {
              text: '交互系统',
              link: '/zh/basic/event-system',
            },
            {
              text: '录制器',
              link: '/zh/basic/recorder',
            },
            {
              text: '本地模式',
              link: '/zh/basic/local-mode',
            },
          ],
        },
        {
          text: '自定义',
          items: [
            {
              text: '基本组件',
              link: '/zh/dev/basic-widget',
            },
            {
              text: '复合组件',
              link: '/zh/dev/composite-widget',
            },
            {
              text: '进阶动画',
              link: '/zh/dev/advanced-animation',
            },
          ],
        },
      ],
    },
  },
})
