<template>
  <div class="default-layout">
    <the-header />
    <slot></slot>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  name: 'defaultLayout',
  components: { TheHeader }
}
</script>
