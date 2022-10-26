<template>
  <button
    class="base-close"
    @click="emits('click')"
    type="button"
    :class="[props.size, getIsRoundClass()]"
  >
    <base-icon name="XIcon" />
  </button>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import BaseIcon from './BaseIcon.vue'

const emits = defineEmits(['click'])

const props = defineProps({
  size: {
    type: String,
    default: '',
    validator: function (value) {
      return ['', 'fluid', 'sm', 'lg'].includes(value)
    }
  },
  isRound: {
    type: Boolean,
    default: true
  }
})

const getIsRoundClass = () => {
  return props.isRound ? 'is-round' : ''
}
</script>

<style lang='scss' scoped>
.base-close {
  --_height: var(--size30);
  --_width: var(--_height);
  --_color: var(--text);
  --_bg-color: var(--color);

  align-items: center;
  appearance: none;
  background-color: var(--_bg-color);
  border: 2px solid transparent;
  color: var(--_color);
  display: flex;
  height: var(--_height);
  justify-content: center;
  vertical-align: middle;
  width: var(--_width);
}

// Size
.base-close.fluid {
  height: 100%;
  width: fit-content;
}

// IsRound
.base-close.is-round {
  border-radius: var(--rounded100);
}
</style>
