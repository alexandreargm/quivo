<template>
  <div
    class="base-close"
    :class="[size]"
  >
    <base-icon
      name="XIcon"
      size="xs"
      color="white"
    />
  </div>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default {
  components: { BaseIcon },

  props: {
    size: {
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
.base-close {
  align-items: center;
  background-color: var(--icon-tertiary);
  border-radius: var(--rounded100);
  color: var(--text-neutral);
  display: flex;
  justify-content: center;
}

.base-close.base {
  height: var(--size30);
  width: var(--size30);
}
</style>
