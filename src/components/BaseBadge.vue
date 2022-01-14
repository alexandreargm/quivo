<template>
  <span class="title-badge">
    <slot />
  </span>
</template>

<style lang='scss' scoped>
.title-badge {
  border: 1px solid var(--text-secondary);
  border-radius: var(--rounded00);
  color: var(--text-secondary);
  display: inline-flex;
  font-size: var(--font-10);
  height: var(--size00);
  line-height: var(--size00);
  padding: 0 var(--space-30);
}
</style>
