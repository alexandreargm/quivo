<template>
  <div class="home">
    <header class="home__header">
      <div class="hero-section">
        <p class="hero-section__logo block">
          Quivo
        </p>

        <div class="hero-section__search">
          <searchbar
            width="100%"
            max-width="600px"
            size="lg"
            theme="secondary"
            @click.stop="goToFinder()"
          />
        </div>
      </div>
    </header>

    <main class="home__main">
      <div class="home__feed">
        <popular-feed />
        <popular-feed />
        <popular-feed />
        <popular-feed />
        <popular-feed />
      </div>

      <div class="home__aside">
        <title-preview-drawer v-if="route.query.id" />
      </div>
    </main>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';
import PopularFeed from '../components/PopularFeed.vue'
import Searchbar from '../components/Searchbar.vue'
import { useRouter, useRoute } from 'vue-router'
const TitlePreviewDrawer = defineAsyncComponent(() => import('../components/TitlePreviewDrawer.vue'))

const router = useRouter()
const route = useRoute()

const goToFinder = () => {
  router.push({ name: 'finder' })
}
</script>

<style lang="scss" scoped>
.home {
  &__header {
    width: 100%;
  }

  &__main {
    position: relative;
    align-items: flex-start;

    @include breakpoint('desktop') {
      display: grid;
      grid-template-columns: minmax(0%, 100%) min-content;
    }
  }

  &__aside {
    position: sticky;
    top: 0;
    right: 0;
  }
}

.hero-section  {
  padding: var(--space20) var(--container-gap) var(--space20) var(--container-gap);

  &__logo {
    font-size: var(--font30);
    text-transform: uppercase;
    color: var(--color-interactive);
    font-weight: var(--extrabold);
  }

  &__search {
    width: 100%;
  }
}
</style>
