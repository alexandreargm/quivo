<template>
  <button
    type="button"
    class="advanced-search-toolbar-button"
    :class="props.color"
    @click="emits('click', $event)"
  >
    <div class="advanced-search-toolbar-button__title">
      <slot />
    </div>

    <div
      v-if="$slots.icon"
      class="advanced-search-toolbar-button__icon"
    >
      <slot name="icon" />
    </div>
  </button>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const emits = defineEmits(['click'])

const props = defineProps({
  color: {
    type: String,
    default: 'default',
    validator: function(value) {
      return ['default', 'interactive'].includes(value)
    }
  }
})
</script>

<style lang='scss'>
@layer base, color;

@layer base {
  .advanced-search-toolbar-button {
    all: unset;
    height: var(--size20);
    box-sizing: inherit;
    padding: 0 var(--space-20);
    font-size: var(--font-20);
    display: grid;
    grid-template-columns: auto 12px;
    align-items: center;
    cursor: pointer;
    color: var(--_color);
    white-space: nowrap;
    
    &:hover {
      color: var(--_color-hover);
    }
    
    &:active {
      color: var(--_color-active);
    }
    
    &__title {
      white-space: nowrap;
    }
  }
}

@layer color {
  .advanced-search-toolbar-button.default {
    --_color: var(--text-secondary);
    --_color-hover: var(--text-hover-secondary);
    --_color-active: var(--text-active-secondary);
  }

  .advanced-search-toolbar-button.interactive {
    --_color: var(--color-interactive);
    --_color-hover: var(--color-interactive-hover);
    --_color-active: var(--color-interactive-active);
  }
}

</style>