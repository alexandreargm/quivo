<template>
  <default-layout>
    <main class="home-page">
      <base-icon name="BeakerIcon" />
    </main>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import BaseIcon from '@/components/BaseIcon'

export default {
  name: 'Home',
  components: {
    DefaultLayout,
    BaseIcon
  },
  created () {
    this.$http('configuration')
    this.$http('/genre/movie/list')
  }
}
</script>

<style lang="scss" scoped>
//
</style>
