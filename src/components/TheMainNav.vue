<template>
  <div class="the-main-nav">
    <router-link
      to="/"
      class="the-main-nav__brand"
    >
      QUIVO
    </router-link>

    <the-header-navigation class="the-main-nav__nav">
      <the-header-navigation-link
        name="Home"
        to="/"
      />

      <the-header-navigation-link
        name="Movies"
        to="/movies"
      />

      <the-header-navigation-link
        name="TV series"
        to="/tv-series"
      />

      <!-- <the-header-navigation-link
        name="Upcoming"
        to="/upcoming"
      />

      <the-header-navigation-link
        name="My lists"
        to="/my-lists"
      /> -->
    </the-header-navigation>

    <div class="the-main-nav__actions">
      <base-button size="sm">
        <template #icon>
          <base-icon name="LightningBoltIcon" />
        </template>

        Finder
      </base-button>
    </div>
  </div>
</template>

<script>
import TheHeaderNavigation from '@/components/TheHeaderNavigation.vue'
import TheHeaderNavigationLink from '@/components/TheHeaderNavigationLink.vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
export default {
  components: {
    TheHeaderNavigation,
    TheHeaderNavigationLink,
    BaseButton,
    BaseIcon
  },

  setup () {

  }
}
</script>

<style lang='scss' scoped>
  .the-main-nav {
    align-items: center;
    display: flex;
    height: var(--the-main-nav-height);
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

    &__actions {
      @include breakpoint-max('tablet') {
        margin-left: auto;
      }
    }

    &__nav {
      display: none;

      @include breakpoint('tablet') {
        display: initial;
      }
    }
  }
</style>
