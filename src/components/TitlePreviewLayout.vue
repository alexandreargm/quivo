<template>
  <base-drawer-container
    ref="rootEl"
    class="title-preview-layout"
  >
    <div class="title-preview-layout__main">
      <slot :togglePreview="togglePreview" />
    </div>

    <transition>
      <aside
        v-if="isPreviewOpen"
        id="title-preview-drawer"
        class="title-preview-layout__drawer"
      >
        <base-drawer
          size="full"
          @close="handleClose"
        >
          <div
            class="title-preview-layout__drawer-inner"
          >
            <title-preview
              class="title-preview"
              :id="selectedTitle.id || 0"
              :media-type="selectedTitle.mediaType || ''"
              @close="handleClose"
              @update="handleUpdate"
            />
          </div>
        </base-drawer>
      </aside>
    </transition>
  </base-drawer-container>
</template>

<script>
import { ref } from 'vue'
import TitlePreview from './TitlePreview.vue'
import BaseDrawer from './BaseDrawer.vue'
import BaseDrawerContainer from './BaseDrawerContainer.vue'
import nextRender from '@/composables/useNextRender'
import getStyleProperty from '@/composables/useGetStyleProperty'

export default {
  components: {
    TitlePreview,
    BaseDrawer,
    BaseDrawerContainer
  },

  props: {
    selectedTitle: {
      type: Object,
      required: true
    }
  },

  setup () {
    const rootEl = ref(null)
    const isPreviewOpen = ref(false)

    const togglePreview = (isOpen) => {
      isPreviewOpen.value = isOpen
    }
    const handleClose = () => {
      togglePreview(false)
    }
    const handleUpdate = () => {
      const getDrawerEl = rootEl.value.$el.querySelector('#title-preview-drawer')
      const getTitlePreviewEl = rootEl.value.$el.querySelector('.title-preview')

      // Cheap mobile "scroll to top" trick. Hide content and show it again inmediatly.
      const tabletBreakpoint = getStyleProperty('--desktop')
      if (window.matchMedia('(max-width: ' + tabletBreakpoint + ')').matches) {
        getTitlePreviewEl.style.display = 'none'

        nextRender(() => {
          getTitlePreviewEl.style.display = ''
        })
      } else {
        getDrawerEl.scrollTo(0, 0)
      }
    }

    return {
      rootEl,
      isPreviewOpen,
      handleClose,
      togglePreview,
      handleUpdate
    }
  }

}
</script>

<style lang='scss' scoped>
.title-preview-layout {
  &__main {
    height: calc(100vh - var(--the-main-nav-height));
    overflow-y: scroll;
  }

  &__drawer {
    background-color: var(--background);
    height: calc(100vh - var(--the-main-nav-height));
    overflow-y: scroll;

    @include breakpoint('desktop') {
      padding: var(--space20);
    }
  }

  &__drawer-inner {
    @include breakpoint-max('tablet') {
      width: min(450px, 100vw);
    }
  }
}
</style>
