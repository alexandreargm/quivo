<template>
  <base-feed-row
    title="Popular right now"
    class="popular-feed"
  >
    <title-card
      v-for="{id, poster_path} in searchResponse.results"
      :id="id"
      :media-type="mediaType"
      :key="id"
      :src="'http://image.tmdb.org/t/p/w154/' + poster_path"
      @select="handleTitleSelect({id, mediaType})"
    />
  </base-feed-row>
</template>

<script>
import { onMounted, ref } from 'vue'
import BaseFeedRow from './BaseFeedRow.vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
import TitleCard from './TitleCard.vue'
const discoverRepository = repositoryFactory.get('discover')

export default {
  emits: ['select'],
  components: {
    BaseFeedRow,
    TitleCard
  },

  setup (_, { emit }) {
    const mediaType = 'movie'
    const searchResponse = ref([])
    const searchTrending = async () => {
      const { data } = await handleRequest(discoverRepository.discover({ mediaType }))
      searchResponse.value = { mediaType, ...data }
    }

    const handleTitleSelect = (selectedTitle) => {
      emit('select', selectedTitle)
    }

    onMounted(() => searchTrending())

    return {
      handleTitleSelect,
      searchResponse,
      mediaType
    }
  }
}
</script>

<style lang='scss' scoped>
//
</style>
