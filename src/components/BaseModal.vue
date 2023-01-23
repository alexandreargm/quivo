<template>
  <div
    class="base-modal"
    :class="getHasBackgroundClass"
    aria-modal="true"
    role="dialog"
    @click.prevent.self="handleClose"
  >
    <div class="base-modal__dialog">
      <header
        v-if="$slots.header"
        class="base-modal__header"
      >
        <slot />
      </header>

      <main class="base-modal__body">
        <slot />
      </main>

      <footer
        v-if="$slots.footer"
        class="base-modal__footer"
      >
        <slot />
      </footer>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const emits = defineEmits(['close'])

const props = defineProps({
  hasBackground: {
    type: Boolean,
    default: false
  }
})

const getHasBackgroundClass = computed(() => props.hasBackground ? 'has-background' : '')

const handleClose = () => {
  emits('close')
}
</script>

<style lang='scss' scoped>
.base-modal {
  align-items: center;
  bottom: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: var(--z-modal-overlay);

  &__dialog {
    height: fit-content;
    z-index: var(--z-modal);
  }
}

// hasBackground prop
.base-modal.has-background {
  background-color: rgba(0,0,0, 0.2);
}
</style>
