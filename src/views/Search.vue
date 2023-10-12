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
              v-model="searchFilters.title"
              @change="handleDebouncedSearch()"
              @clear="searchFilters.title = '', handleDebouncedSearch()"
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
                    :count="searchFilters.genres.length + searchFilters.excludedGenres.length"
                    :color="isOpen ? 'interactive' : 'default'"
                    :show-close="searchFilters.genres.length + searchFilters.excludedGenres.length > 0"
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
                    :count="searchFilters.keywords.length + searchFilters.excludedKeywords.length"
                    :color="isOpen ? 'interactive' : 'default'"
                    :show-close="searchFilters.keywords.length + searchFilters.excludedKeywords.length > 0"
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
                    :count="searchFilters.startDate && searchFilters.endDate ? 1 : 0"
                    :color="isOpen ? 'interactive' : 'default'"
                    :show-close="searchFilters.startDate && searchFilters.endDate || false"
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
                  v-model:genres="searchFilters.genres"
                  v-model:excluded-genres="searchFilters.excludedGenres"
                />
              </section>
              <section class="block2">
                <BaseTitle :level="3">
                  Tags
                </BaseTitle>
                <SearchKeywordFilter
                  v-model:keywords="searchFilters.keywords"
                  v-model:excluded-keywords="searchFilters.excludedKeywords"
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
                v-model:genres="searchFilters.genres"
                v-model:excluded-genres="searchFilters.excludedGenres"
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
                v-model:keywords="searchFilters.keywords"
                v-model:excluded-keywords="searchFilters.excludedKeywords"
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
            v-if="searchResponse.entries.length > 0"
            class="search-view__feed"
          >
            <BaseGallery class="block">
              <router-link
                v-for="card in searchResponse.entries"
                :key="card.id"
                :to="{ name: 'search.movie.preview', params: { id: card.id } }"
              >
                <TitleCard
        
                  :id="card.id"
                  type="movie"
                  :src="card.poster_path && 'http://image.tmdb.org/t/p/w220_and_h330_face/' + card.poster_path || ''"
                  :alt="card.title"
                  :caption="!card.poster_path && card.title"
                />
              </router-link>
            </BaseGallery>

            <div class="search-view__more-results">
              <base-button
                color="brand"
                is-round
                :disabled="isSearching || searchFilters.page === searchResponse.pageCount"
                @click="handleLoadMoreItems()"
              >
                More results ({{ remainingEntryCount }})
              </base-button>
            </div>
          </div>

          <div
            v-show="!isSearching && hasSetFilters && searchResponse.entries.length === 0"
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
import repositoryFactory from '../api/repository-factory';
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
import { useDebounceFn } from '../composables/useDebounceFn';


const titlesRepository = repositoryFactory.get('titles')

const route = useRoute()

const isSearching = ref(false)
const searchResponse = reactive({
  entries: ref([]),
  entryCount: ref(0),
  pageCount: ref(0),
})
const searchFilters = reactive({
  title: ref(route.params.title || ''),
  keywords: ref([]),
  excludedKeywords: ref([]),
  genres: ref([]),
  excludedGenres: ref([]),
  startDate: ref(''),
  endDate: ref(''),
  page: 1,
})
const hasSetFilters = computed(() => searchFilters.title || searchFilters.keywords.length > 0 || searchFilters.excludedKeywords.length > 0 || searchFilters.genres.length > 0 || searchFilters.excludedGenres.length > 0 || searchFilters.startDate || searchFilters.endDate)
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

  if (searchFilters.page === searchResponse.pageCount) return 0

  return searchResponse.entryCount - (searchFilters.page * ENTRIES_PER_PAGE)
})

function handleSearch() {
  if (!hasSetFilters.value) {
    searchResponse.entries = []
    searchResponse.pageCount = 1
    searchResponse.entryCount = 0

    return
  }

  isSearching.value = true

  searchFilters.page = 1

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

const handleDebouncedSearch = useDebounceFn(handleSearch, 200)

function closeDialogs() {
  filterDialogs.isAllOpen = false
  filterDialogs.isGenresOpen = false
  filterDialogs.isKeywordsOpen = false
  filterDialogs.isReleaseDateOpen = false
}

function resetGenreFilters() {
  searchFilters.genres = []
  searchFilters.excludedGenres = []
}
function resetKeywordFilters() {
  searchFilters.keywords = []
  searchFilters.excludedKeywords = []
}
function resetReleaseDateFilters() {
  searchFilters.startDate = ""
  searchFilters.endDate = ""
}

function handleLoadMoreItems() {
  searchFilters.page++

  
  isSearching.value = true

  const response = titlesRepository.search(searchFilters)

  response.then((data) => {
    searchResponse.entries = [...searchResponse.entries, ...data.entries]
    searchResponse.pageCount = data.pageCount,
    searchResponse.entryCount = data.entryCount
  }).finally(() => {
    isSearching.value = false
  })
}
 
handleSearch()
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