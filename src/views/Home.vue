<template>
  <default-layout>
    <main class="home-page">
      <base-icon name="BeakerIcon" />
    </main>
  </default-layout>
</template>

<script>
import defaultLayout from '@/layouts/default'
import BaseIcon from '@/components/BaseIcon'

export default {
  name: 'Home',
  components: {
    defaultLayout,
    BaseIcon
  },
  created () {
    this.$http('configuration')
  }
}
</script>

<style lang="scss" scoped>
  //
</style>
