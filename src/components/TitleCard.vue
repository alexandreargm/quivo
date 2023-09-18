<template>
  <article class="title-card">
    <title-poster :src="props.src" />
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
})
</script>
