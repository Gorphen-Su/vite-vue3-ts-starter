import { createPinia } from 'pinia'

export const pinia = createPinia()

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export { pinia as store }
