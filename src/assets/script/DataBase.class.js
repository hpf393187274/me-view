
import Assert from './Assert.class'
import type from './Type.class'

export default class Database {
  constructor (name = 'me-view-database-default', version = 4) {
    this.dbName = name
    this.version = version
  }

  handlerResponse (response) {
    return new Promise((resolve, reject) => {
      response.onsuccess = resolve
      response.onerror = reject
      response.onupgradeneeded = event => resolve({ event, upgrade: true })
    })
  }

  /**
   * 打开链接
   */
  async open () {
    if (this.db) {
      return '数据库已存在'
    }
    if (Reflect.has(window, 'indexedDB') === false) {
      console.debug('不支持indexedDB...')
      window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB
    }
    const request = window.indexedDB.open(this.dbName, this.version)
    const { upgrade, event } = await this.handlerResponse(request).catch((event) => {
      console.debug('数据库打开报错', event)
      this.status = false
    })
    this.status = true
    this.db = upgrade === true ? event.target.result : request.result
  }

  /**
   * 获取表对象
   * @param {String} tableName 表名
   * @param {String} mode 模式 readonly="只读" readwrite="读写"
   */
  async __store (tableName, mode = 'readonly') {
    if (!this.db) {
      await this.open()
    }
    return this.db.transaction([ tableName ], mode).objectStore(tableName)
  }

  /**
   * 创建表，及索引
   * @param {Object} params { tableName="String-表名", keyPath="String-主键", index="Array-索引" }
   */
  async createStore ({ tableName, keyPath, index }) {
    if (!this.db) {
      await this.open()
    }
    if (this.db.objectStoreNames.contains(tableName) === false) {
      const options = { autoIncrement: true }
      if (keyPath) {
        Reflect.set(options, 'keyPath', keyPath)
        Reflect.deleteProperty(options, 'autoIncrement')
      }
      const store = this.db.createObjectStore(tableName, options)
      if (index && type.isArray(index)) {
        for (const item of index) {
          store.createIndex(item.key, item.key, { unique: false })
        }
      }
    }
  }

  /**
   * 添加表
   * @param {String} tableName 表名
   * @param {Object} data 数据
   */
  async add (tableName, data) {
    Assert.isObject(data, '添加的数据不是一个对象，data：' + JSON.stringify(data))

    const store = await this.__store(tableName, 'readwrite')
    const request = store.add({ ...data })
    await this.handlerResponse(request)
    console.debug('数据添加成功')
  }

  /**
   * 保存，不存在，则新增，存在则更新
   * @param {String} tableName 表名
   * @param {Object} data 数据
   */
  async save (tableName, data) {
    const exist = await this.exist(tableName, data)
    if (exist) {
      console.debug('save', '->', '数据已存在，进行更新数据，data：', data)
      return this.update(tableName, data)
    }
    console.debug('save', '->', '数据不存在，进行新增数据，data：', data)
    return this.add(tableName, data)
  }

  /**
   * 批量保存，不存在，则新增，存在则更新
   * @param {String} tableName 表名
   * @param {Object} data 数据
   */
  async batchSave (tableName, list) {
    Assert.isArray(list, `需要一个数组：${list}`)

    const promiseList = []
    for (const item of list) {
      promiseList.push(this.save(tableName, item))
    }
    return Promise.all(promiseList)
  }

  /**
   * 删除数据
   * @param {String} tableName 表名
   * @param {String} value 主键值
   */
  async remove (tableName, value) {
    const store = await this.__store(tableName, 'readwrite')
    await this.handlerResponse(store.delete(value))
    console.debug('数据删除成功')
  }

  async batchRemove (tableName, values) {
    Assert.isArray(values, `需要一个数组：${values}`)

    const promiseList = []
    for (const item of values) {
      promiseList.push(this.remove(tableName, item))
    }
    return Promise.all(promiseList)
  }

  /**
   * 修改表数据
   * @param {String} tableName 表名
   * @param {Object} data 数据 必须包含主键值
   */
  async update (tableName, data) {
    Assert.isObject(data, '添加的数据不是一个对象，data：' + JSON.stringify(data))

    const store = await this.__store(tableName, 'readwrite')

    const keyValue = Reflect.get(data, store.keyPath)

    Assert.notEmpty(keyValue, '主键不存在，请检查数据，data：' + JSON.stringify(data))

    const findRequest = store.get(keyValue)

    await this.handlerResponse(findRequest)

    Assert.notEmpty(findRequest.result, '数据不存在，请检查数据，data：' + JSON.stringify(data))

    const newData = Object.assign({}, findRequest.result, data)
    const request = store.put(newData)
    await this.handlerResponse(request)
    console.debug('数据更新成功')
  }

  /**
   * 查询表数据
   * @param {String} tableName 表名
   * @param {String} value 主键值
   */
  async findOne (tableName, value) {
    Assert.notEmpty(value, '主键值不存在')

    const store = await this.__store(tableName)
    const keyValue = type.isObject(value) ? Reflect.get(value, store.keyPath) : value
    const request = store.get(keyValue)
    await this.handlerResponse(request)
    return request.result
  }

  /**
   * 查询当前数据是否存在
   * @param {String} tableName 表名
   * @param {String} value 主键值 or 当前数据
   */
  async exist (tableName, value) {
    Assert.notEmpty(value, '参数不能为空')

    const store = await this.__store(tableName)
    const keyValue = type.isObject(value) ? Reflect.get(value, store.keyPath) : value
    console.debug(`${tableName} 执行 exist -> keyPath = ${store.keyPath}，keyValue = ${keyValue}`)
    const request = store.get(keyValue)
    await this.handlerResponse(request)
    return !!request.result
  }

  /**
   * 查询表集合数据
   * @param {String} tableName 表名
   * @param {String} key 索引
   * @param {String} keyValue 主键值
   */
  async findList (tableName, key, value) {
    Assert.notEmpty(key, '索引不能为空')
    Assert.notEmpty(value, '查询条件不能为空')

    const store = await this.__store(tableName)
    const index = store.index(key)
    Assert.notEmpty(index, '索引不存在')

    const request = index.getAll(value)
    await this.handlerResponse(request)
    return request.result
  }
}
