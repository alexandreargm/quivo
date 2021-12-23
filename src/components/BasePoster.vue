<template>
  <figure
    class="base-poster"
    :style="cssProps"
  >
    <div class="base-poster__image-wrapper">
      <img
        class="base-poster__image"
        :src="src"
        :alt="alt"
      >
    </div>

    <figcaption
      class="base-poster__caption"
      v-if="caption"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    },
    heightRatio: {
      type: Number,
      default: 3
    },
    widthRatio: {
      type: Number,
      default: 2
    }
  },

  setup (props) {
    return {
      cssProps: {
        '--height-ratio': props.heightRatio,
        '--width-ratio': props.widthRatio
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .base-poster {
    margin: 0;

    &__image-wrapper {
      position: relative;
      width: 150px;
    }

    &__image-wrapper::before {
      content: '';
      display: block;
      padding-top: calc((var(--height-ratio) / var(--width-ratio)) * 100%);
      width: 100%;
    }

    &__image-wrapper > * {
      bottom: 0;
      height: 100%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }
  }
</style>
