<template>
  <button
    class="base-button"
    :class="[size, color, variant, isIconClass]"
    v-bind="$attrs"
    @click="onClick"
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
        return ['brand', 'accent', 'danger', 'success', 'warning', 'info', 'white', 'black'].indexOf(value) !== -1
      }
    },
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'tertiary', 'link'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: 'base',
      validator: function (value) {
        return ['base', 'sm', 'lg', 'xl'].indexOf(value) !== -1
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
      onClick () {
        emit('click')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.base-button {
  --height: 40px;

  align-items: center;
  appearance: none;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  color: var(--color);
  display: flex;
  font-family: inherit;
  font-size: var(--font-base);
  height: var(--height);
  justify-content: center;
  line-height: 1;
  padding: 0 var(--spacing-xl);
  vertical-align: middle;
  white-space: nowrap;

  > * + * {
    margin-left: var(--spacing-sm);
  }

  &__right-slot {
    margin-right: calc(var(--spacing-sm) * -1);
  }

  &__left-slot {
    margin-left: calc(var(--spacing-sm) * -1);
  }
}

// Colors

.base-button.brand {
  --bg-color: var(--brand);
  --border-color: transparent;
  --color: var(--gray2);
}

.base-button.accent {
  --bg-color: var(--accent);
  --border-color: transparent;
  --color: var(--gray12);
}

.base-button.danger {
  --bg-color: var(--danger);
  --border-color: transparent;
  --color: var(--gray2);
}

.base-button.success {
  --bg-color: var(--success);
  --border-color: transparent;
  --color: var(--gray2);
}

.base-button.warning {
  --bg-color: var(--warning);
  --border-color: transparent;
  --color: var(--gray2);
}

.base-button.info {
  --bg-color: var(--info);
  --border-color: transparent;
  --color: var(--gray2);
}

.base-button.white {
  --bg-color: var(--gray1);
  --border-color: transparent;
  --color: var(--gray12);
}

.base-button.black {
  --bg-color: var(--gray12);
  --border-color: transparent;
  --color: var(--gray1);
}

// States
.base-button:hover {
  //
}

// Variant

.base-button.primary {
  background-color: var(--bg-color);
  border-color: transparent;
  color: var(--color);
}

.base-button.secondary {
  background-color: var(--gray12);
  border-color: var(--gray11);
  color: var(--gray2);
}

.base-button.tertiary {
  background-color: transparent;
  border-color: var(--bg-color);
  color: var(--bg-color);
}

.base-button.link {
  background-color: transparent;
  border-color: transparent;
  color: var(--bg-color);
}

// Sizes

.base-button.sm {
  --height: 32px;

  font-size: var(--font-md);
  padding: 0 var(--spacing-lg);
}

.base-button.lg {
  --height: 48px;

  padding: 0 var(--spacing-2xl);
}

.base-button.xl {
  --height: 54px;

  font-size: var(--font-lg);
  padding: 0 var(--spacing-3xl);
}

// Icon

.base-button.icon {
  padding: 0;
  width: var(--height);
}

</style>
