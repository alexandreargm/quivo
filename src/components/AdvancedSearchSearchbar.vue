<template>
  <div class="advanced-searchbar">
    <div class="advanced-searchbar__filters-toggle">
      <base-button
        color="brand"
        variant="tertiary"
        @click="toggleFilters()"
      >
        <template #icon>
          <div class="advanced-searchbar__icon">
            <base-icon
              size="lg"
              name="AdjustmentsIcon"
            />
          </div>
        </template>

        Filters
      </base-button>
    </div>

    <div class="advanced-searchbar__searchbar">
      <base-input
        v-model="computedValue"
        :placeholder="placeholder"
        width="100%"
        theme="primary"
      >
        <template #before>
          <div class="advanced-searchbar__icon">
            <base-icon name="SearchIcon" />
          </div>
        </template>
      </base-input>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import BaseInput from './BaseInput'
import BaseIcon from './BaseIcon.vue'
import BaseButton from './BaseButton.vue'

const emits = defineEmits(['update:modelValue', 'toggleFilters'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Search movies and TV series'
  }
})

const computedValue = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emits('update:modelValue', newValue)
  }
})

const toggleFilters = () => {
  emits('toggleFilters')
}
</script>

<style lang='scss' scoped>
.advanced-searchbar {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  background: var(--background);
  border-radius: var(--rounded20);
  overflow: hidden;

  &__icon {
    color: var(--text-secondary) !important;
  }
}
</style>
