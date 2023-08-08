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
      <div class="search-view__search">
        <BaseAdvancedSearch
          v-model:title="searchFilters.title"
          v-model:genres="searchFilters.genres"
          v-model:excludedGenres="searchFilters.excludedGenres"
          v-model:keywords="searchFilters.keywords"
          v-model:excludedKeywords="searchFilters.excludedKeywords"
          v-model:startDate="searchFilters.startDate"
          v-model:endDate="searchFilters.endDate"
        >
          <BaseAdvancedSearchFilterToggle :count="searchFilters.genres.length + searchFilters.excludedGenres.length">
            genres
          </BaseAdvancedSearchFilterToggle>
        
          <BaseAdvancedSearchFilterToggle :count="searchFilters.keywords.length + searchFilters.excludedKeywords.length">
            tags
          </BaseAdvancedSearchFilterToggle>
        
          <BaseAdvancedSearchFilterToggle :count="searchFilters.startDate && searchFilters.endDate ? 1 : 0">
            release date
          </BaseAdvancedSearchFilterToggle>
        </BaseAdvancedSearch>
      </div>

      <div class="search-view__filter-dialog">
        <BaseAdvancedSearchAllFiltersDialog />
      </div>

      <div class="search-view__gallery">
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
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import repositoryFactory from '../api/repository-factory';
import BaseGallery from '../components/BaseGallery.vue';
import TitleCard from '../components/TitleCard.vue';
import BaseAdvancedSearch from '../components/BaseAdvancedSearch.vue'
import BaseAdvancedSearchAllFiltersDialog from '../components/BaseAdvancedSearchAllFiltersDialog.vue';
import BaseAdvancedSearchFilterToggle from '../components/BaseAdvancedSearchFilterToggle.vue';
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
  grid-template-rows: auto 1fr;

  &__main {
    display: grid;
    grid-template-rows: auto 1fr 0px;
  }

  &__header {
    padding: var(--space20) var(--container-gap) var(--space-10);
  }

  &__search {
    padding-inline: var(--container-gap);
  }

  &__filter-dialog {
    display: grid;
    grid-row: 2 / 2;
    grid-column: 1 / 1;
    z-index: var(--z-modal);
  }

  &__gallery {
    padding: var(--space20) 0;
    grid-row: 2 / 2;
    grid-column: 1 / 1;
  }
 }
</style>