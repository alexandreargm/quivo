<template>
  <div class="home">
    <header class="home__header">
      <the-main-nav />
    </header>

    <title-preview-layout
      :title-id="selectedTitle"
      v-slot="{ togglePreview }"
    >
      <main>
        <popular-feed @click="handleSelect($event, togglePreview)" />

        <popular-feed @click="handleSelect($event, togglePreview)" />

        <popular-feed @click="handleSelect($event, togglePreview)" />

        <popular-feed @click="handleSelect($event, togglePreview)" />
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
    const selectedTitle = ref(0)

    const handleSelect = (id, toggleDrawer) => {
      selectedTitle.value = id
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
