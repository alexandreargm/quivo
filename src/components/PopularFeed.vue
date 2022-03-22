<template>
  <section class="popular-feed">
    <h2 class="popular-feed__title">
      Popular right now
    </h2>

    <div class="popular-feed__titles">
      <base-feed-row>
        <title-card
          v-for="{id, poster_path} in searchResponse.results"
          :key="id"
          :id="id"
          :type="mediaType"
          :src="'http://image.tmdb.org/t/p/w154/' + poster_path"
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
    color: var(--text-secondary);
    font-size: clamp(var(--font10), 4vw, var(--font30));
    font-weight: var(--medium);
    line-height: var(--line-20);
    margin-bottom: var(--space10);
    padding: 0 var(--container-gap);
    white-space: nowrap;
  }
}
</style>
