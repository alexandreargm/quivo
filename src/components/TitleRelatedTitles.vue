<template>
  <base-feed-row
    title="Related results"
    class="title-related-titles"
  >
    <base-title-poster
      class="title-related-titles__poster"
      v-for="{id, poster_path} in relatedResponse.results"
      :key="id"
      :src="'http://image.tmdb.org/t/p/w154/' + poster_path"
    />
  </base-feed-row>
</template>

<script>
import { onMounted, ref } from 'vue'
import BaseFeedRow from './BaseFeedRow.vue'
import BaseTitlePoster from './BaseTitlePoster.vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
const titlesRepository = repositoryFactory.get('titles')

export default {
  components: {
    BaseFeedRow,
    BaseTitlePoster
  },

  props: {
    mediaType: {
      type: String,
      required: true
    },
    titleId: {
      type: Number,
      required: true
    }
  },

  setup (props) {
    const relatedResponse = ref([])
    const fetchSimilar = async () => {
      const { data } = await handleRequest(titlesRepository.recommendations({ mediaType: props.mediaType, id: props.titleId }))
      relatedResponse.value = data
    }

    onMounted(() => fetchSimilar())

    return {
      relatedResponse
    }
  }
}
</script>

<style lang='scss' scoped>
  //
</style>
