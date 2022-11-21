<template>
  <form
    @submit.prevent="handleSubmit"
    class="advanced-search"
  >
    <div class="advanced-search__toolbar">
      <searchbar
        v-model="searchString"
        placeholder="Find something to watch"
      >
        <template #before>
          <div class="advanced-search__searchbar-before">
            <base-button
              @click.stop="toggleIsOpenFilters(!isOpenFilters)"
              @mousedown.stop
              color="brand"
              variant="tertiary"
            >
              <template #icon>
                <base-icon
                  size="lg"
                  name="AdjustmentsIcon"
                />
              </template>
              Filters
            </base-button>

            <base-icon name="SearchIcon" />
          </div>
        </template>
      </searchbar>

      <div
        v-if="hasActiveFilters"
        class="advanced-search__filter-summary"
      >
        <base-filter-category-tag
          v-for="({category, amount, singleItemLabel, singleItemIsExcluded, clearCallback}, index) in getActiveFilters"
          :key="index"
          :category="category"
          :amount="amount"
          :single-item-label="String(singleItemLabel)"
          :is-excluding="singleItemIsExcluded"
          @close="clearCallback()"
        />
      </div>

      <base-tag
        v-else
        class="advanced-search__no-filters"
        size="lg"
        variant="tertiary"
      >
        No filters selected
      </base-tag>
    </div>

    <div
      v-show="isOpenFilters"
      class="advanced-search__filters-dialog"
    >
      <div class="advanced-search__filters-dialog-inner">
        <div class="advanced-search__filters">
          <div class="advanced-search__filter">
            <base-title level="2">
              Release
            </base-title>

            <finder-search-cloud
              :tags="releaseDates"
              v-model="selectedReleaseDateRanges"
            />
          </div>

          <div class="advanced-search__filter">
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

          <div class="advanced-search__filter">
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

        <div class="advanced-search__submit-button">
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
    </div>
  </form>
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
import BaseTag from './BaseTag.vue'
import { useDebounceFn } from '../composables/useDebounceFn'
const genresRepositories = repositoryFactory.get('genres')

const emits = defineEmits(['submit', 'update:modelValue', 'update:filters'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  filters: {
    type: Object,
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
  const getActiveFilter = (category, amount, isShowing, singleItemLabel, singleItemIsExcluded, clearCallback) => {
    return { category, amount, isShowing, singleItemLabel, singleItemIsExcluded, clearCallback }
  }

  const getGenreIsExcluded = selectedGenres.value?.[0]?.state === 2
  const getKeywordIsExcluded = selectedKeywords.value?.[0]?.state === 2

  const getGenreSingleItemLabel = genres.value.find(genre => genre.value === selectedGenres.value?.[0]?.value)?.title
  const getKeywordsSingleItemLabel = keywords.find(keyword => keyword.value === selectedKeywords.value?.[0]?.value)?.title
  const getDateRangeSingleItemLabel = releaseDates?.[selectedReleaseDateRanges.value?.id]?.title

  const searchStringClearCallback = clearCallbackComposer(() => { searchString.value = '' })
  const genreClearCallback = clearCallbackComposer(() => { selectedGenres.value = [] })
  const keywordsClearCallback = clearCallbackComposer(() => { selectedKeywords.value = [] })
  const dateRangeClearCallback = clearCallbackComposer(() => { selectedReleaseDateRanges.value = {} })

  return [
    getActiveFilter('Search', 1, searchString.value.trim() !== '', `"${searchString.value}"`, false, searchStringClearCallback),
    getActiveFilter('Genres', selectedGenres.value.length, selectedGenres.value.length > 0, getGenreSingleItemLabel, getGenreIsExcluded, genreClearCallback),
    getActiveFilter('Tags', selectedKeywords.value.length, selectedKeywords.value.length > 0, getKeywordsSingleItemLabel, getKeywordIsExcluded, keywordsClearCallback),
    getActiveFilter('Date', 1, selectedReleaseDateRanges.value?.id !== undefined, getDateRangeSingleItemLabel, false, dateRangeClearCallback)
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

const releaseDates = [
  { id: 0, value: [2020, new Date().getFullYear()], title: 'Recent 2020s' },
  { id: 1, value: [2000, 2010], title: 'Rise of Streaming 2010s' },
  { id: 2, value: [1990, 2000], title: 'Modern Classics 90s-2000s' },
  { id: 3, value: [1970, 1980], title: 'Influential Movies 70s-80s' },
  { id: 4, value: [1920, 1960], title: 'Classic Hollywood 20s-60s' },
  { id: 5, value: [1890, 1920], title: 'Silent Films 1890s-1920s' }
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

  emits('update:filters', {
    mediaType: 'movie',
    title: searchString.value,
    keywords: selectedKeywords.value,
    genres: selectedGenres.value,
    dateRange: selectedReleaseDateRanges.value
  })

  emits('submit')
}
const debouncedHandleSubmit = useDebounceFn(() => handleSubmit(), 1000)
const toggleIsOpenFilters = (isOpen = !isOpenFilters.value) => {
  isOpenFilters.value = isOpen
}
const clearCallbackComposer = (callback) => {
  return () => {
    callback()
    debouncedHandleSubmit()
  }
}

onBeforeMount(() => {
  fetchGenres()
})
</script>

<style lang='scss' scoped>
.advanced-search {
  background: var(--background-secondary);

  &__searchbar-before {
    color: var(--text-secondary);
    display: grid;
    grid-template-columns: auto 20px;
    align-items: center;
    gap: 16px;
  }

  &__toolbar {
    display: grid;
    padding: var(--space-20) var(--container-gap) var(--space-10);
    background: var(--background-secondary);
    gap: var(--space-10);
    position: sticky;
    top: 0;
  }

  &__filter-summary {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-20);
  }

  &__no-filters {
    color: var(--text-secondary);
  }

  &__filters-dialog {
    border: 1px solid var(--border);
    border-left-width: 0px;
    border-right-width: 0px;
  }

  &__filters-dialog-inner {
    padding: var(--space-10) var(--container-gap) var(--space20);
    display: grid;
    gap: var(--space20);
    // @include container('tablet2');
  }

  &__filters  {
    display: grid;
    gap: var(--space20);
    grid-template-columns: 1fr;
  }

  &__filter {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
  }

  &__submit-button {
    position: sticky;
    bottom: var(--space20);
  }
}
</style>
