export const FIT_TOLERANCE = 2

export function readHomeViewport(sequence: HTMLElement) {
  const height = Number.parseFloat(getComputedStyle(sequence).minBlockSize)
  const visual = window.visualViewport
  const visibleHeight = visual?.height ?? window.innerHeight
  return {
    height,
    visibleHeight,
    stable:
      Number.isFinite(height) &&
      height > 0 &&
      Math.abs(height - visibleHeight) <= FIT_TOLERANCE &&
      (!visual ||
        (visual.scale === 1 &&
          visual.offsetTop === 0 &&
          visual.offsetLeft === 0)),
  }
}

export function readSectionGeometry(
  element: HTMLElement,
  viewport: ReturnType<typeof readHomeViewport>,
) {
  const rect = element.getBoundingClientRect()
  // The hero footprint starts at document top, including the scrolling header.
  const top =
    element.dataset.homeSection === 'hero' ? -window.scrollY : rect.top
  const height = rect.bottom - top
  const visible = Math.max(
    0,
    Math.min(rect.bottom, viewport.visibleHeight) - Math.max(top, 0),
  )
  return {
    top,
    bottom: rect.bottom,
    targetY: element.dataset.homeSection === 'hero' ? 0 : top + window.scrollY,
    visible,
    ratio: height > 0 ? visible / height : 0,
    fits:
      viewport.stable &&
      height > 0 &&
      height <= viewport.height + FIT_TOLERANCE,
  }
}
