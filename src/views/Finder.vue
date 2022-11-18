<template>
  <finder-layout ref="finderLayoutEl">
    <template #default>
      <div
        class="finder"
        :class="[getIsFinderOpenClass]"
      >
        <div class="finder__search">
          <finder-search
            v-model="isFinderOpen"
            v-model:filters="filters"
            @submit="handleSubmitSearch"
          />
        </div>

        <div
          class="finder__gallery"
        >
          <base-gallery>
            <title-card
              v-for="{id, poster_path} in searchedTitles"
              :key="id"
              :id="id"
              :type="mediaType"
              :src="'http://image.tmdb.org/t/p/w220_and_h330_face/' + poster_path"
            />
          </base-gallery>

          <div
            ref="loadMoreEl"
            id="gallery-footer"
          />
        </div>
      </div>
    </template>

    <template #preview>
      <router-view name="preview" />
    </template>
  </finder-layout>
</template>
<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import FinderLayout from '../layouts/FinderLayout'
import FinderSearch from '../components/FinderSearch.vue'
import repositoryFactory from '@/api/repository-factory.js'
import { handleRequest } from '../api/request-handlers'
import BaseGallery from '../components/BaseGallery.vue'
import TitleCard from '../components/TitleCard.vue'
import useIntersectionObserver from '../composables/useIntersectionObserver'
import { nextRenderPromise } from '../composables/useNextRender'
const titlesRepository = repositoryFactory.get('titles')

const mediaType = 'movie'
const searchedTitles = ref([])
const isFinderOpen = ref(true)
const getIsFinderOpenClass = computed(() => isFinderOpen.value && 'is-finder-open')
const filters = ref({})
const hasFilters = computed(() => Object.keys(filters.value).length)
const currentPage = ref(1)
const finderLayoutEl = ref(null)
const loadMoreEl = ref(null)
const isLoadMoreVisible = ref(false)
const loadMoreRatio = ref(0)
const hasMoreResults = ref(true)

const searchTitles = () => {
  return handleRequest(titlesRepository.search({
    mediaType: 'movie',
    ...filters.value,
    page: currentPage.value
  }), {
    onSuccess: ({ data }) => {
      searchedTitles.value = searchedTitles.value.concat(data.results)

      hasMoreResults.value = searchedTitles.value.length < data.total_results
    }
  })
}
const handleSubmitSearch = async () => {
  currentPage.value = 1
  searchedTitles.value = []
  hasMoreResults.value = false

  await searchTitles()

  loadMoreIfLoadMoreIsVisible()
}
const handleLoadMore = async (isVisible) => {
  if (!hasFilters.value || !isVisible || !hasMoreResults.value) return

  currentPage.value++

  await searchTitles()
}
const loadMoreIfLoadMoreIsVisible = async () => {
  do {
    // Wait for the new titles cards DOM update
    await nextTick()

    // Wait for intersectionObserver callback
    await nextRenderPromise()
    await nextRenderPromise()

    if (loadMoreRatio.value === 1) {
      currentPage.value++

      await searchTitles()
    }
  } while (hasMoreResults.value && loadMoreRatio.value === 1)
}

onMounted(() => {
  useIntersectionObserver(loadMoreEl, ([loadMoreIntersection]) => {
    isLoadMoreVisible.value = loadMoreIntersection.isIntersecting
    loadMoreRatio.value = loadMoreIntersection.intersectionRatio
  }, {
    root: finderLayoutEl.value.mainEl,
    threshold: [0, 1]
  })
})

watch(loadMoreRatio, (visibleRatio) => {
  if (visibleRatio < 1) {
    handleLoadMore(true)
  }
})
</script>

<style lang="scss" scoped>
.finder {
  align-content: flex-start;
  display: grid;
  position: relative;

  &__gallery {
    position: relative;
    padding: var(--container-gap) 0;
  }

  &__search {
    height: fit-content;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: var(--z-sticky);
  }
}

.finder.is-finder-open {
  .finder__gallery {
    filter: grayscale(0.7) brightness(0.5);
  }
}

#gallery-footer {
  position: absolute;
  bottom: -200px;
  height: 400px;
  width: 100%;
  pointer-events: none;
  opacity: 0.1;
  display: block;
}
</style>
