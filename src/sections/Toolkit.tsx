import type { ReactNode } from 'react'
import { Atom, GitBranch, Github, Globe2, Sparkles, Wind, Zap } from 'lucide-react'
import { toolkitGroups } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

const toolIcons: Record<string, ReactNode> = {
  html: <span className="font-mono text-[10px] font-medium text-electric-soft">&lt;/&gt;</span>,
  css: <span className="font-mono text-[13px] font-medium text-electric-soft">#</span>,
  js: <span className="font-mono text-[10px] font-medium text-pearl/80">JS</span>,
  ts: <span className="font-mono text-[10px] font-medium text-pearl/80">TS</span>,
  react: <Atom className="h-4 w-4 text-electric" strokeWidth={1.4} />,
  tailwind: <Wind className="h-4 w-4 text-electric-soft" strokeWidth={1.4} />,
  motion: <Sparkles className="h-4 w-4 text-electric" strokeWidth={1.4} />,
  vite: <Zap className="h-4 w-4 text-electric-soft" strokeWidth={1.4} />,
  git: <GitBranch className="h-4 w-4 text-electric-soft" strokeWidth={1.4} />,
  github: <Github className="h-4 w-4 text-pearl" strokeWidth={1.4} />,
  netlify: <Globe2 className="h-4 w-4 text-electric-soft" strokeWidth={1.4} />,
}

export function Toolkit() {
  const { copy, format } = useI18n()
  const { toolkit, about } = copy
  const toolCount = toolkitGroups.reduce((total, group) => total + group.items.length, 0)
  const notes: Record<string, string> = {
    ...toolkit.groups.languages.notes,
    ...toolkit.groups.framework.notes,
    ...toolkit.groups.workflow.notes,
  }

  return (
    <section id="toolkit" className="section-space section-anchor relative">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="02"
            label={toolkit.label}
            meta={toolkit.meta}
            title={
              <>
                {toolkit.titleLead}{' '}
                <span className="accent-serif italic tracking-[-0.03em] text-gradient-blue">
                  {toolkit.titleAccent}
                </span>
                {toolkit.titleTail}
              </>
            }
            description={format(toolkit.description, { count: toolCount })}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="glass relative overflow-hidden rounded-[28px] p-6 sm:p-7 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <span className="mono text-pearl/25">{toolkit.coreTools}</span>
                <span className="mono text-pearl/15">2026</span>
              </div>
              <p className="display mt-6 text-[6.5rem] leading-[0.8] tracking-[-0.07em] text-gradient">
                {toolCount}
              </p>
              <p className="mt-5 max-w-xs text-[0.88rem] leading-[1.75] text-mist">
                {toolkit.coreNote}
              </p>

              <div className="mt-7 border-t border-pearl/[0.07] pt-5">
                <p className="mono text-pearl/20">{toolkit.craftLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {toolkit.craft.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-pearl/[0.08] bg-pearl/[0.025] px-2.5 py-1 text-[8px] uppercase tracking-[0.1em] text-pearl/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-electric/10 bg-electric/[0.03] p-4">
                <p className="mono text-electric-soft/50">{toolkit.learningNow}</p>
                <ul className="mt-2 space-y-1.5">
                  {about.focus.map((item) => (
                    <li key={item.title} className="flex items-center gap-2 text-[10px] text-pearl/45">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-electric/70" />
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-8">
            {toolkitGroups.map((group, groupIndex) => {
              const groupCopy = toolkit.groups[group.id]
              return (
                <Reveal key={group.id} delay={groupIndex * 0.06}>
                  <div className="glass rounded-[24px] p-5 sm:p-6">
                    <div className="flex items-center justify-between border-b border-pearl/[0.07] pb-4">
                      <span className="mono text-pearl/40">{groupCopy.label}</span>
                      <span className="mono text-pearl/15">0{group.items.length}</span>
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {group.items.map((item, index) => (
                        <div
                          key={item.name}
                          className="group flex items-center gap-3 rounded-2xl border border-pearl/[0.06] bg-pearl/[0.015] p-3 transition-colors duration-300 hover:border-pearl/[0.14] hover:bg-pearl/[0.04]"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-pearl/[0.08] bg-panel">
                            {toolIcons[item.icon]}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-[12px] text-pearl">{item.name}</p>
                            <p className="mt-0.5 truncate text-[9px] text-pearl/30">{notes[item.icon]}</p>
                          </div>
                          <span className="ml-auto font-mono text-[7px] text-pearl/10 transition-colors group-hover:text-electric/60">
                            0{index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
