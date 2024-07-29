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
      pattern: 'https://github.com/dromara/newcar/tree/main/docs/content/:path',
    },
    nav: [
      {
        text: '文档',
        link: '/zh/basic/getting-started',
      },
      {
        text: '指南',
        items: [
          {
            text: '基础图形库',
            link: '/zh/guide/basic'
          },
          {
            text: '数学模块',
            link: '/'
          },
          {
            text: '几何模块',
            link: '/'
          },
          {
            text: '图表模块',
            link: '/zh/guide/chart'
          },
          {
            text: '其他模块',
            link: '/'
          }
        ]
      },
      {
        text: '项目成员',
        link: '/zh/members',
      },
      {
        text: 'API 参考',
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
              link: '/zh/basic/getting-started',
            },
            {
              text: '属性动画',
              link: '/zh/basic/animation',
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
              text: 'Setup 语法',
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
            {
              text: '通用事件',
              link: '/zh/dev/common-event',
            },
            {
              text: '组件事件',
              link: '/zh/dev/widget-event',
            },
          ],
        },
      ],
      '/zh/guide/basic': [
        {
          text: 'Text 与 TextGroup',
          link: '/zh/guide/basic/text',
        }
      ],
      '/zh/guide/chart': [
        {
          text: '快速开始',
          link: '/zh/guide/chart/getting-started',
        },
        {
          text: '通用概念',
          link: '/zh/guide/chart/general-concepts',
          items: [
            {
              text: '数据结构',
              link: '/zh/guide/chart/data-structure',
            },
            {
              text: '时间轴',
              link: '/zh/guide/chart/time-axis',
            },
            {
              text: '布局',
              link: '/zh/guide/chart/layout',
            },
          ],
        },
        {
          text: '图表类型',
          items: [
            {
              text: '柱状图',
              link: '/zh/guide/chart/bar-chart',
            },
            {
              text: '折线图',
              link: '/zh/guide/chart/line-chart',
            },
            {
              text: '散点图',
              link: '/zh/guide/chart/scatter-chart',
            },
            {
              text: '气泡图',
              link: '/zh/guide/chart/bubble-chart',
            },
            {
              text: '混合图表',
              link: '/zh/guide/chart/mixed-chart',
            },
          ],
        },
      ]
    },
  },
})
