<template>
  <span
    class="base-filter-tag"
    :class="[getStateClass]"
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
.base-filter-tag {
  --bg-color: var(--background-secondary);
  --color: var(--text-neutral);
  --border-color: transparent;

  align-items: center;
  background-color: var(--bg-color);
  border-radius: var(--rounded40);
  color: var(--color);
  cursor: pointer;
  display: flex;
  font-size: var(--font-20);
  height: var(--size10);
  justify-content: center;
  padding: 0 var(--space-20);
  text-decoration-color: var(--text-neutral);
  user-select: none;
}

// State
.base-filter-tag.is-including {
  --bg-color: var(--icon-interactive);
  --color: var(--text-neutral);
  --border-color: var(--text-neutral);
}

.base-filter-tag.is-excluding {
  --bg-color: var(--icon-danger-secondary);
  --color: var(--text-neutral);
  --border-color: var(--text-neutral);

  text-decoration: line-through;
}
</style>
