<template>
  <div class="finder-layout">
    <header class="finder-layout__header">
      <BaseTitle level="1">
        Finder
      </BaseTitle>

      <BaseButton
        icon="only"
        variant="tertiary"
        @click="router.push({ name: 'home' })"
      >
        <template #icon>
          <BaseIcon
            name="XIcon"
            size="xl"
          />
        </template>
      </BaseButton>
    </header>

    <div class="finder-layout__page">
      <div
        class="finder-layout__main"
        ref="mainEl"
      >
        <slot />
      </div>

      <div class="finder-layout__preview">
        <slot name="preview" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, defineExpose } from 'vue-router'
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseIcon from '../components/BaseIcon.vue'
import BaseTitle from '../components/BaseTitle.vue'

const router = useRouter()

const mainEl = ref()

defineExpose({
  mainEl
})
</script>

<style lang="scss" scoped>
.finder-layout {
  display: grid;
  grid-template-rows: auto minmax(0, 100%);
  height: 100vh;

  &__header {
    height: var(--the-main-nav-height);
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-20);
    padding: 0 var(--container-gap);
    background-color: var(--background-secondary);
    justify-content: space-between;

    @include breakpoint('tablet') {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }

  &__page {
    height: 100%;
    position: relative;

    @include breakpoint('desktop') {
      display: grid;
      grid-template-columns: minmax(0%, 100%) min-content;
    }
  }

  &__main {
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
