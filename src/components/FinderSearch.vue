<template>
  <aside class="finder-search">
    <div class="finder-search__toolbar">
      <div class="finder-search__toolbar-inner">
        <div class="finder-search__actions">
          <base-button
            color="brand"
            variant="tertiary"
            @click.stop="toggleIsOpenFilters(!isOpenFilters)"
          >
            <template #icon>
              <base-icon
                size="lg"
                name="FilterIcon"
              />
            </template>

            <div class="finder-search__toggle-inner">
              Filters

              <div class="finder-search__toggle-icon">
                <base-icon
                  size="lg"
                  :name="getDrawerIconState"
                />
              </div>
            </div>
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
      </div>
    </div>

    <form
      v-show="isOpenFilters"
      class="finder-search__form"
      @submit.prevent="handleSubmit"
    >
      <div class="finder-search__form-inner">
        <div class="finder-search__filters">
          <div class="finder-search__filter">
            <base-title level="2">
              Title or description
            </base-title>

            <searchbar
              v-model="searchString"
              placeholder="Keyword in title or description"
            />
          </div>

          <div class="finder-search__filter">
            <base-title level="2">
              Release
            </base-title>

            <finder-search-cloud
              :tags="releaseDates"
              v-model="selectedReleaseDateRanges"
            />
          </div>

          <div class="finder-search__filter">
            <base-title level="2">
              Genre
            </base-title>

            <finder-search-cloud
              :tags="genres"
              :is-multiple="true"
              :has-excludes="true"
              v-model="selectedGenres"
            />
          </div>

          <div class="finder-search__filter">
            <base-title level="2">
              Tag
            </base-title>

            <finder-search-cloud
              :tags="keywords"
              :is-multiple="true"
              :has-excludes="true"
              v-model="selectedKeywords"
            />
          </div>
        </div>

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
      </div>
    </form>
  </aside>
</template>

<script setup>
import { ref, onBeforeMount, markRaw, defineEmits, computed, defineProps } from 'vue'
import FinderSearchCloud from './FinderSearchCloud.vue'
import repositoryFactory from '@/api/repository-factory.js'
import { handleRequest } from '../api/request-handlers'
import Searchbar from './Searchbar.vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseFilterCategoryTag from './BaseFilterCategoryTag.vue'
import BaseTitle from './BaseTitle.vue'
const genresRepositories = repositoryFactory.get('genres')

const emits = defineEmits(['submit', 'update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const isOpenFilters = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emits('update:modelValue', newValue)
  }
})
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

  const searchStringClearCallback = clearCallbackComposer(() => { searchString.value = '' })
  const genreClearCallback = clearCallbackComposer(() => { selectedGenres.value = [] })
  const keywordsClearCallback = clearCallbackComposer(() => { selectedKeywords.value = [] })
  const dateRangeClearCallback = clearCallbackComposer(() => { selectedReleaseDateRanges.value = {} })

  return [
    getActiveFilter('search', 1, searchString.value.trim() !== '', searchString.value, searchStringClearCallback),
    getActiveFilter('genres', selectedGenres.value.length, selectedGenres.value.length > 0, getGenreSingleItemLabel, genreClearCallback),
    getActiveFilter('tags', selectedKeywords.value.length, selectedKeywords.value.length > 0, getKeywordsSingleItemLabel, keywordsClearCallback),
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
const getDrawerIconState = computed(() => isOpenFilters.value ? 'ChevronUpIcon' : 'ChevronDownIcon')

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
const clearCallbackComposer = (callback) => {
  return () => {
    callback()
    handleSubmit()
  }
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
  container-type: inline-size;
  background: var(--background-secondary);

  &__toolbar {
    padding: var(--space-10) var(--space00);
    position: sticky;
    top: 0;
  }

  &__toolbar-inner {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: var(--space-20);

    @container (min-width: 500px) {
      flex-direction: row;
      gap: var(--space00);
      @include container('tablet2');
    }
  }

  &__summary {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;

    @container (min-width: 500px) {
      justify-content: flex-start;
    }
  }

  &__form {
    overflow-y: auto;
    top: 100%;
    overscroll-behavior: contain;
    padding: var(--space10) var(--container-gap) var(--container-gap);
    border-top: 2px solid var(--background-tertiary);
  }

  &__form-inner {
    @include container('tablet2');
  }

  &__filters {
    display: grid;
    gap: var(--space30);
    grid-template-columns: 1fr;

    @container (min-width: 760px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__filter {
    display: flex;
    flex-direction: column;
    gap: var(--space10);
  }

  &__submit-button {
    bottom: 0;
    position: sticky;
    margin-top: var(--space30);
  }

  &__toggle-inner {
    align-items: center;
    display: flex;
    flex-shrink: 0;
  }

  &__toggle-icon {
    flex-shrink: 0;
  }
}
</style>
