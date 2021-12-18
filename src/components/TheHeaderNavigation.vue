<template>
  <nav class="the-header-navigation">
    <ul class="the-header-navigation__list">
      <slot />
    </ul>
  </nav>
</template>

<script>
export default {
  setup () {

  }
}
</script>

<style lang='scss' scoped>
.the-header-navigation {
  &,
  &__list {
    list-style: none;
  }

  &__list {
    align-items: center;
    display: flex;
    padding: 0;
  }

  &__list :slotted(* + *) {
    margin-left: var(--space20);
  }
}
</style>
