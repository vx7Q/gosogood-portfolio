export interface SourceFile {
  name: string
  language: string
  code: string
}

export interface ProjectSource {
  note: string
  files: SourceFile[]
}

const nebulaRoute = `import { NextResponse } from 'next/server'
import { createInsight } from '@/lib/ai'
import { requireSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const session = await requireSession()
  const { workspaceId, range } = await request.json()

  const metrics = await db.metric.aggregate({
    where: { workspaceId, range },
    _sum: { revenue: true, sessions: true },
    _avg: { conversion: true },
  })

  const insight = await createInsight(metrics)

  return NextResponse.json({ insight }, { status: 201 })
}`

const nebulaAi = `import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const insightSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  actions: z.array(z.string()).max(3),
})

export async function createInsight(metrics: Metrics) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: JSON.stringify(metrics) },
    ],
  })

  const content = completion.choices[0]?.message.content ?? '{}'
  return insightSchema.parse(JSON.parse(content))
}`

const aurumCheckout = `import { stripe } from '@/lib/stripe'
import { getProduct } from '@/lib/sanity'
import { cartSchema } from '@/lib/validation'
import { SITE_URL } from '@/lib/constants'

export async function POST(request: Request) {
  const { items } = cartSchema.parse(await request.json())

  const products = await Promise.all(
    items.map(async (item) => {
      const product = await getProduct(item.id)
      if (!product) throw new Error('Product not found')
      return { product, quantity: item.quantity }
    }),
  )

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: products.map(({ product, quantity }) => ({
      price: product.stripePriceId,
      quantity,
    })),
    allow_promotion_codes: true,
    success_url: SITE_URL + '/order/confirmed',
    cancel_url: SITE_URL + '/collection',
  })

  return Response.json({ url: session.url })
}`

const aurumGallery = `'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ProductGallery({ images }: { images: Image[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.04])

  return (
    <motion.div ref={ref} style={{ y, scale }} className="gallery">
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.url}
          alt={image.alt}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ))}
    </motion.div>
  )
}`

const pulseRealtime = `import type { Server } from 'socket.io'
import { Redis } from 'ioredis'
import { eventSchema } from './schema'

export function registerRealtime(io: Server) {
  const pub = new Redis(process.env.REDIS_URL)
  const sub = pub.duplicate()

  sub.subscribe('workspace:events')

  sub.on('message', (_channel, payload) => {
    const event = eventSchema.parse(JSON.parse(payload))
    io.to('workspace:' + event.workspaceId).emit('event', event)
  })

  io.on('connection', (socket) => {
    socket.on('workspace:join', ({ workspaceId, userId }) => {
      socket.join('workspace:' + workspaceId)
      socket.to('workspace:' + workspaceId).emit('presence:join', { userId })
    })

    socket.on('workspace:leave', ({ workspaceId }) => {
      socket.leave('workspace:' + workspaceId)
    })
  })

  return { publish: (event: Event) => pub.publish('workspace:events', JSON.stringify(event)) }
}`

const pulseBoard = `'use client'

import { useReducer } from 'react'
import { useSocketEvent } from '@/lib/socket'
import { boardReducer, applyEvent } from '@/features/board/reducer'

export function useRealtimeBoard(workspaceId: string, initial: Board) {
  const [board, dispatch] = useReducer(boardReducer, initial)

  useSocketEvent('event', (event) => {
    if (event.workspaceId !== workspaceId) return
    dispatch(applyEvent(event))
  })

  function moveCard(cardId: string, toColumn: string) {
    dispatch({ type: 'move:optimistic', cardId, toColumn })
    socket.emit('card:move', { workspaceId, cardId, toColumn })
  }

  return { board, moveCard }
}`

export const projectSources: Record<string, ProjectSource> = {
  nebula: {
    note: 'Production excerpts from the insight API and AI summarization pipeline. Secrets and customer data removed.',
    files: [
      { name: 'app/api/insights/route.ts', language: 'TypeScript', code: nebulaRoute },
      { name: 'lib/ai.ts', language: 'TypeScript', code: nebulaAi },
    ],
  },
  aurum: {
    note: 'Selected storefront excerpts: checkout orchestration and the scroll-linked product gallery. Commerce identifiers redacted.',
    files: [
      { name: 'app/api/checkout/route.ts', language: 'TypeScript', code: aurumCheckout },
      { name: 'components/product/ProductGallery.tsx', language: 'TSX', code: aurumGallery },
    ],
  },
  pulse: {
    note: 'Realtime collaboration excerpts: the Redis-backed event fan-out and the optimistic board client.',
    files: [
      { name: 'server/realtime.ts', language: 'TypeScript', code: pulseRealtime },
      { name: 'features/board/useRealtimeBoard.ts', language: 'TypeScript', code: pulseBoard },
    ],
  },
}
