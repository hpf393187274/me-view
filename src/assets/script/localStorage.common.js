import tools from './tools.common'
const localStorage = window.localStorage
// const sessionStorage = window.sessionStorage

export default {
  get(key) {
    if (tools.isEmpty(key)) {
      return null
    }
    const value = localStorage.getItem(key)
    if (tools.isEmpty(value)) {
      return null
    }
    return JSON.parse(value)
  },
  set(key, value) {
    if (tools.isEmpty(key) || tools.isEmpty(value)) {
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  },
  clear() { },
  key(index) { },
  remove(key) {
    if (tools.isEmpty(key)) {
      return
    }
    localStorage.removeItem(key)
  }
}
