import type from './Type.class'
import tools from './Tools.class'
import http from './http.common'
import { local, session } from './Storage.class'
import regExp from './regExp.common'

import Assert from './Assert.class'

import DataBase from './DataBase.class'

import CustomError from './CustomError.class'
const dataBase = new DataBase('me-view-database-default')

window.CustomError = CustomError
export { type, tools, http, local, session, regExp, DataBase, dataBase, CustomError, Assert }
