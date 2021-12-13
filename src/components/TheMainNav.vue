<template>
  <div class="the-main-nav">
    <router-link
      to="/"
      class="the-main-nav__brand"
    >
      QUIVO
    </router-link>

    <the-header-navigation>
      <the-header-navigation-link
        name="Movies"
        to="/"
      />

      <the-header-navigation-link
        name="TV series"
        to="/tv-series"
      />

      <the-header-navigation-link
        name="Upcoming"
        to="/upcoming"
      />

      <the-header-navigation-link
        name="New releases"
        to="/new-releases"
      />

      <the-header-navigation-link
        name="Watch finder"
        to="/watch-finder"
      />

      <the-header-navigation-link
        name="My lists"
        to="/my-lists"
      />
    </the-header-navigation>
  </div>
</template>

<script>
import TheHeaderNavigation from '@/components/TheHeaderNavigation.vue'
import TheHeaderNavigationLink from '@/components/TheHeaderNavigationLink.vue'
export default {
  components: {
    TheHeaderNavigation,
    TheHeaderNavigationLink
  },

  setup () {

  }
}
</script>

<style lang='scss' scoped>
  .the-main-nav {
    align-items: center;
    display: flex;
    height: 75px;
    padding: 0 var(--space30);
    width: 100%;

    &__brand {
      color: var(--color-interactive);
      font-size: var(--font40);
      font-weight: var(--extrabold, 800);
    }

    > * + * {
      margin-left: var(--space40);
    }
  }
</style>
