<template>
  <base-input
    ref="input"
    v-model="computedValue"
    :placeholder="placeholder"
    :width="width"
    :max-width="maxWidth"
    :size="size"
    :theme="theme"
  >
    <template #before>
      <slot name="before">
        <div class="searchbar-icon">
          <base-icon name="SearchIcon" />
        </div>
      </slot>
    </template>

    <template #after>
      <slot name="after" />
    </template>
  </base-input>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, defineExpose } from 'vue'
import BaseInput from './BaseInput'
import BaseIcon from './BaseIcon.vue'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Find something to watch'
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
  },
  theme: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary'].includes(value)
    }
  },
})

const computedValue = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emits('update:modelValue', newValue)
  }
})
const input = ref(null)

const focus = () => {
  input.value?.focus()
}

defineExpose({ focus })
</script>

<style lang='scss' scoped>
.searchbar-icon {
  color: var(--text-secondary) !important;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: var(--space-20);
}
</style>
