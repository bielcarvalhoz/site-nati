import '@testing-library/jest-dom/vitest'

// jsdom ships neither of these; components rely on them.
const g = globalThis as unknown as {
  matchMedia?: (q: string) => MediaQueryList
}

if (!g.matchMedia) {
  g.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}

// jsdom leaves <video> media methods unimplemented (they throw "Not implemented").
if (typeof HTMLMediaElement !== 'undefined') {
  HTMLMediaElement.prototype.load = () => {}
  HTMLMediaElement.prototype.play = () => Promise.resolve()
  HTMLMediaElement.prototype.pause = () => {}
}

// jsdom leaves <dialog> open/close unimplemented — make them track the `open` prop.
if (typeof HTMLDialogElement !== 'undefined' && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true
  }
  HTMLDialogElement.prototype.close = function close() {
    this.open = false
    this.dispatchEvent(new Event('close'))
  }
}
