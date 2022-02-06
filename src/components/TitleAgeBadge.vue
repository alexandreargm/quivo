<template>
  <base-badge class="title-age-badge">
    <span class="title-age-badge__age">
      {{ age ? age : '?' }}
    </span>

    <span class="title-age-badge__symbol">
      +
    </span>
  </base-badge>
</template>

<script>
import { computed } from 'vue'
import BaseBadge from './BaseBadge.vue'

export default {
  components: { BaseBadge },

  props: {
    releaseDates: {
      type: Array,
      required: true
    }
  },

  setup (props) {
    const getAgeCertification = () => {
      if (props.releaseDates.length > 0) {
        const getReleaseDates = props.releaseDates.find(iso => iso.iso_3166_1 === 'DE')

        if (getReleaseDates) {
          return getReleaseDates.release_dates[0].certification
        }
      }
    }

    return {
      age: computed(() => getAgeCertification())
    }
  }
}
</script>

<style lang="scss">
.title-age-badge {
  &__symbol {
    display: inline-flex;
  }
}
</style>
