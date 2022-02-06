<template>
  <article
    class="title-card"
    @click="handleClick"
  >
    <title-poster
      :src="src"
    />
  </article>
</template>

<script>
import TitlePoster from './TitlePoster.vue'

export default {
  emits: ['select'],
  components: { TitlePoster },

  props: {
    id: {
      type: Number,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    mediaType: {
      type: String,
      required: true
    }
  },

  setup (props, { emit }) {
    const handleClick = () => {
      emit('select', {
        id: props.id,
        mediaType: props.mediaType
      })
    }

    return {
      handleClick
    }
  }
}
</script>

<style lang='scss' scoped>
  //
</style>
