<template>
  <button
    type="button"
    class="filters__item"
  >
    <slot />
          
    <span class="filters__count">
      {{ props.count }}
    </span>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

 const props = defineProps({
  count: {
    type: Number,
    required: true
  }
 })
</script>

<style lang='scss'>
 .advanced-search-filter-toggle {
      all: unset;
      height: var(--size20);
      border-radius: var(--rounded100);
      border: 1px solid var(--color-secondary);
      padding: 6px var(--space-10);
      font-size: var(--font-20);
      display: flex;
      align-items: center;
      gap: var(--space-25);

    &:hover {
      color: var(--text-hover);
      border-color: var(--color-tertiary-hover);
    }

    &:active {
      color: var(--text-active);
      border-color: var(--color-tertiary-active);
    }
  }
</style>