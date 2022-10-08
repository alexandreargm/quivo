<template>
  <article class="title-card">
    <router-link :to="titleLink">
      <title-poster :src="props.src" />
    </router-link>
  </article>
</template>

<script setup>
import { defineProps } from 'vue'
import TitlePoster from './TitlePoster.vue'
import appendRouteName from '../composables/useAppendRouteName.js'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: function (value) {
      return ['movie', 'tv'].includes(value)
    }
  },
  src: {
    type: String,
    required: true
  }
})

const titleLink = {
  name: appendRouteName('feed-preview'),
  params: { id: props.id, type: props.type }
}
</script>
