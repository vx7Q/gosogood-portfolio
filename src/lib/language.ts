export const languages = ['th', 'en', 'zh'] as const

export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'th'

export const storageKey = 'gosogood-lang'

export const languageMeta: Record<
  Language,
  {
    short: string
    nativeName: string
    englishName: string
    htmlLang: string
    ogLocale: string
  }
> = {
  th: {
    short: 'TH',
    nativeName: 'ไทย',
    englishName: 'Thai',
    htmlLang: 'th',
    ogLocale: 'th_TH',
  },
  en: {
    short: 'EN',
    nativeName: 'English',
    englishName: 'English',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
  zh: {
    short: '中',
    nativeName: '中文',
    englishName: 'Chinese',
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
  },
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (languages as readonly string[]).includes(value)
}
