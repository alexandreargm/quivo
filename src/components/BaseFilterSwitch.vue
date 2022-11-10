<template>
  <span
    class="base-filter-switch"
    :class="[getStateClass, getThemeClass]"
    role="switch"
    :aria-checked="isActive"
    @click="handleClick"
  >
    {{ title }}
  </span>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'

// TODO: only allow one active tag when not multiple.

const STATE_FLAGS = ref({
  INACTIVE: 0,
  INCLUDED: 1,
  EXCLUDED: 2
})

const emit = defineEmits(['select', 'update:state'])

const isActive = computed(() => props.state > 0)
const getThemeClass = computed(() => `${props.theme}-theme`)
const getStateClass = computed(() => {
  const STYLE = {
    0: '',
    1: 'is-including',
    2: 'is-excluding'
  }

  return STYLE[props.state]
})

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  value: {
    type: [Number, Object],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    required: true
  },
  isMultiple: {
    type: Boolean,
    default: false
  },
  hasExcludes: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary'].includes(value)
    }
  }
})

const getNextFlag = () => {
  const getStateFlagValues = Object.values(STATE_FLAGS.value)
  const hasReachedLastFlag = props.state === getStateFlagValues.length - 1
  const getNexFlagValue = getStateFlagValues[props.state + 1]

  return hasReachedLastFlag
    ? STATE_FLAGS.value.INACTIVE
    : getNexFlagValue
}
const handleClick = () => {
  emit('select', {
    id: props.id,
    value: props.value,
    state: getNextFlag()
  })
}

// Remove exclude flag if not enabled.
if (props.hasExcludes === false) {
  delete STATE_FLAGS.value.EXCLUDED
}
</script>

<style lang="scss">
@layer base, state;

@layer base {
  .base-filter-switch {
    --_bg-color: transparent;
    --_color: var(--text-neutral);
    --_border-color: var(--border);

    align-items: center;
    background-color: var(--_bg-color);
    border-radius: var(--rounded40);
    color: var(--_color);
    cursor: pointer;
    display: flex;
    font-size: var(--font-20);
    font-weight: 300;
    height: var(--size10);
    justify-content: center;
    padding: 0 var(--space-20);
    text-decoration-color: var(--text-neutral);
    user-select: none;
    border: 1px solid var(--_border-color);
  }
}

@layer state {
  // State
  .base-filter-switch.is-including {
    --_bg-color: var(--icon-interactive);
    --_color: var(--white);
    --_border-color: transparent;
  }

  .base-filter-switch.is-excluding {
    --_bg-color: var(--icon-danger-secondary);
    --_color: var(--white);
    --_border-color: transparent;

    text-decoration: line-through;
}
}
</style>
