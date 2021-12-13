<template>
  <div class="default-layout">
    <the-header />
    <slot />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  name: 'DefaultLayout',
  components: { TheHeader }
}
</script>

<style lang="scss" scoped>
.default-layout {
  background: var(--background);
  min-height: 100vh;
}
</style>
