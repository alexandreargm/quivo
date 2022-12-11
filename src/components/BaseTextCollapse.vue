<template>
  <div
    class="base-text-collapse"
    :style="styleProps"
    :class="[getIsToggleableClass, getIsOpenClass]"
  >
    <p
      ref="textEl"
      :style="getVisibilityStyle"
      class="base-text-collapse__text"
    >
      {{ text }}
    </p>

    <p
      v-if="isToggleable"
      class="base-text-collapse__show-more"
      @click="toggleText(!isOpen)"
    >
      {{ buttonToggleText }}
    </p>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { nextRender } from '../composables/useNextRender'

export default {

  props: {
    text: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    previewLines: {
      type: Number,
      default: 5
    }
  },
  emits: ['update:isOpen'],

  setup (props, { emit }) {
    const textEl = ref()
    const isToggleable = ref(false)
    const isToggleChecked = ref(false)
    const styleProps = ref({ '--preview-lines': props.previewLines })
    const buttonToggleText = computed(() => props.isOpen ? 'SHOW LESS' : 'SHOW MORE')
    const getIsToggleableClass = computed(() => isToggleable.value ? 'is-toggleable' : '')
    const getIsOpenClass = computed(() => props.isOpen ? 'is-open' : 'is-closed')
    const getVisibilityStyle = computed(() => ({ visibility: isToggleChecked.value ? '' : 'hidden' }))

    function resetInstance () {
      isToggleable.value = false
      isToggleChecked.value = false
    }

    function checkIsToggleable (text) {
      if (text) {
        nextRender(() => {
          const lineHeight = getComputedStyle(textEl.value).lineHeight

          const getPreviewHeight = lineHeight.replace('px', '') * props.previewLines

          isToggleable.value = textEl.value.clientHeight > getPreviewHeight
          isToggleChecked.value = true
        })
      }
    }

    const toggleText = (isOpen) => {
      emit('update:isOpen', isOpen)
    }

    onMounted(() => {
      checkIsToggleable(props.text)
    })

    watch(() => props.text, (newText) => {
      resetInstance()

      checkIsToggleable(newText)
    }, { inmediate: true, flush: 'post' })

    return {
      styleProps,
      buttonToggleText,
      toggleText,
      getIsToggleableClass,
      getIsOpenClass,
      textEl,
      isToggleable,
      isToggleChecked,
      getVisibilityStyle
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
    overflow: auto;
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

// isOpen prop
.base-text-collapse.is-toggleable.is-closed {
  .base-text-collapse__text {
    // stylelint-disable-next-line
    -webkit-line-clamp: var(--preview-lines);
    overflow: hidden;
  }
}

.base-text-collapse.is-toggleable.is-open {
  .base-text-collapse__text {
    // stylelint-disable-next-line
    -webkit-line-clamp: unset;
  }
}
</style>
