<template>
  <div
    class="base-searchbar"
    :class="[getThemeClass, getSizeClass, { 'is-open': isOpen }]"
  >
    <div class="base-searchbar__control">
      <BaseButton
        icon="only"
        variant="tertiary"
        @click="handleToggleOpen()"
      >
        <template #icon>
          <div class="base-searchbar__icon">
            <BaseIcon
              v-show="!isOpen"
              name="search"
            />
    
            <BaseIcon
              v-show="isOpen"
              name="arrow-left"
            />
          </div>
        </template>
      </BaseButton>

      <input
        ref="input"
        v-model="searchString"
        class="base-searchbar__input"
        type="text"
        autocomplete="off"
        autocorrect="off"
        placeholder="Find where to watch a movie"
        @focus="handleToggleOpen(true)"
        @input="isSearching = true, debouncedSearchTitles($event.currentTarget.value)"
      >
    </div>

    <div
      v-show="isOpen"
      class="base-searchbar__dropdown"
      :aria-expanded="isOpen"
    >
      <ol
        class="base-searchbar__list"
      >
        <li
          v-show="(searchString.trim() !== '' && !hasSearched) || (hasSearched && hasResults)"
          class="base-searchbar__list-item"
        >
          <router-link
            :to="{ name: 'search', params: { title: searchString } }"
            class="link"
          >
            <span class="link__all-results">Show all results</span>
          </router-link>
        </li>

        <li
          v-for="title in searchedTitles"
          v-show="!isSearching"
          :key="title.id"
          class="base-searchbar__list-item"
        >
          <router-link
            :to="{ name: 'home.movie.preview', params: { id: title.id } }"
            class="link"
            @click="handleToggleOpen(false)"
          >
            {{ title.title }}, <em>{{ parse(title.release_date, 'yyyy-MM-dd', new Date()).getFullYear() }}</em>
          </router-link>
        </li>
      </ol>

      <div
        v-show="searchString.trim() !== '' && isSearching"
        class="base-searchbar__list-loading"
      >
        Searching...
      </div>

      <div
        v-show="!isSearching && searchString.trim() !== '' && hasSearched && !hasResults"
        class="base-searchbar__no-results"
      >
        No results. Try another title
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineExpose } from "vue";
import BaseIcon from "./BaseIcon.vue";
import repositoryFactory from "../api/repository-factory";
import { useDebounceFn } from "../composables/useDebounceFn";
import { parse } from 'date-fns'
import { useScrollLock } from "../composables/useScrollLock";
import BaseButton from "./BaseButton.vue";

const { enable: enableScrollLock, disable: disableScrollLock} = useScrollLock({ immediate: false })

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
const searchedTitles = ref([]);
const isSearching = ref(false)
const isOpen = ref(false)
const hasSearched = ref(false)
const hasResults = ref(false)

const focus = () => {
  input.value?.focus();
};
async function searchTitles(titleName) {
  const { data } = await titlesRepository.simpleSearch({
    title: titleName
  });

  searchedTitles.value = data.results

  hasSearched.value = true
  hasResults.value = data.results.length > 0
  isSearching.value = false
}
const debouncedSearchTitles = useDebounceFn(
  titleName => searchTitles(titleName),
  600
);
function handleToggleOpen(newIsOpen = !isOpen.value) {
  isOpen.value = newIsOpen

  isOpen.value
    ? enableScrollLock()
    : handleClose()
}
function handleClose() {
  disableScrollLock()
  searchString.value = ""
  searchedTitles.value = []
  hasSearched.value = false
  hasResults.value = false
}

defineExpose({ focus });
</script>

<style lang="scss" scoped>
@layer base,
theme,
size;

@layer base {
  .base-searchbar {
    width: v-bind(width);
    max-width: 100%;
    position: relative;    

    &.is-open {
      position: fixed;
      inset: 0;
      height: 100dvh;
      width: 100%;
      z-index: var(--z-fixed);
      display: grid;
      grid-template-rows: auto 1fr;
    }

    &.is-open .base-searchbar__control {
      border-radius: 0;
    }

    &__control {
      background-color: var(--_theme-bg);
      border-radius: var(--rounded20);
      display: grid;
      grid-template-columns: var(--size30) 1fr;
      align-items: center;
      height: var(--size40);
      font-size: var(--font00);
      max-width: 100%;
    }

    &__icon {
      color: var(--text-secondary);
      justify-self: center;
    }

    &__input {
      padding: 0 var(--space00) 0 var(--space-20);
      flex-grow: 1;
      height: 100%;
      background: none;
      border: 0;
      cursor: text !important;
      font-size: inherit;
      outline: 0;
      text-overflow: ellipsis;
    }

    &__dropdown {
      border-top: 1px solid var(--background-tertiary);
      width: 100%;
      background: var(--_theme-bg);
      box-shadow: var(--shadow2);
      border-radius: 0 0 var(--rounded20) var(--rounded20);
      overflow-y: auto;
    }

    &__list{
      padding: 0;
      margin: 0;
    }

    &__list-item {
      list-style: none;
      min-height: 44px;
      display: flex;
      align-items: center;
      font-weight: 300;
      font-size: var(--font10);
      line-height: var(--line10);
    }

    &__list-loading,
    &__no-results {
      padding: var(--space-10);
      color: var(--text-secondary);
    }
  }

  .link {
    padding: var(--space-10);
    flex-grow: 1;
    max-width: 100%;

    &:hover {
      background: var(--background-hover);
    }

    &__all-results {
      color: var(--text-secondary);
    }

    &__all-results-keyword {
      font-weight: 500;
    }
  }

  .base-searchbar:is(.is-open) {
    .base-searchbar__control {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
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
