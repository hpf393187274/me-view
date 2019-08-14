import Vue from 'vue'
import Router from 'vue-router'
import basic from './basic'
import layout from './layout'
import form from './form'
import { tools } from '@assets/script/common'
import util from '@common/util'
import auth from '@http/auth.api'
import config from '@common/config'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@views/Home.vue')
    },
    ...layout, ...form, ...basic
  ]
})

const tokenEmpty = ({ to, next }) => {
  const systemConfig = util.get(config.keys.config)
  if (tools.isEmpty(util.get(config.keys.token))) {
    util.set(config.keys.redirectUrl, to.fullPath)
    const id_token = util.get(config.keys.tokenSso)
    if (tools.isEmpty(id_token)) {
      util.sendRedirect(systemConfig.urlLogin)
      return next(false)
    }
    auth.verifyTokenSso({ token: id_token })
      .then(() => { util.sendRedirect(systemConfig.urlLogin) })
      .catch(() => { util.sendRedirect(systemConfig.urlLogout, config.logoutSync) })
    return next(false)
  }
  next(true)
}

const tokenNotEmpty = ({ next, id_token }) => {
  util.remove(config.keys.token)
  util.set(config.keys.tokenSso, id_token)
  auth.login({ id_token })
    .then((data) => {
      console.log('handlerToken', '-->', 'auth.login', '-->', data)
      util.set(config.keys.user, data)
      const redirectUrl = util.get(config.keys.redirectUrl)
      next(tools.isEmpty(redirectUrl) ? '/' : redirectUrl)
    })
    .catch((error) => {
      console.log('auth.login', '-->', error)
    })
}
router.beforeEach((to, from, next) => {
  const id_token = to.query.id_token
  tools.isEmpty(id_token) ? tokenEmpty({ to, next, from }) : tokenNotEmpty({ next, id_token })
})
export default router


