<template>
  <figure
    class="title-poster"
    :style="{ '--height-ratio': props.heightRatio, '--width-ratio': props.widthRatio }"
    :class="{ [`use-container-${props.adjustTo}`]: true, [props.theme]: true }"
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
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
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
    },
    theme: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'tertiary'].includes(value)
      }
    },
})

</script>

<style lang='scss' scoped>
@layer base, theme;

@layer base {
  .title-poster {
    height: 100%;
    margin: 0;
    width: 100%;
    background-color: var(--_background-color);
    position: relative;
  
    &__image-wrapper {
      aspect-ratio: var(--width-ratio) / var(--height-ratio);
      height: 100%;
      position: relative;
      width: 100%;
      z-index: 1;
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
  
    &__caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      margin: var(--space-10);
      line-height: var(--line00);
      max-height: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 8;
      overflow: hidden;
      z-index: 0;
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
}

@layer theme {
  .title-poster.primary {
    --_background-color: var(--background);
  }
  .title-poster.secondary {
    --_background-color: var(--background-secondary);
  }
  .title-poster.tertiary {
    --_background-color: var(--background-tertiary);
  }
}
</style>
