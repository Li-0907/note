import anchorPlugin from 'markdown-it-anchor'
import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'MY NOTES',
  description: '我的个人博客',
  base: '/note/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: './icon.ico'
      }
    ]
  ],
  theme: defaultTheme({
    navbar: [
      {
        text: '回到首页',
        link: '/'
      },
      {
        text: '前端',
        link: '/web/vite + vue + electron 简单环境搭建.md'
      },
      {
        text: 'java',
        link: '/java/端口占用解决办法.md'
      },
    ],
    sidebar: [
      {
        text: 'web',
        children: [
          {
            text: 'vite + vue + electron 简单环境搭建.md',
            children: ['/web/vite + vue + electron 简单环境搭建.md'],
            collapsible: true
          },
          {
            text: '初识React',
            children: ['/web/初识React.md'],
            collapsible: true
          },
          {
            text: '使用vuePress创建个人博客',
            children: ['/web/使用vuePress创建个人博客.md'],
            collapsible: true
          },
        ],
        collapsible: true
      },
      {
        text: 'java',
        children: [
          {
            text: '端口占用',
            children: ['/java/端口占用解决办法.md'],
            collapsible: true
          },
          {
            text: 'spring笔记',
            children: ['/java/spring笔记.md'],
            collapsible: true
          },
          {
            text: 'mybatis笔记',
            children: ['/java/mybatis笔记.md'],
            collapsible: true
          },
          {
            text: 'spring MVC笔记',
            children: ['/java/spring MVC笔记.md'],
            collapsible: true
          },
          {
            text: 'springBoot笔记',
            children: ['/java/springBoot笔记.md'],
            collapsible: true
          },
          {
            text: 'redis笔记',
            children: ['/java/redis笔记.md'],
            collapsible: true
          },
          {
            text: '微信公众号推送',
            children: ['/java/微信公众号推送.md'],
            collapsible: true
          },
        ],
        collapsible: true
      }
    ]
  }),
  markdown: {
    anchor: {
      level: [0,1, 2, 3, 4, 5, 6],
      permalink: anchorPlugin.permalink.ariaHidden({
        class: 'header-anchor',
        symbol: '#',
        space: true,
        placement: 'before',
      }),
    }
  }
})
