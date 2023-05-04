<template>
  <div class="quick-tag-filters">
    <menu class="quick-tag-filters__inner">
      <li
        v-for="{ title, value} in keywords"
        :key="value"
        class="quick-tag-filters__item"
      >
        <button
          type="button"
          class="quick-tag-filters-item"
          size="sm"
        >
          {{ title }}
        </button>
      </li>
    </menu>
  </div>
</template>

<script setup>
import { keywords } from './AdvancedSearchFeature';
</script>

<style lang='scss' scoped>
.quick-tag-filters {
  max-width: 100%;

  &__inner {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-10);
    margin: 0;
  }

  &__item {
    padding: 0;
    list-style: none;
  }
}

.quick-tag-filters-item {
  padding: 0 var(--space-10);
  white-space: nowrap;
  height: var(--size20);
  border-radius: var(--rounded20);
  background:  var(--background-secondary);
  color: var(--text-neutral);
  border: none;

  &:hover {
    background: var(--color-interactive-hover);
    color: var(--text-neutral-hover);
  }

  &:active {
    background: var(--color-interactive-active);
    color: var(--text-neutral-active);
  }
}
</style>
