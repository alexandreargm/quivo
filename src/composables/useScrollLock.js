import { onMounted, onUnmounted } from "vue";
import { namespacedUuid } from './useUuid'

export function useScrollLock() {
  const uniqueElementId = namespacedUuid('scroll-lock')

  onMounted(() => document.body.classList.add(uniqueElementId))
  onUnmounted(() => document.body.classList.remove(uniqueElementId))
}