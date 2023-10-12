<template>
  <article class="title-card">
    <title-poster
      :src="props.src"
      :alt="props.alt"
      :caption="props.caption"
    />
  </article>
</template>

<script setup>
import { defineProps } from 'vue'
import TitlePoster from './TitlePoster.vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
})
</script>
