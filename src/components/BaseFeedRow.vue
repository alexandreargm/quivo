<template>
  <section class="base-feed-row">
    <h2 class="base-feed-row__title">
      {{ title }}
    </h2>

    <div class="base-feed-row__feed">
      <base-slider
        :width="width"
        class="base-feed-row__slider"
      >
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
    },
    width: {
      type: String,
      default: '150px'
    }
  }
}
</script>

<style lang='scss' scoped>
.base-feed-row {
  padding: var(--container-gap) 0;

  &__title {
    color: var(--text-secondary);
    font-size: clamp(var(--font10), 5vw, var(--font30));
    font-weight: var(--medium);
    line-height: var(--line-20);
    padding: 0 var(--container-gap);
    white-space: nowrap;
  }
}
</style>
