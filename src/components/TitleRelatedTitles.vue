<template>
  <base-feed-gallery
    title="Related results"
    class="title-related-titles"
    v-slot="{handleTitleClick}"
    @select="handleSelect"
  >
    <base-title-poster
      class="title-related-titles__poster"
      v-for="{id: titleId, poster_path} in relatedResponse.results"
      :key="titleId"
      :src="'http://image.tmdb.org/t/p/w154/' + poster_path"
      @click="handleTitleClick(titleId)"
    />
  </base-feed-gallery>
</template>

<script>
import { ref, watch } from 'vue'
import BaseTitlePoster from './BaseTitlePoster.vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
import BaseFeedGallery from './BaseFeedGallery.vue'
const titlesRepository = repositoryFactory.get('titles')

export default {
  emits: ['select'],
  components: {
    BaseTitlePoster,
    BaseFeedGallery
  },

  props: {
    id: {
      type: Number,
      required: true
    },
    mediaType: {
      type: String,
      required: true
    }
  },

  setup (props, { emit }) {
    const relatedResponse = ref([])

    const fetchSimilar = async (id) => {
      const { data } = await handleRequest(titlesRepository.recommendations({ mediaType: props.mediaType, id }))
      relatedResponse.value = data
    }
    const handleSelect = (id) => {
      emit('select', id)
    }

    watch(() => props.id, () => fetchSimilar(props.id))

    return {
      handleSelect,
      relatedResponse
    }
  }
}
</script>

<style lang='scss' scoped>
  //
</style>
