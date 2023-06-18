<template>
  <div
    class="base-searchbar"
    :class="[getThemeClass, getSizeClass]"
  >
    <div class="base-searchbar__control">
      <div class="base-searchbar__icon">
        <BaseIcon name="SearchIcon" />
      </div>

      <input
        ref="input"
        v-model="searchString"
        class="base-searchbar__input"
        type="text"
        autocomplete="off"
        autocorrect="off"
        placeholder="Where to watch..."
        @input="debouncedSearchTitles($event.currentTarget.value)"
      >
    </div>

    <ol
      class="base-searchbar__list"
    >
      <li class="base-searchbar__list-item">
        <span class="base-searchbar__keyword">{{ searchString }}</span> in all
        movie results
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineExpose } from "vue";
import BaseIcon from "./BaseIcon.vue";
import repositoryFactory from "../api/repository-factory";
import { useDebounceFn } from "../composables/useDebounceFn";

const titlesRepository = repositoryFactory.get("titles");

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: "550px"
  },
  theme: {
    type: String,
    default: "primary",
    validator: function(value) {
      return ["primary", "secondary", "tertiary"].includes(value);
    }
  }
});

const searchString = ref("");
const getThemeClass = computed(() => `${props.theme}-theme`);
const getSizeClass = computed(() => props.size);
const input = ref(null);
const searchResults = ref([]);

const focus = () => {
  input.value?.focus();
};
async function searchTitles(titleName) {
  searchResults.value = await titlesRepository.simpleSearch({
    title: titleName
  });
}
const debouncedSearchTitles = useDebounceFn(
  titleName => searchTitles(titleName),
  500
);

defineExpose({ focus });
</script>

<style lang="scss" scoped>
@layer base,
theme,
size;

@layer base {
  .base-searchbar {
    position: relative;

    &__control {
      background-color: var(--_theme-bg);
      border-radius: var(--rounded20);
      display: flex;
      align-items: center;
      height: var(--size40);
      font-size: var(--font00);
      width: v-bind(width);
      max-width: 100%;
      padding: 0 var(--space00);
    }

    &__control:has(input:focus) {
      outline: 2px solid var(--border-reverse);
    }

    &__icon {
      margin-right: var(--space-10);
      color: var(--text-secondary);
    }

    &__input {
      flex-grow: 1;
      height: 100%;
      background: none;
      border: 0;
      cursor: text !important;
      font-size: inherit;
      outline: 0;
      text-overflow: ellipsis;
      padding: 0;
    }

    &__list {
      position: absolute;
      width: 100%;
      padding: var(--space00);
      margin: 0;
      background: var(--_theme-bg);
      box-shadow: var(--shadow2);
    }

    &__list-item {
      list-style: none;
      padding: 0 var(--space-10);
      height: var(--size20);
    }

    &__keyword {
      font-weight: var(--bold);
    }
  }
}

@layer theme {
  // Theme prop
  .base-searchbar.primary-theme {
    --_theme-bg: var(--background);
  }

  .base-searchbar.secondary-theme {
    --_theme-bg: var(--background-secondary);
  }

  .base-searchbar.tertiary-theme {
    --_theme-bg: var(--background-tertiary);
  }
}
</style>
