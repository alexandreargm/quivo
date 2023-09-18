<template>
  <section class="title-related-titles">
    <h2 class="title-related-titles__title">
      Related titles
    </h2>

    <base-slider
      title="Related results"
    >
      <title-card
        v-for="{id: titleId, poster_path} in relatedResponse.results"
        :id="titleId"
        :key="titleId"
        :type="'movie'"
        :src="'http://image.tmdb.org/t/p/w154/' + poster_path"
      />
    </base-slider>

    <p
      v-if="hasNoResults"
      class="title-related-titles__empty-message"
    >
      There are no related titles
    </p>
  </section>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import TitleCard from './TitleCard.vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
import BaseSlider from './BaseSlider.vue'
const titlesRepository = repositoryFactory.get('titles')

const route = useRoute()
const relatedResponse = ref([])
const hasNoResults = ref(false)
let stopWatch

const fetchSimilar = async () => {
  const { data } = await handleRequest(titlesRepository.recommendations({ mediaType: 'movie', id: route.params.id }))
  relatedResponse.value = data
  hasNoResults.value = data.results && data.results.length === 0
}

stopWatch = watch(() => route.params.id, fetchSimilar, {
  deep: true,
  immediate: true
})

onBeforeUnmount(() => {
  stopWatch()
})
</script>

<style lang='scss' scoped>
.title-related-titles {
  padding: var(--container-gap) 0;

  &__title {
    color: var(--text-secondary);
    font-size: clamp(var(--font10), 4vw, var(--font30));
    font-weight: var(--medium);
    line-height: var(--line-20);
    padding: var(--container-gap) 0;
    white-space: nowrap;
  }

  &__empty-message {
    color: var(--text-tertiary);
    margin: 0;
  }
}
</style>
