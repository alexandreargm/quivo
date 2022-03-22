<template>
  <div class="base-feed-gallery">
    <base-slider
      :width="props.width"
      direction="y"
      class="base-feed-gallery__slider"
    >
      <slot />
    </base-slider>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import BaseSlider from './BaseSlider.vue'

const props = defineProps({
  width: {
    type: String,
    default: '150px'
  }
})
</script>
