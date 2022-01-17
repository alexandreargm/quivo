<template>
  <base-feed-row
    title="Popular right now"
    class="popular-feed"
    v-slot="{handleTitleClick}"
    @select="handleSelect"
  >
    <base-title-poster
      class="popular-feed__poster"
      v-for="{id, poster_path} in searchResponse.results"
      :key="id"
      :src="'http://image.tmdb.org/t/p/w154/' + poster_path"
      @click="handleTitleClick(id)"
    />
  </base-feed-row>
</template>

<script>
import { onMounted, ref } from 'vue'
import BaseFeedRow from './BaseFeedRow.vue'
import BaseTitlePoster from './BaseTitlePoster.vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
const discoverRepository = repositoryFactory.get('discover')

export default {
  emits: ['click'],
  components: {
    BaseFeedRow,
    BaseTitlePoster
  },

  setup (props, { emit }) {
    const searchResponse = ref([])
    const searchTrending = async () => {
      const { data } = await handleRequest(discoverRepository.discover())
      searchResponse.value = data
    }

    const handleSelect = (id) => {
      emit('click', id)
    }

    onMounted(() => searchTrending())

    return {
      handleSelect,
      searchResponse
    }
  }
}
</script>

<style lang='scss' scoped>
//
</style>
