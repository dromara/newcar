// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import 'virtual:uno.css'
import Status from './components/Status.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'home-hero-before': () => h(Status),
    })
  },
}
