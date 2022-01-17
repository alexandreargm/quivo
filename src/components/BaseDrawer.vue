<template>
  <div
    class="base-drawer"
    :class="[size]"
  >
    <div class="base-drawer__inner">
      <div
        v-if="showClose"
        class="base-drawer__close"
      >
        <base-close @pepe="log" />
      </div>

      <div class="base-drawer__background" />

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
import BaseClose from '../components/BaseClose.vue'

export default {
  emits: ['close'],

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

  setup (props, { emit }) {
    return {
      log () {
        debugger
        emit('close')
      },
      handleClose () {
        emit('close')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.base-drawer {
  --background-color: var(--background);

  max-width: 600px;

  @include breakpoint-max('desktop') {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: var(--z-overlay);

    &__inner {
      bottom: 0;
      display: flex;
      left: 0;
      right: 0;
      top: 0;
    }
  }

  &__close {
    opacity: 0.75;
    position: absolute;
    right: var(--space00);
    top: var(--space00);
    z-index: var(--z-fixed);
  }

  &__content {
    background-color: var(--background-color);
  }

  &__background {
    background-color: var(--background-color);
    height: 100%;
    min-height: 100vh;
    opacity: 0.7;
    width: 100%;

    @include breakpoint('desktop') {
      display: none;
    }
  }

  &__body {
    @include breakpoint-max('desktop') {
      height: 100vh;
      overflow-y: auto;
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
