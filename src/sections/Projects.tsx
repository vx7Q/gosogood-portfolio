import { useState } from 'react'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { projects, type Project } from '@/lib/data'
import { cn, scrollToId } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ProjectPreview } from '@/components/projects/ProjectPreview'
import { ProjectModal, type ProjectModalMode } from '@/components/projects/ProjectModal'

const themeStyles = {
  blue: {
    accent: '#5B8CFF',
    glow: 'from-[#1B3D8C]/25 via-transparent to-transparent',
    ring: 'group-hover:border-electric/[0.25]',
  },
  violet: {
    accent: '#A78BFA',
    glow: 'from-[#3A1C78]/25 via-transparent to-transparent',
    ring: 'group-hover:border-violet/[0.25]',
  },
  pearl: {
    accent: '#C4B5FD',
    glow: 'from-[#4B4466]/20 via-transparent to-transparent',
    ring: 'group-hover:border-[#C4B5FD]/20',
  },
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [mode, setMode] = useState<ProjectModalMode>('preview')

  const openProject = (project: Project, nextMode: ProjectModalMode) => {
    setSelected(project)
    setMode(nextMode)
  }

  const closeProject = () => setSelected(null)

  const handleContact = () => {
    setSelected(null)
    window.setTimeout(() => scrollToId('contact'), 280)
  }

  return (
    <section id="projects" className="section-space relative">
      <div className="container-page relative z-10">
        <SectionHeader
          index="04"
          label="Featured Projects"
          meta="03 SELECTED / 2025 — 2026"
          title={
            <>
              <span className="block">
                <SplitText text="Selected work." />
              </span>
              <span className="block">
                <SplitText text="Shipped with intent." wordClassName="text-gradient" delay={0.15} />
              </span>
            </>
          }
          description="Three products, three different problems. Each one designed and engineered end to end — from the first system map to the final deploy."
        />

        <div className="space-y-4 md:space-y-6">
          {projects.map((project, index) => {
            const style = themeStyles[project.theme]
            const reversed = index % 2 === 1

            return (
              <Reveal key={project.id} delay={0.04}>
                <article
                  className={cn(
                    'group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#090B12]/75 p-2 backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.15] sm:p-2.5',
                    style.ring,
                  )}
                >
                  <div
                    className={cn(
                      'pointer-events-none absolute -left-20 -top-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br opacity-60 blur-[80px]',
                      style.glow,
                    )}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute right-6 top-0 select-none font-display text-[10rem] leading-none text-white/[0.018] sm:text-[14rem]"
                    aria-hidden="true"
                  >
                    {project.index}
                  </div>

                  <div className="relative overflow-hidden rounded-[19px] border border-white/[0.045] bg-[#080A11]/60">
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
                          Project / {project.index}
                        </span>
                        <span className="h-[3px] w-[3px] rounded-full" style={{ backgroundColor: style.accent }} />
                        <span className="mono hidden text-white/15 sm:block">G/OS CASE STUDY</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="mono text-white/20">{project.year}</span>
                        <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/12 bg-emerald-300/[0.04] px-2 py-0.5">
                          <span className="h-1 w-1 rounded-full bg-emerald-300" />
                          <span className="font-mono text-[6.5px] uppercase tracking-[0.12em] text-emerald-200/60">
                            {project.status}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-0 lg:grid-cols-12">
                      {/* Preview */}
                      <div
                        className={cn(
                          'order-1 p-3 sm:p-4 lg:col-span-7 lg:p-5',
                          reversed ? 'lg:order-2' : 'lg:order-1',
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => openProject(project, 'preview')}
                          className="group relative block w-full text-left"
                          aria-label={`Open ${project.title} case study`}
                          data-cursor-label="View project"
                        >
                          <ProjectPreview theme={project.theme} interactive />
                          <span className="pointer-events-none absolute bottom-3 right-3 z-40 flex translate-y-2 items-center gap-1.5 rounded-full bg-pearl px-3 py-2 text-[9px] font-medium text-ink opacity-0 shadow-lg transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:right-4">
                            View case study
                            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                          </span>
                        </button>
                      </div>

                      {/* Content */}
                      <div
                        className={cn(
                          'order-2 flex flex-col p-5 sm:p-6 lg:col-span-5 lg:justify-between lg:p-7',
                          reversed ? 'lg:order-1' : 'lg:order-2',
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="mono text-white/20">FEATURED / {project.index}</span>
                            <span className="h-px flex-1 bg-white/[0.06]" />
                            <span className="mono" style={{ color: `${style.accent}aa` }}>
                              {project.year}
                            </span>
                          </div>

                          <h3 className="display mt-6 text-[clamp(2.5rem,4.6vw,3.8rem)] uppercase leading-none tracking-[-0.05em] text-pearl">
                            {project.title}
                            <span className="ml-1 inline-block align-top text-[0.28em]" style={{ color: style.accent }}>
                              ↗
                            </span>
                          </h3>
                          <p className="mt-3 max-w-[26rem] text-[0.92rem] leading-snug text-white/70">
                            {project.tagline}
                          </p>
                          <p className="mt-4 max-w-[27rem] text-[0.78rem] leading-relaxed text-mist">
                            {project.description}
                          </p>

                          <div className="mt-6 grid grid-cols-2 gap-4 border-y border-white/[0.07] py-4">
                            {project.metrics.map((metric) => (
                              <div key={metric.label}>
                                <p className="display text-[1.6rem] leading-none tracking-[-0.03em] text-pearl">
                                  {metric.value}
                                </p>
                                <p className="mono mt-1.5 text-[6.5px] text-white/25">{metric.label}</p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 font-mono text-[7.5px] tracking-[0.04em] text-white/35 transition-colors group-hover:border-white/[0.12] group-hover:text-white/50"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-7 flex flex-wrap items-center gap-2.5">
                          <MagneticButton
                            onClick={() => openProject(project, 'preview')}
                            className="!h-11 text-[11px]"
                          >
                            Live Demo
                          </MagneticButton>
                          <MagneticButton
                            variant="secondary"
                            onClick={() => openProject(project, 'source')}
                            className="!h-11 text-[11px]"
                            icon={<Code2 className="h-4 w-4" strokeWidth={1.5} />}
                          >
                            Source Code
                          </MagneticButton>
                        </div>
                        <p className="mono mt-3 text-[6.5px] text-white/15">
                          INTERACTIVE PREVIEW · SELECTED SOURCE EXCERPT
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.012] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] font-mono text-[8px] text-white/30">
                24
              </span>
              <div>
                <p className="text-[12px] text-white/60">More experiments live in the archive.</p>
                <p className="mono mt-1 text-[7px] text-white/20">SELECTED 03 OF 24 PROJECTS</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white"
            >
              Have something in mind? Let&apos;s talk
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-white/25 group-hover:bg-white/[0.05]">
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      <ProjectModal
        project={selected}
        mode={mode}
        onClose={closeProject}
        onModeChange={setMode}
        onContact={handleContact}
      />
    </section>
  )
}
