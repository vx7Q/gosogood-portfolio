import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import type { LocalizedProject } from '@/lib/localized'
import { useLockBody } from '@/hooks/useLockBody'
import { cn } from '@/lib/utils'
import { ProjectPreview } from '@/components/projects/ProjectPreview'

interface ProjectModalProps {
  project: LocalizedProject | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()
  const { copy } = useI18n()
  const { labels, modal } = copy.projects

  useLockBody(Boolean(project))

  useEffect(() => {
    if (!project) return

    closeRef.current?.focus()

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [project, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-ink/80 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <div className="flex min-h-full w-full items-start justify-center py-2 sm:py-6">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-pearl/[0.1] bg-panel shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-pearl/[0.07] bg-panel/95 px-5 py-4 backdrop-blur-xl sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="mono text-pearl/25">
                    {labels.caseStudy} / {project.index}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-electric shadow-[0_0_8px_#6E8BFF]" />
                  <span className="mono text-pearl/15">{project.year}</span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-pearl/[0.1] bg-pearl/[0.03] text-pearl/50 transition-colors hover:border-pearl/25 hover:text-pearl"
                  aria-label={modal.close}
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>

              <div className="overflow-y-auto">
                <div className="p-5 sm:p-8">
                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
                            project.retired
                              ? 'border-pearl/[0.1] bg-pearl/[0.03]'
                              : 'border-electric/20 bg-electric/[0.06]',
                          )}
                        >
                          <span
                            className={cn(
                              'h-1 w-1 rounded-full',
                              project.retired ? 'bg-pearl/40' : 'bg-electric',
                            )}
                          />
                          <span
                            className={cn(
                              'font-mono text-[7px] uppercase tracking-[0.12em]',
                              project.retired ? 'text-pearl/40' : 'text-electric-soft/70',
                            )}
                          >
                            {project.status}
                          </span>
                        </span>
                        <span className="mono text-pearl/20">{project.subtitle}</span>
                      </div>
                      <h2
                        id="project-modal-title"
                        className="display mt-4 text-[clamp(2.1rem,4.5vw,3.8rem)] leading-[0.95] tracking-[-0.045em] text-pearl"
                      >
                        {project.title}
                      </h2>
                      <p className="mt-4 max-w-xl text-pretty text-[0.9rem] leading-[1.75] text-mist">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-pearl px-4 text-[10px] font-medium text-ink transition-colors hover:bg-white"
                      >
                        {project.retired ? labels.visitArchive : labels.liveSite}
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </a>
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-10 items-center gap-2 rounded-full border border-pearl/[0.12] bg-pearl/[0.03] px-4 text-[10px] text-pearl/60 transition-colors hover:border-pearl/25 hover:text-pearl"
                        >
                          <Github className="h-3.5 w-3.5" strokeWidth={1.6} />
                          {labels.source}
                        </a>
                      )}
                    </div>
                  </div>

                  <ProjectPreview id={project.id} className="mt-8" />

                  <div className="mt-10 grid gap-10 lg:grid-cols-12">
                    <div className="space-y-8 lg:col-span-7">
                      <section>
                        <h3 className="mono text-pearl/25">{modal.brief}</h3>
                        <p className="mt-3 text-pretty text-[0.9rem] leading-[1.8] text-mist">
                          {project.caseStudy.brief}
                        </p>
                      </section>

                      <section>
                        <h3 className="mono text-pearl/25">{modal.built}</h3>
                        <p className="mt-3 text-pretty text-[0.9rem] leading-[1.8] text-mist">
                          {project.caseStudy.built}
                        </p>
                      </section>

                      <section>
                        <h3 className="mono text-pearl/25">{modal.decisions}</h3>
                        <ul className="mt-3 space-y-2.5">
                          {project.caseStudy.decisions.map((decision) => (
                            <li key={decision} className="flex gap-3 text-[0.86rem] leading-relaxed text-pearl/55">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric/70" />
                              {decision}
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    <aside className="space-y-4 lg:col-span-5">
                      <div className="glass rounded-2xl p-5">
                        <p className="mono text-pearl/20">{modal.stack}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.caseStudy.stack.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-pearl/[0.08] bg-pearl/[0.03] px-2.5 py-1 text-[9px] text-pearl/50"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="glass rounded-2xl p-5">
                        <p className="mono text-pearl/20">{modal.learned}</p>
                        <p className="mt-3 text-[0.86rem] leading-[1.75] text-pearl/50">
                          {project.caseStudy.learned}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-electric/10 bg-electric/[0.025] p-5">
                        <p className="mono text-electric-soft/40">{modal.notes}</p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                          {project.facts.map((fact) => (
                            <span key={fact} className="flex items-center gap-1.5 text-[9px] text-pearl/35">
                              <span className="h-1 w-1 rounded-full bg-electric/60" />
                              {fact}
                            </span>
                          ))}
                        </div>
                      </div>
                    </aside>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-pearl/[0.07] pt-5">
                    <span className="mono text-pearl/15">
                      {modal.builtInPublic} / {project.year}
                    </span>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-[9px] uppercase tracking-[0.14em] text-pearl/30 underline-offset-4 transition-colors hover:text-pearl/60 hover:underline"
                    >
                      {modal.close}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
