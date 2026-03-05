import { currentLocaleMap, localesMapping } from '@/locales'
import { isUndefined } from '@/utils/type'

const Layout = () => import('@/components/Layout/index.vue')


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/components/Layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Main',
        component: () => import('@/modules/Main/pages/index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('@/modules/User/pages/login.vue'),
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/components/404.vue')
  }
]

export default routes
