<template>
  <div class="the-main-nav">
    <router-link to="/" class="the-main-nav__brand">
      QUIVO
    </router-link>

    <nav class="the-main-nav__nav">
      <ul class="the-main-nav__list">
        <li class="the-main-nav__item">
          <router-link to="/" >
            Movies
          </router-link>
        </li>

        <li class="the-main-nav__item">
          <router-link to="/" >
            TV series
          </router-link>
        </li>

        <li class="the-main-nav__item">
          <router-link to="/" >
            Upcoming
          </router-link>
        </li>

        <li class="the-main-nav__item">
          <router-link to="/" >
            New releases
          </router-link>
        </li>

        <li class="the-main-nav__item">
          <router-link to="/" >
            Watch finder
          </router-link>
        </li>

        <li class="the-main-nav__item">
          <router-link to="/" >
            My lists
          </router-link>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
</script>

<style lang='scss' scoped>
  .the-main-nav {
    align-items: center;
    display: flex;
    height: 75px;
    padding: 0 var(--spacing-3xl);
    width: 100%;

    &__brand {
      color: var(--brand);
      font-size: var(--font-3xl);
      font-weight: var(--weight-extrabold);
    }

    &__list,
    &__item {
      list-style: none;
    }

    &__list {
      display: flex;
    }

    &__list > * + * {
      margin-left: var(--spacing-lg);
    }
  }
</style>
