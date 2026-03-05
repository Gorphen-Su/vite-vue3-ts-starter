import { useMainStore } from '@/modules/Main/store'
import { useUserStore } from '@/modules/User/store'

export default function useBaseStore() {
  return {
    Main: useMainStore(),
    User: useUserStore()
  }
}

// 也导出单个 store 供直接使用
export { useMainStore }
