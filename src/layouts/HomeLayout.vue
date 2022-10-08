<template>
  <div class="home-layout">
    <header class="home-layout__header">
      <the-main-nav />
    </header>

    <div class="home-layout__page">
      <div class="home-layout__main">
        <slot />
      </div>

      <div class="home-layout__preview">
        <slot name="preview" />
      </div>
    </div>
  </div>
</template>

<script>
import TheMainNav from '../components/TheMainNav.vue'

export default {
  name: 'HomeLayout',
  components: { TheMainNav }
}
</script>

<style lang="scss" scoped>
.home-layout {
  padding-top: var(--the-main-nav-height);

  &__header {
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__page {
    position: relative;

    @include breakpoint('desktop') {
      display: grid;
      grid-template-columns: minmax(0%, 100%) min-content;
    }
  }

  &__main {
    height: calc(100vh - var(--the-main-nav-height));
    overflow-y: scroll;
  }
}
</style>
