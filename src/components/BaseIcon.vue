<template>
  <component
    v-if="isLoaded"
    :is="getIcon"
    class="base-icon"
    :class="[size, color]"
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
      default: 'base',
      validator: function (value) {
        return ['base', 'xs', 'sm', 'md', 'lg', 'xl', 'xl2', 'xl3', 'xl4', 'xl5', 'xl6', 'h-full'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'inherit',
      validator: function (value) {
        return ['inherit', 'brand', 'warning', 'black', 'white'].includes(value)
      }
    }
  },
  setup (props) {
    const isLoaded = ref(false)
    const solidIcons = ref(solidHeroicons)
    const outlineIcons = ref(outlineHeroicons)

    const getIcon = computed(() => {
      return props.type === 'solid' ? solidIcons.value[props.name] : outlineIcons.value[props.name]
    })

    onMounted(() => {
      isLoaded.value = true
    })

    return {
      isLoaded,
      getIcon
    }
  }
}
</script>

<style lang='scss' scoped>
.base-icon {
  color: var(--color);
  height: auto;
  width: var(--width);
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

// Sizes

.base-icon.base {
  --width: var(--size00);
}

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
