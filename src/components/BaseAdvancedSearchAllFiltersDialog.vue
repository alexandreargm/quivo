<template>
  <main class="base-advanced-search-all-filters">
    <base-title
      level="1"
      class="visually-hidden"
    >
      All filters
    </base-title>

    <section class="block">
      <base-title level="2">
        Genre
      </base-title>
    </section>

    
    <section class="block">
      <base-title level="2">
        Release date
      </base-title>
    </section>

    <section class="block">
      <base-title level="2">
        Tags
      </base-title>
    </section>
  </main>
</template>

<script setup>
import BaseTitle from './BaseTitle.vue';
 
</script>

<style lang='scss'>
 .base-advanced-search-all-filters {
  background: var(--background-secondary);
  padding: var(--space20) var(--container-gap);
 }
</style>