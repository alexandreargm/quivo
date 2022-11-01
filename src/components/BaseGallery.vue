<template>
  <div class="base-gallery__wrapper">
    <div class="base-gallery">
      <slot />
    </div>
  </div>
</template>

<script setup>
import 'container-query-polyfill'
</script>

<style lang="scss" scoped>
/* stylelint-disable */
.base-gallery {
  display: grid;
  gap: var(--space-30);
  grid-template-columns: repeat(2, 1fr);

  @container (min-width: 450px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @container (min-width: 750px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @container (min-width: 1400px) {
    grid-template-columns: repeat(10, 1fr);
  }

  &__wrapper {
    container-type: inline-size;
  }
}
/* stylelint-enable */
</style>
