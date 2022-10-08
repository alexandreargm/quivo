<template>
  <div class="finder-layout">
    <header class="finder-layout__header">
      <the-main-nav />
    </header>

    <div class="finder-layout__page">
      <div class="finder-layout__main">
        <slot />
      </div>

      <div class="finder-layout__preview">
        <slot name="preview" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TheMainNav from '../components/TheMainNav.vue'
</script>

<style lang="scss" scoped>
.finder-layout {
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
