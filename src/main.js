import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
  .use(router)
  .use(createPinia())

app.mount('#app')
