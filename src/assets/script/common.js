import type from './Type.class'
import tools from './Tools.class'
import Http from './Http.class'
import { local, session } from './Storage.class'
import regExp from './regExp.common'
import Assert from './Assert.class'
import Database from './Database.class'
import CustomError from './CustomError.class'
import Socket from './Socket.class'
const database = new Database('me-view-database-default')

window.CustomError = CustomError
const http = new Http({ baseURL: '/api' })
export { type, tools, http, Http, local, session, regExp, Database, database, CustomError, Assert, Socket }
