<template>
  <div class="searchbar">
    <base-input
      v-model="computedValue"
      placeholder="Search movies and TV series"
      width="100%"
    >
      <template #before>
        <div class="searchbar__icon">
          <base-icon name="SearchIcon" />
        </div>
      </template>
    </base-input>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import BaseInput from './BaseInput'
import BaseIcon from './BaseIcon.vue'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const computedValue = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emits('update:modelValue', newValue)
  }
})
</script>

<style lang='scss' scoped>
.searchbar {
  &__icon {
    color: var(--text-secondary) !important;
    padding: var(--space-20) 0 var(--space-20) var(--space00);
  }
}
</style>
