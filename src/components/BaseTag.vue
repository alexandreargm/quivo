<template>
  <span
    class="base-tag"
    :class="[color]"
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
  background-color: var(--bg-color);
  border-radius: var(--rounded40);
  color: var(--color);
  display: flex;
  font-size: var(--font-20);
  height: var(--size10);
  justify-content: center;
  padding: 0 var(--space-20);
  user-select: none;
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
</style>
