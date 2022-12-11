<template>
  <div
    class="finder"
    :class="[getIsFinderOpenClass]"
  >
    <header class="finder__header">
      <advanced-search
        id="searchbar"
        v-model="isFinderOpen"
        v-model:filters="filters"
        @submit="handleSubmitSearch"
      >
        <template #before>
          <base-button
            icon="only"
            variant="tertiary"
            @click="goBack"
          >
            <template #icon>
              <BaseIcon name="ArrowLeftIcon" />
            </template>
          </base-button>
        </template>
      </advanced-search>
    </header>

    <main class="finder__main">
      <div class="finder__feed">
        <base-gallery>
          <title-card
            v-for="{id, poster_path} in searchedTitles"
            :id="id"
            :key="id"
            :type="mediaType"
            :src="'http://image.tmdb.org/t/p/w220_and_h330_face/' + poster_path"
          />
        </base-gallery>

        <div ref="loadMoreEl" />
      </div>

      <aside
        v-show="hasSelectedMovie"
        class="finder__aside"
      >
        <router-view name="preview" />
      </aside>
    </main>
  </div>
</template>
<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import repositoryFactory from '@/api/repository-factory.js'
import { handleRequest } from '../api/request-handlers'
import BaseGallery from '../components/BaseGallery.vue'
import TitleCard from '../components/TitleCard.vue'
import useIntersectionObserver from '../composables/useIntersectionObserver'
import { nextRenderPromise } from '../composables/useNextRender'
import AdvancedSearch from '../components/AdvancedSearch.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseIcon from '../components/BaseIcon.vue'
const titlesRepository = repositoryFactory.get('titles')

const route = useRoute()
const router = useRouter()

const mediaType = 'movie'
const searchedTitles = ref([])
const isFinderOpen = ref(true)
const getIsFinderOpenClass = computed(() => isFinderOpen.value && 'is-finder-open')
const filters = ref({})
const hasFilters = computed(() => Object.keys(filters.value).length)
const currentPage = ref(1)
// const finderLayoutEl = ref(null)
const loadMoreEl = ref(null)
const isLoadMoreVisible = ref(false)
const loadMoreRatio = ref(0)
const hasMoreResults = ref(true)
const hasSelectedMovie = computed(() => route.params.id)

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
const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  document.querySelector('.searchbar input').focus()

  useIntersectionObserver(loadMoreEl, ([loadMoreIntersection]) => {
    isLoadMoreVisible.value = loadMoreIntersection.isIntersecting
    loadMoreRatio.value = loadMoreIntersection.intersectionRatio
  }, {
    // root: finderLayoutEl.value.mainEl,
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

  &__header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: var(--z-sticky);
  }

  &__main {
    position: relative;

    @include breakpoint('desktop') {
      display: grid;
      grid-template-columns: minmax(0%, 100%) min-content;
    }
  }

  &__feed {
    padding: var(--space10) 0;
  }

  &__aside {
    height: fit-content;
    position: sticky;
    top: 112px;
    height: calc(100vh - 112px);
    overflow-y: auto;
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
