<template>
  <div class="base-input">
    <div
      v-if="$slots.before"
      class="base-input__before"
    >
      <slot name="before" />
    </div>

    <input
      class="base-input__input"
      v-bind="$attrs"
      v-model="computedValue"
      :type="type"
      :autocomplete="autocomplete"
      :autocorrect="autocorrect"
    >

    <slot name="after" />
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  autocorrect: {
    type: String,
    default: 'off'
  },
  width: {
    type: String,
    default: 'fit-content'
  }
})
</script>

<style lang='scss' scoped>
.base-input {
  align-items: center;
  background-color: var(--background-tertiary);
  border-radius: var(--rounded00);
  display: flex;
  font-size: var(--font00);
  overflow: hidden;
  width: v-bind(width);

  &:focus-within {
    outline: 2px solid var(--border-reverse);
  }

  &__input {
    background: none;
    border: 0;
    cursor: text;
    font-size: inherit;
    height: 100%;
    height: var(--size30);
    outline: 0;
    padding: 0 var(--space-10);
    width: 100%;
  }
}
</style>
