<template>
  <article class="title-preview">
    <header class="title-preview__header">
      <div class="title-preview__header-toolbar">
        <base-button
          @click="toggleTitleImageModal(true)"
          icon="only"
          variant="secondary"
          :is-round="true"
        >
          <template #icon>
            <base-icon
              name="ArrowsExpandIcon"
              type="outline"
            />
          </template>
        </base-button>

        <div class="title-preview__header-toolbar-fixed">
          <base-close @click="handleClose" />
        </div>
      </div>

      <title-poster :src="titleResponse.poster_path ? 'http://image.tmdb.org/t/p/w500/' + titleResponse.poster_path : ''" />
    </header>

    <main class="title-preview__body">
      <div>
        <p class="title-preview__title">
          {{ titleResponse.title }}
        </p>

        <div class="title-preview__metadata">
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

      <div class="title-preview__synopsis">
        <base-text-collapse
          :text="titleResponse.overview || ''"
          v-model:is-open="isSynopsisExpanded"
        />
      </div>
    </main>

    <footer class="title-preview__footer">
      <title-related-titles
        @select="handleRelatedSelect"
        :id="titleId"
        media-type="movie"
      />
    </footer>

    <transition>
      <title-image-modal
        v-if="isTitleImageModalOpen"
        :poster-path="titleResponse.poster_path ? titleResponse.poster_path : ''"
        @close="toggleTitleImageModal(false)"
      />
    </transition>
  </article>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
import TitlePoster from './TitlePoster.vue'
import { DateTime, Duration } from 'luxon'
import BaseButton from '@/components/BaseButton.vue'
import BaseTagCloud from './BaseTagCloud.vue'
import TitleRelatedTitles from './TitleRelatedTitles.vue'
import TitleAgeBadge from './TitleAgeBadge.vue'
import BaseClose from './BaseClose.vue'
import BaseIcon from './BaseIcon.vue'
import TitleImageModal from './TitleImageModal.vue'
import BaseTextCollapse from './BaseTextCollapse.vue'
const titlesRepository = repositoryFactory.get('titles')

export default {
  components: {
    TitlePoster,
    BaseButton,
    BaseTagCloud,
    TitleRelatedTitles,
    TitleAgeBadge,
    BaseClose,
    BaseIcon,
    TitleImageModal,
    BaseTextCollapse
  },

  emits: ['close', 'update'],

  props: {
    id: {
      type: Number,
      required: true
    },
    mediaType: {
      type: String,
      required: true,
      validator: function (value) {
        return ['movie', 'tv'].includes(value)
      }
    }
  },

  setup (props, { emit }) {
    const titleId = ref(0)
    const titleResponse = ref([])
    const titleReleaseDate = ref('')
    const titleRuntime = ref('')
    const titleKeywords = ref([])
    const titleReleaseDates = ref([])
    const isTitleImageModalOpen = ref(false)
    const isSynopsisExpanded = ref(false)

    const handleClose = () => emit('close')
    const updateId = (id) => { titleId.value = id }
    const loadTitle = (id) => {
      findTitle(id)
      fetchKeywords(id)
    }
    const findTitle = (id) => {
      handleRequest(titlesRepository.find({ mediaType: props.mediaType, id }), {
        onSuccess: ({ data }) => {
          const { hours, minutes } = Duration.fromObject({ minutes: data.runtime }).shiftTo('hours', 'minutes')

          titleResponse.value = data
          titleReleaseDate.value = DateTime.fromISO(data.release_date).toFormat('yyyy')
          titleRuntime.value = `${hours}h ${minutes}min`
          titleReleaseDates.value = data.release_dates.results

          emit('update')
        }
      })
    }
    const fetchKeywords = (id) => {
      handleRequest(titlesRepository.keywords({ mediaType: props.mediaType, id }), {
        onSuccess: ({ data }) => {
          titleKeywords.value = data.keywords
        }
      })
    }
    const handleKeywordClick = (args) => { console.log(args) }
    const handleRelatedSelect = (id) => {
      updateId(id)
    }

    const toggleTitleImageModal = (isOpen) => { isTitleImageModalOpen.value = isOpen }

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
      handleKeywordClick,
      handleRelatedSelect,
      isTitleImageModalOpen,
      toggleTitleImageModal,
      isSynopsisExpanded
    }
  }
}
</script>

<style lang='scss' scoped>
.title-preview {
  // TODO: Add container query polifyll to simplify queries
  @include breakpoint('tablet') {
    display: grid;
    grid-template-columns: 300px 300px;
    // width: calc(300px + 300px);
  }

  @include breakpoint('desktop2') {
    grid-template-columns: 350px 375px;
    // width: calc(350px + 375px);
  }

  @include breakpoint('desktop3') {
    grid-template-columns: 400px 375px;
    // width: calc(400px + 375px);
  }

  &__header-toolbar {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    opacity: 0.75;
    padding: var(--space00);
    position: absolute;
    width: 100%;
    z-index: var(--z-fixed);
  }

  &__header-toolbar-fixed > * {
    position: fixed;
  }

  &__header {
    height: 250px;
    overflow: hidden;
    position: relative;

    @include breakpoint('tablet') {
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
    font-size: clamp(var(--font00), 4vw, var(--font20));
    font-weight: var(--medium);
    line-height: var(--line00);
    margin: 0;
  }

  &__synopsis {
    color: var(--text-secondary);
    margin: 0;
    margin-top: var(--space20);
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
