<template>
  <button
    type="button"
    class="base-advanced-search-tag"
  >
    <slot />
  </button>
</template>

<script setup>
 
</script>

<style lang='scss'>
 .base-advanced-search-tag {
    --_bg-color: transparent;
    --_color: var(--text-neutral);
    --_border-color: var(--border);

    align-items: center;
    background-color: var(--_bg-color);
    border-radius: 12px;
    border-radius: var(--rounded30);
    color: var(--_color);
    cursor: pointer;
    display: flex;
    font-size: 14px;
    font-size: var(--font-10);
    font-weight: 300;
    height: 32px;
    height: var(--size20);
    justify-content: center;
    padding: 0 12px;
    padding: 0 var(--space-10);
    -webkit-text-decoration-color: #ffffff;
    text-decoration-color: #ffffff;
    -webkit-text-decoration-color: var(--text-neutral);
    text-decoration-color: var(--text-neutral);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid var(--_border-color);
 }
</style>