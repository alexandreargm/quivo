<template>
  <base-filter-cloud-multiple
    :tags="genreTags"
    multiple
    has-excluded-values
    :included-values="props.genres"
    :excluded-values="props.excludedGenres"
    @update:included-values="emits('update:genres', $event)"
    @update:excluded-values="emits('update:excludedGenres', $event)"
  />
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import BaseFilterCloudMultiple from '@/components/BaseFilterCloudMultiple.vue';
import { genresRepository } from '@/api/repositories/genres-repository';

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

const genreTags = ref([])

function handleSearchGenres() {
  const data = genresRepository.fetch()

  data.then(response => {
    genreTags.value = response
  })

  return data
}

handleSearchGenres()
</script>