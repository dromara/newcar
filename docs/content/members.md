---
layout: home

hero:
  name: Members
  tagline: BugDuck Open Source Team
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/78635021?v=4',
    name: 'Acbox Liu',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/sheepbox8646' },
      { icon: 'x', link: 'https://twitter.com/AcboxSky' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/57032603?v=4',
    name: '27Onion Nebell',
    title: 'Programmer',
    links: [
      { icon: 'github', link: 'https://github.com/onion108' },
      { icon: 'x', link: 'https://twitter.com/2Nebell' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/56634385?v=4',
    name: 'Sam Zhang',
    title: 'Programmer',
    links: [
      { icon: 'github', link: 'https://github.com/samzhangjy' },
      { icon: 'x', link: 'https://twitter.com/samzhangjy' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/110272607?v=4',
    name: 'PrairieFire2b',
    title: 'Programmer',
    links: [
      { icon: 'github', link: 'https://github.com/PrairieFire2b' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/73536163?v=4',
    name: 'Shizuku',
    title: 'Design | Documentation',
    links: [
      { icon: 'github', link: 'https://github.com/ifshizuku' },
      { icon: 'x', link: 'https://twitter.com/ifszk' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/104210832?v=4',
    name: 'montmorillonite',
    title: 'Programmer | Documentation',
    links: [
      { icon: 'github', link: 'https://github.com/montmorill' },
      {
        icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill-rule="evenodd" d="M3.73252 2.67094c-.40023-.3861-.40023-1.02721 0-1.4133.38039-.366956.983-.366956 1.36339 0l2.12132 2.04639c.06026.05815.11146.12207.15358.19004h3.20809c.0422-.06797.0934-.13189.1536-.19004l2.1213-2.04639c.3804-.366956.983-.366956 1.3634 0 .4003.38609.4003 1.0272 0 1.4133l-.8532.82313H14c2.2091 0 4 1.79086 4 4v5.50553c0 2.2091-1.7909 4-4 4H4c-2.20914 0-4-1.7909-4-4V7.49406c0-2.20914 1.79086-3.99999 4-3.99999h.58579l-.85327-.82313ZM4 5.42343c-1.10457 0-2 .89543-2 2v5.64677c0 1.1046.89543 2 2 2h10c1.1046 0 2-.8954 2-2V7.42343c0-1.10457-.8954-2-2-2H4Zm1 3.89404c0-.55228.44772-1 1-1s1 .44772 1 1v.89403c0 .5523-.44772 1-1 1s-1-.4477-1-1v-.89403Zm7-1c-.5523 0-1 .44772-1 1v.89403c0 .5523.4477 1 1 1s1-.4477 1-1v-.89403c0-.55228-.4477-1-1-1Z" clip-rule="evenodd"/></svg>' },
        link: "https://space.bilibili.com/648265393",
      },
      {
        icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="#50c8fd" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"/></svg>' },
        link: "https://montmorill.github.io/links/QQ?2696519745",
      },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/29159838?v=4',
    name: 'Hydration',
    title: 'Programmer',
    links: [
      { icon: 'github', link: 'https://github.com/hydrati' },
      { icon: 'x', link: 'https://twitter.com/hyachano' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/25446947?v=4',
    name: 'Linesoft',
    title: 'Programmer',
    links: [
      { icon: 'github', link: 'https://github.com/linesoft2' },
      { icon: 'x', link: 'https://twitter.com/linesoft_zyl' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/84657208?v=4',
    name: 'XiaoDong',
    title: 'Programmer | Documentation',
    links: [
      { icon: 'github', link: 'https://github.com/xiaodong2008' },
      { icon: 'x', link: 'https://twitter.com/dy_xiaodong' }
    ]
  },
]
</script>

<VPTeamMembers :members="members" />
