import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react'
import { contactTopics, site } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useClipboard } from '@/hooks/useClipboard'
import { useLocalTime } from '@/hooks/useLocalTime'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { Toast } from '@/components/ui/Toast'

type FormState = {
  name: string
  email: string
  topic: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = {
  name: '',
  email: '',
  topic: contactTopics[0],
  message: '',
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const formCardRef = useRef<HTMLDivElement>(null)
  const { copied: emailCopied, copy: copyEmail } = useClipboard()
  const { copied: discordCopied, copy: copyDiscord } = useClipboard()
  const { copied: messageCopied, copy: copyMessage } = useClipboard()
  const localTime = useLocalTime()

  const composedMessage = useMemo(
    () =>
      [
        'Hi _gosogood,',
        '',
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Topic: ${form.topic}`,
        '',
        form.message,
      ].join('\n'),
    [form],
  )

  const mailtoHref = useMemo(() => {
    const subject = `${form.topic || 'Hello'} — from ${form.name || 'your site'}`
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composedMessage)}`
  }, [form.topic, form.name, composedMessage])

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const validate = () => {
    const nextErrors: FormErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Please tell me your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (form.topic === contactTopics[0]) nextErrors.topic = 'Choose a topic.'
    if (form.message.trim().length < 12) nextErrors.message = 'A little more detail, please (12+ characters).'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      window.location.href = mailtoHref
    }, 700)
  }

  const resetForm = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  useEffect(() => {
    if (!submitted) return
    const node = formCardRef.current
    if (!node) return
    const top = node.getBoundingClientRect().top + window.scrollY - 96
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [submitted])

  return (
    <section id="contact" className="section-space section-anchor relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 100%, rgba(110, 139, 255, 0.22), rgba(110, 139, 255, 0.08) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <Reveal>
          <SectionHeader
            index="06"
            label="Contact"
            meta="SAY HI"
            title={
              <>
                Not a job offer.
                <br />
                <span className="font-serif italic tracking-[-0.03em] text-gradient">Maybe a conversation?</span>
              </>
            }
            description="I am not taking work right now, but I am happy to talk about projects, code, PUBG, music, or anything in between."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal delay={0.03}>
              <div className="glass hover-spotlight group relative overflow-hidden rounded-[24px] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="mono text-pearl/25">Email</span>
                  <button
                    type="button"
                    onClick={() => copyEmail(site.email)}
                    className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-pearl/[0.08] px-2.5 text-[8px] uppercase tracking-[0.12em] text-pearl/35 transition-colors hover:border-pearl/20 hover:text-pearl"
                    aria-label="Copy email address"
                  >
                    {emailCopied ? (
                      <Check className="h-2.5 w-2.5" strokeWidth={2} />
                    ) : (
                      <Copy className="h-2.5 w-2.5" strokeWidth={1.5} />
                    )}
                    {emailCopied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <a href={`mailto:${site.email}`} className="group/mail mt-5 block">
                  <span className="display block break-all text-[clamp(0.88rem,1.62vw,1.55rem)] leading-snug tracking-[-0.025em] text-pearl transition-colors group-hover/mail:text-electric-soft">
                    {site.email}
                  </span>
                  <span className="mt-4 flex items-end justify-between gap-4">
                    <span className="max-w-[26rem] text-[10px] leading-relaxed text-pearl/30">
                      The fastest way to reach me. I reply when I can.
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pearl/[0.1] text-pearl/35 transition-all duration-500 group-hover/mail:rotate-45 group-hover/mail:border-electric/30 group-hover/mail:text-electric">
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.07}>
                <div className="glass flex h-full flex-col justify-between rounded-[20px] p-5">
                  <div className="flex items-center justify-between">
                    <span className="mono text-pearl/25">Discord</span>
                    <MessageCircle className="h-3 w-3 text-pearl/20" strokeWidth={1.5} />
                  </div>
                  <p className="mt-5 text-[13px] text-pearl/65">{site.discord}</p>
                  <button
                    type="button"
                    onClick={() => copyDiscord(site.discord)}
                    className="mt-4 flex items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-pearl/25 transition-colors hover:text-pearl/60"
                  >
                    <Copy className="h-2.5 w-2.5" strokeWidth={1.5} />
                    {discordCopied ? 'Copied' : 'Copy — add me'}
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.11}>
                <div className="glass flex h-full flex-col justify-between rounded-[20px] p-5">
                  <div className="flex items-center justify-between">
                    <span className="mono text-pearl/25">Local time</span>
                    <span className="h-1 w-1 rounded-full bg-electric" />
                  </div>
                  <p className="mt-5 font-mono text-[15px] tabular-nums tracking-[0.06em] text-pearl/75">
                    {localTime}
                  </p>
                  <p className="mono mt-4 text-[7px] text-pearl/25">Suphan Buri · GMT+7</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-[20px] border border-electric/[0.12] bg-electric/[0.025] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
                    </span>
                    <p className="text-[12px] text-electric-soft/70">{site.availability}</p>
                  </div>
                  <span className="mono shrink-0 text-electric-soft/30">2026</span>
                </div>
                <p className="mt-3 max-w-sm text-[10px] leading-relaxed text-pearl/30">{site.availabilityNote}</p>
              </div>
            </Reveal>

            <Reveal delay={0.19}>
              <div className="glass flex flex-col gap-4 rounded-[20px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-pearl/25" strokeWidth={1.5} />
                  <span className="text-[10px] text-pearl/40">Suphan Buri, Thailand</span>
                </div>
                <SocialLinks showLabels className="flex-wrap" iconClassName="text-[8px]" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div ref={formCardRef} className="glass relative h-full overflow-hidden rounded-[24px] p-5 sm:p-7 lg:p-8">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-electric/[0.08] blur-[60px]"
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="mono flex items-center gap-2 text-pearl/25">
                    <Mail className="h-3 w-3" strokeWidth={1.5} />
                    Say hello
                  </p>
                  <h3 className="display mt-2 text-2xl tracking-[-0.03em] text-pearl">
                    Tell me what&apos;s on your mind.
                  </h3>
                </div>
                <span className="mono hidden text-pearl/15 sm:block">Form / 01</span>
              </div>

              <div className="relative mt-7 h-px w-full bg-pearl/[0.07]" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.08, type: 'spring', stiffness: 220, damping: 18 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-electric/20 bg-electric/[0.07] text-electric"
                    >
                      <Check className="h-5 w-5" strokeWidth={2} />
                    </motion.span>
                    <h4 className="display mt-6 text-2xl tracking-[-0.03em] text-pearl">Message ready.</h4>
                    <p className="mt-3 max-w-sm text-[0.82rem] leading-relaxed text-mist">
                      Your email app should open with everything filled in. If it didn&apos;t, copy the message and
                      send it directly to{' '}
                      <a
                        href={`mailto:${site.email}`}
                        className="break-all text-pearl/70 underline underline-offset-2"
                      >
                        {site.email}
                      </a>
                      .
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => copyMessage(composedMessage)}
                        className="flex h-10 items-center gap-2 rounded-full border border-pearl/[0.12] bg-pearl/[0.03] px-4 text-[10px] text-pearl/60 transition-colors hover:border-pearl/25 hover:text-pearl"
                      >
                        {messageCopied ? (
                          <Check className="h-3 w-3" strokeWidth={2} />
                        ) : (
                          <Copy className="h-3 w-3" strokeWidth={1.5} />
                        )}
                        {messageCopied ? 'Copied' : 'Copy message'}
                      </button>
                      <a
                        href={mailtoHref}
                        className="flex h-10 items-center gap-2 rounded-full bg-pearl px-4 text-[10px] font-medium text-ink transition-colors hover:bg-white"
                      >
                        <Send className="h-3 w-3" strokeWidth={1.75} />
                        Open email app
                      </a>
                    </div>

                    <div className="mt-6 max-w-md rounded-xl border border-pearl/[0.07] bg-pearl/[0.015] px-5 py-4 text-left">
                      <p className="mono text-[7px] text-pearl/20">Quick summary</p>
                      <div className="mt-2.5 grid gap-1.5 text-[10px] text-pearl/40 sm:grid-cols-2">
                        <span>
                          <span className="text-pearl/20">From:</span> {form.name}
                        </span>
                        <span>
                          <span className="text-pearl/20">Topic:</span> {form.topic}
                        </span>
                        <span className="break-all sm:col-span-2">
                          <span className="text-pearl/20">Email:</span> {form.email}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-6 text-[9px] uppercase tracking-[0.14em] text-pearl/30 underline-offset-4 transition-colors hover:text-pearl/60 hover:underline"
                    >
                      Write another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-6"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mono mb-2 block text-pearl/30">
                          Your name <span className="text-electric/70">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(event) => updateField('name', event.target.value)}
                          placeholder="Your name"
                          className={cn('field', errors.name && 'field-error')}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="contact-name-error" className="mt-1.5 font-mono text-[8px] text-rose-300/80">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="mono mb-2 block text-pearl/30">
                          Email <span className="text-electric/70">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(event) => updateField('email', event.target.value)}
                          placeholder="you@example.com"
                          className={cn('field', errors.email && 'field-error')}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="contact-email-error" className="mt-1.5 font-mono text-[8px] text-rose-300/80">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="contact-topic" className="mono mb-2 block text-pearl/30">
                          What is this about? <span className="text-electric/70">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="contact-topic"
                            name="topic"
                            value={form.topic}
                            onChange={(event) => updateField('topic', event.target.value)}
                            className={cn(
                              'field appearance-none pr-9',
                              form.topic === contactTopics[0] ? 'text-pearl/40' : 'text-pearl',
                              errors.topic && 'field-error',
                            )}
                            aria-invalid={Boolean(errors.topic)}
                            aria-describedby={errors.topic ? 'contact-topic-error' : undefined}
                          >
                            {contactTopics.map((option) => (
                              <option key={option} value={option} className="bg-panel text-pearl">
                                {option}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-pearl/25"
                            strokeWidth={1.5}
                          />
                        </div>
                        {errors.topic && (
                          <p id="contact-topic-error" className="mt-1.5 font-mono text-[8px] text-rose-300/80">
                            {errors.topic}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="contact-message" className="mono text-pearl/30">
                          Your message <span className="text-electric/70">*</span>
                        </label>
                        <span
                          className={cn(
                            'font-mono text-[7px]',
                            form.message.length > 720 ? 'text-rose-300/80' : 'text-pearl/15',
                          )}
                        >
                          {form.message.length} / 800
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        maxLength={800}
                        value={form.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        placeholder="What are you playing, listening to, or building?"
                        className={cn('field min-h-[130px] resize-none', errors.message && 'field-error')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="contact-message-error" className="mt-1.5 font-mono text-[8px] text-rose-300/80">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="relative overflow-hidden rounded-full p-[1px]">
                        <span
                          className="absolute inset-[-200%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,transparent_285deg,#6E8BFF_325deg,#F2F0E8_360deg)]"
                          aria-hidden="true"
                        />
                        <button
                          type="submit"
                          disabled={sending}
                          className="group relative flex h-12 w-full items-center justify-between rounded-full bg-pearl py-1.5 pl-6 pr-1.5 text-[12px] font-medium text-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-80"
                        >
                          {sending ? 'Preparing your message…' : 'Send message'}
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-pearl transition-transform duration-500 group-hover:rotate-45">
                            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                        </button>
                      </div>
                      <p className="mono mt-3 text-center text-[6.5px] leading-relaxed text-pearl/15">
                        Opens your email app — no trackers, no newsletters
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <Toast show={emailCopied} message="Email copied to clipboard" />
      <Toast show={discordCopied} message="Discord handle copied" />
      <Toast show={messageCopied} message="Message copied to clipboard" />
    </section>
  )
}
