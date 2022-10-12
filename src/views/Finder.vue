<template>
  <finder-layout>
    <finder-search @submit="searchTitles" />

    <base-feed-gallery>
      <title-card
        v-for="{id, poster_path} in searchedTitles"
        :key="id"
        :id="id"
        :type="mediaType"
        :src="'http://image.tmdb.org/t/p/w154/' + poster_path"
      />
    </base-feed-gallery>

    <template #preview>
      <router-view name="preview" />
    </template>
  </finder-layout>
</template>
<script setup>
import { ref } from 'vue'
import FinderLayout from '../layouts/FinderLayout'
import FinderSearch from '../components/FinderSearch.vue'
import repositoryFactory from '@/api/repository-factory.js'
import { handleRequest } from '../api/request-handlers'
import BaseFeedGallery from '../components/BaseFeedGallery.vue'
import TitleCard from '../components/TitleCard.vue'
const titlesRepository = repositoryFactory.get('titles')

const mediaType = 'movie'
const searchedTitles = ref([])

const searchTitles = (params) => {
  handleRequest(titlesRepository.search(params), {
    onSuccess: ({ data }) => {
      searchedTitles.value = data.results
    }
  })
}
</script>

<style lang="scss" scoped>
//
</style>
