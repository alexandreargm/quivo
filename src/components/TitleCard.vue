<template>
  <article class="title-card">
    <title-poster
      :src="props.src"
      :alt="props.alt"
      :caption="props.caption"
      :theme="props.theme"
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
  theme: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary'].includes(value)
    }
  },
})
</script>
