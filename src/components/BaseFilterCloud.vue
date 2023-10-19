<template>
  <div class="base-filter-cloud">
    <span
      v-for="tag in props.tags"
      :key="tag.id"
      role="switch"
      :aria-checked="props.modelValue === tag.id"
      class="base-filter-cloud__switch"
      :class="{
        'is-included': props.modelValue === tag.id,
      }"
      @click="handleClickSwitch(tag.id)"
    >
      {{ tag.title }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emits = defineEmits([
  "update:modelValue",
  "change"
])

const props = defineProps({
  tags: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
})

function handleClickSwitch(tagId) {
  const newTagId = props.modelValue === tagId
    ? 0
    : tagId

  emits('update:modelValue', newTagId)
  emits('change', newTagId)
}
</script>

<style lang='scss'>
.base-filter-cloud {
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  gap: var(--space-30);

  &__switch {
    --_bg-color: transparent;
    --_color: var(--text-neutral);
    --_border-color: var(--border);

    align-items: center;
    background-color: var(--_bg-color);
    border-radius: var(--rounded30);
    color: var(--_color);
    cursor: pointer;
    display: flex;
    font-size: var(--font-10);
    font-weight: 300;
    height: var(--size20);
    justify-content: center;
    padding: 0 var(--space-10);
    text-decoration-color: var(--text-neutral);
    user-select: none;
    border: 1px solid var(--_border-color);
  }

  &__switch.is-included {
    --_bg-color: var(--icon-interactive);
    --_color: var(--white);
    --_border-color: transparent;
  }
}

</style>