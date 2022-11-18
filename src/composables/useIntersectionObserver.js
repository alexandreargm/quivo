import { unref } from 'vue'

export default function useIntersectionObserver (target, callback, options = {}) {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.1
  } = options

  function stop () {
    observer.disconnect()
  }

  const observer = new IntersectionObserver(callback, {
    root: unref(root),
    rootMargin,
    threshold
  })

  observer.observe(unref(target))

  return {
    stop
  }
}
