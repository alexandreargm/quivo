<template>
  <div
    class="base-close"
    :class="[size]"
  >
    <base-button
      icon="only"
      variant="secondary"
      :is-round="true"
      @click="handleClick"
    >
      <template #icon>
        <base-icon name="XIcon" />
      </template>
    </base-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

export default {
  name: 'BaseClose',
  emits: ['click'],

  components: {
    BaseButton,
    BaseIcon
  },

  props: {
    size: {
      type: String,
      default: 'base',
      validator: function (value) {
        return ['base'].includes(value)
      }
    }
  },

  setup (props, { emit }) {
    return {
      handleClick () {
        emit('click')
      }
    }
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
