<template>
  <span
    class="base-tag"
    :class="[color, variant]"
  >
    <slot>
      {{ title }}
    </slot>
  </span>
</template>

<script>
export default {
  props: {
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
    }
  }
}
</script>

<style lang='scss' scoped>
.base-tag {
  --bg-color: var(--background-secondary);
  --color: var(--text-neutral);

  align-items: center;
  border-radius: var(--rounded40);
  color: var(--color);
  display: flex;
  font-size: var(--font-20);
  height: var(--size10);
  justify-content: center;
  padding: 0 var(--space-20);
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
</style>
