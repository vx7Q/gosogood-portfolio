import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Translation } from './copy'
import { defaultLanguage, isLanguage, languageMeta, storageKey, type Language } from './language'
import { localizeProjects, localizeSkills, interpolate, type LocalizedProject, type LocalizedSkill, type TemplateValues } from './localized'

interface I18nValue {
  lang: Language
  setLang: (language: Language) => void
  copy: Translation
  projects: LocalizedProject[]
  skills: LocalizedSkill[]
  format: (template: string, values: TemplateValues) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function readInitialLanguage(): Language {
  if (typeof window === 'undefined') return defaultLanguage
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('lang')
    if (isLanguage(fromQuery)) return fromQuery
    const stored = window.localStorage.getItem(storageKey)
    return isLanguage(stored) ? stored : defaultLanguage
  } catch {
    return defaultLanguage
  }
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let element = document.head.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    if (hreflang) element.setAttribute('hreflang', hreflang)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readInitialLanguage)

  const setLang = useCallback((language: Language) => {
    setLangState(language)
    try {
      window.localStorage.setItem(storageKey, language)
      const url = new URL(window.location.href)
      if (language === defaultLanguage) {
        url.searchParams.delete('lang')
      } else {
        url.searchParams.set('lang', language)
      }
      window.history.replaceState(window.history.state, '', url)
    } catch {
      // Storage and history can be unavailable in private or restricted contexts.
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, lang)
    } catch {
      // Keep the language in memory if persistence is blocked.
    }
  }, [lang])

  const copy = translations[lang]
  const projects = useMemo(() => localizeProjects(copy), [copy])
  const skills = useMemo(() => localizeSkills(copy), [copy])

  const format = useCallback(
    (template: string, values: TemplateValues) => interpolate(template, values),
    [],
  )

  useEffect(() => {
    const meta = languageMeta[lang]
    const url = 'https://gosogood.xyz/'

    document.documentElement.lang = meta.htmlLang
    document.title = copy.meta.title

    setMeta('name', 'description', copy.meta.description)
    setMeta('property', 'og:title', copy.meta.title)
    setMeta('property', 'og:description', copy.meta.description)
    setMeta('property', 'og:locale', meta.ogLocale)
    setMeta('property', 'og:image:alt', copy.meta.imageAlt)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', copy.meta.title)
    setMeta('name', 'twitter:description', copy.meta.description)
    setMeta('name', 'twitter:image:alt', copy.meta.imageAlt)

    setLink('alternate', `${url}?lang=th`, 'th')
    setLink('alternate', `${url}?lang=en`, 'en')
    setLink('alternate', `${url}?lang=zh`, 'zh-CN')
    setLink('alternate', `${url}`, 'x-default')
  }, [lang, copy])

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, copy, projects, skills, format }),
    [lang, setLang, copy, projects, skills, format],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside LanguageProvider')
  return context
}
