<template>
  <finder-layout>
    <router-view name="search" />

    <router-view />

    <template #preview>
      <router-view name="preview" />
    </template>
  </finder-layout>
</template>
<script setup>
import FinderLayout from '../layouts/FinderLayout'
</script>

<style lang="scss" scoped>
//
</style>
