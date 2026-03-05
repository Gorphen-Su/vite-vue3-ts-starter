import { currentLocaleMap } from '@/locales'

export const useLanguage = () => {
  const store = useBaseStore()

  const currentLocaleLang = computed(() => {
    let locale: any = null

    const targetLocaleItem = currentLocaleMap()

    if (targetLocaleItem) {
      locale = targetLocaleItem.localeLang
    }

    return locale
  })

  return {
    currentLocaleLang
  }
}
