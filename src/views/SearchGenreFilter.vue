<template>
  <base-filter-cloud-multiple
    v-if="genreStore.genres.length > 0"
    :tags="genreStore.genres"
    multiple
    has-excluded-values
    :included-values="props.genres"
    :excluded-values="props.excludedGenres"
    @update:included-values="emits('update:genres', $event)"
    @update:excluded-values="emits('update:excludedGenres', $event)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import BaseFilterCloudMultiple from '@/components/BaseFilterCloudMultiple.vue';
import { useGenreStore } from "@/store/genre"

const genreStore = useGenreStore()

const emits = defineEmits([
  "update:genres",
  "update:excludedGenres",
])

const props = defineProps({
  genres: {
    type: Array,
    required: true
  },
  excludedGenres: {
    type: Array,
    required: true
  },
})
</script>