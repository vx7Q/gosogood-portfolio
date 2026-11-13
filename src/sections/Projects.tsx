import { useState } from 'react'
import { ArrowUpRight, Github, Plus } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import type { LocalizedProject } from '@/lib/localized'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { ProjectPreview } from '@/components/projects/ProjectPreview'
import { ProjectModal } from '@/components/projects/ProjectModal'

export function Projects() {
  const [selected, setSelected] = useState<LocalizedProject | null>(null)
  const { copy, projects } = useI18n()
  const { projects: projectsCopy } = copy
  const { labels } = projectsCopy

  return (
    <section id="work" className="section-space section-anchor relative">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="03"
            label={projectsCopy.label}
            meta={projectsCopy.meta}
            title={
              <>
                {projectsCopy.titleLead}
                <br />
                <span className="accent-serif italic tracking-[-0.03em] text-gradient">
                  {projectsCopy.titleAccent}
                </span>
              </>
            }
            description={projectsCopy.description}
          />
        </Reveal>

        <div className="mt-14 space-y-5">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1
            const isRetired = project.retired
            return (
              <Reveal key={project.id}>
                <SpotlightCard className="glass overflow-hidden rounded-[30px] p-2 transition-colors duration-500 hover:border-pearl/[0.14] sm:p-3">
                  <div className="grid lg:grid-cols-12">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        'group/preview relative block rounded-[24px] p-2 sm:p-3 lg:col-span-7',
                        reversed && 'lg:order-2',
                      )}
                      aria-label={`${isRetired ? labels.ariaArchive : labels.ariaLive} ${project.title}`}
                    >
                      <ProjectPreview id={project.id} />
                      <span className="pointer-events-none absolute inset-2 flex items-end justify-end rounded-[24px] bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/preview:opacity-100 sm:inset-3">
                        <span className="m-3 flex items-center gap-1.5 rounded-full bg-pearl px-3.5 py-2 text-[9px] font-medium text-ink">
                          {isRetired ? labels.visitArchive : labels.openLive}
                          <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
                        </span>
                      </span>
                    </a>

                    <div
                      className={cn(
                        'relative flex flex-col justify-between p-5 sm:p-7 lg:col-span-5 lg:p-8',
                        reversed && 'lg:order-1',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-5 top-4 select-none font-display text-[5.5rem] leading-none tracking-[-0.08em] text-pearl/[0.022]"
                      >
                        {project.index}
                      </span>

                      <div>
                        <div className="flex items-center justify-between gap-4 border-b border-pearl/[0.07] pb-4">
                          <span className="mono text-pearl/25">
                            {labels.project} / {project.index}
                          </span>
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.1em]',
                              isRetired
                                ? 'border-pearl/[0.1] bg-pearl/[0.03] text-pearl/35'
                                : 'border-electric/20 bg-electric/[0.06] text-electric-soft/70',
                            )}
                          >
                            <span
                              className={cn(
                                'h-1 w-1 rounded-full',
                                isRetired ? 'bg-pearl/35' : 'bg-electric',
                              )}
                            />
                            {project.status}
                          </span>
                        </div>

                        <p className="mono mt-6 text-pearl/25">{project.subtitle}</p>
                        <h3 className="display mt-2 text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.98] tracking-[-0.04em] text-pearl">
                          {project.title}
                        </h3>
                        <p className="mt-4 max-w-md text-pretty text-[0.88rem] leading-[1.75] text-mist">
                          {project.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-pearl/[0.08] bg-pearl/[0.025] px-2.5 py-1 text-[8px] uppercase tracking-[0.08em] text-pearl/35"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-pearl/[0.07] pt-4">
                          {project.facts.map((fact) => (
                            <div key={fact} className="flex items-start gap-1.5">
                              <span
                                className={cn(
                                  'mt-1 h-1 w-1 shrink-0 rounded-full',
                                  isRetired ? 'bg-pearl/30' : 'bg-electric/60',
                                )}
                              />
                              <span className="text-[8px] leading-snug text-pearl/30">{fact}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <button
                          type="button"
                          onClick={() => setSelected(project)}
                          className="group/case inline-flex h-10 items-center gap-3 rounded-full bg-pearl pl-4 pr-1.5 text-[10px] font-medium text-ink transition-colors hover:bg-white"
                        >
                          {labels.openCase}
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-pearl transition-transform duration-500 group-hover/case:rotate-45">
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </span>
                        </button>

                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-pearl/35 transition-colors hover:text-pearl"
                        >
                          {isRetired ? labels.archive : labels.liveSite}
                          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:rotate-45" />
                        </a>
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="group/link inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-pearl/35 transition-colors hover:text-pearl"
                          >
                            <Github className="h-3 w-3" strokeWidth={1.6} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-pearl/[0.07] bg-pearl/[0.015] px-5 py-4">
            <p className="text-[10px] leading-relaxed text-pearl/30">{labels.footerNote}</p>
            <a
              href="https://github.com/vx7Q"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-pearl/45 transition-colors hover:text-pearl"
            >
              {labels.browseGithub}
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
