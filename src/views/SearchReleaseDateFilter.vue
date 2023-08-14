<template>
  <base-filter-cloud
    :tags="releaseDateTags"
    :model-value="props.dateRange"
    @update:model-value="emits('update:dateRange', $event)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import BaseFilterCloud from '@/components/BaseFilterCloud.vue';
import { releaseDateTags } from './searchTags'

const emits = defineEmits([
  "update:dateRange",
])

const props = defineProps({
  dateRange: {
    type: String,
    required: true
  }
})
</script>
