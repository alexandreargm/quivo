<template>
  <router-view />
</template>

<script setup>
import { useGenreStore } from "@/store/genre"

const genreStore = useGenreStore()

genreStore.handleSearchGenres()
</script>

<style lang="scss">
  // Import shared base scss.
  @import '@/assets/scss/main';
</style>
