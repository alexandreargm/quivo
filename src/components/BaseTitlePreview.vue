<template>
  <article class="base-title-preview">
    <header class="base-title-preview__header">
      <div class="base-title-preview__header-toolbar">
        <base-button
          icon="only"
          variant="secondary"
          :is-round="true"
        >
          <template #icon>
            <base-icon name="ChevronDownIcon" />
          </template>
        </base-button>

        <div class="base-title-preview__header-toolbar-fixed">
          <base-close @click="handleClose" />
        </div>
      </div>

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
        @select="updateId"
        :id="titleId"
        media-type="movie"
      />
    </footer>
  </article>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
import BaseTitlePoster from '../components/BaseTitlePoster.vue'
import { DateTime, Duration } from 'luxon'
import BaseButton from '@/components/BaseButton.vue'
import BaseTagCloud from './BaseTagCloud.vue'
import TitleRelatedTitles from './TitleRelatedTitles.vue'
import TitleAgeBadge from './TitleAgeBadge.vue'
import BaseClose from '../components/BaseClose.vue'
import BaseIcon from '../components/BaseIcon.vue'
const titlesRepository = repositoryFactory.get('titles')

export default {
  components: {
    BaseTitlePoster,
    BaseButton,
    BaseTagCloud,
    TitleRelatedTitles,
    TitleAgeBadge,
    BaseClose,
    BaseIcon
  },

  emits: ['close'],

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  setup (props, { emit }) {
    const titleId = ref(0)
    const titleResponse = ref([])
    const titleReleaseDate = ref('')
    const titleRuntime = ref('')
    const titleKeywords = ref([])
    const titleReleaseDates = ref([])

    const handleClose = () => emit('close')
    const updateId = (id) => { titleId.value = id }
    const loadTitle = (id) => {
      findTitle(id)
      fetchKeywords(id)
    }
    const findTitle = (id) => {
      handleRequest(titlesRepository.find({ mediaType: 'movie', id }), {
        onSuccess: ({ data }) => {
          const { hours, minutes } = Duration.fromObject({ minutes: data.runtime }).shiftTo('hours', 'minutes')

          titleResponse.value = data
          titleReleaseDate.value = DateTime.fromISO(data.release_date).toFormat('yyyy')
          titleRuntime.value = `${hours}h ${minutes}min`
          titleReleaseDates.value = data.release_dates.results
        }
      })
    }
    const fetchKeywords = (id) => {
      handleRequest(titlesRepository.keywords({ mediaType: 'movie', id }), {
        onSuccess: ({ data }) => {
          titleKeywords.value = data.keywords
        }
      })
    }
    const handleKeywordClick = (args) => { console.log(args) }

    onMounted(() => {
      titleId.value = props.id

      loadTitle(titleId.value)
    })

    watch(() => props.id, () => { titleId.value = props.id })

    watch(titleId, () => { loadTitle(titleId.value) })

    return {
      titleId,
      updateId,
      handleClose,
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
  @include breakpoint-max('tablet') {
    max-width: 500px;
  }

  @include breakpoint('tablet') {
    display: grid;
    grid-template-columns: 300px 300px;
  }

  @include breakpoint('desktop2') {
    grid-template-columns: 350px 375px;
  }

  @include breakpoint('desktop3') {
    grid-template-columns: 400px 375px;
  }

  &__header-toolbar {
    display: flex;
    justify-content: space-between;
    opacity: 0.75;
    padding: var(--space00);
    position: absolute;
    width: 100%;
    z-index: var(--z-fixed);
  }

  &__header-toolbar-fixed > * {
    position: fixed;
    transform: translateX(-100%);
  }

  &__header {
    height: 250px;
    overflow: hidden;
    position: relative;

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
    align-items: center;
    color: var(--text-secondary);
    display: flex;
    height: var(--size00);
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
