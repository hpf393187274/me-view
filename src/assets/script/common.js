import type from './type.common'
import tools from './tools.common'
import http from './http.common'
import Storage from './storage.common'
import regExp from './regExp.common'

import IndexedDB from './database.common'
const local = new Storage(window.localStorage)
const session = new Storage(window.sessionStorage)
const indexedDB = new IndexedDB('me-view-database-default')

class CustomError extends Error {
  constructor (message) {
    super(message)
    console.error(message)
    this.name = 'CustomError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export { type, tools, http, local, session, regExp, IndexedDB, indexedDB, CustomError }
