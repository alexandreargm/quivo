<template>
  <article
    class="title-card"
    :class="{'is-matching-release': isMatchingReleaseDateRange }"
  >
    <div class="title-card__poster">
      <router-link
        :to="props.to"
      >
        <title-poster
          :src="props.src"
          :alt="props.alt"
          :caption="props.caption"
          :theme="props.theme"
        />
      </router-link>
    </div>

    <div
      v-show="showDetails"
      class="title-card__details"
    >
      <h1 class="visually-hidden">
        Title details
      </h1>

      <section class="title-card__details-section">
        <h2 class="title-card__details-header visually-hidden">
          Year
        </h2>
        
        <div
          class="title-card__details-text"
        >
          {{ releaseYear }}
        </div>
      </section>

      <section
        v-if="genres.length > 0"
        class="title-card__details-section"
      >
        <h2 class="title-card__details-header visually-hidden">
          Matches
        </h2>
        
        <div class="title-card__details-tags">
          <base-tag     
            v-for="{id, title} in matchedGenres"
            :key="id"     
            size="sm"
            color="brand"
            :data-id="id"
          >
            {{ title }}
          </base-tag>

          <base-tag     
            v-for="{id, name} in matchedKeywords"
            :key="id"     
            size="sm"
            color="brand"
            :data-id="id"
          >
            {{ name }}
          </base-tag>

          <base-tag     
            v-for="{id, title} in otherGenres"
            :key="id"     
            size="sm"
            :data-id="id"
          >
            {{ title }}
          </base-tag>

          <base-tag     
            v-for="{id, name} in otherKeywords"
            :key="id"     
            size="sm"
            :data-id="id"
          >
            {{ name }}
          </base-tag>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import TitlePoster from './TitlePoster.vue'
import { useGenreStore } from '../store/genre'
import BaseTag from './BaseTag.vue'
import { titlesRepository } from '../api/repositories/titles-repository'
import { handleRequest } from '@/api/request-handlers'

const genreStore = useGenreStore()

const props = defineProps({
  showDetails: {
    type: Boolean,
    default: true
  },
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary'].includes(value)
    }
  },
  titleId: {
    type: String,
    required: true
  },
  genreIds: {
    type: Array,
    required: true
  },
  selectedGenreIds: {
    type: Array,
    required: true
  },
  selectedKeywordIds: {
    type: Array,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  selectedStartDate: {
    type: String,
    required: true
  },
  selectedEndDate: {
    type: String,
    required: true
  },
  to: {
    type: Object,
    required: true
  }
})

const genres = computed(() => genreStore.genres.filter(({ id }) => props.genreIds.includes(Number(id))))
const keywords = ref([])
const hasLoadedKeywords = ref(false)
const matchedGenres = computed(() => genres.value.filter(({id}) => props.selectedGenreIds.includes(id)))
const otherGenres = computed(() => genres.value.filter(({id}) => !props.selectedGenreIds.includes(id)))

const matchedKeywords = computed(() => keywords.value.filter(keyword => props.selectedKeywordIds.includes(String(keyword.id))))
const otherKeywords = computed(() => keywords.value.filter(keyword => !props.selectedKeywordIds.includes(String(keyword.id))))
const releaseYear = computed(() => new Date(props.releaseDate).getFullYear())
const isMatchingReleaseDateRange = computed(() => releaseYear.value >= props.selectedStartDate && releaseYear.value <= props.selectedEndDate )

handleRequest(
 titlesRepository.keywords({ mediaType: 'movie', id: props.titleId}), {
  onSuccess: ({data}) => {
    keywords.value = data.keywords
    hasLoadedKeywords.value = true
  }
})
</script>

<style lang="scss">
.title-card {
  &__details {
    z-index: 1;
    padding: var(--space-10)  var(--space00) var(--space-10) var(--space-10);
    font-size: var(--font-20);
    max-width: 100%;
    background-color: var(--background-secondary);
    background: linear-gradient(to right, var(--background-secondary) 30%, color-mix(in srgb, var(--background-secondary), var(--background)));
  }

  &__details-header {
    font-size: var(--font-20);
    font-weight: var(--regular);
    color: var(--text-secondary);
    margin-bottom: var(--space-30);
  }

  &__details-tags {
    max-width: 100%;
    display: flex;
    gap: var(--space-30);
    flex-wrap: wrap;
    min-height: calc((4px + 20px) * 3);
    overflow: hidden;
    align-content: flex-start;
  }

  &__details-text {
    font-size: var(--font-10);
    color: var(--text-secondary);
  }

  &__details-section:not(:last-child) {
    margin-bottom: var(--space-10);
  }
}

.title-card.is-matching-release {
  & .title-card__details-text {
    color: var(--color-interactive);
  }
}
</style>
