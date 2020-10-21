import Tools from 'me-view/src/script/tools'
import Type from 'me-view/src/script/type'
import Assert from 'me-view/src/script/assert'
export default class Storage {
  #storage
  #encryptPrefix = 'encrypt__'
  constructor (storage) {
    this.#storage = Type.isEmpty(storage) ? window.localStorage : storage
  }

  get (key, option) {
    const { defaultValue } = option || {}
    console.debug(`storage.get：key = ${key}`)
    Assert.notEmpty(key, 'storage.get：key is empty')
    const value = this.#storage.getItem(key)
    if (Type.isEmpty(value)) {
      return defaultValue
    }
    if (Type.isEmptyString(value)) { return '' }
    if (value.startsWith(this.#encryptPrefix)) {
      return JSON.parse(Tools.decryption(value.replace(this.#encryptPrefix, '')))
    }
    return JSON.parse(value)
  }

  set (key, value, encrypt = false) {
    console.debug(`storage.set：key = ${key}`)
    Assert.notEmpty(key, 'storage.set：key is empty')
    if (Type.isEmpty(value)) { return }
    if (Type.isEmptyString(value)) { value = '' }
    const stringifyValue = JSON.stringify(value)
    const newValue = encrypt === true ? this.#encryptPrefix + Tools.encryption(stringifyValue) : stringifyValue
    this.#storage.setItem(key, newValue)
  }

  clear () { this.#storage.clear() }

  remove (key) {
    console.debug(`storage.remove：key = ${key}`)
    Assert.notEmpty(key, 'storage.remove：key is empty')
    this.#storage.removeItem(key)
  }

  deepGetMap (key, property, defaultValue) {
    return Reflect.get(this.get(key, { defaultValue: {} }), property) || defaultValue
  }
}

const local = new Storage(window.localStorage)
const session = new Storage(window.sessionStorage)

export { local, session }
