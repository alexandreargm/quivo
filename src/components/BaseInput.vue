<template>
  <div
    class="base-input"
    :class="[getThemeClass, getSizeClass]"
  >
    <div
      v-if="$slots.before"
      class="base-input__before"
    >
      <slot name="before" />
    </div>

    <input
      v-model="computedValue"
      class="base-input__input"
      v-bind="$attrs"
      :type="type"
      :autocomplete="autocomplete"
      :autocorrect="autocorrect"
    >

    <div
      v-if="$slots.after"
      class="base-input__after"
    >
      <slot name="after" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  autocorrect: {
    type: String,
    default: 'off'
  },
  width: {
    type: String,
    default: 'fit-content'
  },
  maxWidth: {
    type: String,
    default: '100%'
  },
  theme: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'md',
    validator: function (value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  }
})

const computedValue = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})
const getThemeClass = computed(() => `${props.theme}-theme`)
const getSizeClass = computed(() => props.size)
</script>

<style lang='scss' scoped>
@layer base, theme, size;

@layer base {
  .base-input {
    align-items: stretch;
    background-color: var(--_theme-bg);
    border-radius: var(--rounded20);
    display: grid;
    grid-template-columns: max-content minmax(0, 100%) max-content;;
    grid-template-rows: var(--_size, --size30);
    font-size: var(--font00);
    width: v-bind(width);
    max-width: v-bind(maxWidth);
    padding: 0 var(--space-10);

    &:focus-within {
      outline: 2px solid var(--border-reverse);
    }

    &__input {
      background: none;
      border: 0;
      cursor: text !important;
      font-size: inherit;
      outline: 0;
      text-overflow: ellipsis;
      padding: 0;
    }
  }
}

@layer theme {
  // Theme prop
  .base-input.primary-theme {
    --_theme-bg: var(--background);
  }
  .base-input.secondary-theme {
    --_theme-bg: var(--background-secondary);
  }
  .base-input.tertiary-theme {
    --_theme-bg: var(--background-tertiary);
  }
}

@layer size {
  .base-input.sm {
    --_size: var(--size20);
  }
  .base-input.md {
    --_size: var(--size30);
  }
  .base-input.lg {
    --_size: var(--size40);
  }
}
</style>
