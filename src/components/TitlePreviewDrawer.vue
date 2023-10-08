<template>
  <aside
    ref="root"
    class="title-preview-drawer"
  >
    <base-drawer
      size="full"
      @close="emit('close')"
    >
      <div class="title-preview-drawer__inner">
        <div class="title-preview-drawer__close">
          <base-close
            size="lg"
            @click="emit('close')"
          />
        </div>

        <div class="title-preview-drawer__preview">
          <async-title-preview
            @change="handleChange"
            @close="emit('close')"
          />
        </div>

        <div class="title-preview-drawer__related-titles">
          <async-title-related-titles />
        </div>
      </div>
    </base-drawer>
  </aside>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import BaseDrawer from './BaseDrawer.vue'
import AsyncTitleRelatedTitles from './AsyncTitleRelatedTitles'
import AsyncTitlePreview from './AsyncTitlePreview'
import BaseClose from './BaseClose.vue'

const emit = defineEmits(['close'])

const root = ref()

const handleChange = () => {
  if (root.value) {
    const getTitlePreviewEl = root.value.querySelector('.title-preview')

    root.value.scrollTo(0, 0)
    console.log(getTitlePreviewEl.value)

    // Cheap mobile "scroll to top" trick. Hide content and show it again inmediatly.
    // const tabletBreakpoint = getStyleProperty('--desktop')
    // if (getTitlePreviewEl && window.matchMedia('(max-width: ' + tabletBreakpoint + ')').matches) {
    //   getTitlePreviewEl.style.display = 'none'

    //   nextRender(() => {
    //     getTitlePreviewEl.style.display = ''
    //   })
    // }
  }
}
</script>

<style lang='scss' scoped>
.title-preview-drawer {
  background-color: var(--background-secondary);
  box-shadow: var(--shadow3);

  &__inner {
    max-width: 100vw;
    position: relative;

    @include breakpoint-max('tablet') {
      width: min(450px, 100vw);
    }

    @include breakpoint('tablet') {
      padding: var(--space30)  var(--space30) var(--space20);
      width: 850px;
    }
  }

  &__related-titles {
    @include breakpoint('tablet') {
      grid-area: 2 / span 2;
    }

    @include breakpoint-max('tablet') {
      padding: var(--container-gap);
    }
  }

  &__close {
    position: sticky;
    height: 0;
    top: 0;
    width: min-content;
    z-index: var(--z-fixed);
    transform: translate(8px, 8px);
  }
}
</style>
