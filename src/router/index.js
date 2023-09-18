import { createRouter, createWebHashHistory } from 'vue-router'

const HomeView = () => import('../views/Home')

const FinderView = () => import('../views/Finder')

const SearchView = () => import('../views/Search')

const TitlePreviewDrawer = () => import('../components/TitlePreviewDrawer.vue')

export default createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'movie/:id',
          name: 'home.movie.preview',
          components: {
            drawer: TitlePreviewDrawer
          }
        }
      ]
    },
    {
      path: '/finder',
      name: 'finder',
      component: FinderView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      children: [
        {
          path: 'movie/:id',
          name: 'search.movie.preview',
          components: {
            drawer: TitlePreviewDrawer
          },
          params: {
            type: 'movie'
          }
        }
      ]
    },
    
  ]
})
