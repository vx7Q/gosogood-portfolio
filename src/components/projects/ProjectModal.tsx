import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  FileCode2,
} from 'lucide-react'
import type { Project } from '@/lib/data'
import { projectSources } from '@/lib/snippets'
import { cn } from '@/lib/utils'
import { useClipboard } from '@/hooks/useClipboard'
import { Modal } from '@/components/ui/Modal'
import { Toast } from '@/components/ui/Toast'
import { ProjectPreview } from './ProjectPreview'

export type ProjectModalMode = 'preview' | 'source'

interface ProjectModalProps {
  project: Project | null
  mode: ProjectModalMode
  onClose: () => void
  onModeChange: (mode: ProjectModalMode) => void
  onContact: () => void
}

export function ProjectModal({ project, mode, onClose, onModeChange, onContact }: ProjectModalProps) {
  const [activeFile, setActiveFile] = useState(0)
  const { copied, copy } = useClipboard()
  const source = project ? projectSources[project.id] : null
  const file = source?.files[activeFile] ?? source?.files[0]

  useEffect(() => {
    setActiveFile(0)
  }, [project?.id])

  if (!project || !source || !file) {
    return <Modal open={false} onClose={onClose} label="Project details">{null}</Modal>
  }

  return (
    <Modal open={Boolean(project)} onClose={onClose} label={`${project.title} case study`}>
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5 pr-16 sm:pl-6 sm:pr-20">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] font-mono text-[9px] text-white/45">
          {project.index}
        </span>
        <div className="min-w-0">
          <p className="mono text-[7.5px] text-white/25">
            {mode === 'preview' ? 'CASE STUDY' : 'SOURCE EXCERPT'} / {project.year}
          </p>
          <p className="display truncate text-lg uppercase leading-tight tracking-[-0.02em] text-pearl">
            {project.title}
          </p>
        </div>
        <div className="ml-auto hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.025] p-0.5 sm:flex">
          <button
            type="button"
            onClick={() => onModeChange('preview')}
            className={cn(
              'rounded-full px-3 py-1.5 text-[10px] transition-colors',
              mode === 'preview' ? 'bg-white/[0.08] text-white' : 'text-white/35 hover:text-white/70',
            )}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => onModeChange('source')}
            className={cn(
              'rounded-full px-3 py-1.5 text-[10px] transition-colors',
              mode === 'source' ? 'bg-white/[0.08] text-white' : 'text-white/35 hover:text-white/70',
            )}
          >
            Source
          </button>
        </div>
      </div>

      <div className="overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait" initial={false}>
          {mode === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6"
            >
              <button
                type="button"
                onClick={() => onModeChange('source')}
                className="group block w-full text-left"
                aria-label={`Open source excerpt for ${project.title}`}
              >
                <ProjectPreview theme={project.theme} interactive />
              </button>

              <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_0.8fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-2 py-1">
                      <span className="h-1 w-1 rounded-full bg-emerald-300" />
                      <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-emerald-200/70">
                        {project.status}
                      </span>
                    </span>
                    <span className="mono text-white/20">FEATURED PROJECT</span>
                  </div>

                  <h2 className="display mt-4 text-[clamp(2rem,5vw,3.2rem)] uppercase tracking-[-0.04em] text-pearl">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-[0.95rem] text-white/60">{project.tagline}</p>
                  <p className="mt-4 text-[0.83rem] leading-[1.75] text-mist">{project.description}</p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                        <p className="display text-2xl tracking-[-0.03em] text-pearl">{metric.value}</p>
                        <p className="mono mt-1.5 text-[7px] text-white/25">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="mono mt-8 text-white/30">WHAT I BUILT</h3>
                  <ul className="mt-4 space-y-3">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-mist">
                        <Check className="mt-1 h-3 w-3 shrink-0 text-electric/70" strokeWidth={2} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <aside>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                    <p className="mono text-white/25">PROJECT DETAILS</p>
                    <div className="mt-4 space-y-3.5">
                      {[
                        { label: 'ROLE', value: project.role },
                        { label: 'TIMELINE', value: project.timeline },
                        { label: 'YEAR', value: project.year },
                        { label: 'STATUS', value: project.status },
                      ].map((row) => (
                        <div key={row.label} className="flex items-start justify-between gap-4 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0">
                          <span className="mono text-[7px] text-white/20">{row.label}</span>
                          <span className="max-w-[62%] text-right text-[11px] text-white/60">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mono mt-6 text-white/25">STACK</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2 py-1 font-mono text-[8px] text-white/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={onContact}
                      className="group mt-6 flex h-11 w-full items-center justify-between rounded-full bg-pearl pl-4 pr-1.5 text-[11px] font-medium text-ink transition-colors hover:bg-white"
                    >
                      Start a similar project
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-pearl transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onModeChange('source')}
                      className="mt-2.5 flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] text-[10px] text-white/50 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <Code2 className="h-3 w-3" strokeWidth={1.5} />
                      Inspect source
                    </button>
                  </div>
                </aside>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="source"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="mono text-[7.5px] text-white/25">SELECTED SOURCE / {project.title}</p>
                  <h2 className="display mt-2 text-2xl uppercase tracking-[-0.03em] text-pearl">
                    Inside the build
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => copy(file.code)}
                  className="flex h-9 items-center gap-2 rounded-full border border-white/[0.1] px-3.5 text-[10px] text-white/50 transition-colors hover:border-white/25 hover:text-white"
                >
                  <Copy className="h-3 w-3" strokeWidth={1.5} />
                  {copied ? 'Copied' : 'Copy code'}
                </button>
              </div>
              <p className="mt-3 max-w-2xl text-[0.8rem] leading-relaxed text-mist">{source.note}</p>

              <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.09] bg-[#06080E]">
                <div className="flex overflow-x-auto border-b border-white/[0.07] bg-[#0A0C13] px-2 pt-2">
                  {source.files.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setActiveFile(index)}
                      className={cn(
                        'flex shrink-0 items-center gap-2 rounded-t-md border-b px-3 py-2 font-mono text-[9px] transition-colors',
                        activeFile === index
                          ? 'border-electric bg-white/[0.04] text-white/75'
                          : 'border-transparent text-white/25 hover:text-white/50',
                      )}
                    >
                      <FileCode2 className="h-3 w-3" strokeWidth={1.5} />
                      {item.name.split('/').pop()}
                      <span className="text-[7px] text-white/20">{item.language}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#080B11] px-4 py-2.5">
                  <span className="truncate font-mono text-[8px] text-white/25">{file.name}</span>
                  <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.14em] text-white/20">
                    READ ONLY
                  </span>
                </div>

                <div className="max-h-[44svh] overflow-auto">
                  <div className="flex min-w-max py-4">
                    <div className="select-none border-r border-white/[0.05] px-4 text-right font-mono text-[10px] leading-[1.85] text-white/[0.13]">
                      {file.code.split('\n').map((_, index) => (
                        <div key={index}>{index + 1}</div>
                      ))}
                    </div>
                    <pre className="px-5 font-mono text-[10px] leading-[1.85] text-white/55 sm:text-[11px]">
                      <code>{file.code}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onModeChange('preview')}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
                  Back to case study
                </button>
                <button
                  type="button"
                  onClick={onContact}
                  className="group flex h-10 items-center gap-2 rounded-full bg-pearl pl-4 pr-1.5 text-[10px] font-medium text-ink transition-colors hover:bg-white"
                >
                  Start a similar project
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-pearl">
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Toast show={copied} message="Code copied to clipboard" />
    </Modal>
  )
}
