export const site = {
  name: 'GOSOGOOD',
  initials: 'GG',
  role: 'Full-Stack Developer',
  tagline: 'Creative engineer crafting precise, high-performance digital products.',
  email: 'soskbwisusgebwkoaaivvsijs@gmail.com',
  location: 'Bangkok, Thailand',
  timezone: 'Asia/Bangkok',
  coordinates: '13.7563° N, 100.5018° E',
  availability: 'Available for select projects',
  github: 'https://github.com/vx7Q',
  discord: '_gosogood',
  since: 2020,
}

export const navItems = [
  { label: 'Home', href: '#home', index: '01' },
  { label: 'About', href: '#about', index: '02' },
  { label: 'Skills', href: '#skills', index: '03' },
  { label: 'Projects', href: '#projects', index: '04' },
  { label: 'Experience', href: '#experience', index: '05' },
  { label: 'Services', href: '#services', index: '06' },
  { label: 'Contact', href: '#contact', index: '07' },
] as const

export const socials = [
  { label: 'GitHub', handle: '@vx7Q', href: 'https://github.com/vx7Q', icon: '/social/github.svg' },
  { label: 'Discord', handle: '_gosogood', copy: '_gosogood', icon: '/social/discord.svg' },
  { label: 'X / Twitter', handle: '@gosogood', href: 'https://x.com/gosogood', icon: '/social/x.svg' },
] as const

export type TechCategory = 'Frontend' | 'Backend' | 'Tools'

export interface Tech {
  name: string
  icon: string
  color: string
  category: TechCategory
  years: number
  level: number
  note: string
}

export const technologies: Tech[] = [
  {
    name: 'HTML5',
    icon: '/tech/html5.svg',
    color: '#E34F26',
    category: 'Frontend',
    years: 6,
    level: 98,
    note: 'Semantic, accessible structure',
  },
  {
    name: 'CSS3',
    icon: '/tech/css3.svg',
    color: '#1572B6',
    category: 'Frontend',
    years: 6,
    level: 96,
    note: 'Layout systems & motion design',
  },
  {
    name: 'JavaScript',
    icon: '/tech/javascript.svg',
    color: '#F7DF1E',
    category: 'Frontend',
    years: 6,
    level: 95,
    note: 'Product logic & browser APIs',
  },
  {
    name: 'TypeScript',
    icon: '/tech/typescript.svg',
    color: '#3178C6',
    category: 'Frontend',
    years: 4,
    level: 93,
    note: 'Strict types at scale',
  },
  {
    name: 'React',
    icon: '/tech/react.svg',
    color: '#61DAFB',
    category: 'Frontend',
    years: 5,
    level: 96,
    note: 'Interface architecture',
  },
  {
    name: 'Next.js',
    icon: '/tech/nextdotjs.svg',
    color: '#FFFFFF',
    category: 'Frontend',
    years: 4,
    level: 94,
    note: 'SSR, RSC & edge delivery',
  },
  {
    name: 'Node.js',
    icon: '/tech/nodedotjs.svg',
    color: '#5FA04E',
    category: 'Backend',
    years: 5,
    level: 91,
    note: 'APIs, workers & realtime',
  },
  {
    name: 'Python',
    icon: '/tech/python.svg',
    color: '#3776AB',
    category: 'Backend',
    years: 5,
    level: 88,
    note: 'Automation & data services',
  },
  {
    name: 'PHP',
    icon: '/tech/php.svg',
    color: '#777BB4',
    category: 'Backend',
    years: 4,
    level: 82,
    note: 'Laravel & legacy systems',
  },
  {
    name: 'MySQL',
    icon: '/tech/mysql.svg',
    color: '#4479A1',
    category: 'Backend',
    years: 5,
    level: 87,
    note: 'Schema design & tuning',
  },
  {
    name: 'Git',
    icon: '/tech/git.svg',
    color: '#F05032',
    category: 'Tools',
    years: 6,
    level: 94,
    note: 'Branching & release flow',
  },
  {
    name: 'GitHub',
    icon: '/tech/github.svg',
    color: '#FFFFFF',
    category: 'Tools',
    years: 6,
    level: 95,
    note: 'CI/CD & code collaboration',
  },
]

export const techFilters = ['All', 'Frontend', 'Backend', 'Tools'] as const
export type TechFilter = (typeof techFilters)[number]

export type ProjectTheme = 'blue' | 'violet' | 'pearl'

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  index: string
  title: string
  tagline: string
  description: string
  year: string
  status: 'Live' | 'Concept'
  role: string
  timeline: string
  theme: ProjectTheme
  stack: string[]
  metrics: ProjectMetric[]
  highlights: string[]
}

export const projects: Project[] = [
  {
    id: 'nebula',
    index: '01',
    title: 'NEBULA',
    tagline: 'AI-native analytics for teams that move fast.',
    description:
      'A decision intelligence platform that turns scattered product data into clear, confident next steps. I led the end-to-end build — from the design system and realtime dashboard to the AI insight engine.',
    year: '2026',
    status: 'Live',
    role: 'Product Design · Full-Stack Engineering',
    timeline: '14 weeks',
    theme: 'blue',
    stack: ['Next.js', 'TypeScript', 'Python', 'PostgreSQL', 'OpenAI'],
    metrics: [
      { value: '+38%', label: '7-day retention' },
      { value: '12.4k', label: 'Monthly active users' },
    ],
    highlights: [
      'Designed a modular analytics system with 40+ reusable interface primitives.',
      'Built a streaming query layer that renders 1M+ events without blocking the UI.',
      'Shipped an AI summarizer that turns weekly metrics into plain-language actions.',
    ],
  },
  {
    id: 'aurum',
    index: '02',
    title: 'AURUM',
    tagline: 'A quiet luxury commerce experience for a modern fragrance house.',
    description:
      'An editorial storefront where scent becomes story. The experience pairs restrained typography, cinematic product transitions, and a checkout flow engineered to disappear.',
    year: '2025',
    status: 'Live',
    role: 'Art Direction · Frontend Engineering',
    timeline: '9 weeks',
    theme: 'pearl',
    stack: ['Next.js', 'Tailwind CSS', 'Stripe', 'Sanity', 'GSAP'],
    metrics: [
      { value: '+61%', label: 'Checkout conversion' },
      { value: '1.4s', label: 'Largest contentful paint' },
    ],
    highlights: [
      'Built a headless storefront with fully editable editorial collections.',
      'Reduced checkout steps from four to two while lifting conversion by 61%.',
      'Created a 60fps product gallery with scroll-linked transitions and zero layout shift.',
    ],
  },
  {
    id: 'pulse',
    index: '03',
    title: 'PULSE',
    tagline: 'A realtime workspace where distributed teams stay in flow.',
    description:
      'Pulse brings conversations, decisions, and delivery into a single calm surface. I engineered the realtime collaboration layer and designed the keyboard-first interaction model.',
    year: '2025',
    status: 'Live',
    role: 'Interface Design · Realtime Systems',
    timeline: '18 weeks',
    theme: 'violet',
    stack: ['React', 'Node.js', 'WebSocket', 'Redis', 'AWS'],
    metrics: [
      { value: '<40ms', label: 'Realtime sync latency' },
      { value: '5.2k', label: 'Active workspaces' },
    ],
    highlights: [
      'Implemented presence, cursors, and optimistic updates over a resilient WebSocket layer.',
      'Designed an accessible command palette used in 74% of daily sessions.',
      'Scaled to 5,000+ workspaces on an event-driven AWS architecture.',
    ],
  },
]

export interface ExperienceItem {
  period: string
  role: string
  company: string
  type: string
  location: string
  description: string
  achievements: string[]
  stack: string[]
  current?: boolean
}

export const experience: ExperienceItem[] = [
  {
    period: '2024 — Present',
    role: 'Senior Full-Stack Engineer',
    company: 'Independent Studio',
    type: 'Freelance',
    location: 'Bangkok · Remote',
    current: true,
    description:
      'Partnering with founders and product teams to design and ship considered web products end to end — strategy, interface, and production systems.',
    achievements: [
      'Shipped 14 client products across SaaS, commerce, and fintech.',
      'Introduced design-system practices that cut feature delivery time by 35%.',
      'Maintained a 100% on-time launch record across retained engagements.',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Engineer',
    company: 'LUMEN Digital',
    type: 'Full-time',
    location: 'Bangkok, TH',
    description:
      'Led interface engineering for a flagship SaaS platform serving enterprise teams, with a focus on performance, accessibility, and system design.',
    achievements: [
      'Rebuilt the application shell, improving interaction latency by 42%.',
      'Created a 120-component design system adopted by four product squads.',
      'Drove the platform to WCAG 2.2 AA compliance.',
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Storybook'],
  },
  {
    period: '2022 — 2023',
    role: 'Full-Stack Developer',
    company: 'ORBIT Labs',
    type: 'Full-time',
    location: 'Chiang Mai, TH',
    description:
      'Built realtime tools for distributed teams, working across the product surface, API layer, and deployment pipeline.',
    achievements: [
      'Delivered a realtime notification service processing 2M events per month.',
      'Reduced cloud infrastructure cost by 28% through service consolidation.',
      'Mentored two junior developers through their first production launches.',
    ],
    stack: ['React', 'Node.js', 'Redis', 'MySQL', 'Docker'],
  },
  {
    period: '2021 — 2022',
    role: 'Junior Web Developer',
    company: 'ByteForge',
    type: 'Full-time',
    location: 'Bangkok, TH',
    description:
      'Started in production: shipping marketing sites and internal tools while developing a strong foundation in web fundamentals and craft.',
    achievements: [
      'Delivered 20+ responsive client websites from design to deployment.',
      'Built the studio’s first reusable component library.',
      'Won the internal 2022 build sprint with a realtime client feedback tool.',
    ],
    stack: ['JavaScript', 'PHP', 'MySQL', 'SCSS', 'Git'],
  },
  {
    period: '2020 — 2021',
    role: 'Self-Taught Foundations',
    company: 'The Long Way In',
    type: 'Learning',
    location: 'Everywhere',
    description:
      'A year of deliberate practice: computer science fundamentals, the browser platform, and the craft of turning ideas into working software.',
    achievements: [
      'Completed 300+ hours of structured frontend and CS coursework.',
      'Shipped 10 personal experiments in public.',
      'Wrote my first production code for a local business — still running today.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'Git'],
  },
]

export interface Service {
  index: string
  title: string
  summary: string
  description: string
  deliverables: string[]
  timeline: string
  icon: 'code' | 'layout' | 'server' | 'pen' | 'gauge'
}

export const services: Service[] = [
  {
    index: '01',
    title: 'Web Development',
    summary: 'Complete products, designed and engineered end to end.',
    description:
      'From first sketch to production deploy. I build fast, resilient web products with a strong point of view and no unnecessary complexity.',
    deliverables: ['Product strategy', 'Design system', 'Full-stack build', 'Deployment & handover'],
    timeline: '6–16 weeks',
    icon: 'code',
  },
  {
    index: '02',
    title: 'Frontend Development',
    summary: 'Interfaces that feel as good as they look.',
    description:
      'Accessible, motion-aware frontend engineering in React and TypeScript — precise to the pixel and performant on every screen.',
    deliverables: ['React / Next.js', 'Interaction & motion', 'Responsive systems', 'Accessibility review'],
    timeline: '3–8 weeks',
    icon: 'layout',
  },
  {
    index: '03',
    title: 'Backend Development',
    summary: 'Quietly powerful systems behind the surface.',
    description:
      'APIs, data models, and infrastructure that stay clear under pressure. Designed for the team that will inherit them.',
    deliverables: ['API architecture', 'Database design', 'Auth & integrations', 'Cloud deployment'],
    timeline: '4–10 weeks',
    icon: 'server',
  },
  {
    index: '04',
    title: 'UI/UX Design',
    summary: 'Clarity, character, and a reason for every decision.',
    description:
      'Interface design grounded in real usage. I work in systems — type, space, motion — so the product stays coherent as it grows.',
    deliverables: ['UX flows', 'Interface design', 'Design system', 'Interactive prototype'],
    timeline: '3–6 weeks',
    icon: 'pen',
  },
  {
    index: '05',
    title: 'Website Optimization',
    summary: 'Make the existing thing exceptional.',
    description:
      'A focused audit and rebuild of what is slowing you down — performance, accessibility, SEO, and the small details users feel.',
    deliverables: ['Performance audit', 'Core Web Vitals', 'SEO technical pass', 'Implementation'],
    timeline: '1–3 weeks',
    icon: 'gauge',
  },
]

export const stats = [
  { value: 5, suffix: '+', label: 'Years building', note: 'Shipped since 2020' },
  { value: 48, suffix: '+', label: 'Projects delivered', note: 'Across 9 industries' },
  { value: 27, suffix: '', label: 'Happy clients', note: 'Long-term partners' },
  { value: 99, suffix: '%', label: 'On-time launches', note: 'Deadlines respected' },
]

export const principles = [
  {
    index: '01',
    title: 'Simplicity scales',
    text: 'The best systems are the ones you can still understand a year later. I remove until only the essential remains.',
  },
  {
    index: '02',
    title: 'Motion with meaning',
    text: 'Animation should explain, not perform. Every transition exists to orient, confirm, or delight — never to delay.',
  },
  {
    index: '03',
    title: 'Performance is design',
    text: 'A beautiful interface that hesitates feels broken. Speed is part of the aesthetic, and accessibility is not optional.',
  },
]

export const marqueeWords = [
  'REACT',
  'TYPESCRIPT',
  'NEXT.JS',
  'NODE.JS',
  'PYTHON',
  'MYSQL',
  'TAILWIND',
  'FIGMA',
  'AWS',
  'GIT',
]

export const serviceOptions = [
  'Select a service',
  'Web Development',
  'Frontend Development',
  'Backend Development',
  'UI/UX Design',
  'Website Optimization',
  'Something else',
]

export const budgetOptions = [
  'Select a range',
  '$1k — $3k',
  '$3k — $6k',
  '$6k — $12k',
  '$12k+',
  'Not sure yet',
]
