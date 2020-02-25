
import tools from './Tools.class'
import Assert from './Assert.class'
class Storage {
  constructor (storage) {
    this.storage = tools.isEmpty(storage) ? window.localStorage : storage
  }

  get (key) {
    Assert.notEmpty(key, 'The key cannot be empty')
    const value = this.storage.getItem(key)
    if (tools.isEmpty(value)) {
      return null
    }
    return JSON.parse(value)
  }

  set (key, value) {
    Assert.notEmpty(key, 'The key cannot be empty')
    Assert.notEmpty(value, 'The value cannot be empty')
    this.storage.setItem(key, JSON.stringify(value))
  }

  clear () { }

  remove (key) {
    Assert.notEmpty(key, 'The key cannot be empty')
    this.storage.removeItem(key)
  }

  arrayAppend (key, value, callback) {
    Assert.notEmpty(value, 'The value cannot be empty')
    Assert.isFunction(callback, 'callback is not function')

    const list = this.get(key)
    if (tools.isEmpty(list)) {
      this.set(key, [ value ])
      return
    }

    if (list.findIndex(callback) === -1) {
      list.push(value)
      this.set(key, list)
    }
  }

  arrayRemove (key, callback) {
    Assert.isFunction(callback, 'callback is not function')
    const list = this.get(key)
    if (tools.isEmpty(list)) { return }
    const index = list.findIndex(callback)
    if (index > -1) {
      list.splice(index, 1)
      this.set(key, list)
    }
  }
}

const local = new Storage(window.localStorage)
const session = new Storage(window.sessionStorage)

export { local, session }
