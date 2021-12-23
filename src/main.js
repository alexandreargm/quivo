import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axiosInstance from '@/plugins/axios'
import apiRepositories from './plugins/api-repositories'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(apiRepositories)

app.config.globalProperties.$http = axiosInstance
app.mount('#app')
