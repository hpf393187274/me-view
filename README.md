# me-view
基于 VUE 的相关组件视图

## Project setup
```
npm install me-view
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

``` js
import Vue from 'vue'
import MeView from 'me-view'
// 加载 样式
import 'me-view/dist/lib/index.css'
// 加载 icon 
import '//at.alicdn.com/t/font_1180504_afedrcmrmt.css'

// 使用插件 me-view
Vue.use(MeView)

```