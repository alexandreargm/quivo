<template>
  <div class="title-image-modal">
    <base-modal>
      <div
        class="title-image-modal__inner"
        @click.prevent.self="handleClose"
      >
        <div class="title-image-modal__poster-wrapper">
          <img
            class="title-image-modal__poster"
            :src="'http://image.tmdb.org/t/p/original/' + posterPath"
          >
        </div>

        <div class="title-image-modal__close">
          <base-button
            @click="handleClose"
            color="reverse"
          >
            <template #icon>
              <base-icon name="XIcon" />
            </template>

            Close
          </base-button>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script>
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

export default {
  emits: ['close'],

  components: {
    BaseModal,
    BaseButton,
    BaseIcon
  },

  props: {
    posterPath: {
      type: String,
      required: true
    }
  },

  setup (_, { emit }) {
    const handleClose = () => {
      emit('close')
    }

    return {
      handleClose
    }
  }
}
</script>

<style lang='scss' scoped>
  .title-image-modal {
    --close-height: 64px;

    &__inner {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
    }

    &__poster-wrapper {
      aspect-ratio: 2/3;
      display: flex;
      justify-content: center;
      max-height: calc(100vh - var(--close-height));
    }

    &__close {
      align-items: center;
      display: flex;
      height: var(--close-height);
      justify-content: center;
    }
  }
</style>
