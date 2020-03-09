# 快速上手

## 使用之前
> 待完善中...

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
## 使用推荐工程
> 待完善中...
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

> 待完善中...

## 开始使用

### 运行

```
npm run serve
```

### 编译

```
npm run build
```