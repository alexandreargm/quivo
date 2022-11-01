<template>
  <component
    class="base-title"
    :is="getLevelTag()"
    :class="getLevelClass()"
  >
    <slot>{{ props.title }}</slot>
  </component>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  level: {
    type: String,
    required: true,
    default: '1',
    validator: function (value) {
      return ['1', '2', '3', '4', '5', '6'].includes(value)
    }
  },
  title: {
    type: String,
    default: ''
  }
})

const getLevelTag = () => {
  return 'h' + props.level
}
const getLevelClass = () => {
  return 'is-level-' + props.level
}
</script>

<style lang='scss' scoped>
.base-title {
  color: var(--text-secondary);
  font-size: clamp(var(--min-size), 4vw, var(--max-size));
  font-weight: var(--medium);
  line-height: var(--line-20);
  white-space: nowrap;

  &.is-level-1 {
    --min-size: var(--font30);
    --max-size: var(--font40);
  }

  &.is-level-2 {
    --min-size: var(--font10);
    --max-size: var(--font30);
  }

  &.is-level-3 {
    --min-size: var(--font10);
    --max-size: var(--font30);
  }

  &.is-level-4 {
    --min-size: var(--font10);
    --max-size: var(--font30);
  }

  &.is-level-5 {
    --min-size: var(--font10);
    --max-size: var(--font30);
  }

  &.is-level-6 {
    --min-size: var(--font10);
    --max-size: var(--font30);
  }
}
</style>
