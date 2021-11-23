<template>
  <button
    class="base-button"
    :class="[size, color, variant, isIconClass]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span
      v-if="$slots.left"
      class="base-button__left-slot"
    >
      <slot name="left" />
    </span>

    <span class="base-button__main">
      <slot />
    </span>

    <span
      v-if="$slots.right"
      class="base-button__right-slot"
    >
      <slot name="right" />
    </span>
  </button>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BaseButton',
  props: {
    color: {
      type: String,
      default: 'brand',
      validator: function (value) {
        return ['brand', 'reverse', 'danger'].includes(value)
      }
    },
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'tertiary'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'base',
      validator: function (value) {
        return ['base', 'sm', 'lg'].includes(value)
      }
    },
    isIcon: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  setup (props, { emit }) {
    return {
      isIconClass: computed(() => props.isIcon ? 'icon' : ''),
      handleClick () {
        emit('click')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.base-button {
  align-items: center;
  appearance: none;
  border: 2px solid transparent;
  border-radius: var(--rounded20);
  display: flex;
  font-family: inherit;
  font-size: var(--font00);
  height: var(--height);
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
  white-space: nowrap;

  > * + * {
    margin-left: var(--space-20);
  }

  &__right-slot {
    margin-right: calc(var(--space-20) * -1);
  }

  &__left-slot {
    margin-left: calc(var(--space-20) * -1);
  }
}

// Colors

.base-button.brand {
  --bg-color: var(--color-interactive);
  --color: var(--text-reverse-neutral);
  --color-hover: var(--color-interactive-hover);
  --color-active: var(--color-interactive-active);

  &:hover {
    --bg-color: var(--color-interactive-hover);
  }

  &:active {
    --bg-color: var(--color-interactive-active);
  }
}

.base-button.danger {
  --bg-color: var(--color-danger);
  --color: var(--text-reverse-neutral);
  --color-hover: var(--color-danger-hover);
  --color-active: var(--color-danger-active);

  &:hover {
    --bg-color: var(--color-danger-hover);
  }

  &:active {
    --bg-color: var(--color-danger-active);
  }
}

.base-button.reverse {
  --bg-color: var(--color-reverse);
  --color: var(--text-reverse-neutral);
  --color-hover: var(--color-reverse-hover);
  --color-active: var(--color-reverse-active);

  &:hover {
    --bg-color: var(--color-reverse-hover);
  }

  &:active {
    --bg-color: var(--color-reverse-active);
  }
}

// States
.base-button:disabled {
  &,
  &:hover,
  :active {
    background-color: var(--color-neutral) !important;
    border-color: transparent !important;
    color: var(--text-neutral) !important;
    cursor: not-allowed;
  }
}

// Variant

.base-button.primary {
  background-color: var(--bg-color);
  border-color: transparent;
  color: var(--color);
}

.base-button.secondary {
  background-color: var(--background-secondary);
  border-color: transparent;
  color: var(--text-neutral);

  &:hover {
    background-color: var(--background-hover-secondary);
  }

  &:active {
    background-color: var(--background-active-secondary);
  }
}

.base-button.tertiary {
  background-color: transparent;
  color: var(--bg-color);

  &:hover {
    color: var(--color-hover);
  }

  &:active {
    color: var(--color-active);
  }

  &:focus {
    border-color: var(--bg-color);
  }
}

// Sizes

.base-button.base {
  --height: var(--size30);

  padding: 0 var(--space20);
}

.base-button.sm {
  --height: var(--size20);

  padding: 0 var(--space10);
}

.base-button.lg {
  --height: var(--size40);

  padding: 0 var(--space30);
}

// Icon

.base-button.icon {
  padding: 0;
  width: var(--height);
}

</style>
