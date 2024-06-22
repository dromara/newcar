import { createApp, defineAsyncComponent } from 'vue'
import 'font-awesome/css/font-awesome.css'
import './assets/index.css'

const App = defineAsyncComponent(() => import('./App.vue'))

createApp(App).mount('#app')
