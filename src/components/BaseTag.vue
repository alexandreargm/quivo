<template>
  <span
    class="base-tag"
    :class="[color]"
  >
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'base',
      validator: function (value) {
        return ['base'].includes(value)
      }
    }
  },

  setup () {

  }
}
</script>

<style lang='scss' scoped>
.base-tag {
  align-items: center;
  border-radius: var(--rounded40);
  display: flex;
  height: var(--size10);
  justify-content: center;
  padding: 0 var(--space-20);
}

// Color
.base-tag.base {
  background-color: var(--background-secondary);
  color: var(--text-neutral);
  font-size: var(--font-20);
}
</style>
