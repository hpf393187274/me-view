import Vue from 'vue'
import Clipboard from 'clipboard'
import {
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

// ---------------- 工具类 begin ----------------
// 浏览器 Storage 存储组件
import { local, session } from 'me-view/lib/script/storage'
// 数据类型判断组件
import Type from 'me-view/lib/script/type'
// 常用工具类组件
import Tools from 'me-view/lib/script/tools'
// 水印组件
import Watermark from 'me-view/lib/script/watermark'

// 内容复制组件
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
Vue.prototype.$watermark = new Watermark()
Vue.prototype.$type = Type
Vue.prototype.$tools = Tools
Vue.prototype.$local = local
Vue.prototype.$session = session
// ---------------- 工具类 end ----------------

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
Vue.use(DemoBlock)
