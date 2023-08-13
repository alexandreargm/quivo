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
        <BaseIcon
          name="search"
          size="lg"
        />
      </label>

      <input
        id="advanced-search"
        class="base-advanced-search__input"
        type="text" 
        autocomplete="off"
        autocorrect="off"
        placeholder="Find something to watch"
        :value="props.modelValue"
        @input="emits('update:modelValue', $event.currentTarget.value)"
      >
    </div>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import BaseIcon from './BaseIcon.vue';

const emits = defineEmits(["update:modelValue"])

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
      grid-template-columns: auto 1fr;
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
  }
}
</style>