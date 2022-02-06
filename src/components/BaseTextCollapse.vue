<template>
  <div
    class="base-text-collapse"
    :style="styleProps"
    :class="[getTextClass]"
  >
    <p class="base-text-collapse__text">
      <slot />
    </p>

    <p
      @click="handleToggleContent"
      class="base-text-collapse__show-more"
    >
      {{ toggleText }}
    </p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  props: {
    previewLines: {
      type: Number,
      default: 4
    }
  },

  setup (props) {
    const isShowingContent = ref(false)
    const toggleText = computed(() => isShowingContent.value ? 'SHOW LESS' : 'SHOW MORE')
    const styleProps = ref({
      '--preview-lines': props.previewLines
    })

    const handleToggleContent = () => {
      isShowingContent.value = !isShowingContent.value
    }

    const getTextClass = computed(() => isShowingContent.value ? 'is-visible' : 'is-hidden')

    return {
      styleProps,
      isShowingContent,
      toggleText,
      handleToggleContent,
      getTextClass
    }
  }
}
</script>

<style lang='scss' scoped>
.base-text-collapse {
  &__text {
    margin: 0;
    // stylelint-disable-next-line
    -webkit-box-orient: vertical;
    color: inherit;
    font-size: var(--font-10);
    // stylelint-disable-next-line
    display: -webkit-box;
    line-height: var(--line00);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__show-more {
    color: var(--text-tertiary);
    cursor: pointer;
    font-size: var(--font-20);
    font-weight: var(--medium);
    margin: var(--space-10) 0;
    user-select: none;
  }
}

.base-text-collapse.is-hidden {
  .base-text-collapse__text {
    height: calc(var(--preview-lines) * (var(--font-10) * var(--line00)));
    // stylelint-disable-next-line
    -webkit-line-clamp: var(--preview-lines);
  }
}

.base-text-collapse.is-visible {
  .base-text-collapse__text {
    height: unset;
    // stylelint-disable-next-line
    -webkit-line-clamp: unset;
  }
}
</style>
