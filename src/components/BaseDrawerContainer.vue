<template>
  <div class="base-drawer-container">
    <slot />
  </div>
</template>

<script>
export default {
  setup () {

  }
}
</script>

<style lang='scss' scoped>
.base-drawer-container {
  position: relative;

  @include breakpoint('desktop') {
    display: grid;
    grid-template-columns: minmax(0%, 100%) min-content;
  }
}
</style>
