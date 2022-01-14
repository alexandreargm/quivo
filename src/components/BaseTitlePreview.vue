<template>
  <article class="base-title-preview">
    <header class="base-title-preview__header">
      <base-title-poster :src="titleResponse.poster_path ? 'http://image.tmdb.org/t/p/w500/' + titleResponse.poster_path : ''" />
    </header>

    <main class="base-title-preview__body">
      <div>
        <p class="base-title-preview__title">
          {{ titleResponse.title }}
        </p>

        <div class="base-title-preview__metadata">
          <span>
            {{ titleRuntime }}
          </span>

          <span>
            {{ titleReleaseDate }}
          </span>

          <title-age-badge :release-dates="titleReleaseDates" />
        </div>
      </div>

      <base-button size="sm">
        More info
      </base-button>

      <base-tag-cloud
        :words="titleKeywords"
        @click="handleKeywordClick"
      />
    </main>

    <footer class="base-title-preview__footer">
      <title-related-titles
        :title-id="120"
        media-type="movie"
      />
    </footer>
  </article>
</template>

<script>
import { onMounted, ref } from 'vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
import BaseTitlePoster from '../components/BaseTitlePoster.vue'
import { DateTime, Duration } from 'luxon'
import BaseButton from '@/components/BaseButton.vue'
import BaseTagCloud from './BaseTagCloud.vue'
import TitleRelatedTitles from './TitleRelatedTitles.vue'
import TitleAgeBadge from './TitleAgeBadge.vue'
const titlesRepository = repositoryFactory.get('titles')

export default {
  components: {
    BaseTitlePoster,
    BaseButton,
    BaseTagCloud,
    TitleRelatedTitles,
    TitleAgeBadge
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  setup (props) {
    const titleResponse = ref([])
    const titleReleaseDate = ref('')
    const titleRuntime = ref('')
    const titleKeywords = ref([])
    const titleReleaseDates = ref([])

    const findTitle = () => {
      handleRequest(titlesRepository.find({ mediaType: 'movie', id: '120' }), {
        onSuccess: ({ data }) => {
          const { hours, minutes } = Duration.fromObject({ minutes: data.runtime }).shiftTo('hours', 'minutes')

          titleResponse.value = data
          titleReleaseDate.value = DateTime.fromISO(data.release_date).toFormat('yyyy')
          titleRuntime.value = `${hours}h ${minutes}min`
          titleReleaseDates.value = data.release_dates.results
        }
      })
    }

    const fetchTitleKeywords = () => {
      handleRequest(titlesRepository.keywords({ mediaType: 'movie', id: '120' }), {
        onSuccess: ({ data }) => {
          titleKeywords.value = data.keywords
        }
      })
    }

    const handleKeywordClick = (args) => {
      console.log(args)
    }

    onMounted(() => {
      findTitle()
      fetchTitleKeywords()
    })

    return {
      titleResponse,
      titleReleaseDate,
      titleRuntime,
      titleKeywords,
      titleReleaseDates,
      handleKeywordClick
    }
  }
}
</script>

<style lang='scss' scoped>
.base-title-preview {
  // TODO: Add container query polifyll to simplify queries
  @include breakpoint('tablet') {
    display: grid;
    grid-template-columns: calc(400px - var(--space20)) calc(300px - var(--space20));
    grid-template-rows: auto auto;
  }

  @include breakpoint('desktop') {
    grid-template-columns: calc(300px - var(--space20)) calc(300px - var(--space20));
  }

  @include breakpoint('desktop2') {
    grid-template-columns: calc(400px - var(--space20)) calc(300px - var(--space20));
  }

  &__header {
    height: 250px;
    overflow: hidden;

    @include breakpoint('tablet') {
      grid-area: 1/2;
      height: auto;
    }
  }

  &__body {
    padding: calc(var(--container-gap) / 2) var(--container-gap);
  }

  &__body > * + * {
    margin-top: var(--space20);
  }

  &__title {
    color: var(--text);
    font-weight: var(--base);
    font-weight: var(--medium, 500);
    line-height: var(--line00);
    margin: 0;
  }

  &__metadata {
    color: var(--text-secondary);
    margin-top: var(--space-20);
  }

  &__metadata > * + * {
    margin-left: var(--space10);
  }

  &__footer {
    @include breakpoint('tablet') {
      grid-area: 2/span 2;
    }
  }
}
</style>
