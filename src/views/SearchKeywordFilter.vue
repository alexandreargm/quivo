<template>
  <base-filter-cloud-multiple
    :tags="props.tags"
    multiple
    has-excluded-values
    :included-values="props.keywords"
    :excluded-values="props.excludedKeywords"
    @update:included-values="emits('update:keywords', $event), emits('change', $event)"
    @update:excluded-values="emits('update:excludedKeywords', $event), emits('change', $event)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import BaseFilterCloudMultiple from '@/components/BaseFilterCloudMultiple.vue';

const emits = defineEmits([
  "update:keywords",
  "update:excludedKeywords",
  "change"
])

const props = defineProps({
  tags: {
    type: Array,
    required: true
  },
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
