<template>
  <div
    class="base-slider"
    :class="[directionClass]"
    :style="[cssProps, cssGapProps]"
  >
    <div
      class="base-slider__inner"
      :class="$attrs['class']"
    >
      <slot />
    </div>
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
      default: '8px'
    },
    gaps: {
      type: Object,
      default: null
    }
  },

  setup (props) {
    const directionClasses = {
      x: 'horizontal',
      y: 'vertical'
    }

    const getGapProps = () => {
      return Object.fromEntries(Object.entries(props.gaps).map(([key, value]) => [`--${key}-gap`, value]))
    }

    onMounted(() => {
      scrollSnapPolyfill()
    })

    return {
      directionClass: directionClasses[props.direction],
      cssProps: {
        '--scroll-snap-type': `${props.direction} ${props.type}`,
        // '--gap': props.gap,
        '--scroll-snap-align': props.align
      },
      cssGapProps: getGapProps()
    }
  }
}
</script>

<style lang='scss' scoped>
.base-slider {
  &__inner {
    display: flex;
    padding-bottom: var(--space00);
    scroll-snap-type: var(--scroll-snap-type, none);
    user-select: none;
  }

  :slotted(.base-slider__inner > *) {
    background-color: var(--background-tertiary);
    scroll-snap-align: var(--scroll-snap-align);
  }

  &__inner::-webkit-scrollbar {
    height: var(--space-30);
    width: var(--space-30);

    @include breakpoint('tablet') {
      height: var(--space-30);
      width: var(--space-30);
    }
  }

  &__inner::-webkit-scrollbar-thumb {
    background: var(--color-reverse-secondary);
    border-radius: var(--rounded100);
  }

  &__inner::-webkit-scrollbar-track {
    background: var(--border-tertiary);
    border-radius: var(--rounded100);
  }
}

.base-slider:hover {
  @include breakpoint('tablet') {
    .base-slider__inner {
      padding-bottom: var(--space-30);
    }

    .base-slider__inner::-webkit-scrollbar {
      display: initial;
      height: var(--space00);
      width: var(--space00);
    }
  }
}

.base-slider.horizontal {
  @include breakpoint('mobile') {
    --gap: var(var(--mobile-gap));
  }

  @include breakpoint('tablet') {
    --gap: var(--tablet-gap);
  }

  @include breakpoint('laptop') {
    --gap: var(var(--tablet-gap));
  }

  .base-slider__inner {
    flex-direction: row;
    overflow-x: auto;
  }

  :slotted(.base-slider__inner > *) {
    flex-shrink: 0;
  }

  :slotted(.base-slider__inner > * + *) {
    margin-left: var(--gap, 8px);
  }
}

.base-slider.vertical {
  .base-slider__inner {
    flex-direction: column;
    overflow-y: auto;
  }

  :slotted(.base-slider__inner > * + *) {
    margin-top: var(--gap, 8px);
  }
}
</style>
