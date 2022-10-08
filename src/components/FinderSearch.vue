<template>
  <aside class="finder-search">
    <form @submit.prevent="handleSubmit">
      <searchbar v-model="titleString" />
    </form>

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
  </aside>
</template>

<script setup>
import { ref, onBeforeMount, markRaw } from 'vue'
import FinderSearchCloud from './FinderSearchCloud.vue'
import repositoryFactory from '@/api/repository-factory.js'
import { handleRequest } from '../api/request-handlers'
import Searchbar from './Searchbar.vue'
const genresRepositories = repositoryFactory.get('genres')
const titlesRepository = repositoryFactory.get('titles')

const genres = ref([])
const selectedGenres = ref([])
const selectedKeywords = ref([])
const selectedReleaseDateRanges = ref({})
const titleString = ref('')

const releaseDates = [
  { value: [2020, new Date().getFullYear()], title: '2020s · Recent' },
  { value: [2000, 2010], title: '2010s · Golden Age of Streaming' },
  { value: [1990, 2000], title: '90s-2000s · Modern Classics' },
  { value: [1970, 1980], title: '70s-80s · Influential Movies' },
  { value: [1920, 1960], title: '20s-60s · Classic Hollywood' },
  { value: [1890, 1920], title: '1890s-20s · Silent Films' }
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

const searchTitles = () => {
  handleRequest(titlesRepository.search({
    mediaType: 'movie',
    title: titleString.value,
    keywords: selectedKeywords.value,
    genres: selectedGenres.value,
    dateRange: selectedReleaseDateRanges.value
  }))
}
const fetchGenres = () => {
  handleRequest(genresRepositories.fetch('movie'), {
    onSuccess: ({ data }) => {
      genres.value = markRaw(data.genres.map(genre => ({ title: genre.name, value: genre.id })))
    }
  })
}
const handleSubmit = () => {
  searchTitles()
}
onBeforeMount(() => {
  fetchGenres()
})
</script>

<style lang='scss' scoped>
.finder-search {
  background-color: var(--background);
  padding: var(--container-gap);

  > * + * {
    margin-top: var(--space20);
  }
}
</style>
