<template>
  <base-tag
    :title="getLabel"
    variant="secondary"
    size="lg"
    has-close
    @close="emits('close', $event)"
  />
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
  }
})

const getLabel = computed(() => {
  if (props.amount === 1) return props.singleItemLabel

  return `${props.category} · ${props.amount}`
})

</script>

<style lang='scss' scoped>
  //
</style>
