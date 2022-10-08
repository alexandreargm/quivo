import { useRoute } from 'vue-router'

export default function (routeName, router = null) {
  const getRouteName = router
    ? router.currentRoute.value.matched[0].name
    : useRoute().matched[0].name

  return `${getRouteName}-${routeName}`
}
