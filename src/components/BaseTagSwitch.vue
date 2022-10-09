<template>
  <div
    class="base-tag-switch"
    role="switch"
    :aria-checked="isToggled"
  >
    <base-tag
      :color="getIsToggledColor"
      @click="toggleTag"
    >
      <slot />
    </base-tag>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, computed } from 'vue'
import BaseTag from './BaseTag.vue'

const isToggled = ref(false)
const getIsToggledColor = computed(() => isToggled.value ? 'interactive' : '')

const emits = defineEmits(['click'])

const props = defineProps({
  value: {
    type: Number,
    required: true
  }
})
const toggleTag = () => {
  isToggled.value = !isToggled.value
  emits('click', { value: props.value, isToggled: isToggled.value })
}
</script>

<style lang="scss">
.base-tag-switch {
  cursor: pointer;
}
</style>
