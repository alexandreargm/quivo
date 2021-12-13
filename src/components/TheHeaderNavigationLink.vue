<template>
  <li class="the-header-navigation-link">
    <router-link
      :to="to"
      class="the-header-navigation-link__link"
      :class="{ active: isActive }"
    >
      {{ name }}
    </router-link>
  </li>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },

  setup (props) {
    const route = useRoute()

    return {
      isActive: computed(() => route.path === props.to)
    }
  }
}
</script>

<style lang='scss' scoped>
.the-header-navigation-link {
  &__link {
    color: var(--text-secondary);
    font-weight: var(--semibold);
  }

  .active {
    color: var(--text);
  }
}
</style>
