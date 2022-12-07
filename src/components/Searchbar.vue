<template>
  <div class="searchbar">
    <base-input
      v-model="computedValue"
      :placeholder="placeholder"
      :width="width"
      :max-width="maxWidth"
      :size="size"
      theme="primary"
    >
      <template #before>
        <slot name="before">
          <div class="searchbar__icon">
            <base-icon name="SearchIcon" />
          </div>
        </slot>
      </template>

      <template #after>
        <slot name="after" />
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
  },
  placeholder: {
    type: String,
    default: 'Search movies and TV series'
  },
  width: {
    type: String,
    default: 'auto'
  },
  maxWidth: {
    type: String,
    default: '100%'
  },
  size: {
    type: String,
    default: 'md'
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
    margin-right: var(--space-20);
  }
}
</style>
