<template>
  <section class="finder-search-cloud">
    <base-filter-switch
      v-for="({value, title: tagTitle}, index) in props.tags"
      :id="index"
      :key="index"
      :value="value"
      :title="tagTitle"
      :has-excludes="hasExcludes"
      :state="getTagState(index)"
      @select="handleSelect"
    />
  </section>
</template>

<script setup>
import { defineProps, computed, defineEmits, markRaw } from 'vue'
import BaseFilterSwitch from './BaseFilterSwitch.vue'

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const props = defineProps({
  isMultiple: {
    type: Boolean,
    default: false
  },
  hasExcludes: {
    type: Boolean,
    default: false
  },
  tags: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [Array, Object],
    required: true
  }
})

const handleSelect = (tag) => {
  tag.state === 0 // 0 is INACTIVE
    ? handleRemove(tag)
    : handleAdd(tag)
}
const handleAdd = (tag) => {
  props.isMultiple
    ? addValue(tag)
    : setValue(tag)
}
const addValue = (tag) => {
  // Avoid duplicate by filtering the id before adding it later.
  const filteredValues = computedValue.value.filter(currentTag => currentTag.id !== tag.id)

  computedValue.value = markRaw([...filteredValues, tag])
}
const setValue = (value) => {
  computedValue.value = value
}
const handleRemove = (tag) => {
  props.isMultiple
    ? removeTag(tag)
    : setValue({})
}
const removeTag = ({ id }) => {
  computedValue.value = markRaw(computedValue.value.filter(currentTag => currentTag.id !== id))
}
const getTagState = (id) => {
  if (props.isMultiple) {
    const getTag = computedValue.value.find(tag => tag.id === id)
    return (getTag && getTag.state) || 0
  } else {
    return (computedValue.value.id === id && computedValue.value.state) || 0
  }
}

</script>

<style lang='scss' scoped>
.finder-search-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-20);
}
</style>
