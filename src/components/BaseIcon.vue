<template>
  <component
    v-if="isLoaded"
    :is="getIconType"
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
      default: 'BeakerIcon',
      required: true
    },
    type: {
      type: String,
      default: 'solid',
      validator: function (value) {
        return ['solid', 'outline'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: '',
      validator: function (value) {
        return ['xs', 'sm', 'md', 'lg', 'xl', 'xl2', 'xl3', 'xl4', 'xl5', 'xl6'].indexOf(value) !== -1
      }
    },
    color: {
      type: String,
      default: '',
      validator: function (value) {
        return ['accent', 'danger', 'success', 'warning', 'info'].indexOf(value) !== -1
      }
    }
  },
  setup (props) {
    const isLoaded = ref(false)
    const solidIcons = ref(solidHeroicons)
    const outlineIcons = ref(outlineHeroicons)

    const getIconType = computed(() => {
      return props.type === 'solid' ? solidIcons.value[props.name] : outlineIcons.value[props.name]
    })

    onMounted(() => {
      isLoaded.value = true
    })

    return {
      isLoaded,
      getIconType
    }
  }
}
</script>

<style lang='scss' scoped>
.base-icon {
  color: var(--color, var(--brand));
  height: auto;
  width: var(--width, 20px);
}

// Colors

.base-icon.accent {
  --color: var(--accent);
}

.base-icon.danger {
  --color: var(--danger);
}

.base-icon.success {
  --color: var(--success);
}

.base-icon.warning {
  --color: var(--warning);
}

.base-icon.info {
  --color: var(--info);
}

// Sizes

.base-icon.xs {
  --width: 12px;
}

.base-icon.sm {
  --width: 14px;
}

.base-icon.md {
  --width: 16px;
}

.base-icon.lg {
  --width: 24px;
}

.base-icon.xl {
  --width: 28px;
}

.base-icon.xl2 {
  --width: 32px;
}

.base-icon.xl3 {
  --width: 40px;
}

.base-icon.xl4 {
  --width: 48px;
}

.base-icon.xl5 {
  --width: 54px;
}

.base-icon.xl6 {
  --width: 64px;
}

</style>
