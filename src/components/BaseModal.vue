<template>
  <div
    class="base-modal"
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

<script>
export default {
  emits: ['close'],

  setup (_, { emit }) {
    const handleClose = () => {
      emit('close')
    }

    return {
      handleClose
    }
  }
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

  &::before {
    background-color: var(--background);
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0.9;
    pointer-events: none;
    position: fixed;
    right: 0;
    top: 0;
  }

  &__dialog {
    z-index: var(--z-modal);
  }
}
</style>
