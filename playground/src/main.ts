import { createApp, defineAsyncComponent } from 'vue'
import './style.css'
import 'font-awesome/css/font-awesome.css'

const App = defineAsyncComponent(() => import('./App.vue'))

createApp(App).mount('#app')
