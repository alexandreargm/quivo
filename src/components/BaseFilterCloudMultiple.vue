<template>
  <div class="base-filter-cloud">
    <span
      v-for="tag in props.tags"
      :key="tag.id"
      role="switch"
      :aria-checked="includedValuesMap.has(tag.id) || excludedValuesMap.has(tag.id)"
      class="base-filter-cloud__switch"
      :class="{
        'is-included': includedValuesMap.has(tag.id),
        'is-excluded': excludedValuesMap.has(tag.id)
      }"
      @click="props.hasExcludedValues 
        ? handleClickSwitchWithExcludes(tag.id) 
        : handleClickSwitch(tag.id)"
    >
      {{ tag.title }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const emits = defineEmits([
  "update:includedValues",
  "update:excludedValues",
])

const props = defineProps({
  tags: {
    type: Array,
    required: true
  },
  includedValues: {
    type: Array,
    required: true
  },
  excludedValues: {
    type: Array,
    default: () => []
  },
  hasExcludedValues: {
    type: Boolean,
    default: false,
  },
})

const includedValuesMap = computed(() => new Set(props.includedValues))
const excludedValuesMap = computed(() => new Set(props.excludedValues))

function handleClickSwitch(tagId) {
  includedValuesMap.value.has(tagId)
    ? cleartag(tagId)
    : includetag(tagId)
}

function handleClickSwitchWithExcludes(tagId) {
  if (includedValuesMap.value.has(tagId)) {
    excludetag(tagId)
    return
  }

  if (excludedValuesMap.value.has(tagId)) {
    cleartag(tagId)
    return
  }

  includetag(tagId)
}

function excludetag(tagId) {
  includedValuesMap.value.delete(tagId)
  excludedValuesMap.value.add(tagId)

  emitNewValues()
}

function includetag(tagId) {
  includedValuesMap.value.add(tagId)

  emitNewValues()
}

function cleartag(tagId) {
  includedValuesMap.value.delete(tagId)
  excludedValuesMap.value.delete(tagId)
  
  emitNewValues()
}

function emitNewValues() {
  emits("update:includedValues", Array.from(includedValuesMap.value.values()))
  emits("update:excludedValues", Array.from(excludedValuesMap.value.values()))
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

  &__switch.is-excluded {
    --_bg-color: var(--icon-danger-secondary);
    --_color: var(--white);
    --_border-color: transparent;

    text-decoration: line-through;
  }
}

</style>