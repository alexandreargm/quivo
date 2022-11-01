export function useDebounceFn (fn, delay) {
  let timeout

  return (...args) => {
    const context = this

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => fn.call(context, ...args), delay)
  }
}
