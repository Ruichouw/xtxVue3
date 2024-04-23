import { createApp } from 'vue'
import pinia from './stores/index'
import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
import { lazyPlugin } from '@/directives/index'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(lazyPlugin)
app.mount('#app')
