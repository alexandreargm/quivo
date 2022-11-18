export function nextRender (fn) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(fn)
  })
}

export function nextRenderPromise (fn = () => {}) {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => {
      return resolve(
        new Promise(resolve => {
          window.requestAnimationFrame(() => {
            return resolve(fn())
          })
        })
      )
    })
  })
}
