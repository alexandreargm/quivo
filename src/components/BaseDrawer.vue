<template>
  <div
    ref="rootEl"
    class="base-drawer"
    :class="[props.size]"
  >
    <div class="base-drawer__inner">
      <div
        v-if="props.showClose"
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
          v-if="props.title"
          class="base-drawer__header"
        >
          {{ props.title }}
        </header>

        <div class="base-drawer__body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, defineExpose } from 'vue'
import BaseClose from '../components/BaseClose.vue'

const emits = defineEmits(['close'])

const props = defineProps({
  title: {
      type: String,
      default: ''
    },
    showClose: {
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
})

const rootEl = ref(null)

function handleClose () {
  emits('close')
}

defineExpose({
  rootEl,
  handleClose
})
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
      height: 100dvh;
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
      overscroll-behavior: contain;
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
  min-height: 100dvh;
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
