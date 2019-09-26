import type from './type.common'
import tools from './tools.common'
import http from './http.common'
import Storage from './storage.common'
const local = new Storage(window.localStorage)
const session = new Storage(window.sessionStorage)
export { type, tools, http, local, session }
