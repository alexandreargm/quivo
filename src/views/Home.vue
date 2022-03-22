<template>
  <home-layout>
    <router-view />

    <template #preview>
      <router-view name="preview" />
    </template>
  </home-layout>
</template>
<script setup>
import { onMounted } from 'vue'
import HomeLayout from '../layouts/HomeLayout.vue'

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
