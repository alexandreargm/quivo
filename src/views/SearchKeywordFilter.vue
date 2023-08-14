<template>
  <base-filter-cloud-multiple
    :tags="keywordTags"
    multiple
    has-excluded-values
    :included-values="props.keywords"
    :excluded-values="props.excludedKeywords"
    @update:included-values="emits('update:keywords', $event)"
    @update:excluded-values="emits('update:excludedKeywords', $event)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import BaseFilterCloudMultiple from '@/components/BaseFilterCloudMultiple.vue';
import { keywordTags } from './searchTags'

const emits = defineEmits([
  "update:keywords",
  "update:excludedKeywords",
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
})
</script>
