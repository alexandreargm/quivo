<template>
  <aside class="finder-search">
    <div class="finder-search__toolbar">
      <div class="finder-search__actions">
        <base-button
          icon="only"
          color="brand"
          variant="tertiary"
          @click.stop="toggleIsOpenFilters(!isOpenFilters)"
        >
          <template #icon>
            <base-icon
              size="xl2"
              :name="getDrawerIconState"
            />
          </template>
        </base-button>
      </div>

      <div
        v-if="hasActiveFilters"
        class="finder-search__summary"
      >
        <base-filter-category-tag
          v-for="({category, amount, singleItemLabel, clearCallback}, index) in getActiveFilters"
          :key="index"
          :category="category"
          :amount="amount"
          :single-item-label="String(singleItemLabel)"
          @close="clearCallback()"
        />
      </div>

      <base-title
        level="2"
        v-else
      >
        Filters
      </base-title>
    </div>

    <form
      v-show="isOpenFilters"
      class="finder-search__form"
      @submit.prevent="handleSubmit"
    >
      <searchbar
        v-model="searchString"
        placeholder="Keyword in title or description"
      />

      <finder-search-cloud
        title="Genre"
        :tags="genres"
        :is-multiple="true"
        :has-excludes="true"
        v-model="selectedGenres"
      />

      <finder-search-cloud
        title="Release"
        :tags="releaseDates"
        v-model="selectedReleaseDateRanges"
      />

      <finder-search-cloud
        title="Keywords"
        :tags="keywords"
        :is-multiple="true"
        :has-excludes="true"
        v-model="selectedKeywords"
      />

      <div class="finder-search__submit-button">
        <base-button
          size="lg"
          width="100%"
          type="submit"
          color="brand"
          :disabled="!hasSearchParams"
        >
          <template #icon>
            <base-icon name="SearchIcon" />
          </template>

          Find titles
        </base-button>
      </div>
    </form>
  </aside>
</template>

<script setup>
import { ref, onBeforeMount, markRaw, defineEmits, computed } from 'vue'
import FinderSearchCloud from './FinderSearchCloud.vue'
import repositoryFactory from '@/api/repository-factory.js'
import { handleRequest } from '../api/request-handlers'
import Searchbar from './Searchbar.vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseFilterCategoryTag from './BaseFilterCategoryTag.vue'
import BaseTitle from './BaseTitle.vue'
const genresRepositories = repositoryFactory.get('genres')

const emits = defineEmits(['submit'])

const isOpenFilters = ref(true)
const genres = ref([])
const selectedGenres = ref([])
const selectedKeywords = ref([])
const selectedReleaseDateRanges = ref({})
const searchString = ref('')
const getActiveFilters = computed(() => {
  const getActiveFilter = (category, amount, isShowing, singleItemLabel, clearCallback) => {
    return { category, amount, isShowing, singleItemLabel, clearCallback }
  }

  const getGenreSingleItemLabel = genres.value.find(genre => genre.value === selectedGenres.value?.[0]?.value)?.title
  const getKeywordsSingleItemLabel = keywords.find(keyword => keyword.value === selectedKeywords.value?.[0]?.value)?.title
  const getDateRangeSingleItemLabel = releaseDates?.[selectedReleaseDateRanges.value?.id]?.title

  const genreClearCallback = () => { selectedGenres.value = [] }
  const keywordsClearCallback = () => { selectedKeywords.value = [] }
  const dateRangeClearCallback = () => { selectedReleaseDateRanges.value = {} }

  return [
    getActiveFilter('genres', selectedGenres.value.length, selectedGenres.value.length > 0, getGenreSingleItemLabel, genreClearCallback),
    getActiveFilter('keywords', selectedKeywords.value.length, selectedKeywords.value.length > 0, getKeywordsSingleItemLabel, keywordsClearCallback),
    getActiveFilter('date', 1, selectedReleaseDateRanges.value?.id !== undefined, getDateRangeSingleItemLabel, dateRangeClearCallback)
  ].filter(filter => filter.isShowing)
})
const hasActiveFilters = computed(() => getActiveFilters.value.length > 0)
const hasSearchParams = computed(() => {
  if (searchString.value.trim() !== '') return true

  if (selectedGenres.value.length > 0) return true

  if (selectedKeywords.value.length > 0) return true

  if (Object.keys(selectedReleaseDateRanges.value).length > 0) return true

  return false
})
const getDrawerIconState = computed(() => isOpenFilters.value ? 'ChevronDownIcon' : 'ChevronUpIcon')

const releaseDates = [
  { id: 0, value: [2020, new Date().getFullYear()], title: '2020s · Recent' },
  { id: 1, value: [2000, 2010], title: '2010s · Golden Age of Streaming' },
  { id: 2, value: [1990, 2000], title: '90s-2000s · Modern Classics' },
  { id: 3, value: [1970, 1980], title: '70s-80s · Influential Movies' },
  { id: 4, value: [1920, 1960], title: '20s-60s · Classic Hollywood' },
  { id: 5, value: [1890, 1920], title: '1890s-20s · Silent Films' }
]
const keywords = [
  { value: 818, title: 'based on novel or book' },
  { value: 9717, title: 'based on comic' },
  { value: 10181, title: 'based on play or musical' },
  { value: 9672, title: 'based on true story' },
  { value: 156866, title: 'based on short story' },
  { value: 10683, title: 'coming of age' },
  { value: 3691, title: 'forbidden love' },
  { value: 11322, title: 'female protagonist' },
  { value: 4344, title: 'musical' },
  { value: 4565, title: 'dystopia' },
  { value: 14602, title: 'break-up' },
  { value: 158718, title: 'lgbt' },
  { value: 276130, title: 'paranormal events' },
  { value: 207317, title: 'christmas' },
  { value: 9715, title: 'superhero' },
  { value: 282, title: 'video game' },
  { value: 10714, title: 'serial killer' },
  { value: 11479, title: 'social commentary' }
]

const fetchGenres = () => {
  handleRequest(genresRepositories.fetch('movie'), {
    onSuccess: ({ data }) => {
      genres.value = markRaw(data.genres.map(genre => ({ title: genre.name, value: genre.id })))
    }
  })
}
const handleSubmit = () => {
  if (!hasSearchParams.value) return

  toggleIsOpenFilters(false)

  emits('submit', {
    mediaType: 'movie',
    title: searchString.value,
    keywords: selectedKeywords.value,
    genres: selectedGenres.value,
    dateRange: selectedReleaseDateRanges.value
  })
}
const toggleIsOpenFilters = (isOpen = !isOpenFilters.value) => {
  isOpenFilters.value = isOpen
}

onBeforeMount(() => {
  fetchGenres()
})
</script>

<style lang='scss' scoped>
.finder-search {
  display: grid;
  grid-template-rows: auto 1fr;
  max-height: calc(100vh - var(--the-main-nav-height));
  width: 100%;

  &__toolbar {
    align-items: center;
    background: var(--background-secondary);
    border-radius: var(--rounded50) var(--rounded50) 0 0;
    display: flex;
    gap: var(--space20);
    padding: var(--space00);
    position: sticky;
    top: 0;
  }

  &__summary {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__form {
    background-color: var(--background);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: var(--space10) var(--container-gap) var(--container-gap);
  }

  &__form > :not(:first-child) {
    margin-top: var(--space20);
  }

  &__submit-button {
    bottom: var(--container-gap);
    margin-top: var(--space30) !important;
    position: sticky;
  }
}
</style>
