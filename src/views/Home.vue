<template>
  <default-layout>
    <main class="home-page">
      <home-popular-now />
    </main>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import HomePopularNow from '../components/HomePopularNow.vue'

export default {
  name: 'Home',
  components: {
    DefaultLayout,
    HomePopularNow
  },
  created () {
    // this.$http('configuration')
    // this.$http('/genre/movie/list')
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  //
}
</style>
