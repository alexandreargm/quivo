<template>
  <base-feed-row title="Popular right now">
    <base-poster
      v-for="{id, poster_path} in trendingResponse.results"
      :key="id"
      :src="'http://image.tmdb.org/t/p/w154/' + poster_path"
    />
  </base-feed-row>
</template>

<script>
import { onMounted, ref } from 'vue'
import BaseFeedRow from './BaseFeedRow.vue'
import BasePoster from './BasePoster.vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
const trendingRepository = repositoryFactory.get('trending')

export default {
  components: {
    BaseFeedRow,
    BasePoster
  },
  setup () {
    const trendingResponse = ref([])
    const searchTrending = async () => {
      const { data } = await handleRequest(trendingRepository.search())
      trendingResponse.value = data
    }

    onMounted(searchTrending)

    return {
      trendingResponse,
      searchTrending
    }
  }
}
</script>

<style lang='scss' scoped>
  //
</style>
