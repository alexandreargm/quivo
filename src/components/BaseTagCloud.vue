<template>
  <section class="base-tag-cloud">
    <base-tag
      v-for="({name, id = 0}, index) in currentlyLoadedWords"
      :id="id"
      :key="index"
      @click="handleTagClick({id, name})"
    >
      {{ name }}
    </base-tag>

    <base-tag
      v-if="hasMoreWords"
      class="base-tag-cloud__more-button"
      @click="handleLoadMore"
    >
      <base-icon
        name="ChevronDownIcon"
        size="xs"
      />
    </base-tag>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import BaseTag from './BaseTag.vue'
import BaseIcon from './BaseIcon.vue'

export default {

  components: {
    BaseTag,
    BaseIcon
  },

  props: {
    words: {
      type: Array,
      required: true
    },
    wordsPerLoad: {
      type: Number,
      default: 7
    }
  },
  emits: ['click'],

  setup (props, { emit }) {
    const wordsPool = computed(() => props.words)
    const currentMaxWords = ref(props.wordsPerLoad)
    const currentlyLoadedWords = computed(() => wordsPool.value.slice(0, currentMaxWords.value))
    const hasMoreWords = computed(() => wordsPool.value.length > currentMaxWords.value)

    const handleLoadMore = () => {
      currentMaxWords.value += props.wordsPerLoad
    }

    const handleTagClick = (args) => {
      emit('click', args)
    }

    const resetMaxWords = () => {
      currentMaxWords.value = props.wordsPerLoad
    }

    watch(wordsPool, resetMaxWords)

    return {
      currentlyLoadedWords,
      currentMaxWords,
      handleLoadMore,
      hasMoreWords,
      handleTagClick
    }
  }
}
</script>

<style lang='scss' scoped>
.base-tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-20);

  &__more-button {
    width: var(--size30);
  }
}
</style>
