<template>
  <div class="home">
    <header class="home__header">
      <the-main-nav />
    </header>

    <title-preview-layout
      :selected-title="selectedTitle"
      v-slot="{ togglePreview }"
    >
      <main>
        <popular-feed @select="handleSelect($event, togglePreview)" />

        <popular-feed @select="handleSelect($event, togglePreview)" />

        <popular-feed @select="handleSelect($event, togglePreview)" />

        <popular-feed @select="handleSelect($event, togglePreview)" />

        <popular-feed @select="handleSelect($event, togglePreview)" />

        <popular-feed @select="handleSelect($event, togglePreview)" />
      </main>
    </title-preview-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import TheMainNav from '../components/TheMainNav.vue'
import PopularFeed from '../components/PopularFeed.vue'
import TitlePreviewLayout from '../components/TitlePreviewLayout.vue'

export default {
  name: 'Home',
  components: {
    TheMainNav,
    PopularFeed,
    TitlePreviewLayout
  },

  setup () {
    const selectedTitle = ref({ id: 0, mediaType: '' })

    const handleSelect = (title, toggleDrawer) => {
      selectedTitle.value = title

      toggleDrawer(true)
    }

    return {
      handleSelect,
      selectedTitle
    }
  },

  created () {
    this.$http('configuration')
    this.$http('/watch/providers/movie?language=es')

    // this.$http('/certification/movie/list')
    // this.$http('/genre/movie/list')
  }
}
</script>

<style lang="scss" scoped>
.home {
  //
}
</style>
