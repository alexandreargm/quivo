<template>
  <div
    ref="rootEl"
    class="base-drawer"
    :class="[size]"
  >
    <div class="base-drawer__inner">
      <div
        v-if="showClose"
        class="base-drawer__close"
      >
        <base-close @click="handleClose" />
      </div>

      <div
        class="base-drawer__background"
        @click="handleClose"
      />

      <div class="base-drawer__content">
        <header
          v-if="title"
          class="base-drawer__header"
        >
          {{ title }}
        </header>

        <div class="base-drawer__body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import BaseClose from '../components/BaseClose.vue'
// import useScrollLock from '../composables/useScrollLock'

export default {

  components: { BaseClose },

  props: {
    title: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: false
    },
    useContainer: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '',
      validator: function (value) {
        return ['', 'full', 'auto'].includes(value)
      }
    }
  },
  emits: ['close'],

  setup (_, { emit }) {
    const rootEl = ref(null)
    // const { enableBodyScroll, disableBodyScroll } = useScrollLock

    onMounted(() => {
      // disableBodyScroll(rootEl.value)
    })

    return {
      rootEl,
      handleClose () {
        emit('close')
        // enableBodyScroll(rootEl.value)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.base-drawer {
  --background-color: var(--background);

  @include breakpoint-max('desktop') {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: var(--z-overlay);

    &__inner {
      display: flex;
      height: 100vh;
    }
  }

  &__close {
    opacity: 0.85;
    position: absolute;
    right: var(--space00);
    top: var(--space00);
    z-index: var(--z-fixed);
  }

  &__content {
    background-color: var(--background-color);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__background {
    background-color: var(--background-color);
    flex: 1;
    height: 100%;
    opacity: 0.85;

    @include breakpoint('desktop') {
      display: none;
    }
  }

  &__body {
    @include breakpoint-max('desktop') {
      overflow: auto;
    }
  }
}

// Mode
.base-drawer.absolute {
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  left: 0;
  right: 0;
  top: 0;

  @include breakpoint-max('desktop') {
    position: fixed;
  }
}

.base-drawer.block {
  position: sticky;
}

.base-drawer.fixed {
  bottom: 0;
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
}

// Size

.base-drawer.full {
  max-width: 100%;
}

.base-drawer.auto {
  max-width: unset;
}
</style>
