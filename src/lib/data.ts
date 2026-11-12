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

export const navLinks = [
  { label: 'Projects', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Tools', href: '#toolkit' },
  { label: 'Journey', href: '#journey' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export const sectionIds = ['home', 'about', 'toolkit', 'work', 'journey', 'skills', 'contact'] as const

export const heroFacts = [`${site.age} years old`, '4 public builds', 'Not taking work'] as const

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

export const stats = [
  { value: '04', label: 'Public builds', note: '3 live · 1 retired' },
  { value: String(site.age), label: 'Years old', note: 'Born 2009' },
  { value: '02', label: 'Languages', note: 'Thai · English' },
  { value: '01', label: 'Main game', note: 'PUBG on PC' },
] as const

export const aboutParagraphs = [
  `I'm ${site.realNameEn} — _gosogood online. I'm ${site.age} and study at ${site.schoolShort} in Suphan Buri. I started with HTML and CSS in Matthayom 3, then moved on to JavaScript. Most of what I know came from building something, breaking it, and searching for the fix.`,
  "I make websites for fun: a password generator, a Discord bot page, this portfolio, and a few ideas that never made it to the finish line. I like blue, clean layouts, and small animations. I'm quiet in person, but I can talk for a while about games, music, or a project I'm stuck on.",
] as const

export const currentFocus = [
  {
    title: 'JavaScript logic',
    note: 'Getting more comfortable with the parts that do not show up on screen.',
  },
  {
    title: 'React & TypeScript',
    note: 'Components, state, and types — still looking things up every day.',
  },
  {
    title: 'English',
    note: 'Reading docs is easier than speaking. Working on both, slowly.',
  },
] as const

export const toolkitGroups = [
  {
    label: 'Languages & markup',
    items: [
      { name: 'HTML', note: 'Semantic structure', icon: 'html' },
      { name: 'CSS', note: 'Responsive layouts', icon: 'css' },
      { name: 'JavaScript', note: 'Browser logic', icon: 'js' },
      { name: 'TypeScript', note: 'Still learning', icon: 'ts' },
    ],
  },
  {
    label: 'Framework & motion',
    items: [
      { name: 'React', note: 'Components & state', icon: 'react' },
      { name: 'Tailwind CSS', note: 'Styling quickly', icon: 'tailwind' },
      { name: 'Framer Motion', note: 'Small interactions', icon: 'motion' },
      { name: 'Vite', note: 'Local dev & builds', icon: 'vite' },
    ],
  },
  {
    label: 'Workflow',
    items: [
      { name: 'Git', note: 'Version control', icon: 'git' },
      { name: 'GitHub', note: 'Public repos', icon: 'github' },
      { name: 'Netlify', note: 'Deploys & domain', icon: 'netlify' },
    ],
  },
] as const

export const craft = [
  'Responsive layouts',
  'Small interactions',
  'Static sites',
  'Learning by building',
] as const

export const honestNotes = [
  'Still learning JavaScript logic',
  'TypeScript is new to me',
  'My English is a work in progress',
] as const

export type ProjectId = 'portfolio' | 'passforge' | 'warp' | 'landing'

export type Project = {
  id: ProjectId
  index: string
  title: string
  shortTitle: string
  subtitle: string
  year: string
  status: string
  description: string
  tags: string[]
  live: string
  repo?: string
  facts: string[]
  caseStudy: {
    brief: string
    built: string
    decisions: string[]
    learned: string
    stack: string[]
  }
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    index: '01',
    title: '_gosogood portfolio',
    shortTitle: 'Portfolio',
    subtitle: "The site you're reading",
    year: '2026',
    status: 'Live',
    description:
      'A personal single-page site with a three-colour palette, CSS-drawn project previews, case-study modals, and a contact form that opens your email app.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    live: 'https://gosogood.xyz/',
    repo: 'https://github.com/vx7Q/gosogood-portfolio',
    facts: ['100% static', '0 trackers', 'Built from scratch'],
    caseStudy: {
      brief:
        "I wanted a personal site that felt like me — not a template, and not a page full of skills I don't have.",
      built:
        'A single-page portfolio with a dark blue palette, project previews drawn in CSS, case-study modals, and a contact form that composes a message locally.',
      decisions: [
        'Three colours: ink, bone, and blue.',
        'CSS previews instead of screenshots.',
        'No analytics, cookies, or backend.',
        'Motion that respects prefers-reduced-motion.',
      ],
      learned:
        'How much detail lives in spacing, type, focus states, and making a page feel calm on a phone.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    },
  },
  {
    id: 'passforge',
    index: '02',
    title: 'Pass Forge Pro',
    shortTitle: 'Pass Forge',
    subtitle: 'Password & passphrase generator',
    year: '2026',
    status: 'Live 24/7',
    description:
      'A browser-based password and passphrase generator. Pick a length, choose character types, generate a batch, then copy or download. History stays on your device.',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript', 'Netlify'],
    live: 'https://pass-forge-pro.netlify.app/',
    facts: ['Runs in browser', 'No server', 'Live 24/7'],
    caseStudy: {
      brief:
        'I wanted a password generator I would actually use — with passphrase mode, batch generation, and a standalone version I could keep offline.',
      built:
        'A single-page tool with password and passphrase modes, length and character controls, ambiguous-character filtering, presets, batch generation, copy/download, and local history.',
      decisions: [
        'Password characters come from the browser crypto API; passphrase words are shuffled locally. Nothing is sent to a server.',
        'History is saved locally with localStorage, so it stays on the device and can be cleared from the page.',
        'Vanilla JavaScript and Tailwind via CDN, so the tool can also be downloaded as one standalone HTML file.',
        'Two modes: random passwords and readable passphrases.',
      ],
      learned:
        "Small tools are a good way to practice input handling and edge cases. I also learned that 'no backend' does not automatically mean 'nothing is stored' — the history lives in the browser.",
      stack: ['HTML', 'Tailwind CSS', 'JavaScript', 'Netlify'],
    },
  },
  {
    id: 'warp',
    index: '03',
    title: 'Warp.exe',
    shortTitle: 'Warp.exe',
    subtitle: 'A retired Discord security bot page',
    year: '2026',
    status: 'Retired',
    description:
      'A dark landing page for a Discord security bot idea — anti-raid, anti-nuke, auto-mod, logs, and a panic mode. No longer updated.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    live: 'https://warp-exe.netlify.app/',
    facts: ['Retired', 'Not updated', 'Kept as an archive'],
    caseStudy: {
      brief: 'I wanted a page that felt like a security console for a Discord bot idea.',
      built:
        'A single-page site with a loading screen, fake security panel, feature cards, command list, background music, and a dark terminal look.',
      decisions: [
        'Plain HTML, CSS, and JavaScript — no framework.',
        'A loader and sound to set the mood before the page opens.',
        'The bot itself never shipped, so the site is now retired.',
        'Kept online as an archive instead of deleting it.',
      ],
      learned:
        "How small details — loaders, scanlines, sound — change the feeling of a page. And that it's okay to stop a project when the idea runs out.",
      stack: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    },
  },
  {
    id: 'landing',
    index: '04',
    title: 'project / landing',
    shortTitle: 'Landing experiment',
    subtitle: 'Theme + language experiment',
    year: '2026',
    status: 'Live',
    description:
      'One page, two themes, three languages. A small vanilla JavaScript experiment with theme switching, Thai/English/Chinese copy, and preferences that survive a refresh.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    live: 'https://vx7q.github.io/project/',
    repo: 'https://github.com/vx7Q/project',
    facts: ['Vanilla JS', 'Theme + language saved', 'No build step'],
    caseStudy: {
      brief:
        'I wanted to understand the browser without React doing the work for me: theme switching, language switching, particles, and preferences that survive a refresh.',
      built:
        'A landing page with a dark/light theme toggle, Thai/English/Chinese copy, a lightweight particle field, and localStorage persistence — no framework, no build step.',
      decisions: [
        'Keep the JavaScript small and readable.',
        'Persist preferences with localStorage.',
        'Use CSS variables for theming instead of duplicating styles.',
        'Ship it publicly even though it was not perfect.',
      ],
      learned:
        'State is state, even without a framework. And shipping something real teaches faster than polishing a private folder.',
      stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    },
  },
]

export const journey = [
  {
    year: 'M.3',
    title: 'First line of HTML',
    role: 'HTML · CSS',
    description:
      'Started learning web development in Matthayom 3. Mostly HTML and CSS at first, then enough JavaScript to make buttons work and pages respond.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    current: false,
  },
  {
    year: '2026',
    title: 'Warp.exe',
    role: 'Discord bot landing page',
    description:
      'Built a dark, security-console style page for a Discord bot idea. It never became a real product, and I stopped updating it. It is still online as an archive.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    current: false,
  },
  {
    year: '2026',
    title: 'Pass Forge Pro',
    role: 'Password generator',
    description:
      'Made a tool I actually use: password and passphrase generation, batch options, copy/download, and local history. Deployed on Netlify and still live.',
    tags: ['JavaScript', 'Tailwind CSS', 'Netlify'],
    current: false,
  },
  {
    year: '2026',
    title: 'Portfolio, rebuilt',
    role: 'React · TypeScript',
    description:
      'Rebuilt this site with React, TypeScript, Tailwind, and Framer Motion. It is the project where I finally started to understand components and state.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    current: false,
  },
  {
    year: 'NOW',
    title: 'Still in college',
    role: 'Songphinong Industrial & Community Education College',
    description:
      'Studying in Suphan Buri, building small things between classes. Not taking work right now. Playing PUBG, listening to music, and starting more projects than I finish.',
    tags: ['Student', 'Not taking work'],
    current: true,
  },
] as const

export const snapshotStats = [
  { value: '04', label: 'Public builds' },
  { value: '03', label: 'Live' },
  { value: '01', label: 'Retired' },
  { value: '02', label: 'Languages' },
] as const

export const skills = [
  {
    number: '01',
    title: 'HTML & CSS',
    level: 'Comfortable',
    subtitle: 'Responsive pages, flexbox/grid, CSS variables.',
    icon: 'code',
    description:
      'I can turn a layout into a responsive page and check it on a phone. I use flexbox, grid, and CSS variables, and I care about spacing and readable type.',
    tools: ['HTML', 'CSS', 'Tailwind CSS'],
    usedIn: ['Portfolio', 'Pass Forge', 'Warp.exe'],
  },
  {
    number: '02',
    title: 'JavaScript',
    level: 'Getting there',
    subtitle: 'DOM, events, forms, and localStorage.',
    icon: 'braces',
    description:
      'I can build small interactions and tools, like a password generator or a theme switch. I still look up syntax and debug with console.log more than I would like to admit.',
    tools: ['JavaScript', 'DOM', 'localStorage'],
    usedIn: ['Pass Forge', 'Warp.exe', 'Landing'],
  },
  {
    number: '03',
    title: 'React & TypeScript',
    level: 'Still learning',
    subtitle: 'Components, props, state, and basic hooks.',
    icon: 'atom',
    description:
      'I rebuilt this portfolio with React and TypeScript. I understand components, props, state, and basic hooks, but I still check the docs constantly.',
    tools: ['React', 'TypeScript', 'Vite'],
    usedIn: ['Portfolio'],
  },
  {
    number: '04',
    title: 'Design & motion',
    level: 'Practicing',
    subtitle: 'Spacing, type, colour, and small interactions.',
    icon: 'sparkles',
    description:
      'I like dark interfaces, blue accents, and animations that do not get in the way. I use Tailwind and Framer Motion, and I am learning to stop before a page gets too busy.',
    tools: ['Tailwind CSS', 'Framer Motion', 'CSS'],
    usedIn: ['Portfolio', 'Landing'],
  },
  {
    number: '05',
    title: 'Shipping',
    level: 'Learning',
    subtitle: 'Git, GitHub, Netlify, and a custom domain.',
    icon: 'rocket',
    description:
      'I have deployed four public builds, including one I retired on purpose. I can push a project to GitHub, connect it to Netlify, and point a domain at it.',
    tools: ['Git', 'GitHub', 'Netlify'],
    usedIn: ['All four projects'],
  },
] as const

export const learningLoop = [
  ['01', 'Build it', 'Make the smallest version that works.'],
  ['02', 'Break it', 'Click everything until something fails.'],
  ['03', 'Search', 'Read docs, forums, and error messages.'],
  ['04', 'Try again', 'Fix it, then move on to the next thing.'],
] as const

export const contactTopics = [
  'Select a topic',
  'Just saying hi',
  'Talk about a project',
  'Ask about my code',
  'Gaming / PUBG',
  'Music',
  'Something else',
] as const

export const footerMarquee = [
  'STUDENT',
  'SUPHAN BURI, TH',
  'PUBG ON PC',
  'MUSIC',
  'HTML · CSS · JS',
  'NOT TAKING WORK — YET',
] as const

export const socials = [
  { label: 'GitHub', href: site.github, icon: 'github' },
  { label: 'Instagram', href: site.instagram, icon: 'instagram' },
  { label: 'X', href: site.x, icon: 'x' },
  { label: 'Discord', href: '#contact', icon: 'discord' },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'mail' },
] as const

export type SocialIcon = (typeof socials)[number]['icon']
