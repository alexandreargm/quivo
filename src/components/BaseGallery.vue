<template>
  <div class="base-gallery__wrapper">
    <div class="base-gallery">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  mobileColumnCount: {
    type: Number,
    default: 2
  },
  mobileLgColumnCount: {
    type: Number,
    default: 4
  },
  tabletColumnCount: {
    type: Number,
    default: 5
  },
  desktopColumnCount: {
    type: Number,
    default: 10
  }
})
</script>

<style lang="scss" scoped>
.base-gallery {
  --_mobile-column-count: v-bind(props.mobileColumnCount);
  --_mobile-lg-column-count: v-bind(props.mobileLgColumnCount);
  --_tablet-column-count: v-bind(props.tabletColumnCount);
  --_desktop-column-count: v-bind(props.desktopColumnCount);

  display: grid;
  align-items: start;
  gap: var(--space-10) var(--space-20);
  grid-template-columns: repeat(var(--_mobile-column-count), 1fr);

  @container (min-width: 450px) {
    grid-template-columns: repeat(var(--_mobile-column-count), 1fr);
  }

  @container (min-width: 750px) {
    grid-template-columns: repeat(var(--_tablet-column-count), 1fr);
  }

  @container (min-width: 1400px) {
    grid-template-columns: repeat(var(--_desktop-column-count), 1fr);
  }

  &__wrapper {
    container-type: inline-size;
  }
}
</style>
