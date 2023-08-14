<template>
  <form
    class="base-advanced-search"
    :class="props.size"
    @submit.prevent
  >
    <div class="base-advanced-search__control">
      <label
        for="advanced-search"
        class="base-advanced-search__icon"
      >
        <BaseIcon name="search" />
      </label>

      <input
        id="advanced-search"
        class="base-advanced-search__input"
        type="text" 
        autocomplete="off"
        autocorrect="off"
        placeholder="Find something to watch"
        :value="props.modelValue"
        @input="emits('update:modelValue', $event.currentTarget.value), emits('change', $event)"
        @key-down.escape="emits('clear', $event)"
      >

      <button
        v-show="props.modelValue !== ''"
        type="button"
        class="base-advanced-search__clear-button"
        @click="emits('clear', $event)"
      >
        <base-icon
          name="close"
          size="xl"
        />
      </button>
    </div>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import BaseIcon from './BaseIcon.vue';

const emits = defineEmits(["update:modelValue", "change", "clear"])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
})
</script>

<style lang='scss'>
@layer base;

@layer base {
  .base-advanced-search {
    &__control {
      position: relative;
      display: grid;
      grid-template-columns: auto 1fr var(--size30);
      grid-template-rows: var(--size30);
      align-items: stretch;
      border-radius: var(--rounded20);
      background: var(--background-secondary);
      border: 1px solid var(--background-secondary);
      color: var(--text-secondary);
    }

    &__control:is(:hover, :focus-within) {
      color: var(--text);
      border-color: var(--color-secondary);
    }

    &__icon {
      padding-left: var(--space-10);
      pointer-events: none;
      display: grid;
      place-content: center;
      cursor: text;
    }

    &__input {
      all: unset;
      padding: 0 var(--space-10) 0 var(--space-20);
      cursor: text !important;
      color: var(--text);
    }

    &__clear-button {
      all: unset;
      display: grid;
      place-content: center;
      color: var(--text-secondary);
    }

    &__clear-button:hover {
      color: var(--text-secondary-hover);
    }

    &__clear-button:active {
      color: var(--text-active-secondary);
    }
  }
}
</style>