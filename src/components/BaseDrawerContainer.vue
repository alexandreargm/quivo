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
  display: grid;
  grid-template-columns: calc(100% - 500px) 500px;
  position: relative;
}
</style>
