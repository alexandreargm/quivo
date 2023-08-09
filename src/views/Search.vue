<template>
  <div class="search-view">
    <header class="search-view__header">
      <router-link :to="{ name: 'home'}">
        <span
          role="banner"
          class="logo"
        >
          Quivo
        </span>
      </router-link>
    </header>

    <main class="search-view__main">
      <div class="search-view__search search-view__search_sticky">
        <div class="search-view__searchbar">
          <BaseAdvancedSearch v-model="searchFilters.title" />
        </div>

        <div class="filters">
          <div class="filters__inner">
            <base-switch v-model="isAllFiltersOpen">
              <template #trigger="{ toggle, isOpen }">
                <BaseAdvancedSearchToolbarButton
                  :color="isOpen ? 'interactive' : 'default'"
                  @click="toggle"
                >
                  All filters

                  <template #icon>
                    <base-icon
                      v-show="!isOpen"
                      name="ChevronDownIcon"
                    />

                    <base-icon
                      v-show="isOpen"
                      name="ChevronUpIcon"
                    />
                  </template>
                </BaseAdvancedSearchToolbarButton>
              </template>
            </base-switch>

            <base-switch v-model="isAllFiltersOpen">
              <template #trigger="{ toggle, isOpen }">
                <BaseAdvancedSearchToolbarFilter
                  :count="searchFilters.genres.length + searchFilters.excludedGenres.length"
                  :color="isOpen ? 'interactive' : 'default'"
                  @click="toggle"
                >
                  genres
                </BaseAdvancedSearchToolbarFilter>
              </template>
            </base-switch>
  
            <base-switch v-model="isAllFiltersOpen">
              <template #trigger="{ toggle, isOpen }">
                <BaseAdvancedSearchToolbarFilter
                  :count="searchFilters.keywords.length + searchFilters.excludedKeywords.length"
                  :color="isOpen ? 'interactive' : 'default'"
                  @click="toggle"
                >
                  tags
                </BaseAdvancedSearchToolbarFilter>
              </template>
            </base-switch>

            <base-switch v-model="isAllFiltersOpen">
              <template #trigger="{ toggle, isOpen }">
                <BaseAdvancedSearchToolbarFilter
                  :count="searchFilters.startDate && searchFilters.endDate ? 1 : 0"
                  :color="isOpen ? 'interactive' : 'default'"
                  @click="toggle"
                >
                  release date
                </BaseAdvancedSearchToolbarFilter>
              </template>
            </base-switch>
          </div>
        </div>
      </div>

      <div
        v-show="isAllFiltersOpen"
        class="search-view__filter-dialog"
      >
        <BaseAdvancedSearchAllFiltersDialog
          v-model:dateRange="filterDateRange"
          v-model:keywords="searchFilters.keywords"
          v-model:excluded-keywords="searchFilters.excludedKeywords"
          v-model:genres="searchFilters.genres"
          v-model:excluded-genres="searchFilters.excludedGenres"
        />
      </div>

      <div
        v-show="!isAllFiltersOpen"
        class="search-view__gallery"
      >
        <BaseGallery>
          <TitleCard
            v-for="card in searchResponse.entries"
            :id="card.id"
            :key="card.id"
            type="movie"
            :src="'http://image.tmdb.org/t/p/w220_and_h330_face/' + card.poster_path"
          />
        </BaseGallery>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import repositoryFactory from '../api/repository-factory';
import BaseGallery from '../components/BaseGallery.vue';
import TitleCard from '../components/TitleCard.vue';
import BaseAdvancedSearch from '../components/BaseAdvancedSearch.vue'
import BaseAdvancedSearchAllFiltersDialog from '../components/BaseAdvancedSearchAllFiltersDialog.vue';
import BaseAdvancedSearchToolbarFilter from '../components/BaseAdvancedSearchToolbarFilter.vue';
import BaseAdvancedSearchToolbarButton from '../components/BaseAdvancedSearchToolbarButton.vue';
import BaseIcon from '../components/BaseIcon.vue';
import { getReleaseTagValues, getReleaseTagId } from './searchTags';
import BaseSwitch from '../components/BaseSwitch.vue';

const titlesRepository = repositoryFactory.get('titles')

const route = useRoute()

const isSearching = ref(false)
const searchResponse = reactive({
  entries: ref([]),
  entryCount: ref(0),
  pageCount: ref(0),
})
const searchFilters = reactive({
  title: ref(route.params.title),
  keywords: ref([]),
  excludedKeywords: ref([]),
  genres: ref([]),
  excludedGenres: ref([]),
  startDate: ref(''),
  endDate: ref(''),
  page: 1,
})
const filterDateRange = computed({
  get() {
    return getReleaseTagId({startDate: searchFilters.startDate, endDate: searchFilters.endDate})
  },
  set(newValue) {
    const dateValues = getReleaseTagValues(newValue)

    if (!dateValues) {
      searchFilters.startDate = ''
      searchFilters.endDate = ''
      return
    }

    searchFilters.startDate = dateValues.startDate
    searchFilters.endDate = dateValues.endDate
  }
})
const isAllFiltersOpen = ref(false)

function handleSearch() {
  isSearching.value = true

  const response = titlesRepository.search(searchFilters)

  response.then((data) => {
    searchResponse.entries = data.entries
    searchResponse.pageCount = data.pageCount,
    searchResponse.entryCount = data.entryCount

  }).finally(() => {
    isSearching.value = false
  })

  return response
}
 
handleSearch()
</script>

<style lang='scss'>
.search-view {
  display: grid;
  grid-template: auto 1fr / 100%;
  height: 100dvh;
  overflow-y: auto;

  &__main {
    display: grid;
    grid-template: auto 1fr / 100%;
  }

  &__header {
    padding: var(--space20) var(--container-gap) 0;
  }

  &__searchbar {
    padding: var(--space-10) var(--container-gap) var(--space-30);
  }

  &__search_sticky {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--background);
  }

  &__filter-dialog {
    display: grid;
    z-index: var(--z-modal);
  }
}

.filters {
  max-width: 100%;
  overflow: auto;
  display: flex;
  padding: var(--space-20) var(--container-gap);

  &__inner {
    gap: var(--space-20);
    align-items: center;
    display: flex;
  }
}
</style>