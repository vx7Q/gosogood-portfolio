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
    <div
      role="group"
      aria-label={copy.common.language}
      className={cn(
        'relative flex shrink-0 items-center rounded-full border border-pearl/[0.1] bg-pearl/[0.025] p-0.5',
        className,
      )}
    >
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
              'relative rounded-full font-mono uppercase leading-none transition-all duration-300',
              size === 'sm'
                ? 'h-7 min-w-[27px] px-1.5 text-[8px] tracking-[0.08em]'
                : 'h-8 min-w-[34px] px-2 text-[9px] tracking-[0.1em]',
              active
                ? 'bg-pearl text-ink shadow-[0_4px_16px_rgba(0,0,0,0.35)]'
                : 'text-pearl/40 hover:bg-pearl/[0.05] hover:text-pearl',
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
        <p className="mono text-pearl/25">{copy.common.language}</p>
        <Globe2 className="h-3.5 w-3.5 text-pearl/25" strokeWidth={1.4} />
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
                'group relative overflow-hidden rounded-2xl border px-3 py-3 text-left transition-all duration-300',
                active
                  ? 'border-electric/35 bg-electric/[0.08]'
                  : 'border-pearl/[0.08] bg-pearl/[0.02] hover:border-pearl/[0.2] hover:bg-pearl/[0.04]',
              )}
            >
              <span
                className={cn(
                  'block truncate text-[12px] leading-tight transition-colors',
                  active ? 'text-pearl' : 'text-pearl/55 group-hover:text-pearl/80',
                )}
              >
                {meta.nativeName}
              </span>
              <span
                className={cn(
                  'mono mt-1.5 block text-[6.5px] tracking-[0.12em]',
                  active ? 'text-electric-soft/55' : 'text-pearl/20',
                )}
              >
                {meta.englishName}
              </span>
              {active && (
                <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_#6E8BFF]" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
