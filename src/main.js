import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axiosInstance from '@/plugins/axios'

const app = createApp(App)
  .use(store)
  .use(router)

app.config.globalProperties.$http = axiosInstance
app.mount('#app')
