export default function nextRender (fn) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(fn)
  })
}

export {
  nextRender
}
