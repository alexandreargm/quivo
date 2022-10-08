export default function (routeName, router) {
  const getRouteName = router.currentRoute.value.matched[0].name

  return `${getRouteName}-${routeName}`
}
