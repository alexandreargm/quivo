<template>
  <main class="base-advanced-search-all-filters">
    <base-title
      level="1"
      class="visually-hidden"
    >
      All filters
    </base-title>

    <section class="block">
      <base-title level="2">
        Genre
      </base-title>

      <base-filter-cloud-multiple
        :tags="genreTags"
        multiple
        has-excluded-values
        :included-values="props.genres"
        :excluded-values="props.excludedGenres"
        @update:included-values="emits('update:genres', $event)"
        @update:excluded-values="emits('update:excludedGenres', $event)"
      />
    </section>

    
    <section class="block">
      <base-title level="2">
        Release date
      </base-title>

      <base-filter-cloud
        :tags="releaseDateTags"
        :model-value="props.dateRange"
        @update:model-value="emits('update:dateRange', $event)"
      />
    </section>

    <section class="block">
      <base-title level="2">
        Tags
      </base-title>

      <base-filter-cloud-multiple
        :tags="keywordTags"
        multiple
        has-excluded-values
        :included-values="props.keywords"
        :excluded-values="props.excludedKeywords"
        @update:included-values="emits('update:keywords', $event)"
        @update:excluded-values="emits('update:excludedKeywords', $event)"
      />
    </section>
  </main>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import BaseTitle from './BaseTitle.vue';
import BaseFilterCloud from './BaseFilterCloud.vue';
import BaseFilterCloudMultiple from './BaseFilterCloudMultiple.vue';
import { keywordTags, releaseDateTags } from '../views/searchTags'
import { genresRepository } from '../api/repositories/genres-repository';

const emits = defineEmits([
  "update:keywords",
  "update:excludedKeywords",
  "update:genres",
  "update:excludedGenres",
  "update:dateRange",
])

const props = defineProps({
  keywords: {
    type: Array,
    required: true
  },
  excludedKeywords: {
    type: Array,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  excludedGenres: {
    type: Array,
    required: true
  },
  dateRange: {
    type: String,
    required: true
  }
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

<style lang='scss'>
 .base-advanced-search-all-filters {
  background: var(--background-secondary);
  padding: var(--space20) var(--container-gap);
 }
</style>