<template>
  <article class="title-preview">
    <header class="title-preview__header">
      <div class="title-preview__header-toolbar">
        <base-button
          icon="only"
          :is-round="true"
          @click="toggleTitleImageModal(true)"
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

      <div
        class="title-preview__poster"
        @click="toggleTitleImageModal(true)"
      >
        <title-poster
          :src="titleResponse.poster_path ? 'http://image.tmdb.org/t/p/w500/' + titleResponse.poster_path : ''"
        />
      </div>
    </header>

    <main class="title-preview__body">
      <div>
        <p class="title-preview__title">
          {{ titleResponse.title }}
        </p>

        <div class="title-preview__metadata">
          <span>{{ titleRuntime }}</span>

          <span>{{ titleReleaseDate }}</span>

          <title-age-badge :release-dates="titleReleaseDates" />
        </div>
      </div>

      <base-button
        color="brand"
        size="sm"
      >
        More info
      </base-button>

      <base-tag-cloud
        :words="titleKeywords"
        @click="handleKeywordClick"
      />

      <div class="title-preview__synopsis">
        <base-text-collapse
          v-model:is-open="isSynopsisExpanded"
          :text="titleResponse.overview || ''"
        />
      </div>
    </main>

    <transition>
      <title-image-modal
        v-if="isTitleImageModalOpen"
        :poster-path="titleResponse.poster_path ? titleResponse.poster_path : ''"
        @close="toggleTitleImageModal(false)"
      />
    </transition>
  </article>
</template>

<script setup>
import { defineEmits, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import repositoryFactory from '@/api/repository-factory'
import { handleRequest } from '@/api/request-handlers'
import TitlePoster from './TitlePoster.vue'
import { DateTime, Duration } from 'luxon'
import BaseButton from '@/components/BaseButton.vue'
import BaseTagCloud from './BaseTagCloud.vue'
import TitleAgeBadge from './TitleAgeBadge.vue'
import BaseClose from './BaseClose.vue'
import BaseIcon from './BaseIcon.vue'
import TitleImageModal from './TitleImageModal.vue'
import BaseTextCollapse from './BaseTextCollapse.vue'

const emit = defineEmits(['close', 'change'])

const route = useRoute()

const titlesRepository = repositoryFactory.get('titles')

const titleResponse = ref({})
const titleReleaseDate = ref('')
const titleRuntime = ref('')
const titleKeywords = ref([])
const titleReleaseDates = ref([])
const isTitleImageModalOpen = ref(false)
const isSynopsisExpanded = ref(false)

const handleClose = () => emit('close')
const resetPreview = () => {
  isTitleImageModalOpen.value = false
  isSynopsisExpanded.value = false
}
const loadNewTitle = async () => {
  resetPreview()

  return Promise.all([findTitle(), fetchKeywords()])
}
const findTitle = () => {
  return handleRequest(titlesRepository.find({ mediaType: route.params.type, id: route.params.id }), {
    onSuccess: async ({ data }) => {
      const { hours, minutes } = Duration.fromObject({ minutes: data.runtime }).shiftTo('hours', 'minutes')

      titleResponse.value = data
      titleReleaseDate.value = DateTime.fromISO(data.release_date).toFormat('yyyy')
      titleRuntime.value = `${hours}h ${minutes}min`
      titleReleaseDates.value = data.release_dates.results

      emit('change')
    }
  })
}
const fetchKeywords = () => {
  return handleRequest(titlesRepository.keywords({ mediaType: route.params.type, id: route.params.id }), {
    onSuccess: async ({ data }) => {
      titleKeywords.value = data.keywords
    }
  })
}
const handleKeywordClick = (args) => { console.log(args) }
const toggleTitleImageModal = (isOpen) => { isTitleImageModalOpen.value = isOpen }

onMounted(async () => { await loadNewTitle() })

watch(() => route.params.id, () => {
  if (route.params.id) { loadNewTitle() }
})
</script>

<style lang='scss' scoped>
.title-preview {
  // TODO: Add container query polifyll to simplify queries
  @include breakpoint('tablet') {
    display: grid;
    grid-template-columns: 400px 1fr;
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
    padding: var(--container-gap);
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

  &__poster {
    cursor: pointer;
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
}
</style>
