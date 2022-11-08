<template>
  <span
    class="base-tag"
    :class="[props.color, props.variant, props.size, getHasCloseClass()]"
  >
    <div class="base-tag__title">
      <slot>
        {{ props.title }}
      </slot>
    </div>

    <button
      v-if="hasClose"
      type="button"
      class="base-tag__close-button"
      @click="emits('close', $event)"
    >
      <base-icon
        name="XIcon"
        size="md"
        is-fluid
      />
    </button>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import BaseIcon from './BaseIcon.vue'

const emits = defineEmits(['close'])

const props = defineProps({
  color: {
    type: String,
    default: '',
    validator: function (value) {
      return ['', 'brand', 'danger'].includes(value)
    }
  },
  variant: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary'].includes(value)
    }
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '',
    validator: function (value) {
      return ['', 'sm', 'lg'].includes(value)
    }
  },
  hasClose: {
    type: Boolean,
    default: false
  }
})

const getHasCloseClass = () => {
  return props.hasClose ? 'has-close' : ''
}
</script>

<style lang='scss' scoped>
@layer base, size, color, variant;

@layer base {
  .base-tag {
    --_bg-color: var(--border);
    --_color: var(--text);
    --_font-size: var(--font-20);
    --_padding-size: var(--space-20);
    --_height-size: var(--size10);

    align-items: center;
    border-radius: var(--rounded30);
    color: var(--_color);
    display: flex;
    font-size: var(--_font-size);
    height: var(--_height-size);
    justify-content: center;
    overflow: hidden;
    user-select: none;
    width: fit-content;

    &__title {
      padding: 0 var(--_padding-size);
      white-space: nowrap;
    }

    &__close-button {
      appearance: none;
      background: none;
      border: 2px solid transparent;
      font-size: inherit;
      height: 100%;
      padding: var(--space-40);
      width: var(--size10);
    }
  }

  // HasClose
  .base-tag.has-close {
    .base-tag__title {
      padding-right: var(--space-30);
    }
  }
}

@layer color {
  // Color
  .base-tag.brand {
    --_bg-color: var(--icon-interactive);
    --_color: var(--text-neutral);
  }

  .base-tag.danger {
    --_bg-color: var(--icon-danger);
    --_color: var(--text-neutral);
  }
}

@layer variant {
  // Variant
  .base-tag.primary {
    background-color: var(--_bg-color);
    border: 1px solid var(--_bg-color);

    .base-tag__close-button {
      background: var(--_bg-color);
    }
  }

  .base-tag.secondary {
    border: 1px solid var(--_bg-color);
  }
}

@layer size {
  // Size
  .base-tag.sm {
    --_font-size: var(--font-20);
    --_padding-size: var(--space-30);
    --_height-size: var(--size00);

    .base-tag__close-button {
      width: var(--size10);
    }
  }

  .base-tag.lg {
    --_font-size: var(--font-10);
    --_padding-size: var(--space-20);
    --_height-size: var(--size20);

    .base-tag__close-button {
      width: var(--size20);
    }
  }
}
</style>
