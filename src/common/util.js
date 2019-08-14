import { localStorage } from '@assets/script/common'
import config from './config'
export default {
  sendRedirect(url, flag) {
    if (flag === true) {
      window.top.postMessage({ 'action': 'logout' }, '*');
    }
    const removeKeys = [
      config.keys.token,
      config.keys.tokenSso,
      config.keys.user,
    ]
    for (const key of removeKeys) {
      this.remove(key)
    }

    setTimeout(() => {
      window.location.href = url
    }, 0);
  },
  set(key, value) { return localStorage.set(key, value, config.encrypted) },
  get(key) { return localStorage.get(key, config.encrypted) },
  remove(key) { localStorage.remove(key) }
}