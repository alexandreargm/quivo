import { onMounted, onUnmounted } from "vue";
import { namespacedUuid } from './useUuid'

export function useScrollLock({ immediate = true } = {}) {
  const uniqueElementId = namespacedUuid('scroll-lock')

  function enable() {
    document.body.classList.add(uniqueElementId)
  }

  function disable() {
    document.body.classList.remove(uniqueElementId)
  }

  if (immediate) {
    onMounted(enable)
  }

  onUnmounted(disable)

  return {
    enable,
    disable
  }
}