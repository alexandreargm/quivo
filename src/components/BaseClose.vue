<template>
  <div
    class="base-close"
    :class="[props.size]"
  >
    <base-button
      icon="only"
      variant="secondary"
      :is-round="true"
      @click="emits('click')"
    >
      <template #icon>
        <base-icon name="XIcon" />
      </template>
    </base-button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const emits = defineEmits(['click'])

const props = defineProps({
  size: {
    type: String,
    default: 'base',
    validator: function (value) {
      return ['base'].includes(value)
    }
  }
})
</script>

<style lang='scss' scoped>
.base-close {
  align-items: center;
  background-color: var(--icon-tertiary);
  border-radius: var(--rounded100);
  color: var(--text-neutral);
  display: flex;
  justify-content: center;
}

.base-close.base {
  height: var(--size30);
  width: var(--size30);
}
</style>
