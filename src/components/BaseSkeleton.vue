<template>
  <div class="base-skeleton" />
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  height: {
    type: String,
    default: '16px'
  },
  width: {
    type: String,
    default: '16px'
  },
  aspectRatio: {
    type: String,
    default: ''
  },
  borderRadius: {
    type: String,
    default: ''
  }
})
</script>

<style lang='scss'>
.base-skeleton {
  aspect-ratio: v-bind('props.aspectRatio');
  background-color: var(--background-secondary);
  border-radius: v-bind('props.borderRadius');
  height: v-bind('props.height');
  overflow: hidden;
  position: relative;
  width: v-bind('props.width');
}

.base-skeleton::after {
  animation: b-skeleton-animate-wave 1.75s linear infinite;
  background: linear-gradient(90deg, transparent, var(--background-tertiary), transparent);
  bottom: 0;
  content: '';
  left: 0;
  opacity: 0.3;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
}

@keyframes b-skeleton-animate-wave {
  0% {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}
</style>
