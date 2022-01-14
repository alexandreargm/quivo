<template>
  <div class="home">
    <header class="home__header">
      <the-main-nav />
    </header>

    <div class="home__preview-container">
      <main>
        <popular-feed class="home__body" />
      </main>

      <aside class="home__preview">
        <div class="home__preview-inner">
          <div class="home__preview-close">
            <base-close />
          </div>
          <base-title-preview :id="12" />
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import TheMainNav from '../components/TheMainNav.vue'
import PopularFeed from '../components/PopularFeed.vue'
// import TitlePreviewDrawer from '../components/TitlePreviewDrawer.vue'
import BaseTitlePreview from '../components/BaseTitlePreview.vue'
import BaseClose from '../components/BaseClose.vue'
// import BaseDrawerContainer from '../components/BaseDrawerContainer.vue'

export default {
  name: 'Home',
  components: {
    TheMainNav,
    PopularFeed,
    BaseTitlePreview,
    BaseClose
    // TitlePreviewDrawer,
    // BaseDrawerContainer
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
  @include breakpoint-max('desktop') {
    &__preview::before {
      background-color: var(--background);
      content: ' ';
      height: 100%;
      opacity: 0.5;
      position: fixed;
      width: 100%;
    }
  }

  &__preview-container {
    position: relative;

    @include breakpoint('desktop') {
      display: grid;
      grid-template-columns: minmax(0%, 100%)  auto;
      padding: var(--spacing20);
    }
  }

  &__preview {
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    left: 0;
    right: 0;
    top: 0;

    @include breakpoint-max('desktop') {
      position: fixed;
    }
  }

  &__preview-inner {
    background-color: var(--background);
    overflow: auto;
    position: relative;

    @include breakpoint-max('tablet') {
      max-width: 400px;
    }

    @include breakpoint('desktop') {
      padding: var(--space20);
    }
  }

  &__preview-close {
    opacity: 0.75;
    position: absolute;
    right: var(--space00);
    top: var(--space00);
    z-index: var(--z-fixed);
  }
}
</style>
