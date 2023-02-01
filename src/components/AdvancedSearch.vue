<template>
  <form
    class="advanced-search"
    :class="getIsOpenFiltersClass"
    @submit.prevent="handleSubmit"
  >
    <div class="advanced-search__toolbar">
      <div class="advanced-search__search">
        <slot name="before" />

        <searchbar
          ref="searchInput"
          v-model="searchString"
          width="100%"
          max-width="600px"
          placeholder="Find something to watch"
        >
          <template #after>
            <div class="advanced-search__searchbar-after">
              <base-button
                color="brand"
                variant="tertiary"
                @click.stop="toggleIsOpenFilters(!isOpenFilters)"
                @mousedown.stop
              >
                <template #icon>
                  <base-icon
                    size="md"
                    name="AdjustmentsIcon"
                  />
                </template>
                Filters
              </base-button>
            </div>
          </template>
        </searchbar>
      </div>

      <div class="advanced-search__filter-summary">
        <base-filter-category-tag
          v-for="({category, amount, singleItemLabel, singleItemIsExcluded, clearCallback}, index) in getActiveFilters"
          :key="index"
          :category="category"
          :amount="amount"
          :single-item-label="String(singleItemLabel)"
          :is-excluding="singleItemIsExcluded"
          @close="clearCallback()"
        />

        <div
          v-if="!hasActiveFilters"
          class="advanced-search__no-filters-container"
        >
          <base-tag
            class="advanced-search__no-filters-tag"
            size="lg"
            variant="secondary"
          >
            No filters selected
          </base-tag>
        </div>
      </div>
    </div>

    <div
      v-show="isOpenFilters"
      class="advanced-search__mobile-filters-dialog"
    >
      <div class="advanced-search__mobile-filters-dialog-inner">
        <div class="advanced-search__filters">
          <div class="advanced-search__filter">
            <base-title level="2">
              Release
            </base-title>

            <finder-search-cloud
              v-model="selectedReleaseDateRanges"
              :tags="releaseDates"
            />
          </div>

          <div class="advanced-search__filter">
            <base-title level="2">
              Genre
            </base-title>

            <finder-search-cloud
              v-model="selectedGenres"
              :tags="genres"
              :is-multiple="true"
              :has-excludes="true"
            />
          </div>

          <div class="advanced-search__filter">
            <base-title level="2">
              Tag
            </base-title>

            <finder-search-cloud
              v-model="selectedKeywords"
              :tags="keywords"
              :is-multiple="true"
              :has-excludes="true"
            />
          </div>
        </div>

        <div class="advanced-search__submit-button">
          <base-button
            size="lg"
            width="100%"
            color="brand"
            :disabled="!hasSearchParams"
            @click="handleSubmit"
          >
            <template #icon>
              <base-icon name="SearchIcon" />
            </template>

            Find titles
          </base-button>
        </div>
      </div>
    </div>

    <teleport to="body">
      <base-modal
        v-if="isOpenFilters"
        class="desktop-modal"
        has-background
        @close="toggleIsOpenFilters(false)"
      >
        <template #header>
          Filters
        </template>

        <div class="advanced-search__desktop-filters-dialog">
          <div class="advanced-search__filters">
            <div class="advanced-search__filter">
              <base-title level="2">
                Title or description
              </base-title>

              <Searchbar
                ref="desktopSearchInput"
                v-model="searchString"
                placeholder="Keyword in title or description"
              />
            </div>

            <div class="advanced-search__filter">
              <base-title level="2">
                Release
              </base-title>

              <finder-search-cloud
                v-model="selectedReleaseDateRanges"
                :tags="releaseDates"
              />
            </div>

            <div class="advanced-search__filter">
              <base-title level="2">
                Genre
              </base-title>

              <finder-search-cloud
                v-model="selectedGenres"
                :tags="genres"
                :is-multiple="true"
                :has-excludes="true"
              />
            </div>

            <div class="advanced-search__filter">
              <base-title level="2">
                Tag
              </base-title>

              <finder-search-cloud
                v-model="selectedKeywords"
                :tags="keywords"
                :is-multiple="true"
                :has-excludes="true"
              />
            </div>
          </div>
        </div>

        <template #footer>
          <base-button
            size="lg"
            width="100%"
            color="brand"
            :disabled="!hasSearchParams"
            @click="handleSubmit"
          >
            <template #icon>
              <base-icon name="SearchIcon" />
            </template>

            Find titles
          </base-button>
        </template>
      </base-modal>
    </teleport>
  </form>
</template>

<script setup>
import { ref, onBeforeMount, markRaw, defineEmits, computed, defineProps, defineExpose, watch, nextTick } from 'vue'
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
import BaseModal from './BaseModal.vue'
const genresRepositories = repositoryFactory.get('genres')

const emits = defineEmits(['submit', 'update:modelValue', 'update:filters'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
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
const getIsOpenFiltersClass = computed(() => isOpenFilters.value && 'is-open')
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
const searchInput = ref(null)
const desktopSearchInput = ref(null)

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
  { value: 210024, title: 'anime' },
  { value: 83, title: 'saving the world' },
  { value: 2964, title: 'future' },
  { value: 34117, title: 'cult film' },
  { value: 6956, title: 'treasure hunt' }
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
const focusSearch = () => {
  searchInput.value?.focus()
}

watch(isOpenFilters, async function (newValue) {
  await nextTick()

  if (newValue) {
    desktopSearchInput.value?.focus()
  }
}, {
  immediate: true
})

onBeforeMount(() => {
  fetchGenres()
})

defineExpose({ focusSearch })
</script>

<style lang='scss' scoped>
.advanced-search {
  display: grid;
  grid-template-rows: auto minmax(0, 100%);
  background: var(--background-secondary);

  &__toolbar {
    display: grid;
    background: var(--background-secondary);
    padding: var(--space-10) 0 0;
    gap: var(--space-10);
  }

  &__search {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    padding-right: var(--container-gap);
  }

  &__filter-summary {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--space-20);
    overflow-x: auto;
    overscroll-behavior: contain;
    padding: 0 var(--container-gap) var(--space00);
  }

  &__no-filters-tag {
    color: var(--text-secondary);
    border-style: dashed;
  }

  &__mobile-filters-dialog {
    overflow-y: auto;
    overscroll-behavior: contain;
    border: 1px solid var(--border);
    padding: var(--container-gap);
    background: var(--background-secondary);

    @include breakpoint('tablet') {
      display: none;
    }
  }

  &__mobile-filters-dialog-inner {
    max-width: 45ch;
    display: grid;
    margin: 0 auto;
    gap: var(--space20);
  }

  &__desktop-filters-dialog {
  }

  &__desktop-filters-dialog-inner {
    display: grid;
    margin: 0 auto;
    gap: var(--space20);
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
}

// isOpen prop
.advanced-search.is-open {

  @include breakpoint-max('tablet') {
    display: grid;
    grid-template-rows: auto 1fr;
    position: fixed;
    height: 100dvh;
    width: 100%;
  }
}

.desktop-modal {
  @include breakpoint-max('tablet') {
    display: none;
  }
}
</style>
