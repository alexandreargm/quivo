<template>
  <component
    :is="getIcon()"
    v-if="isLoaded"
    class="base-icon"
    :class="[size, color, getIsFluidClass()]"
  />
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import * as solidHeroicons from '@heroicons/vue/solid'
import * as outlineHeroicons from '@heroicons/vue/outline'

export default {
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'solid',
      validator: function (value) {
        return ['solid', 'outline'].includes(value)
      }
    },
    size: {
      type: String,
      default: '',
      validator: function (value) {
        return ['', 'xs', 'sm', 'md', 'lg', 'xl', 'xl2', 'xl3', 'xl4', 'xl5', 'xl6', 'h-full'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'inherit',
      validator: function (value) {
        return ['inherit', 'brand', 'danger', 'reverse', 'black', 'white'].includes(value)
      }
    },
    isFluid: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const isLoaded = ref(false)
    const solidIcons = ref(solidHeroicons)
    const outlineIcons = ref(outlineHeroicons)

    const getIcon = computed(() => {
      return props.type === 'solid'
        ? () => solidIcons.value[props.name]
        : () => outlineIcons.value[props.name]
    })
    const getIsFluidClass = () => {
      return props.isFluid ? 'is-fluid' : ''
    }

    onMounted(() => {
      isLoaded.value = true
    })

    return {
      getIsFluidClass,
      isLoaded,
      getIcon
    }
  }
}
</script>

<style lang='scss' scoped>
path,
svg {
  color: inherit !important;
}

.base-icon {
  --width: var(--size00);

  color: var(--color);
  height: auto;
  width: var(--width);
}

// IsFluid
.base-icon.is-fluid {
  max-height: 100%;
  max-width: 100%;
}

// Colors
.base-icon.inherit {
  --color: inherit;
}

.base-icon.brand {
  --color: var(--color-interactive);
}

.base-icon.danger {
  --color: var(--color-danger);
}

.base-icon.reverse {
  --color: var(--color-reverse);
}

.base-icon.white {
  --color: var(--text-neutral);
}

.base-icon.black {
  --color: var(--text-neutral-reverse);
}

// Sizes
.base-icon.xs {
  --width: var(--size-30);
}

.base-icon.sm {
  --width: var(--size-20);
}

.base-icon.md {
  --width: var(--size-10);
}

.base-icon.lg {
  --width: var(--size10);
}

.base-icon.xl {
  --width: var(--size20);
}

.base-icon.xl2 {
  --width: var(--size30);
}

.base-icon.xl3 {
  --width: var(--size40);
}

.base-icon.xl4 {
  --width: var(--size50);
}

</style>
