<template>
  <button
    type="button"
    class="advanced-search-toolbar-filter"
    :class="props.color"
    @click="emits('click', $event)"
  >
    <div class="advanced-search-toolbar-filter__title">
      <slot />
    </div>
          
    <span class="advanced-search-toolbar-filter__count">
      {{ props.count }}
    </span>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emits = defineEmits(['click'])

const props = defineProps({
  count: {
    type: Number,
    required: true
  },
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
  .advanced-search-toolbar-filter {
    all: unset;
    box-sizing: inherit;
    height: var(--size20);
    min-width: 20px;
    border-radius: var(--rounded100);
    padding: 0 var(--space-20) 0 var(--space-10);
    font-size: var(--font-20);
    display: grid;
    grid-template-columns: auto 24px;
    align-items: center;
    cursor: pointer;
    color: var(--_color);
    border: 1px solid var(--_border-color);
  
    &:hover {
      color: var(--_color-hover);
      border-color: var(--_border-color-hover);
    }
  
    &:active {
      color: var(--_color-active);
      border-color: var(--_border-color-active);
    }
  
    &__title {
      white-space: nowrap;
    }
  
    &__count {
      text-align: center;
    }
  }
}

@layer color {
  .advanced-search-toolbar-filter.default {
    --_color: var(--text-secondary);
    --_color-hover: var(--text-hover-secondary);
    --_color-active: var(--text-active-secondary);
    --_border-color: var(--color);
    --_border-color-hover: var(--color-hover-secondary);
    --_border-color-active: var(--color-active-secondary);
  }

  .advanced-search-toolbar-filter.interactive {
    --_color: var(--color-interactive);
    --_color-hover: var(--color-interactive-hover);
    --_color-active: var(--color-interactive-active);
    --_border-color: var(--icon-interactive);
    --_border-color-hover: var(--icon-interactive-hover);
    --_border-color-active: var(--icon-interactive-active);
  }
}
</style>