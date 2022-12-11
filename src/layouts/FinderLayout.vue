<template>
  <div class="finder-layout">
    <header class="finder-layout__header">
      <div class="finder-layout__header-inner">
        <div class="finder-layout__header-main">
          <h1 class="finder-layout__title">
            Finder
          </h1>

          <BaseButton
            icon="only"
            variant="tertiary"
            size="sm"
            @click="router.push({ name: 'home' })"
          >
            <template #icon>
              <BaseIcon
                name="XIcon"
                size="lg"
              />
            </template>
          </BaseButton>
        </div>

        <div
          v-if="$slots.headerAfter"
          class="finder-layout__after"
        >
          <slot name="headerAfter" />
        </div>
      </div>
    </header>

    <div class="finder-layout__page">
      <div
        ref="mainEl"
        class="finder-layout__main"
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
import { useRouter } from 'vue-router'
import { ref, defineExpose } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseIcon from '../components/BaseIcon.vue'

const router = useRouter()

const mainEl = ref()

defineExpose({
  mainEl
})
</script>

<style lang="scss" scoped>
.finder-layout {
  --_header-height: 50px;

  display: grid;
  grid-template-rows: auto minmax(0, 100%);
  height: 100vh;

  &__header {
    padding: 0 var(--container-gap);
    background-color: var(--background-secondary);
  }

  &__header-main {
    height: var(--_header-height);
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-20);
    justify-content: space-between;
    // @include container('desktop');

    @include breakpoint('tablet') {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }

  &__title {
    font-size: var(--font30);
    font-weight: var(--medium);
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
