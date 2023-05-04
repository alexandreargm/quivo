<template>
  <div
    class="base-searchbar"
    :class="[getThemeClass, getSizeClass]"
  >
    <div class="base-searchbar__icon">
      <BaseIcon name="SearchIcon" />
    </div>

    <input
      ref="input"
      v-model="computedValue"
      class="base-searchbar__input"
      type="text"
      autocomplete="off"
      autocorrect="off"
      placeholder="Where to watch..."
    >
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, defineExpose } from 'vue'
import BaseIcon from './BaseIcon.vue';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '550px'
  },
  theme: {
    type: String,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'tertiary'].includes(value)
    }
  },
})

const computedValue = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})
const getThemeClass = computed(() => `${props.theme}-theme`)
const getSizeClass = computed(() => props.size)
const input = ref(null)

const focus = () => {
  input.value?.focus()
}

defineExpose({ focus })
</script>

<style lang='scss' scoped>
@layer base, theme, size;

@layer base {
  .base-searchbar {
    align-items: stretch;
    background-color: var(--_theme-bg);
    border-radius: var(--rounded20);
    display: flex;
    align-items: center;
    height: var(--size40);
    font-size: var(--font00);
    width: v-bind(width);
    max-width: 100%;
    padding: 0 var(--space00);

    &:has(input:focus) {
      outline: 2px solid var(--border-reverse);
    }

    &__icon {
      margin-right: var(--space-10);
      color: var(--text-secondary);
    }

    &__input {
      flex-grow: 1;
      height: 100%;
      background: none;
      border: 0;
      cursor: text !important;
      font-size: inherit;
      outline: 0;
      text-overflow: ellipsis;
      padding: 0;
    }
  }
}

@layer theme {
  // Theme prop
  .base-searchbar.primary-theme {
    --_theme-bg: var(--background);
  }
  .base-searchbar.secondary-theme {
    --_theme-bg: var(--background-secondary);
  }
  .base-searchbar.tertiary-theme {
    --_theme-bg: var(--background-tertiary);
  }
}
</style>
