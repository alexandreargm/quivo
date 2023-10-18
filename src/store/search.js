import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { titlesRepository } from '../api/repositories/titles-repository'
import { useDebounceFn } from '@vueuse/core'

export const useSearchFeatureStore = defineStore('searchFeature', () => {
  const searchResponse = reactive({
    entries: ref([]),
    entryCount: ref(0),
    pageCount: ref(0),
  })
  const searchFilters = reactive({
    title: ref(''),
    keywords: ref([]),
    excludedKeywords: ref([]),
    genres: ref([]),
    excludedGenres: ref([]),
    startDate: ref(''),
    endDate: ref(''),
    page: 1,
  })
  const isSearching = ref(false)
  const hasSetFilters = computed(() => searchFilters.title || searchFilters.keywords.length > 0 || searchFilters.excludedKeywords.length > 0 || searchFilters.genres.length > 0 || searchFilters.excludedGenres.length > 0 || searchFilters.startDate || searchFilters.endDate)

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
  
  const handleDebouncedSearch = useDebounceFn(() => {
    isSearching.value = true
    handleSearch()
  }, 300)
  
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

  return {
    searchResponse,
    searchFilters,
    isSearching,
    hasSetFilters,
    handleSearch,
    handleDebouncedSearch,
    resetGenreFilters,
    resetKeywordFilters,
    resetReleaseDateFilters,
    handleLoadMoreItems
  }
})
