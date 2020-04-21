import Vue from 'vue'
import Clipboard from 'clipboard'
import {
  local,
  session,
  type,
  tools,
  http,
  Watermark,
  Panel,
  Dialog,
  Menu,
  Tree,
  Table,
  Tabs,
  TabPane,
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

Vue.component(Panel.name, Panel)
Vue.component(Dialog.name, Dialog)
Vue.component(Menu.name, Menu)
Vue.component(Tree.name, Tree)
Vue.component(Table.name, Table)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Transfer.name, Transfer)
Vue.component(Paging.name, Paging)
Vue.component(Modal.name, Modal)
Vue.component(Message.name, Message)
Vue.component(Input.name, Input)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Button.name, Button)
Vue.component(ComboSelect.name, ComboSelect)
Vue.component(ComboTable.name, ComboTable)
Vue.component(ComboTree.name, ComboTree)
Vue.component(Label.name, Label)
Vue.component(Form.name, Form)
Vue.component(Icon.name, Icon)
Vue.component(LineH.name, LineH)
Vue.component(LineV.name, LineV)
Vue.component(Row.name, Row)
Vue.component(Column.name, Column)
Vue.component(Link.name, Link)
Vue.component(Scrollbar.name, Scrollbar)
Vue.component(Slidebar.name, Slidebar)
Vue.component(DemoBlock.name, DemoBlock)

Vue.prototype.$copy = function (classes) {
  const _this = this
  const clipboard = new Clipboard(classes)
  clipboard.on('success', () => {
    _this.$message.info('复制成功')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    _this.$message.error('该浏览器不支持自动复制')
    clipboard.destroy()
  })
}
Vue.prototype.$dialog = Dialog
Vue.prototype.$message = Message
Vue.prototype.$watermark = Watermark
Vue.prototype.$type = type
Vue.prototype.$tools = tools
Vue.prototype.$local = local
Vue.prototype.$http = http
Vue.prototype.$session = session

Vue.use(Panel)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Tree)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(TabPane)
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
