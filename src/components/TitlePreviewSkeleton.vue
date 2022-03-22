<template>
  <article class="title-preview">
    <header class="title-preview__header">
      <base-skeleton
        height="100%"
        width="100%"
      />
    </header>

    <main class="title-preview__body">
      <div class="title-preview__title">
        <base-skeleton
          width="120px"
          height="28px"
          border-radius="8px"
        />

        <base-skeleton
          width="180px"
          height="20px"
          border-radius="4px"
        />
      </div>

      <base-skeleton
        width="120px"
        height="32px"
        border-radius="8px"
      />

      <div class="title-preview__cloud">
        <base-skeleton
          v-for="(width, index) in tags"
          :key="index"
          :width="width"
          height="24px"
          border-radius="16px"
        />
      </div>

      <base-skeleton-text
        :lines="4"
        font-size="14px"
        line-height="1.4"
      />
    </main>
  </article>
</template>

<script setup>
import BaseSkeleton from './BaseSkeleton.vue'
import BaseSkeletonText from './BaseSkeletonText'

const tags = ['84px', '60px', '56px', '104px', '74px', '39px']
</script>

<style lang='scss' scoped>
.title-preview {
  @include breakpoint('tablet') {
    display: grid;
    grid-template-columns: 300px 300px;
  }

  @include breakpoint('desktop2') {
    grid-template-columns: 350px 375px;
  }

  @include breakpoint('desktop3') {
    grid-template-columns: 400px 375px;
  }

  &__header {
    height: 250px;
    width: 100%;

    @include breakpoint('tablet') {
      height: 450px;
    }
  }

  &__body {
    padding: var(--container-gap);
  }

  &__body > * + * {
    margin-top: var(--space20);
  }

  &__title {
    display: grid;
    gap: var(--space-20);
  }

  &__cloud {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-20);
  }
}
</style>
