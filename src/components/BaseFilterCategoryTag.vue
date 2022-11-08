<template>
  <div
    class="base-filter-category-tag"
    :class="getIsExcludedClass"
  >
    <base-tag
      :title="getLabel"
      variant="secondary"
      color="brand"
      size="lg"
      has-close
      @close="emits('close', $event)"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import BaseTag from './BaseTag.vue'

const emits = defineEmits(['close'])

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  singleItemLabel: {
    type: String,
    required: true
  },
  isExcluding: {
    type: Boolean,
    default: false
  }
})

const getLabel = computed(() => {
  if (props.amount === 1) return props.singleItemLabel

  return `${props.category} · ${props.amount}`
})
const getIsExcluded = computed(() => {
  if (props.amount === 1) return props.isExcluding

  return false
})
const getIsExcludedClass = computed(() => getIsExcluded.value ? 'is-excluded' : '')
</script>

<style lang='scss' scoped>
.base-filter-category-tag.is-excluded {
  text-decoration: line-through;
}
</style>
