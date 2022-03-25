import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home'

const HomeFeed = () => import('../components/HomeFeed')
const TitlePreviewDrawer = () => import('../components/TitlePreviewDrawer')

export default createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          alias: '',
          name: 'feed',
          component: HomeFeed
        },
        {
          path: 'preview/:type/:id',
          name: 'feed-preview',
          components: {
            default: HomeFeed,
            preview: TitlePreviewDrawer
          }
        }
      ]
    }
  ]
})
