import type from './Type.class'
import tools from './Tools.class'
import http from './http.common'
import { local, session } from './Storage.class'
import regExp from './regExp.common'

import Assert from './Assert.class'

import Database from './Database.class'

import CustomError from './CustomError.class'
const database = new Database('me-view-database-default')

window.CustomError = CustomError
export { type, tools, http, local, session, regExp, Database, database, CustomError, Assert }
