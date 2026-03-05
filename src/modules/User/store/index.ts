import { defineStore } from 'pinia'
import { sleep } from '@/utils/request'

export interface IUserModule {
  locale: string
}

export const useUserStore = defineStore('User', {
  state: (): IUserModule => ({
    locale: ''
  }),

  getters: {
    locale: (state) => state.locale
  },

  actions: {
    async setLanguage(locale: string) {
      this.locale = locale
    }
  }
})
