const path = require('path')
const fs = require('fs')
var nodeExternals = require('webpack-node-externals')

const processPath = process.cwd()
function resolve (dir) {
  return path.join(processPath, dir)
}

function readdirSync (dir, callback) {
  const files = fs.readdirSync(resolve(dir))
  if (callback) {
    return files.map(file => callback(file))
  }
  return files
}

function formatFileName (target) {
  console.log('---------------------formatFileName begin---------------', target)
  const connector = '-'
  target = target.replace(/([A-Z])/g, $1 => connector + $1.toLowerCase())
  if (target.startsWith(connector)) {
    target = target.substr(1)
  }
  console.log('---------------------formatFileName end---------------', target)
  return target
}

function entry (dir, callback) {
  const entry = { }
  const files = readdirSync(dir)
  for (const file of files) {
    const key = callback ? callback(file) : file
    if (key === null || key === undefined || key === '') {
      continue
    }
    const suffix = file.includes('.') ? '' : '/index.js'
    Reflect.set(entry, key, `./${dir}/${file}${suffix}`)
  }
  console.log('------------------------', entry)
  return entry
}

const entryScript = entry('src/script', file => formatFileName(file.replace('.class.js', '')))
const entryMixin = entry('src/components/mixins')
exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}
const excludeComponent = [ 'config', 'mixins', 'index.js', 'demo-block' ]
const entryComponent = entry('src/components', file => {
  if (excludeComponent.includes(file)) { return null }
  return file
})

const externals = { }
Object.keys(entryComponent).forEach(function (key) {
  Reflect.set(externals, `me-view/src/components/${key}`, `me-view/lib/${key}`)
})

Object.keys(entryMixin).forEach(function (key) {
  Reflect.set(externals, `me-view/src/components/mixins/${key}`, `me-view/lib/${key}`)
})
exports.externals = [ Object.assign({ vue: 'vue' }, externals), nodeExternals() ]

Object.keys(entryScript).forEach(function (key) {
  Reflect.set(externals, `me-view/src/script/${key}`, `me-view/lib/script/${key}`)
})
exports.entryComponent = entryComponent
exports.entryScript = entryScript
exports.entryMixin = entryMixin
exports.alias = {
  '@assets': resolve('../src/assets'),
  '@components': resolve('../src/components'),
  '@example': resolve('../example'),
  '@router': resolve('../example/router'),
  'me-view': resolve('../')
}
module.exclude_js = /node_modules/

module.formatFileName = formatFileName

module.resolve = resolve

module.readdirSync = readdirSync
