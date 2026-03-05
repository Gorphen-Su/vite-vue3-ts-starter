import { createRouterGuards } from './permission'
import routes from './routes'

const history = process.env.VITE_ROUTER_MODE === 'hash'
  ? createWebHashHistory()
  : createWebHistory()

export const router = createRouter({
  history,
  routes
})

export function setupRouter(app: App) {
  createRouterGuards(router)
  app.use(router)
}

