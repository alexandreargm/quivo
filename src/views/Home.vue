<template>
  <div class="home">
    <header class="home__header">
      <div class="hero-section">
        <p class="hero-section__logo">
          Quivo
        </p>

        <div class="hero-section__search">
          <searchbar
            width="100%"
            max-width="600px"
            theme="tertiary"
            @click="goToFinder()"
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
        <router-view name="preview" />
      </div>
    </main>
  </div>
</template>
<script setup>
import PopularFeed from '../components/PopularFeed.vue'
import Searchbar from '../components/Searchbar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

    @include breakpoint('desktop') {
      display: grid;
      grid-template-columns: minmax(0%, 100%) min-content;
    }
  }

  &__aside {
    height: fit-content;
    position: sticky;
    top: 0;
    right: 0;
  }
}

.hero-section  {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space20) var(--container-gap) var(--space20) var(--container-gap);
  gap: var(--space00);

  &__logo {
    margin: 0;
    font-size: var(--font50);
    text-transform: uppercase;
    color: var(--color-interactive);
    font-weight: var(--extrabold);
  }

  &__search {
    width: 100%;
  }
}
</style>
