import { createRouter, createWebHashHistory } from 'vue-router'

const HomeView = () => import('../views/Home')
const TitlePreviewDrawer = () => import('../components/TitlePreviewDrawer')

const FinderView = () => import('../views/Finder')
const FinderSearch = () => import('../components/FinderSearch')

export default createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'preview/:type/:id',
          name: 'home-feed-preview',
          components: {
            default: HomeView,
            preview: TitlePreviewDrawer
          }
        }
      ]
    },
    {
      path: '/finder',
      name: 'finder',
      component: FinderView,
      children: [
        {
          path: '',
          name: 'finder-feed',
          components: {
            search: FinderSearch
          }
        },
        {
          path: 'preview/:type/:id',
          name: 'finder-feed-preview',
          components: {
            search: FinderSearch,
            preview: TitlePreviewDrawer
          }
        }
      ]
    }
  ]
})
