import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTitlePreviewStore = defineStore('titlePreview', () => {
  const isOpen = ref(false)
  const type = ref('movie')
  const id = ref('')

  function setSelectedTitle(titleId) {
    id.value = titleId
  }

  function setIsOpen(isOpen) {
    isOpen.value = isOpen
  }

  return {
    isOpen,
    type,
    id,
    setSelectedTitle,
    setIsOpen
  }
})
