import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

import selfEn from '@/locales/lang/en'
import selfZhCn from '@/locales/lang/zh-cn'


/**
 * I18n language locale mappings
 *
 * 国际化语言映射表设置
 */
export const localesMapping = [
  {
    localeCode: 'zh-cn',
    localeName: '简体中文',
    localeLang: {
      ...zhCn,
      ...selfZhCn
    }
  },
  {
    localeCode: 'en',
    localeName: 'English',
    localeLang: {
      ...en,
      ...selfEn
    }
  }
] as const

export const currentLocaleMap = (targetLocaleCode?: string) => {
  return localesMapping.find(
    localeItem => localeItem.localeCode === targetLocaleCode || 'zh-CN'
  )
}

export type LangTypes = typeof localesMapping[number]['localeCode']

/**
 * Default language locale for the application
 *
 * 应用程序的默认语言设置
 */
export const defaultLanguageLocale: LangTypes = 'en'
