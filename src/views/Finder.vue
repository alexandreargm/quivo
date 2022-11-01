<template>
  <finder-layout>
    <div class="finder">
      <div class="finder__search">
        <finder-search
          @submit="searchTitles"
        />
      </div>

      <div class="finder__gallery">
        <base-gallery>
          <title-card
            v-for="{id, poster_path} in searchedTitles"
            :key="id"
            :id="id"
            :type="mediaType"
            :src="'http://image.tmdb.org/t/p/w220_and_h330_face/' + poster_path"
          />
        </base-gallery>
      </div>
    </div>

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
import BaseGallery from '../components/BaseGallery.vue'
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
.finder {
  align-content: flex-start;
  display: grid;
  position: relative;

  &__gallery {
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
</style>
