import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axiosInstance from '@/plugins/axios'
import apiRepositories from './plugins/api-repositories'
import { createPinia } from 'pinia'

const app = createApp(App)
  .use(router)
  .use(apiRepositories)
  .use(createPinia())

app.config.globalProperties.$http = axiosInstance
app.mount('#app')
