<template>
  <button
    class="base-button"
    :class="[size, color, variant, iconClass, round]"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span
      v-if="$slots.icon"
      class="base-button__icon"
    >
      <slot name="icon" />
    </span>

    <span class="base-button__main">
      <slot />
    </span>
  </button>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BaseButton',
  emits: ['click'],

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
    icon: {
      type: String,
      default: 'before',
      validator: function (value) {
        return ['only', 'before', 'after'].includes(value)
      }
    },
    isRound: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator: function (value) {
        return ['submit', 'button'].includes(value)
      },
      default: 'button'
    }
  },

  setup (props, { emit }) {
    const buttonIconClases = {
      only: 'icon-only',
      before: 'icon-before',
      after: 'icon-after'
    }

    return {
      iconClass: computed(() => buttonIconClases[props.icon]),
      round: props.isRound ? 'round' : '',
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
  font-weight: var(--medium);
  height: var(--height);
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
  white-space: nowrap;

  &__icon {
    align-items: center;
    display: flex;
    justify-content: center;
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
  --color: var(--text-neutral);

  background-color: var(--background-secondary);
  border-color: transparent;

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

.base-button.icon-only {
  padding: 0;
  width: var(--height);

  .base-button__main {
    display: none;
  }
}

.base-button.icon-before {
  .base-button__icon {
    margin-left: calc(-1 * var(--space-20));
    margin-right: var(--space-30);
    order: -1;
  }
}

.base-button.icon-after {
  .base-button__icon {
    margin-left: var(--space-30);
    margin-right: calc(-1 * var(--space-20));
    order: 9999;
  }
}

// Round
.base-button.round {
  border-radius: var(--rounded100);
}

</style>
