<template>
  <div class="base-modal-overlay">
    <div class="base-modal">
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
  setup () {

  }
}
</script>

<style lang='scss' scoped>
.base-modal-overlay {
  align-items: flex-end;
  background-color: var(--background) 80;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
}

.base-modal {
  width: 100%;
}
</style>
