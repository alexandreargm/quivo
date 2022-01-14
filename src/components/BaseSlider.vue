<template>
  <div
    class="base-slider"
    :class="[directionClass]"
    :style="cssProps"
  >
    <slot />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import scrollSnapPolyfill from 'css-scroll-snap-polyfill'

export default {
  name: 'BaseSlider',
  props: {
    direction: {
      type: String,
      default: 'x',
      validator: function (value) {
        return ['x', 'y'].includes(value)
      }
    },
    type: {
      type: String,
      default: 'none',
      validator: function (value) {
        return ['mandatory', 'proximity', 'none'].includes(value)
      }
    },
    align: {
      type: String,
      default: 'start',
      validator: function (value) {
        return ['start', 'end', 'center'].includes(value)
      }
    },
    gap: {
      type: String,
      default: '4px'
    },
    width: {
      type: String,
      default: '150px'
    }
  },

  setup (props) {
    const directionClasses = {
      x: 'horizontal',
      y: 'vertical'
    }

    onMounted(() => {
      scrollSnapPolyfill()
    })

    return {
      directionClass: directionClasses[props.direction],
      cssProps: {
        '--scroll-snap-type': `${props.direction} ${props.type}`,
        '--gap': props.gap,
        '--width': props.width,
        '--scroll-snap-align': props.align
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.base-slider {
  display: grid;
  gap: var(--gap);
  padding: calc(var(--container-gap) / 2) var(--container-gap) var(--space00);
  scroll-snap-type: var(--scroll-snap-type);
  user-select: none;

  @include chrome-only() {
    &::-webkit-scrollbar {
      height: var(--space-30);
      width: var(--space-30);

      @include breakpoint('desktop') {
        height: var(--space-30);
        width: var(--space-30);
      }
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-reverse-secondary);
      border-radius: var(--rounded100);
    }

    &::-webkit-scrollbar-track {
      background: var(--border-tertiary);
      border-radius: var(--rounded100);
    }
  }

  &:hover {
    @include breakpoint('desktop') {
      @include chrome-only() {
        padding-bottom: var(--space-30);

        &::-webkit-scrollbar {
          display: initial;
          height: var(--space00);
          width: var(--space00);
        }
      }
    }
  }

  :slotted(> *) {
    background-color: var(--background-tertiary);
    scroll-snap-align: var(--scroll-snap-align);
    width: var(--width);
  }
}

.base-slider.horizontal {
  grid-auto-flow: column;
  overflow: auto hidden;
}

.base-slider.vertical {
  grid-auto-flow: row;
  overflow: hidden auto;
}
</style>
