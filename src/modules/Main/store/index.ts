import { defineStore } from 'pinia'
import { sleep } from '@/utils/request'

export interface IMainModule {
  demoList: any
}

export const useMainStore = defineStore('Main', {
  state: (): IMainModule => ({
    demoList: {}
  }),

  getters: {
    demoList: (state) => state.demoList
  },

  actions: {
    async getDemoList() {
      await sleep(300)
      return this.demoList
    }
  }
})

export default useMainStore
