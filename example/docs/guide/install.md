# 安装

## Npm 安装
推荐使用 npm 来安装，享受生态圈和工具带来的便利，更好地和 webpack 配合使用，当然，我们也推荐使用 ES2015。
```
npm install me-view --save
# or 
npm i me-view --save
```

## CDN 引入
目前可以通过 <a href="https://unpkg.com/me-view/" target="_blank">unpkg.com/me-view</a> 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。
```
npm install me-view --save
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/me-view/dist/lib/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/me-view/dist/lib/index.js"></script>
```

### Hello world
通过 CDN 的方式我们可以很容易地使用 Element 写出一个 Hello world 页面。

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/me-view/dist/lib/index.css">
</head>
<body>
  <div id="app">
    <me-button @click="visible = true">按钮</me-button>
    <me-dialog v-model="visible" title="Hello world">
      <p>欢迎使用 me-view</p>
    </me-dialog>
  </div>
</body>
  <!-- 先引入 Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/me-view/dist/lib/index.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: function() {
        return { visible: false }
      }
    })
  </script>
</html>
```
