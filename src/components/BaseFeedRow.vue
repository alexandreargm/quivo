<template>
  <section class="base-feed-row">
    <h2 class="base-feed-row__title">
      {{ title }}
    </h2>

    <div class="base-feed-row__feed">
      <base-slider class="base-feed-row__slider">
        <slot />
      </base-slider>
    </div>
  </section>
</template>

<script>
import BaseSlider from './BaseSlider.vue'

export default {
  components: { BaseSlider },

  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.base-feed-row {
  padding: var(--space00) var(--space20);

  &__title {
    color: var(--text-secondary);
    font-size: var(--font30);
    font-weight: var(--semibold);
    line-height: var(--line-20);
    margin-bottom: var(--space00);
    white-space: nowrap;
  }

  :deep(.base-feed-row__slider) {
    @include breakpoint('mobile') {
      gap: var(--space-10);
    }

    @include breakpoint('tablet') {
      gap: var(--space00);
    }

    @include breakpoint('desktop') {
      gap: var(--space30);
    }
  }
}
</style>
