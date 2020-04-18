export default class EventMonitor {
  #targetElement

  constructor (tagName = 'div') {
    this.#targetElement = document.createElement('div')
  }

  registerEvent (name, callback) {
    this.#targetElement.addEventListener(name, ({ detail }) => callback(detail))
  }

  dispatchEvent (name, data) {
    this.#targetElement.dispatchEvent(new CustomEvent(name, { detail: data }))
  }

  removeEvent (name) {

  }
}
