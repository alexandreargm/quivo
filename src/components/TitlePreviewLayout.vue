<template>
  <base-drawer-container class="title-preview-layout">
    <slot :togglePreview="togglePreview" />

    <transition>
      <aside
        v-if="isPreviewOpen"
        class="title-preview-layout__drawer"
      >
        <base-drawer size="full">
          <base-title-preview
            :id="titleId"
            @close="handleClose"
          />
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

  setup (props, { emit }) {
    const isPreviewOpen = ref(false)

    const togglePreview = (isOpen) => {
      isPreviewOpen.value = isOpen
    }

    const handleClose = () => {
      togglePreview(false)
    }

    return {
      isPreviewOpen,
      handleClose,
      togglePreview
    }
  }

}
</script>

<style lang='scss' scoped>
.title-preview-layout {
  &__drawer {
    background-color: var(--background);
    overflow: auto;

    @include breakpoint('desktop') {
      padding: var(--space20);
    }
  }
}
</style>
