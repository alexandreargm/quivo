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
          <div class="title-preview-layout__drawer-inner">
            <base-title-preview
              :id="titleId"
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
import BaseDrawer from './BaseDrawer.vue'
import BaseTitlePreview from './BaseTitlePreview.vue'
import BaseDrawerContainer from './BaseDrawerContainer.vue'

export default {
  components: {
    BaseDrawer,
    BaseTitlePreview,
    BaseDrawerContainer
  },

  props: {
    titleId: {
      type: Number,
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

      getDrawerEl.scrollTo({ top: 0, behavior: 'auto' })
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
    overflow: auto;

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
