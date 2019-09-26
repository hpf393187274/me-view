import tools from './tools.common'
import type from './type.common'

export default class Storage {
  constructor(storage) {
    this.storage = tools.isEmpty(storage) ? window.localStorage : storage
  }
  get(key) {
    if (tools.isEmpty(key)) {
      return null
    }
    const value = this.storage.getItem(key)
    if (tools.isEmpty(value)) {
      return null
    }
    return JSON.parse(value)
  }
  set(key, value) {
    if (tools.isEmpty(key) || tools.isEmpty(value)) {
      return
    }
    this.storage.setItem(key, JSON.stringify(value))
  }
  clear() { }

  remove(key) {
    if (tools.isEmpty(key)) {
      return
    }
    this.storage.removeItem(key)
  }

  arrayAppend(key, value, callback = (source, target) => source === target) {
    if (type.isNotFunction(callback)) { return }
    let list = this.get(key)
    if (tools.isEmpty(list)) {
      this.set(key, [value])
      return;
    }

    const target = list.find(item => callback(item, value))

    if (tools.isNotEmpty(target)) { return }
    list.push(value)
    this.set(key, list)
  }
  arrayRemove(key, value, callback = (source, target) => source === target) {
    if (type.isNotFunction(callback)) { return }
    const list = this.get(key)
    if (tools.isEmpty(list)) { return; }

    const index = list.findIndex(item => callback(item, value))
    if (index > -1) {
      list.splice(index, 1)
      this.set(key, list)
    }
  }
}