import '@testing-library/jest-dom/vitest'

// jsdom ships none of these APIs; components rely on them.
const g = globalThis as unknown as {
  matchMedia?: (q: string) => MediaQueryList
  IntersectionObserver?: typeof IntersectionObserver
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

if (!g.IntersectionObserver) {
  class IntersectionObserverMock {
    cb: IntersectionObserverCallback
    constructor(cb: IntersectionObserverCallback) {
      this.cb = cb
    }
    observe = (el: Element) => {
      this.cb(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      )
    }
    unobserve = () => {}
    disconnect = () => {}
    takeRecords = () => []
  }
  g.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
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
