<template>
  <form
    class="base-advanced-search"
    :class="props.size"
    @submit.prevent
  >
    <div class="base-advanced-search__control">
      <div class="base-advanced-search__icon">
        <BaseIcon name="SearchIcon" />
      </div>

      <input
        class="base-advanced-search__input"
        type="text" 
        autocomplete="off"
        autocorrect="off"
        placeholder="Find something to watch"
      >
    </div>
    
    <div class="base-advanced-search__filters">
      <div class="filters">
        <button
          type="button"
          class="filters__all-filters"
          @click="isAllFiltersOpen = true"
        >
          All filters <base-icon name="ChevronDownIcon" />
        </button>

        <slot />
  
        <!-- <button
          type="button"
          class="filters__item"
        >
          genres
          
          <span class="filters__count">
            {{ props.genres.length + props.excludedGenres.length }}
          </span>
        </button>

        <button
          type="button"
          class="filters__item"
        >
          tags
          
          <span class="filters__count">
            {{ props.genres.length + props.excludedGenres.length }}
          </span>
        </button>

        <button
          type="button"
          class="filters__item"
        >
          release date
          
          <span class="filters__count">
            {{ props.genres.length + props.excludedGenres.length }}
          </span>
        </button> -->
      </div>
    </div>

    <div
      v-show="isAllFiltersOpen"
      class="base-advanced-search__all-filters-dialog"
    >
      <!-- <BaseAdvancedSearchAllFiltersDialog /> -->
    </div>
  </form>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import BaseIcon from './BaseIcon.vue';
import BaseAdvancedSearchAllFiltersDialog from './BaseAdvancedSearchAllFiltersDialog.vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: undefined
  },
  title: {
    type: String,
    required: true
  },
  keywords: {
    type: Array,
    required: true
  },
  excludedKeywords: {
    type: Array,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  excludedGenres: {
    type: Array,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
})

const isAllFiltersOpen = ref(false)
 
</script>

<style lang='scss'>
@layer base;

@layer base {
  .base-advanced-search {
    &__control {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: var(--size30);
      padding-inline: var(--space-10); 
      align-items: stretch;
      border-radius: var(--rounded20);
      background: var(--background-secondary);
      margin-bottom: var(--space-30);
    }

    &__icon {
      display: grid;
      place-content: center;
      margin-right: var(--space-10);
      color: var(--text-secondary);
    }

    &__input {
      all: unset;
    }

    &__filters {
      padding-block: var(--space-20);
    }

    &__all-filters-dialog {
      position: absolute;
      inset: 0;
      top: 100%;
      height: 100dvh;
      background: var(--background-secondary);
      padding: var(--space20) var(--container-gap);
      z-index: var(--z-modal);
    }
  }

  .filters {
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--space-20);
    color: var(--text-secondary);

    

    &__all-filters {
      all: unset;
      font-size: var(--font-20);
      display: grid;
      grid-template-columns: auto 12px;
      align-items: center;
    }

    &__item {
      all: unset;
      height: var(--size20);
      border-radius: var(--rounded100);
      border: 1px solid var(--color-secondary);
      padding: 6px var(--space-10);
      font-size: var(--font-20);
      display: flex;
      align-items: center;
      gap: var(--space-25);
    }

    &__item:hover {
      color: var(--text-hover);
      border-color: var(--color-tertiary-hover);
    }

    &__item:active {
      color: var(--text-active);
      border-color: var(--color-tertiary-active);
    }
  }
}
</style>