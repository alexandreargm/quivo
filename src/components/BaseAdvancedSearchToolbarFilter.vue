<template>
  <div
    class="advanced-search-toolbar-filter"
    :class="{ 
      [props.color]: props.color,
      'has-filters': props.count > 0 || undefined
    }"
  >
    <button
      type="button"
      class="advanced-search-toolbar-filter__filter-button"
      @click="emits('click', $event)"
    >
      <div class="advanced-search-toolbar-filter__title">
        <slot />
      </div>
      
      <span class="advanced-search-toolbar-filter__count">
        {{ props.count }}
      </span>
    </button>

    <button
      v-show="props.showClose"
      type="button"
      class="advanced-search-toolbar-filter__close-button"
      :tab-index="props.showClose ? '-1' : undefined"
      @click="emits('close')"
    >
      <base-icon name="close" />
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import BaseIcon from './BaseIcon.vue';

const emits = defineEmits(['click','close'])

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
  },
  showClose: {
    type: Boolean,
    default: false
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
    font-size: var(--font-20);
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid var(--_border-color);

    &__filter-button {
      all: unset;
      display: grid;
      grid-template-columns: auto 2ch;
      gap: var(--space-40);
      padding: 0 var(--space-10) 0 var(--space-10);
      align-items: center;
      color: var(--_color);
    }

    &__close-button {
      all: unset;
      display: grid;
      place-content: center;
      width: max-content;
      height: var(--size20);
      width: var(--size20);
      border-radius: var(--rounded100);
      color: var(--text-secondary);
      border: 1px solid var(--_border-color);
      margin-right: -1px !important;
    }
  
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
      text-align: right;
    }

    &.has-filters, &.has-filters .advanced-search-toolbar-filter__close-button {
      border-color: var(--icon-interactive);
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