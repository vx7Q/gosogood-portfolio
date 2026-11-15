import { Globe2 } from 'lucide-react'
import { languages, languageMeta } from '@/lib/language'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  size?: 'sm' | 'md'
  className?: string
}

export function LanguageSwitcher({ size = 'md', className }: LanguageSwitcherProps) {
  const { lang, setLang, copy } = useI18n()

  return (
    <div role="group" aria-label={copy.common.language} className={cn('flex shrink-0 items-center gap-1', className)}>
      {languages.map((language) => {
        const active = lang === language
        const meta = languageMeta[language]
        return (
          <button
            key={language}
            type="button"
            lang={meta.htmlLang}
            onClick={() => setLang(language)}
            aria-pressed={active}
            aria-label={meta.nativeName}
            title={meta.nativeName}
            className={cn(
              'relative border-b-2 font-mono uppercase leading-none transition-colors duration-300',
              size === 'sm'
                ? 'h-8 min-w-[30px] border-b px-1 text-[11px] tracking-[0.06em]'
                : 'h-9 min-w-[36px] px-1.5 text-[12px] tracking-[0.08em]',
              active
                ? 'border-electric text-pearl'
                : 'border-transparent text-pearl/40 hover:text-pearl',
            )}
          >
            {meta.short}
          </button>
        )
      })}
    </div>
  )
}

export function LanguagePicker({ className }: { className?: string }) {
  const { lang, setLang, copy } = useI18n()

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <p className="mono">{copy.common.language}</p>
        <Globe2 className="h-4 w-4 text-pearl/40" strokeWidth={1.4} />
      </div>

      <div role="group" aria-label={copy.common.language} className="mt-3 grid grid-cols-3 gap-2">
        {languages.map((language) => {
          const active = lang === language
          const meta = languageMeta[language]
          return (
            <button
              key={language}
              type="button"
              lang={meta.htmlLang}
              onClick={() => setLang(language)}
              aria-pressed={active}
              className={cn(
                'group relative rounded-lg border px-3 py-3 text-left transition-colors duration-300',
                active
                  ? 'border-electric bg-electric/[0.06]'
                  : 'border-pearl/[0.14] bg-panel hover:border-pearl/30',
              )}
            >
              <span
                className={cn(
                  'block truncate text-[14px] leading-tight',
                  active ? 'text-pearl' : 'text-pearl/65 group-hover:text-pearl',
                )}
              >
                {meta.nativeName}
              </span>
              <span className="mono mt-1.5 block text-[10px] tracking-[0.08em] text-pearl/45">
                {meta.englishName}
              </span>
              {active && <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-electric" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
