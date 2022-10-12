<template>
  <span
    class="base-tag"
    :class="[props.color, props.variant, props.size]"
  >
    <slot>
      {{ props.title }}
    </slot>

    <div class="base-tag__close-button">
      <base-icon name="CloseIcon" />
    </div>
  </span>
</template>

<script setup>
import { defineProps } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  color: {
    type: String,
    default: '',
    validator: function (value) {
      return ['', 'interactive', 'danger'].includes(value)
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
    default: 'base',
    validator: function (value) {
      return ['', 'sm', 'lg'].includes(value)
    }
  }
})
</script>

<style lang='scss' scoped>
.base-tag {
  --color: var(--text-neutral);
  --font-size: var(--font-20);
  --padding-size: var(--space-20);
  --height-size: var(--size10);

  align-items: center;
  border-radius: var(--rounded30);
  color: var(--color);
  display: flex;
  font-size: var(--font-size);
  height: var(--height-size);
  justify-content: center;
  padding: 0 var(--padding-size);
  user-select: none;
  width: fit-content;
}

// Color
.base-tag.interactive {
  --bg-color: var(--icon-interactive);
  --color: var(--text-neutral);
}

.base-tag.danger {
  --bg-color: var(--icon-danger);
  --color: var(--text-neutral);
}

// Variant
.base-tag.primary {
  background-color: var(--bg-color);
  border: 1px solid var(--bg-color);
}

.base-tag.secondary {
  border: 1px solid var(--bg-color);
}

// Size
.base-tag.sm {
  --font-size: var(--font-20);
  --padding-size: var(--space-30);
  --height-size: var(--size00);
}

.base-tag.lg {
  --font-size: var(--font-10);
  --padding-size: var(--space-10);
  --height-size: var(--size20);
}
</style>
