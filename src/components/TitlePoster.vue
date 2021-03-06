<template>
  <figure
    class="title-poster"
    :style="cssProps"
    :class="adjustToClass"
  >
    <div class="title-poster__image-wrapper">
      <img
        v-if="src"
        class="title-poster__image"
        :src="src"
        :alt="alt"
      >
    </div>

    <figcaption
      class="title-poster__caption"
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
    },
    adjustTo: {
      type: String,
      default: 'width',
      validate: function (value) {
        return ['width', 'height'].includes(value)
      }
    }
  },

  setup (props) {
    const adjustToClasses = {
      width: 'use-container-width',
      height: 'use-container-height'
    }

    return {
      cssProps: {
        '--height-ratio': props.heightRatio,
        '--width-ratio': props.widthRatio
      },
      adjustToClass: adjustToClasses[props.adjustTo]
    }
  }
}
</script>

<style lang='scss' scoped>
.title-poster {
  height: 100%;
  margin: 0;
  width: 100%;

  &__image-wrapper {
    aspect-ratio: var(--width-ratio) / var(--height-ratio);
    height: 100%;
    position: relative;
    width: 100%;
  }

  &__image {
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }
}

.title-poster.use-container-width {
  height: auto;
  width: 100%;

  img {
    width: 100%;
  }
}

.title-poster.use-container-height {
  height: 100%;
  width: auto;

  img {
    max-height: 100%;
    width: auto;
  }
}
</style>
