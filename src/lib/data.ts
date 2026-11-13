function getAge(isoDate: string) {
  const birth = new Date(isoDate)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const month = now.getMonth() - birth.getMonth()
  if (month < 0 || (month === 0 && now.getDate() < birth.getDate())) age -= 1
  return age
}

export const site = {
  name: '_gosogood',
  realName: 'บริวัฒน์ ภูมีเขียน',
  realNameEn: 'Borriwat Phumiekhian',
  displayName: 'Borriwat Phumiekhian',
  role: 'Student',
  discipline: 'Front-end learner',
  email: 'soskbwisusgebwkoaaivvsijs@gmail.com',
  github: 'https://github.com/vx7Q',
  githubHandle: 'vx7Q',
  instagram: 'https://www.instagram.com/_gosogood/',
  instagramHandle: '@_gosogood',
  x: 'https://x.com/gosogood',
  xHandle: '@gosogood',
  discord: 'l9eve',
  domain: 'gosogood.xyz',
  url: 'https://gosogood.xyz/',
  location: 'Suphan Buri, Thailand',
  locationShort: 'Suphan Buri, TH',
  school: 'Songphinong Industrial and Community Education College',
  schoolShort: 'Songphinong Industrial & Community Education College',
  schoolThai: 'วิทยาลัยการอาชีพสองพี่น้อง',
  schoolLocation: 'Song Phi Nong, Suphan Buri',
  schoolUrl: 'https://www.sicec.ac.th/',
  timezone: 'Asia/Bangkok',
  birthDate: '2009-05-14',
  birthLabel: '14 May 2009',
  age: getAge('2009-05-14'),
  startedWeb: 'Matthayom 3',
  status: 'Studying — not taking work',
  availability: 'Not taking work right now',
  availabilityNote:
    'I am still in college and want to keep learning without rushing into work. If you want to talk about code, games, or music, I am happy to chat.',
  replyTime: 'When I can',
  coordinates: '14.4745° N',
  languages: [
    { name: 'Thai', level: 'Native' },
    { name: 'English', level: 'Still learning' },
  ],
} as const

export const sectionIds = ['home', 'about', 'toolkit', 'work', 'journey', 'skills', 'contact'] as const

export const marqueeWords = [
  'HTML',
  'CSS',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'REACT',
  'TAILWIND CSS',
  'VITE',
  'FRAMER MOTION',
  'GIT',
  'GITHUB',
  'NETLIFY',
] as const

export type ProjectId = 'portfolio' | 'passforge' | 'warp' | 'landing'

export type ProjectStatusKey = 'live' | 'live247' | 'retired'

export type Project = {
  id: ProjectId
  index: string
  title: string
  shortTitle: string
  year: string
  statusKey: ProjectStatusKey
  retired: boolean
  tags: string[]
  live: string
  repo?: string
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    index: '01',
    title: '_gosogood portfolio',
    shortTitle: 'Portfolio',
    year: '2026',
    statusKey: 'live',
    retired: false,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    live: 'https://gosogood.xyz/',
    repo: 'https://github.com/vx7Q/gosogood-portfolio',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    id: 'passforge',
    index: '02',
    title: 'Pass Forge Pro',
    shortTitle: 'Pass Forge',
    year: '2026',
    statusKey: 'live247',
    retired: false,
    tags: ['HTML', 'Tailwind CSS', 'JavaScript', 'Netlify'],
    live: 'https://pass-forge-pro.netlify.app/',
    stack: ['HTML', 'Tailwind CSS', 'JavaScript', 'Netlify'],
  },
  {
    id: 'warp',
    index: '03',
    title: 'Warp.exe',
    shortTitle: 'Warp.exe',
    year: '2026',
    statusKey: 'retired',
    retired: true,
    tags: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    live: 'https://warp-exe.netlify.app/',
    stack: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
  },
  {
    id: 'landing',
    index: '04',
    title: 'project / landing',
    shortTitle: 'Landing experiment',
    year: '2026',
    statusKey: 'live',
    retired: false,
    tags: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    live: 'https://vx7q.github.io/project/',
    repo: 'https://github.com/vx7Q/project',
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
  },
]

export const toolkitGroups = [
  {
    id: 'languages',
    items: [
      { name: 'HTML', icon: 'html' },
      { name: 'CSS', icon: 'css' },
      { name: 'JavaScript', icon: 'js' },
      { name: 'TypeScript', icon: 'ts' },
    ],
  },
  {
    id: 'framework',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Framer Motion', icon: 'motion' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
  {
    id: 'workflow',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Netlify', icon: 'netlify' },
    ],
  },
] as const

export type ToolkitGroupId = (typeof toolkitGroups)[number]['id']
export type ToolIcon = (typeof toolkitGroups)[number]['items'][number]['icon']

export const skills = [
  { number: '01', icon: 'code', tools: ['HTML', 'CSS', 'Tailwind CSS'] },
  { number: '02', icon: 'braces', tools: ['JavaScript', 'DOM', 'localStorage'] },
  { number: '03', icon: 'atom', tools: ['React', 'TypeScript', 'Vite'] },
  { number: '04', icon: 'sparkles', tools: ['Tailwind CSS', 'Framer Motion', 'CSS'] },
  { number: '05', icon: 'rocket', tools: ['Git', 'GitHub', 'Netlify'] },
] as const

export type SkillNumber = (typeof skills)[number]['number']
export type SkillIcon = (typeof skills)[number]['icon']

export const socials = [
  { label: 'GitHub', href: site.github, icon: 'github' },
  { label: 'Instagram', href: site.instagram, icon: 'instagram' },
  { label: 'X', href: site.x, icon: 'x' },
  { label: 'Discord', href: '#contact', icon: 'discord' },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'mail' },
] as const

export type SocialIcon = (typeof socials)[number]['icon']
