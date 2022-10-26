<template>
  <section class="popular-feed">
    <div class="popular-feed__title">
      <base-title
        level="2"
        title="Popular right now"
      />
    </div>

    <div class="popular-feed__titles">
      <base-feed-row width="220px">
        <title-card
          v-for="{id, poster_path} in searchResponse.results"
          :key="id"
          :id="id"
          :type="mediaType"
          :src="'http://image.tmdb.org/t/p/w220_and_h330_face/' + poster_path"
        />
      </base-feed-row>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BaseFeedRow from './BaseFeedRow.vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
import TitleCard from './TitleCard.vue'
import BaseTitle from './BaseTitle.vue'
const discoverRepository = repositoryFactory.get('discover')

const mediaType = 'movie'
const searchResponse = ref([])

const searchTrending = async () => {
  const { data } = await handleRequest(discoverRepository.discover({ mediaType }))
  searchResponse.value = { mediaType, ...data }
}

onMounted(() => searchTrending())
</script>

<style lang='scss' scoped>
.popular-feed {
  padding: var(--container-gap) 0;

  &__title {
    margin: 0 var(--container-gap);
    margin-bottom: var(--space10);
  }
}
</style>
