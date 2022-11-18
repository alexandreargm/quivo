<template>
  <div
    ref="paginator"
    class="infinite-paginator"
  />
</template>

<script setup>
import { ref, unref, onMounted, defineProps, onUnmounted } from 'vue'

const props = defineProps({
  handler: {
    type: Function,
    required: true
  }
})

const paginator = ref()
const observer = ref()

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1
  }

  observer.value = new IntersectionObserver(props.handler, options)

  observer.value.observe(unref(paginator))
})

onUnmounted(() => {
  observer.value.disconnect()
})
</script>

<style lang='scss' scoped>
  //
</style>
