<template>
  <section class="title-related-titles">
    <div class="title-related-titles__title">
      <base-skeleton
        height="24px"
        width="35%"
        border-radius="4px"
      />
    </div>

    <div class="title-related-titles__gallery">
      <base-skeleton
        v-for="(_, index) in titles"
        :key="index"
        aspect-ratio="2/3"
        width="100%"
        height="100%"
      />
    </div>
  </section>
</template>

<script setup>
import BaseSkeleton from './BaseSkeleton.vue'

const titles = Array(6).fill()
</script>

<style lang='scss' scoped>
.title-related-titles {
  display: grid;
  gap: 24px;
  padding: var(--container-gap) 0;

  &__gallery {
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  }
}
</style>
