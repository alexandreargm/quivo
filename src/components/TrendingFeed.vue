<template>
  <base-feed-row
    title="Popular right now"
    class="trending-feed"
  >
    <title-poster
      v-for="{id, poster_path} in searchResponse.results"
      :key="id"
      class="trending-feed__poster"
      :src="'http://image.tmdb.org/t/p/w220/' + poster_path"
    />
  </base-feed-row>
</template>

<script>
import { onMounted, ref } from 'vue'
import BaseFeedRow from './BaseFeedRow.vue'
import TitlePoster from './TitlePoster.vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
const trendingRepository = repositoryFactory.get('trending')

export default {
  components: {
    BaseFeedRow,
    TitlePoster
  },
  setup () {
    const searchResponse = ref([])
    const searchTrending = async () => {
      const { data } = await handleRequest(trendingRepository.search({ timeWindow: 'day' }))
      searchResponse.value = data
    }

    onMounted(() => searchTrending())

    return {
      searchResponse
    }
  }
}
</script>

<style lang='scss' scoped>
//
</style>
