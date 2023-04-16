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
  scroll-snap-type: var(--scroll-snap-type);
  user-select: none;

  @include chrome-only() {
    &::-webkit-scrollbar {
      height: var(--space-10);
      width: var(--space-10);
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

  :slotted(> *) {
    background-color: var(--background-tertiary);
    scroll-snap-align: var(--scroll-snap-align);
    width: var(--width);
  }
}

.base-slider.horizontal {
  grid-auto-flow: column;
  overflow: auto hidden;
  padding: 0 0 var(--space00) 0;
  justify-content: flex-start;
}

.base-slider.vertical {
  grid-template-columns: repeat(auto-fit, minmax(var(--width), auto));
  overflow: hidden auto;

  :slotted(> *) {
    width: unset;
  }
}
</style>
