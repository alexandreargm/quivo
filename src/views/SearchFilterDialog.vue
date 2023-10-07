<template>
  <div class="search-filter-dialog">
    <header class="search-filter-dialog__header">
      <div class="search-filter-dialog__title">
        <slot name="title" />
      </div>

      <div
        v-if="$slots.headerActions"
        class="search-filter-dialog__header-actions"
      >
        <slot name="headerActions" />
      </div>
    </header>

    <main class="search-filter-dialog__body">
      <slot />
    </main>

    <footer class="search-filter-dialog__footer">
      <div class="search-filter-dialog__actions">
        <slot name="actions" />
      </div>
    </footer>
  </div>
</template>

<style lang='scss'>
 .search-filter-dialog {
  background: var(--background-secondary);
  padding: var(--space20) var(--container-gap) var(--space30);
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    gap: var(--space00);
    padding-right: var(--space40);
    margin-bottom: var(--space20);
    position: relative;
  }

  &__footer {
    padding-top: var(--space20);
    margin-top: auto;
    position: sticky;
    bottom: var(--space-10)
  }

  &__actions {
    display: flex;
    gap: var(--space-10);
  }

  &__header-actions {
    display: flex;
    gap: var(--space-10);
    margin-left: auto;
  }

  &__close-button-container {
    margin-left: auto;
    position: absolute;
    height: 40px;
    width: 40px;
    display: grid;
    place-content: center;
    right: 0;
    align-self: center;
  }

  &__close-button {
    position: fixed;
  }
 }
</style>