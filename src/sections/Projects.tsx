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
                <SpotlightCard className="glass overflow-hidden p-2 transition-colors duration-500 hover:border-pearl/30 sm:p-3">
                  <div className="grid lg:grid-cols-12">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        'group/preview relative block rounded-lg p-2 sm:p-3 lg:col-span-7',
                        reversed && 'lg:order-2',
                      )}
                      aria-label={`${isRetired ? labels.ariaArchive : labels.ariaLive} ${project.title}`}
                    >
                      <ProjectPreview id={project.id} />
                      <span className="pointer-events-none absolute inset-2 flex items-end justify-end rounded-lg bg-gradient-to-t from-[#0d0d0d]/[0.65] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/preview:opacity-100 sm:inset-3">
                        <span className="m-3 flex items-center gap-1.5 rounded-full bg-pearl px-3.5 py-2 text-[11px] font-medium text-ink">
                          {isRetired ? labels.visitArchive : labels.openLive}
                          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
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
                        <div className="flex items-center justify-between gap-4 border-b border-pearl/[0.12] pb-4">
                          <span className="mono">{labels.project} / {project.index}</span>
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em]',
                              isRetired
                                ? 'border-pearl/[0.2] bg-panel text-pearl/60'
                                : 'border-electric/30 bg-electric/[0.06] text-electric',
                            )}
                          >
                            <span
                              className={cn(
                                'h-1 w-1 rounded-full',
                                isRetired ? 'bg-pearl/40' : 'bg-electric',
                              )}
                            />
                            {project.status}
                          </span>
                        </div>

                        <p className="mono mt-6 text-pearl/50">{project.subtitle}</p>
                        <h3 className="display mt-2 text-[clamp(1.9rem,3vw,2.9rem)] leading-[0.98] tracking-[-0.04em] text-pearl">
                          {project.title}
                        </h3>
                        <p className="mt-4 max-w-md text-pretty text-[0.98rem] leading-[1.75] text-mist">
                          {project.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-pearl/[0.18] bg-panel px-2.5 py-1 text-[11px] text-pearl/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 grid gap-2 border-t border-pearl/[0.12] pt-4 sm:grid-cols-3">
                          {project.facts.map((fact) => (
                            <div key={fact} className="flex items-start gap-2">
                              <span
                                className={cn(
                                  'mt-1.5 h-1 w-1 shrink-0 rounded-full',
                                  isRetired ? 'bg-pearl/40' : 'bg-electric',
                                )}
                              />
                              <span className="text-[11px] leading-snug text-pearl/60">{fact}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <button
                          type="button"
                          onClick={() => setSelected(project)}
                          className="group/case inline-flex h-10 items-center gap-3 rounded-full bg-pearl pl-4 pr-1.5 text-[12px] font-medium text-ink transition-colors hover:bg-electric hover:text-white"
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
                          className="group/link inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-pearl/60 transition-colors hover:text-pearl"
                        >
                          {isRetired ? labels.archive : labels.liveSite}
                          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:rotate-45" />
                        </a>
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="group/link inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-pearl/60 transition-colors hover:text-pearl"
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
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-pearl/[0.14] bg-panel px-5 py-4">
            <p className="max-w-3xl text-[13px] leading-relaxed text-pearl/60">{labels.footerNote}</p>
            <a
              href="https://github.com/vx7Q"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-pearl/70 transition-colors hover:text-electric"
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
