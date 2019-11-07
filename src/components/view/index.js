
import Panel from './Panel'

import Dialog from './dialog/index'

import menu from './menu'
import tree from './tree'


import table from './table'
import tabs from './tabs'

import Transfer from './Transfer'

import paging from './paging'

import Modal from './modal/index'
export default [
  Panel, Dialog, ...paging, ...tabs, ...tree, ...menu, Transfer, ...table, Modal
]
