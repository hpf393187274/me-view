import Vue from 'vue'
import {
  Panel,
  Dialog,
  Menu,
  Tree,
  Table,
  Tabs,
  // TabPane,
  Transfer,
  Paging,
  Modal,
  Message,
  Input,
  Checkbox,
  Button,
  ComboSelect,
  ComboTable,
  ComboTree,
  Label,
  Form,
  Icon,
  LineH,
  LineV,
  Row,
  Column,
  Link,
  Scrollbar,
  Slidebar,
  DemoBlock
} from 'me-view'

import { local, session } from 'me-view/lib/script/storage'
import Type from 'me-view/lib/script/type'
import Tools from 'me-view/lib/script/tools'
import Watermark from 'me-view/lib/script/watermark'

// Vue.component(Panel.name, Panel)
// Vue.component(Dialog.name, Dialog)
// Vue.component(Menu.name, Menu)
// Vue.component(Tree.name, Tree)
// Vue.component(Table.name, Table)
// Vue.component(Tabs.name, Tabs)
// Vue.component(TabPane.name, TabPane)
// Vue.component(Transfer.name, Transfer)
// Vue.component(Paging.name, Paging)
// Vue.component(Modal.name, Modal)
// Vue.component(Message.name, Message)
// Vue.component(Input.name, Input)
// Vue.component(Checkbox.name, Checkbox)
// Vue.component(Button.name, Button)
// Vue.component(ComboSelect.name, ComboSelect)
// Vue.component(ComboTable.name, ComboTable)
// Vue.component(ComboTree.name, ComboTree)
// Vue.component(Label.name, Label)
// Vue.component(Form.name, Form)
// Vue.component(Icon.name, Icon)
// Vue.component(LineH.name, LineH)
// Vue.component(LineV.name, LineV)
// Vue.component(Row.name, Row)
// Vue.component(Column.name, Column)
// Vue.component(Link.name, Link)
// Vue.component(Scrollbar.name, Scrollbar)
// Vue.component(Slidebar.name, Slidebar)
// Vue.component(DemoBlock.name, DemoBlock)

Vue.prototype.$dialog = Dialog
Vue.prototype.$message = Message
Vue.prototype.$watermark = Watermark
Vue.prototype.$type = Type
Vue.prototype.$tools = Tools
Vue.prototype.$local = local
Vue.prototype.$session = session

Vue.use(Panel)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Tree)
Vue.use(Table)
Vue.use(Tabs)
// Vue.use(TabPane)
Vue.use(Transfer)
Vue.use(Paging)
Vue.use(Modal)
Vue.use(Message)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(ComboSelect)
Vue.use(ComboTable)
Vue.use(ComboTree)
Vue.use(Label)
Vue.use(Form)
Vue.use(Icon)
Vue.use(LineH)
Vue.use(LineV)
Vue.use(Row)
Vue.use(Column)
Vue.use(Link)
Vue.use(Scrollbar)
Vue.use(Slidebar)
Vue.use(DemoBlock)
