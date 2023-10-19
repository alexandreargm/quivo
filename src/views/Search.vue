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
      <div class="search-view__search-and-results">
        <div class="search-view__search">
          <div class="search-view__searchbar">
            <BaseAdvancedSearch
              v-model="searchFeature.searchFilters.title"
              @change="searchFeature.handleDebouncedSearch()"
              @clear="searchFeature.searchFilters.title = '', searchFeature.handleDebouncedSearch()"
            />
          </div>

          <div class="filters">
            <div class="filters__controls">
              <base-switch
                :model-value="filterDialogs.isAllOpen"
                @update:model-value="closeDialogs(), filterDialogs.isAllOpen = $event"
              >
                <template #trigger="{ toggle, isOpen }">
                  <BaseAdvancedSearchToolbarButton
                    :color="isOpen ? 'interactive' : 'default'"
                    @click="toggle"
                  >
                    All filters
                    <template #icon>
                      <base-icon
                        v-show="!isOpen"
                        name="chevron-down"
                      />
                      <base-icon
                        v-show="isOpen"
                        name="chevron-up"
                      />
                    </template>
                  </BaseAdvancedSearchToolbarButton>
                </template>
              </base-switch>
              <base-switch
                :model-value="filterDialogs.isGenresOpen"
                @update:model-value="closeDialogs(), filterDialogs.isGenresOpen = $event"
              >
                <template #trigger="{ toggle, isOpen }">
                  <BaseAdvancedSearchToolbarFilter
                    :count="searchFeature.searchFilters.genres.length + searchFeature.searchFilters.excludedGenres.length"
                    :color="isOpen ? 'interactive' : 'default'"
                    :show-close="searchFeature.searchFilters.genres.length + searchFeature.searchFilters.excludedGenres.length > 0"
                    @click="toggle"
                    @close="() => {
                      resetGenreFilters()
                      handleSearch()
                    }"
                  >
                    genres
                  </BaseAdvancedSearchToolbarFilter>
                </template>
              </base-switch>
              <base-switch
                :model-value="filterDialogs.isKeywordsOpen"
                @update:model-value="closeDialogs(), filterDialogs.isKeywordsOpen = $event"
              >
                <template #trigger="{ toggle, isOpen }">
                  <BaseAdvancedSearchToolbarFilter
                    :count="searchFeature.searchFilters.keywords.length + searchFeature.searchFilters.excludedKeywords.length"
                    :color="isOpen ? 'interactive' : 'default'"
                    :show-close="searchFeature.searchFilters.keywords.length + searchFeature.searchFilters.excludedKeywords.length > 0"
                    @click="toggle"
                    @close="() => {
                      resetKeywordFilters()
                      handleSearch()
                    }"
                  >
                    tags
                  </BaseAdvancedSearchToolbarFilter>
                </template>
              </base-switch>
              <base-switch
                :model-value="filterDialogs.isReleaseDateOpen"
                @update:model-value="closeDialogs(), filterDialogs.isReleaseDateOpen = $event"
              >
                <template #trigger="{ toggle, isOpen }">
                  <BaseAdvancedSearchToolbarFilter
                    :count="searchFeature.searchFilters.startDate && searchFeature.searchFilters.endDate ? 1 : 0"
                    :color="isOpen ? 'interactive' : 'default'"
                    :show-close="searchFeature.searchFilters.startDate && searchFeature.searchFilters.endDate || false"
                    @click="toggle"
                    @close="() => {
                      resetReleaseDateFilters()
                      handleSearch()
                    }"
                  >
                    release date
                  </BaseAdvancedSearchToolbarFilter>
                </template>
              </base-switch>
            </div>
          </div>

          <div
            v-if="isAnyFilterDialogOpen"
            class="search-view__dialogs"
          >
            <SearchFilterDialog
              v-if="filterDialogs.isAllOpen"
              @close="filterDialogs.isAllOpen = close"
            >
              <template #title>
                <BaseTitle
                  :level="2"
                  :has-margin-bottom="false"
                >
                  All filters
                </BaseTitle>
              </template>
              <section class="block2">
                <BaseTitle :level="3">
                  Genres
                </BaseTitle>
                <SearchGenreFilter
                  v-model:genres="searchFeature.searchFilters.genres"
                  v-model:excluded-genres="searchFeature.searchFilters.excludedGenres"
                />
              </section>
              <section class="block2">
                <BaseTitle :level="3">
                  Tags
                </BaseTitle>
                <SearchKeywordFilter
                  v-model:keywords="searchFeature.searchFilters.keywords"
                  v-model:excluded-keywords="searchFeature.searchFilters.excludedKeywords"
                  :tags="keywordTags"
                />
              </section>
              <section class="block2">
                <BaseTitle :level="3">
                  Release date
                </BaseTitle>
                <SearchReleaseDateFilter
                  v-model="filterDateRange"
                />
              </section>
              <template #actions>
                <base-button
                  color="brand"
                  width="300px"
                  size="lg"
                  @click="closeDialogs(), handleSearch()"
                >
                  Search
                </base-button>
              </template>
            </SearchFilterDialog>
            <SearchFilterDialog
              v-if="filterDialogs.isGenresOpen"
              @close="filterDialogs.isGenresOpen = close"
            >
              <template #title>
                <BaseTitle
                  :level="2"
                  :has-margin-bottom="false"
                >
                  Genres
                </BaseTitle>
              </template>
              <SearchGenreFilter
                v-model:genres="searchFeature.searchFilters.genres"
                v-model:excluded-genres="searchFeature.searchFilters.excludedGenres"
              />
              <template #actions>
                <base-button
                  color="brand"
                  width="300px"
                  size="lg"
                  @click="closeDialogs(), handleSearch()"
                >
                  Search
                </base-button>
              </template>
            </SearchFilterDialog>
            <SearchFilterDialog
              v-if="filterDialogs.isKeywordsOpen"
              @close="filterDialogs.isKeywordsOpen = close"
            >
              <template #title>
                <BaseTitle
                  :level="2"
                  :has-margin-bottom="false"
                >
                  Tags
                </BaseTitle>
              </template>
              <SearchKeywordFilter
                v-model:keywords="searchFeature.searchFilters.keywords"
                v-model:excluded-keywords="searchFeature.searchFilters.excludedKeywords"
                :tags="keywordTags"
              />
              <template #actions>
                <base-button
                  color="brand"
                  width="300px"
                  size="lg"
                  @click="closeDialogs(), handleSearch()"
                >
                  Search
                </base-button>
              </template>
            </SearchFilterDialog>

            <SearchFilterDialog
              v-if="filterDialogs.isReleaseDateOpen"
              @close="filterDialogs.isReleaseDateOpen = close"
            >
              <template #title>
                <BaseTitle
                  :level="2"
                  :has-margin-bottom="false"
                >
                  Release date
                </BaseTitle>
              </template>
              <SearchReleaseDateFilter
                v-model="filterDateRange"
              />
              <template #actions>
                <base-button
                  color="brand"
                  width="300px"
                  size="lg"
                  @click="closeDialogs(), handleSearch()"
                >
                  Search
                </base-button>
              </template>
            </SearchFilterDialog>
          </div>
        </div>
       
        <div
          
          class="search-view__results"
        >
          <div
            v-if="searchFeature.searchResponse.entries.length > 0"
            class="search-view__feed"
          >
            <BaseGallery class="block">
              <router-link
                v-for="card in searchFeature.searchResponse.entries"
                :key="card.id"
                :to="{ name: 'search.movie.preview', params: { id: card.id } }"
              >
                <TitleCard
                  :id="card.id"
                  type="movie"
                  :src="card.poster_path && 'http://image.tmdb.org/t/p/w220_and_h330_face/' + card.poster_path || ''"
                  :alt="card.title"
                  :caption="card.title"
                  theme="secondary"
                />
              </router-link>
            </BaseGallery>

            <div class="search-view__more-results">
              <base-button
                color="brand"
                is-round
                :disabled="searchFeature.isSearching || searchFeature.searchFilters.page === searchFeature.searchResponse.pageCount"
                @click="handleLoadMoreItems()"
              >
                More results ({{ remainingEntryCount }})
              </base-button>
            </div>
          </div>

          <div
            v-show="!searchFeature.isSearching && searchFeature.hasSetFilters && searchFeature.searchResponse.entries.length === 0"
            class="search-view__no-results"
          >
            <p>
              No results for this search
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="$route.name === 'search.movie.preview'"
        class="search-view__preview"
      >
        <router-view
          v-slot="{ Component }"
          name="drawer"
        >
          <template v-if="Component">
            <keep-alive>
              <suspense>
                <component
                  :is="Component"
                  @close="$router.push({ name: 'search'})"
                />
              </suspense>
            </keep-alive>
          </template>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseGallery from '../components/BaseGallery.vue';
import TitleCard from '../components/TitleCard.vue';
import BaseAdvancedSearch from '../components/BaseAdvancedSearch.vue'
import BaseAdvancedSearchToolbarFilter from '../components/BaseAdvancedSearchToolbarFilter.vue';
import BaseAdvancedSearchToolbarButton from '../components/BaseAdvancedSearchToolbarButton.vue';
import BaseIcon from '../components/BaseIcon.vue';
import { getReleaseTagValues, getReleaseTagId } from './searchTags';
import BaseSwitch from '../components/BaseSwitch.vue';
import SearchFilterDialog from './SearchFilterDialog.vue'
import BaseTitle from '../components/BaseTitle.vue';
import SearchGenreFilter from './SearchGenreFilter.vue';
import SearchKeywordFilter from './SearchKeywordFilter.vue';
import SearchReleaseDateFilter from './SearchReleaseDateFilter.vue';
import BaseButton from '../components/BaseButton.vue';
import { keywordTags } from './searchTags'
import { useSearchFeatureStore } from '@/store/search.js'

const searchFeature = useSearchFeatureStore()

const route = useRoute()

searchFeature.searchFilters.title = route.params.title || ""

const filterDateRange = computed({
  get() {
    return getReleaseTagId({startDate: searchFeature.searchFilters.startDate, endDate: searchFeature.searchFilters.endDate})
  },
  set(newValue) {
    const dateValues = getReleaseTagValues(newValue)

    if (!dateValues) {
      searchFeature.searchFilters.startDate = ''
      searchFeature.searchFilters.endDate = ''
      return
    }

    searchFeature.searchFilters.startDate = dateValues.startDate
    searchFeature.searchFilters.endDate = dateValues.endDate
  }
})
const isAnyFilterDialogOpen = computed(() => {
  return filterDialogs.isAllOpen || filterDialogs.isGenresOpen || filterDialogs.isKeywordsOpen || filterDialogs.isReleaseDateOpen
})
const filterDialogs = reactive({
  isAllOpen: ref(false),
  isGenresOpen: ref(false),
  isKeywordsOpen: ref(false),
  isReleaseDateOpen: ref(false)
})
const remainingEntryCount = computed(() => {
  const ENTRIES_PER_PAGE = 20

  if (searchFeature.searchFilters.page === searchFeature.searchResponse.pageCount) return 0

  return searchFeature.searchResponse.entryCount - (searchFeature.searchFilters.page * ENTRIES_PER_PAGE)
})

function closeDialogs() {
  filterDialogs.isAllOpen = false
  filterDialogs.isGenresOpen = false
  filterDialogs.isKeywordsOpen = false
  filterDialogs.isReleaseDateOpen = false
}
 
searchFeature.handleSearch()
</script>

<style lang='scss'>
.search-view {
  height: 100dvh;
  @include container('desktop4');

  &__main {
    align-items: start;
    display: grid;
    grid-template-columns: minmax(0%, 100%) min-content;
  }

  &__header {
    padding: var(--space20) var(--container-gap) 0;
    width: 100%;
  }

  &__search {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: inherit;
    background-color: var(--background);
  }

  &__search_sticky {
    background: var(--background);
  }

  &__search-and-results {
    flex-grow: 1;
  }

  &__preview {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
  }

  &__searchbar {
    padding: var(--space-10) var(--container-gap) var(--space-30);
    width: 65ch;
    max-width: 100%;
  }

  &__dialogs {
    flex-grow: 1;
    display: grid;
  }

  &__results {
    padding-left: var(--container-gap);

    @include breakpoint-max('desktop4') {
      padding-left: 0;
    }
  }

  &__no-results {
    padding: var(--container-gap);
    font-size: var(--font30);
    line-height: var(--line-20);
    font-weight: var(--light);
    color: var(--text-secondary);
    max-width: 90%;
  }

  &__more-results {
    display: flex;
    justify-content: center;
  }

  &__feed {
    margin-bottom: var(--space30);
  }
}

.filters {
  max-width: 100%;
  overflow: auto;

  &__controls {
    gap: var(--space-20);
    align-items: center;
    display: flex;
    padding: var(--space-20) var(--container-gap) var(--space-10);
  }
}
</style>