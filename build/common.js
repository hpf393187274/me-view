const path = require('path')
const fs = require('fs')
const nodeExternals = require('webpack-node-externals')
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

/**
 * 转换为 '-' 替换驼峰命名
 * @param {String} target 名称
 */
function formatFileName (target) {
  const connector = '-'
  target = target.replace(/([A-Z])/g, $1 => connector + $1.toLowerCase())
  if (target.startsWith(connector)) {
    target = target.substr(1)
  }
  return target
}

function entry (dir, callback = file => file) {
  const entry = { }
  const files = readdirSync(dir)
  for (const file of files) {
    // 剔除文件后缀，转换为 '-' 替换驼峰命名
    const key = callback(formatFileName(file)).replace(/\..*/, '')
    const suffix = file.includes('.') ? '' : '/index.js'
    Reflect.set(entry, key, `./${dir}/${file}${suffix}`)
  }
  return entry
}

const entryScript = entry('src/script', file => `script/${file}`)
const entryMixin = entry('src/mixins', file => `mixins/${file}`)
const entryConfig = entry('src/config', file => `config/${file}`)
const entryComponent = entry('packages')
const externals = { }
Object.keys({ ...entryComponent }).forEach(key => {
  Reflect.set(externals, `me-view/packages/${key}`, `me-view/lib/${key}`)
})
Object.keys({ ...entryMixin, ...entryScript, ...entryConfig }).forEach(key => {
  Reflect.set(externals, `me-view/src/${key}`, `me-view/lib/${key}`)
})

Object.keys({ ...externals }).forEach(key => {
  console.log(`-----------key=${key},----------value=${Reflect.get(externals, key)}`)
})

exports.externals = [ Object.assign({ vue: 'vue' }, externals), nodeExternals() ]
exports.entryComponent = entryComponent
exports.entryScript = entryScript
exports.entryMixin = entryMixin
exports.entryConfig = entryConfig
exports.alias = { 'me-view': resolve('../') }
exports.exclude_js = /node_modules/
exports.formatFileName = formatFileName
exports.resolve = resolve
exports.readdirSync = readdirSync
exports.vue = { root: 'Vue', commonjs: 'vue', commonjs2: 'vue', amd: 'vue' }
