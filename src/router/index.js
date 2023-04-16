import { createRouter, createWebHashHistory } from 'vue-router'

const HomeView = () => import('../views/Home')

const FinderView = () => import('../views/Finder')

export default createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/finder',
      name: 'finder',
      component: FinderView,
    }
  ]
})
