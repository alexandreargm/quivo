import { createRouter, createWebHashHistory } from 'vue-router'

const HomeView = () => import('../views/Home')
const HomeFeed = () => import('../components/HomeFeed')
const TitlePreviewDrawer = () => import('../components/TitlePreviewDrawer')

const FinderView = () => import('../views/Finder')
const FinderFeed = () => import('../components/FinderFeed')
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
          path: '',
          name: 'home-feed',
          component: HomeFeed
        },
        {
          path: 'preview/:type/:id',
          name: 'home-feed-preview',
          components: {
            default: HomeFeed,
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
            search: FinderSearch,
            default: FinderFeed
          }
        },
        {
          path: 'preview/:type/:id',
          name: 'finder-feed-preview',
          components: {
            search: FinderSearch,
            default: FinderFeed,
            preview: TitlePreviewDrawer
          }
        }
      ]
    }
  ]
})
