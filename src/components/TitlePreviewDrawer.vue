<template>
  <aside
    ref="root"
    class="title-preview-drawer"
  >
    <base-drawer
      size="full"
      @close="handleClose"
    >
      <div class="title-preview-drawer__inner">
        <div class="title-preview-drawer__preview">
          <async-title-preview
            @close="handleClose"
            @change="handleChange"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseDrawer from './BaseDrawer.vue'
import getStyleProperty from '@/composables/useGetStyleProperty'
import nextRender from '@/composables/useNextRender'
import AsyncTitleRelatedTitles from './AsyncTitleRelatedTitles'
import AsyncTitlePreview from './AsyncTitlePreview'

const root = ref()
const router = useRouter()

const handleClose = () => {
  router.push({ name: 'feed' })
}

const handleChange = () => {
  if (root.value) {
    const getTitlePreviewEl = root.value.querySelector('.title-preview')

    root.value.scrollTo(0, 0)

    // Cheap mobile "scroll to top" trick. Hide content and show it again inmediatly.
    const tabletBreakpoint = getStyleProperty('--desktop')
    if (getTitlePreviewEl && window.matchMedia('(max-width: ' + tabletBreakpoint + ')').matches) {
      getTitlePreviewEl.style.display = 'none'

      nextRender(() => {
        getTitlePreviewEl.style.display = ''
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.title-preview-drawer {
  background-color: var(--background);
  height: calc(100vh - var(--the-main-nav-height));
  overflow-y: scroll;

  @include breakpoint('desktop') {
    padding: var(--space20);
  }

  &__inner {
    @include breakpoint-max('tablet') {
      width: min(450px, 100vw);
    }

    @include breakpoint('tablet') {
      width: 600px;
    }

    @include breakpoint('desktop2') {
      width: 725px;
    }

    @include breakpoint('desktop3') {
      width: 775px;
    }
  }

  &__related-titles {
    @include breakpoint-max('desktop') {
      padding: 0 var(--container-gap);
    }

    @include breakpoint('tablet') {
      grid-area: 2 / span 2;
    }
  }
}
</style>
