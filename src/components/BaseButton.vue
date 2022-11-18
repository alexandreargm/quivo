<template>
  <button
    class="base-button"
    :class="[size, color, variant, iconClass, round]"
    :type="type"
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
      default: '',
      validator: function (value) {
        return ['', 'brand', 'reverse', 'danger'].includes(value)
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
      default: '',
      validator: function (value) {
        return ['', 'sm', 'lg'].includes(value)
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
    },
    width: {
      type: String,
      default: 'auto'
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
      handleClick (event) {
        emit('click', event)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.base-button {
  --_height: var(--size30);
  --_padding: var(--space20);
  --_bg-color: var(--color);
  --_color: var(--text);
  --_color-hover: var(--text-hover);
  --_color-active: var(--text-active);

  align-items: center;
  appearance: none;
  border: 2px solid transparent;
  border-radius: var(--rounded20);
  color: var(--_color);
  display: flex;
  font-family: inherit;
  font-size: var(--font00);
  font-weight: var(--medium);
  height: var(--_height);
  justify-content: center;
  line-height: 1;
  padding: 0 var(--_padding);
  vertical-align: middle;
  white-space: nowrap;
  width: v-bind(width);

  &__icon {
    align-items: center;
    color: inherit;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
  }
}

// Colors

.base-button.brand {
  --_bg-color: var(--color-interactive);
  --_color: var(--text-reverse-neutral);
  --_color-hover: var(--color-interactive-hover);
  --_color-active: var(--color-interactive-active);

  &:hover {
    --_bg-color: var(--color-interactive-hover);
  }

  &:active {
    --_bg-color: var(--color-interactive-active);
  }
}

.base-button.danger {
  --_bg-color: var(--color-danger);
  --_color: var(--text-reverse-neutral);
  --_color-hover: var(--color-danger-hover);
  --_color-active: var(--color-danger-active);

  &:hover {
    --_bg-color: var(--color-danger-hover);
  }

  &:active {
    --_bg-color: var(--color-danger-active);
  }
}

.base-button.reverse {
  --_bg-color: var(--color-reverse);
  --_color: var(--text-reverse-neutral);
  --_color-hover: var(--color-reverse-hover);
  --_color-active: var(--color-reverse-active);

  &:hover {
    --_bg-color: var(--color-reverse-hover);
  }

  &:active {
    --_bg-color: var(--color-reverse-active);
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
  background-color: var(--_bg-color);
  border-color: transparent;
}

.base-button.secondary {
  background-color: transparent;
  border-color: var(--_bg-color);

  &:hover {
    border-color: var(--_color-hover);
  }

  &:active {
    border-color: var(--_color-active);
  }
}

.base-button.tertiary {
  --_padding: var(--space-20);

  color: var(--_bg-color);
  background-color: transparent;

  &:hover {
    color: var(--_color-hover);
  }

  &:active {
    color: var(--_color-active);
  }
}

// Sizes
.base-button.sm {
  --_height: var(--size20);
  --_padding: var(--space10);
}

.base-button.lg {
  --_height: var(--size40);
  --_padding: var(--space30);
}

// Icon
.base-button.icon-only {
  padding: 0;
  width: var(--_height);

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
