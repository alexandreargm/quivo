<template>
  <home-layout>
    <main class="home-feed">
      <popular-feed />
      <popular-feed />
      <popular-feed />
      <popular-feed />
      <popular-feed />
      <popular-feed />
      <popular-feed />
    </main>

    <template #preview>
      <router-view name="preview" />
    </template>
  </home-layout>
</template>
<script setup>
import { onMounted } from 'vue'
import HomeLayout from '../layouts/HomeLayout.vue'
import PopularFeed from '../components/PopularFeed.vue'

onMounted(() => {
  // this.$http('configuration')
  // this.$http('/watch/providers/movie?language=es')

  // this.$http('/certification/movie/list')
  // this.$http('/genre/movie/list')
})
</script>

<style lang="scss" scoped>
.home {
  //
}
</style>
