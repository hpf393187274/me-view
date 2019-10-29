import type from './type.common'
import tools from './tools.common'
import http from './http.common'
import Storage from './storage.common'
import regExp from './tools.common'
const local = new Storage(window.localStorage)
const session = new Storage(window.sessionStorage)
export { type, tools, http, local, session, regExp }
