# 快速上手

## 使用 Vue CLI 3 

``` warning
关于旧版本

Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。
```

可以使用下列任一命令安装这个新的包：
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli

```

你还可以用这个命令来检查其版本是否正确：

```
vue --version
```

## 全量MeView
一般在 webpack 入口页面 `main.js` 中如下配置：
``` js
  import Vue from 'vue'
  import App from './app.vue'
  
  import MeView from 'me-view'
  import 'me-view/dist/lib/index.css'

  Vue.use(MeView);

  new Vue({
      el: '#app',
      render: h => h(App)
  })
```
## 按需引用MeView

借助插件 `babel-plugin-component` or `babel-plugin-import`，我们可以只引入需要的组件，以达到减小项目体积的目的。

vue-cli3 一下版本 安装 babel-plugin-component：
```
npm install babel-plugin-component -D
```

vue-cli3 及以上版本 安装 babel-plugin-import
```
npm install babel-plugin-component -D
```

然后，在 `.babelrc` or `babel.config.js` 文件内增加一下类容：

``` json
{
  "plugins": [
    [
      "import", 
      {
        "libraryName": "me-view",
        "styleLibraryDirectory": "theme"
      }
    ]
  ]
}
```
最后 在 文件 `vue.config.js` 进行如下配置

``` js
module.exports = {
  chainWebpack: config => {
    config.resolve.extensions.add('.js').add('.vue').add('.css')
  }
}

```
接下来，如果你只希望引入部分组件，比如 Button 和 Input，那么需要在 main.js 中写入以下内容：

``` js
import Vue from 'vue';
import { Button, Input } from 'me-view';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Input.name, Input);

/* 或写为
 * Vue.use(Button)
 * Vue.use(Input)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

完整组件列表和引入方式以下面内容为准

``` json
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
import watermark from 'me-view/lib/script/watermark'

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
Vue.prototype.$watermark = watermark
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


```
## 开始使用

### 运行

```
npm run serve
```

### 编译

```
npm run build
```