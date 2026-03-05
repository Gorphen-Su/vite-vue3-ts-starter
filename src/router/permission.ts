import { allowlist } from '@/router/auth-list'
import { systemTitle } from '@/locales/data'

import NProgress from 'nprogress'
import type { Router } from 'vue-router'

NProgress.configure({
  showSpinner: false
})

export function createRouterGuards(router: Router) {

  router.beforeEach(async (to, from, next) => {
    // const userAccountStore = useUserAccountStore()
    NProgress.start()

    document.title = `${ to.meta.title || '' } - ${ systemTitle }`

    // const currentRouteLocale = to.params.locale

    if (
      allowlist.find(
        name => to.name === name
      )
    ) {
      next()
      return
    }

    // if (!Cookie.get('token')) {
    //   next(`/${ currentRouteLocale || userAccountStore.locale }/user/login`)
    //   return
    // }

    // // 获取用户信息
    // const res = await userAccountStore.getUserInfo()

    // if (res.error !== 0) {
    //   userAccountStore.setLanguage({
    //     locale: currentRouteLocale || res.data?.language || userAccountStore.locale
    //   })
    //   Cookie.remove('token')
    //   next(`/${ currentRouteLocale || userAccountStore.locale }/user/login`)
    //   return
    // }

    // // TODO: It must be used together with the backend
    // userAccountStore.setLanguage({
    //   locale: currentRouteLocale || res.data?.language
    // })
    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}

