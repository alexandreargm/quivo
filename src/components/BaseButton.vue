<template>
  <button
    class="base-button"
    :class="[size, color, variant, isIconClass]"
    v-bind="$attrs"
    @click="onClick"
  >
    <span
      v-if="$slots.before"
      class="base-button__before"
    >
      <slot name="before" />
    </span>

    <span class="base-button__main">
      <slot />
    </span>

    <span
      v-if="$slots.after"
      class="base-button__after"
    >
      <slot name="after" />
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
      default: 'default',
      validator: function (value) {
        return ['accent', 'danger', 'success', 'warning', 'info'].indexOf(value) !== -1
      }
    },
    variant: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['secondary', 'tertiary', 'link'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['sm', 'lg', 'xl'].indexOf(value) !== -1
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
  --bg-color: var(--brand);
  --border-color: transparent;
  --color: var(--gray2);
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
  line-height: 1;
  padding: 0 var(--spacing-xl);
  white-space: nowrap;

  > * + * {
    margin-left: var(--spacing-md);
  }
}

// Colors

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

// Variant

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
