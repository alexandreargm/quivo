<template>
  <div class="base-feed-row">
    <base-slider
      :width="props.width"
      class="base-feed-row__slider"
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
