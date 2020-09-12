export default class EventMonitor {
  #targetElement
  constructor (target = document.createElement('div')) {
    this.#targetElement = target || document
  }

  register (name, callback) {
    this.#targetElement.addEventListener(name, ({ detail }) => callback(detail))
  }

  dispatch (name, data) {
    this.#targetElement.dispatchEvent(new CustomEvent(name, { detail: data }))
  }

  remove (name) {
    this.#targetElement.removeEventListener(name)
  }
}

const eventMonitor = new EventMonitor(window)
export { eventMonitor }
