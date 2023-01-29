<template>
  <div class="title-image-modal">
    <base-modal
      has-background
      @click.capture="handleClose"
    >
      <div class="title-image-modal__inner">
        <div class="title-image-modal__poster-wrapper">
          <img
            class="title-image-modal__poster"
            :src="'http://image.tmdb.org/t/p/original/' + posterPath"
          >
        </div>

        <div class="title-image-modal__close">
          <base-button variant="tertiary">
            <template #icon>
              <base-icon
                name="XIcon"
                size="lg"
              />
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
  emits: ['close'],

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
      cursor: pointer;
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100dvh;
      width: 100vw;
    }

    &__poster-wrapper {
      aspect-ratio: 2/3;
      display: flex;
      justify-content: center;
      max-height: calc(100dvh - var(--close-height));
    }

    &__close {
      align-items: center;
      display: flex;
      height: var(--close-height);
      justify-content: center;
    }
  }
</style>
