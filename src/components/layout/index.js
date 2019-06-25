
import Panel from './Panel'

import Dialog from './Dialog'

import menu from './menu'
import tree from './tree'


import table from './table'
import tabs from './tabs'

import Transfer from './Transfer'

import paging from './paging'
export default [
  Panel, Dialog, ...paging, ...tabs, ...tree, ...menu, Transfer, ...table
]
