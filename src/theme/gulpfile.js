'use strict'

const { series, src, dest } = require('gulp')
var header = require('gulp-header')
const sass = require('gulp-sass')
const cssmin = require('gulp-cssmin')

function compile () {
  return src('./src/*.scss')
    .pipe(header('@import \'../var.scss\';'))
    .pipe(sass.sync())
    .pipe(cssmin())
    .pipe(dest('./lib'))
}

function copyIconfont () {
  return src('./fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'))
}

exports.build = series(compile, copyIconfont)
