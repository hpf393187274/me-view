
import Tools from './tools'
import Assert from './assert'
export default class Storage {
  constructor (storage) {
    this.storage = Tools.isEmpty(storage) ? window.localStorage : storage
  }

  get (key, { defaultValue = undefined } = { }) {
    console.debug(`storage.arrayAppend：key = ${key}`)
    Assert.notEmpty(key, 'storage.get：key is empty')
    const value = this.storage.getItem(key)
    if (Tools.isEmpty(value)) {
      return defaultValue
    }
    return JSON.parse(value)
  }

  set (key, value) {
    console.debug(`storage.set：key = ${key}`)
    Assert.notEmpty(key, 'storage.set：key is empty')
    this.storage.setItem(key, JSON.stringify(value))
  }

  clear () { }

  remove (key) {
    console.debug(`storage.remove：key = ${key}`)
    Assert.notEmpty(key, 'storage.remove：key is empty')
    this.storage.removeItem(key)
  }

  arrayAppend (key, value, callback) {
    console.debug(`storage.arrayAppend：key = ${key}，value = `, value)
    Assert.notEmpty(key, 'storage.arrayAppend：key is empty')
    Assert.isFunction(callback, `storage.arrayAppend: key = ${key} callback is not function`)
    if (Tools.isEmpty(value)) { return }
    const list = this.get(key)
    if (Tools.isEmpty(list)) {
      return this.set(key, [ value ])
    }

    if (list.findIndex(callback) === -1) {
      list.push(value)
      this.set(key, list)
    }
  }

  arrayRemove (key, callback) {
    Assert.notEmpty(key, 'storage.arrayRemove：key is empty')
    Assert.isFunction(callback, `storage.arrayRemove: key = ${key} callback is not function`)
    const list = this.get(key)
    if (Tools.isEmpty(list)) { return }
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
