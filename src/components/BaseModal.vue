<template>
  <div
    class="base-modal"
    :class="[
      getHasBackgroundClass,
      props.size,
      props.variant
    ]"
    aria-modal="true"
    role="dialog"
    @click.prevent.self="handleClose"
  >
    <div class="base-modal__dialog">
      <header
        v-if="$slots.header"
        class="base-modal__header"
      >
        <div class="base-modal__header-content">
          <slot name="header" />
        </div>

        <base-button
          icon="only"
          variant="tertiary"
          @click.capture="handleClose"
          @key-down.stop.enter="handleClose"
        >
          <template #icon>
            <base-icon name="XIcon" />
          </template>
        </base-button>
      </header>

      <main class="base-modal__body">
        <slot />
      </main>

      <footer
        v-if="$slots.footer"
        class="base-modal__footer"
      >
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseIcon from './BaseIcon.vue';

const emits = defineEmits(['close'])

const props = defineProps({
  hasBackground: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: function(value) {
      return ['sm', 'md', 'lg', 'full'].includes(value)
    }
  },
  variant: {
    type: String,
    default: 'modal',
    validator: function(value) {
      return ['modal', 'dialog'].includes(value)
    }
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
  height: 100dvh;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: var(--z-modal-overlay);

  &__dialog {
    z-index: var(--z-modal);
  }

  &__header {
    background: var(--background-secondary);
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  &__header-content {
    padding: var(--space10) 0 var(--space-10) var(--container-gap);
  }

  &__body {
  }

  &__footer {
    position: sticky;
    bottom: 0;
    padding: var(--container-gap);
  }
}

// hasBackground prop
.base-modal.has-background {
  background-color: rgba(0,0,0, 0.75);
}

// size prop
.base-modal.sm {
  .base-modal__dialog {
    width: 45ch;
  }
}
.base-modal.md {
  .base-modal__dialog {
    width: 60ch;
  }
}
.base-modal.lg {
  .base-modal__dialog {
    width: 75ch;
  }
}
.base-modal.full {
  .base-modal__dialog {
    max-height: 100%;
    width: 100%;
  }
}

// variant prop
.base-modal.modal {
  .base-modal__body {
    padding: var(--space10) var(--container-gap);
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .base-modal__dialog {
    height: fit-content;
    max-height: 90%;
    border: 1px solid var(--border);
    background: var(--background-secondary);
    overflow-y: auto;
    overscroll-behavior: contain;
  }
}

.base-modal.dialog {
  .base-modal__dialog {
    width: 100%;
  }
}
</style>
