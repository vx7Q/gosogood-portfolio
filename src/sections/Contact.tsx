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
import { site } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
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
  topic: '',
  message: '',
}

function EmailText({ email }: { email: string }) {
  const at = email.indexOf('@')
  if (at < 1) return <>{email}</>
  return (
    <>
      {email.slice(0, at)}
      <wbr />@{email.slice(at + 1)}
    </>
  )
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
  const { copy } = useI18n()
  const { contact, common } = copy
  const { form: formText, success, toasts } = contact

  const topicLabel = useMemo(
    () => contact.topics.find((topic) => topic.id === form.topic)?.label ?? '',
    [contact.topics, form.topic],
  )

  const composedMessage = useMemo(
    () =>
      [
        formText.compose.greeting,
        '',
        `${formText.compose.name}: ${form.name}`,
        `${formText.compose.email}: ${form.email}`,
        `${formText.compose.topic}: ${topicLabel}`,
        '',
        form.message,
      ].join('\n'),
    [form, formText.compose, topicLabel],
  )

  const mailtoHref = useMemo(() => {
    const subject = `${topicLabel || formText.compose.subjectFallback} — ${
      form.name || formText.compose.fromFallback
    }`
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composedMessage)}`
  }, [topicLabel, form.name, formText.compose, composedMessage])

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const validate = () => {
    const nextErrors: FormErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = formText.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = formText.errors.email
    }
    if (!form.topic) nextErrors.topic = formText.errors.topic
    if (form.message.trim().length < 12) nextErrors.message = formText.errors.message
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
      <div className="container-page relative z-10">
        <Reveal>
          <SectionHeader
            index="06"
            label={contact.label}
            meta={contact.meta}
            title={
              <>
                {contact.titleLead}
                <br />
                <span className="accent-serif italic tracking-[-0.03em] text-gradient">
                  {contact.titleAccent}
                </span>
              </>
            }
            description={contact.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal delay={0.03}>
              <div className="glass hover-spotlight group relative overflow-hidden p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="mono">{contact.email}</span>
                  <button
                    type="button"
                    onClick={() => copyEmail(site.email)}
                    className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-pearl/[0.2] px-2.5 text-[10px] uppercase tracking-[0.08em] text-pearl/60 transition-colors hover:border-pearl/45 hover:text-pearl"
                    aria-label={contact.copyEmailAria}
                  >
                    {emailCopied ? (
                      <Check className="h-3 w-3" strokeWidth={2} />
                    ) : (
                      <Copy className="h-3 w-3" strokeWidth={1.5} />
                    )}
                    {emailCopied ? contact.copied : contact.copy}
                  </button>
                </div>
                <a href={`mailto:${site.email}`} className="group/mail mt-5 block">
                  <span className="display block text-[clamp(0.82rem,1.45vw,1.28rem)] leading-snug tracking-[-0.025em] text-pearl transition-colors group-hover/mail:text-electric">
                    <EmailText email={site.email} />
                  </span>
                  <span className="mt-4 flex items-end justify-between gap-4">
                    <span className="max-w-[26rem] text-[13px] leading-relaxed text-pearl/60">
                      {contact.emailNote}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pearl/[0.16] text-pearl/50 transition-all duration-500 group-hover/mail:rotate-45 group-hover/mail:border-electric group-hover/mail:bg-electric group-hover/mail:text-white">
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.07}>
                <div className="glass flex h-full flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="mono">{contact.discord}</span>
                    <MessageCircle className="h-3.5 w-3.5 text-pearl/40" strokeWidth={1.5} />
                  </div>
                  <p className="mt-5 text-[15px] text-pearl/85">{site.discord}</p>
                  <button
                    type="button"
                    onClick={() => copyDiscord(site.discord)}
                    className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-pearl/55 transition-colors hover:text-pearl"
                  >
                    <Copy className="h-3 w-3" strokeWidth={1.5} />
                    {discordCopied ? contact.discordCopied : contact.discordCopy}
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.11}>
                <div className="glass flex h-full flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="mono">{contact.localTime}</span>
                    <span className="h-1 w-1 rounded-full bg-electric" />
                  </div>
                  <p className="mt-5 font-mono text-[16px] tabular-nums tracking-[0.06em] text-pearl/85">
                    {localTime}
                  </p>
                  <p className="mono mt-4">{contact.timezone}</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden border border-electric/25 bg-electric/[0.05] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/40" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
                    </span>
                    <p className="text-[14px] text-pearl/80">{common.availability}</p>
                  </div>
                  <span className="mono shrink-0 text-electric">2026</span>
                </div>
                <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-pearl/60">{common.availabilityNote}</p>
              </div>
            </Reveal>

            <Reveal delay={0.19}>
              <div className="glass flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-pearl/45" strokeWidth={1.5} />
                  <span className="text-[12px] text-pearl/65">{contact.location}</span>
                </div>
                <SocialLinks showLabels className="flex-wrap" iconClassName="text-[10px]" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div ref={formCardRef} className="glass relative h-full overflow-hidden p-5 sm:p-7 lg:p-8">
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="mono flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-electric" strokeWidth={1.5} />
                    {formText.hello}
                  </p>
                  <h3 className="display mt-2 text-3xl tracking-[-0.03em] text-pearl">
                    {formText.heading}
                  </h3>
                </div>
                <span className="mono hidden sm:block">{formText.formIndex}</span>
              </div>

              <div className="relative mt-7 h-px w-full bg-pearl/[0.12]" />

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
                    <h4 className="display mt-6 text-2xl tracking-[-0.03em] text-pearl">{success.title}</h4>
                    <p className="mt-3 max-w-sm text-[1rem] leading-[1.75] text-mist">
                      {success.descriptionBefore}{' '}
                      <a
                        href={`mailto:${site.email}`}
                        className="break-words text-pearl/70 underline underline-offset-2"
                      >
                        <EmailText email={site.email} />
                      </a>
                      {success.descriptionAfter}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => copyMessage(composedMessage)}
                        className="flex h-10 items-center gap-2 rounded-full border border-pearl/[0.2] bg-panel px-4 text-[12px] text-pearl/70 transition-colors hover:border-pearl/45 hover:text-pearl"
                      >
                        {messageCopied ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={2} />
                        ) : (
                          <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                        )}
                        {messageCopied ? success.copied : success.copyMessage}
                      </button>
                      <a
                        href={mailtoHref}
                        className="flex h-10 items-center gap-2 rounded-full bg-pearl px-4 text-[12px] font-medium text-ink transition-colors hover:bg-electric hover:text-white"
                      >
                        <Send className="h-3.5 w-3.5" strokeWidth={1.75} />
                        {success.openEmail}
                      </a>
                    </div>

                    <div className="mt-6 max-w-md border border-pearl/[0.14] bg-panel px-5 py-4 text-left">
                      <p className="mono">{success.summary}</p>
                      <div className="mt-2.5 grid gap-1.5 text-[13px] text-pearl/70 sm:grid-cols-2">
                        <span>
                          <span className="text-pearl/50">{success.from}:</span> {form.name}
                        </span>
                        <span>
                          <span className="text-pearl/50">{success.topic}:</span> {topicLabel}
                        </span>
                        <span className="break-all sm:col-span-2">
                          <span className="text-pearl/50">{success.email}:</span> {form.email}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-6 text-[11px] uppercase tracking-[0.1em] text-pearl/55 underline-offset-4 transition-colors hover:text-pearl hover:underline"
                    >
                      {success.again}
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
                        <label htmlFor="contact-name" className="mono mb-2 block text-pearl/70">
                          {formText.name} <span className="text-electric">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(event) => updateField('name', event.target.value)}
                          placeholder={formText.namePlaceholder}
                          className={cn('field', errors.name && 'field-error')}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="contact-name-error" className="mt-1.5 font-mono text-[11px] text-rose-700">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="mono mb-2 block text-pearl/70">
                          {formText.email} <span className="text-electric">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(event) => updateField('email', event.target.value)}
                          placeholder={formText.emailPlaceholder}
                          className={cn('field', errors.email && 'field-error')}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="contact-email-error" className="mt-1.5 font-mono text-[11px] text-rose-700">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="contact-topic" className="mono mb-2 block text-pearl/70">
                          {formText.topic} <span className="text-electric">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="contact-topic"
                            name="topic"
                            value={form.topic}
                            onChange={(event) => updateField('topic', event.target.value)}
                            className={cn(
                              'field appearance-none pr-9',
                              form.topic === '' ? 'text-pearl/40' : 'text-pearl',
                              errors.topic && 'field-error',
                            )}
                            aria-invalid={Boolean(errors.topic)}
                            aria-describedby={errors.topic ? 'contact-topic-error' : undefined}
                          >
                            <option value="" className="bg-panel text-pearl/40">
                              {formText.topicPlaceholder}
                            </option>
                            {contact.topics.map((option) => (
                              <option key={option.id} value={option.id} className="bg-panel text-pearl">
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-pearl/45"
                            strokeWidth={1.5}
                          />
                        </div>
                        {errors.topic && (
                          <p id="contact-topic-error" className="mt-1.5 font-mono text-[11px] text-rose-700">
                            {errors.topic}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="contact-message" className="mono text-pearl/70">
                          {formText.message} <span className="text-electric">*</span>
                        </label>
                        <span
                          className={cn(
                            'font-mono text-[10px]',
                            form.message.length > 720 ? 'text-rose-700' : 'text-pearl/50',
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
                        placeholder={formText.messagePlaceholder}
                        className={cn('field min-h-[130px] resize-none', errors.message && 'field-error')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="contact-message-error" className="mt-1.5 font-mono text-[11px] text-rose-700">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={sending}
                        className="group relative flex h-12 w-full items-center justify-between rounded-full bg-pearl py-1.5 pl-6 pr-1.5 text-[14px] font-medium text-ink transition-colors hover:bg-electric hover:text-white disabled:cursor-wait disabled:opacity-80"
                      >
                        {sending ? formText.sending : formText.send}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-pearl transition-transform duration-500 group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                      </button>
                      <p className="mt-3 text-center text-[11px] leading-relaxed text-pearl/50">
                        {formText.footnote}
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <Toast show={emailCopied} message={toasts.email} />
      <Toast show={discordCopied} message={toasts.discord} />
      <Toast show={messageCopied} message={toasts.message} />
    </section>
  )
}
