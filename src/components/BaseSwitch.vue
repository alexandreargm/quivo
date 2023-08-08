<template>
  <label
    class="base-switch"
    tabindex="-1"
    :class="props.size"
  >
    <p
      v-if="$slots.label && !$slots.trigger"
      class="base-switch__label"
    >
      <slot />
    </p>

    <div
      class="base-switch__control" 
      role="switch"
      :aria-checked="props.modelValue"
    >
      <slot name="trigger">
        <div
          class="base-switch__toggle"
        >
          <div class="base-switch__toggle-indicator" />
        </div>
      </slot>

      <input
        type="checkbox"
        class="base-switch__input"
        :value="props.modelValue"
        @change="emits('update:modelValue', !props.modelValue)"
      >
    </div>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: function(value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  }
})
</script>

<style lang='scss'>
@layer base, size;

@layer base {
  .base-switch {
    display: flex;
    gap: var(--space00);
  
    &__control {
      position: relative;
      display: flex;
      justify-content: start;
      cursor: pointer;
    }
  
    &__toggle {
      height: var(--_height);
      width: calc((var(--_height) * 2));
      padding: var(--_padding);
      display: flex;
      background-color: var(--background-secondary);
      border-radius: var(--rounded100);
    }

    &__toggle-indicator {
      height: 100%;
      width: calc(var(--_height) - (var(--_padding) * 2));
      background: var(--background-tertiary);
      border-radius: var(--rounded100);
    }
  
    &__input {
      position: absolute;
      visibility: hidden;
      inset: 0;
    }
  }


  .base-switch__control[aria-checked='true'] {
    .base-switch__toggle {
      justify-content: end;
      background-color: var(--background-interactive-tertiary);
    }

    .base-switch__toggle-indicator {
      background-color: var(--color-interactive);
    }

    &:has(:focus-within, .base-switch__toggle:hover)  {
      .base-switch__toggle-indicator {
        background-color: var(--color-interactive-hover);
      }

      .base-switch__toggle {
        background-color: var(--background-interactive-hover-tertiary);
      }
    }
  }

  .base-switch__control[aria-checked='false'] {
    &:has(:focus-within, .base-switch__toggle:hover) {
      .base-switch__toggle-indicator {
        background: var(--background-hover-tertiary);
      }

      .base-switch__toggle {      
        background-color: var(--background-hover-secondary);
      }
    }
  }
}

@layer size {
  .base-switch.xs {
    --_height: var(--size10);
    --_padding: var(--space-30);
  }

  .base-switch.sm {
    --_height: var(--size10);
    --_padding: var(--space-30);
  }

  .base-switch.md {
    --_height: var(--size20);
    --_padding: var(--space-25);
  }

  .base-switch.lg {
    --_height: var(--size30);
    --_padding: var(--space-25);
  }
}
</style>