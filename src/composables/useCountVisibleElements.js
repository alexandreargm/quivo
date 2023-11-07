export function countVisibleElements(targetContainerEl, targetChildClass) {
  if (!targetContainerEl) throw new Error('Container not found.')

  const childElements = targetContainerEl.querySelectorAll(targetChildClass);

  // Set container position to relative for calulation.
  targetContainerEl.style.position = 'relative'

  let visibleElementsCount = 0;
 
  for (const child of childElements) {
    if (child.offsetTop + child.offsetHeight <= targetContainerEl.clientHeight) {
      visibleElementsCount++
    } else {
      break;
    }
  }

  targetContainerEl.style.position = ''

  return visibleElementsCount;
}