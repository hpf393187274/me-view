const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const common = require('./common')
console.log('----------------------------common.entryComponent-----------', common.entryComponent)
const webpackConfig = {
  mode: 'production',
  entry: common.entryComponent,
  stats: 'none',
  externals: common.externals,
  resolve: {
    extensions: [ '.js', '.vue', '.json' ],
    alias: common.alias,
    modules: [ 'node_modules' ]
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: common.exclude_js,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
}

module.exports = webpackConfig
