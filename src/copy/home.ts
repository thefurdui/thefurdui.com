type TextLink = {
  href: string
  label: string
  nosnippet?: boolean
}

export type BioEntry = {
  year: string
  age: string
  parts: Array<string | TextLink>
  active?: boolean
}

export type WorkItem = {
  title: string
  href: string
  description: string
}

export type HomeCopy = {
  meta: {
    title: string
    description: string
  }
  ui: {
    themeToggle: string
  }
  hero: {
    tag: string
    name: string
    lead: string
  }
  beliefs: {
    title: string
    items: Array<{ index: string; text: string }>
  }
  work: {
    title: string
    items: WorkItem[]
  }
  bio: {
    title: string
    entries: BioEntry[]
  }
  contact: {
    title: string
    items: Array<{ label: string; href: string; value: string; external?: boolean }>
  }
}

const MAPS = {
  chisinau:
    'https://www.google.com/maps/place/Chi%C8%99in%C4%83u,+Moldova/@47.0131285,28.7739849,11.88z/data=!4m15!1m8!3m7!1s0x40c97c3628b769a1:0x258119acdf53accb!2sMoldova!3b1!8m2!3d47.411631!4d28.369885!16zL20vMDR3NHM!3m5!1s0x40c97c3628b769a1:0x37d1d6305749dd3c!8m2!3d47.0104529!4d28.8638102!16zL20vMGZuNzc?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D',
  tashkent:
    'https://www.google.com/maps/place/Tashkent,+Uzbekistan/@41.2827379,69.1145598,11z/data=!3m1!4b1!4m6!3m5!1s0x38ae8b0cc379e9c3:0xa5a9323b4aa5cb98!8m2!3d41.2982211!4d69.2385223!16zL20vMGZzbXk?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D',
} as const

const WORK = {
  lode: {
    title: 'Lode Ecosystem',
    href: 'https://lode.my',
  },
  arcoin: {
    title: 'ARCOIN',
    href: 'https://arcoin.net',
  },
  studio: {
    title: 'furdui studio',
    href: 'https://furdui.studio',
  },
  beam: {
    title: 'BEAM CSS',
    href: 'https://beamcss.org',
  },
  hap: {
    title: 'hap',
    href: 'https://github.com/thefurdui/hap',
  },
  audi: {
    title: 'Audi DPA',
    href: 'https://www.saboit.de/references/audi-dpa',
  },
} as const

const CONTACT = {
  email: { href: 'mailto:andrei@thefurdui.com', value: 'andrei@thefurdui.com' },
  calendar: { href: 'https://cal.com/thefurdui/15min', value: 'cal.com/thefurdui/15min', external: true },
  github: { href: 'https://github.com/thefurdui', value: 'github.com/thefurdui', external: true },
  twitter: { href: 'https://x.com/thefurdui', value: 'x.com/thefurdui', external: true },
} as const

export const homeCopy: HomeCopy = {
  meta: {
    title: 'Andrei Furdui · Product Engineer',
    description:
      'I ship products fast. Ex-founder & former Volkswagen engineer. I build resilient, zero-bloat systems for startups.',
  },
  ui: {
    themeToggle: 'Toggle theme',
  },
  hero: {
    tag: 'Product Engineer',
    name: 'Andrei Furdui',
    lead: 'I ship products fast.',
  },
  beliefs: {
    title: 'Core Beliefs',
    items: [
      { index: '01', text: 'Less is more.' },
      { index: '02', text: 'Consistency beats intensity.' },
      { index: '03', text: 'Perfectionism kills startups.' },
      { index: '04', text: 'Code is a liability. Keep it minimal.' },
      { index: '05', text: "Tech debt is leverage if the interest doesn't compound." },
    ],
  },
  work: {
    title: 'Selected Work',
    items: [
      {
        ...WORK.lode,
        description: 'Self-quantification suite for time and finance tracking.',
      },
      {
        ...WORK.arcoin,
        description: 'Location-based AR. 122k monthly active users at peak.',
      },
      {
        ...WORK.studio,
        description: 'My studio. A journey through Saturn’s system in ASCII and Three.js.',
      },
      {
        ...WORK.beam,
        description: 'A semantic, browser-native CSS architecture.',
      },
      {
        ...WORK.hap,
        description: 'Parallel coding agents across Git worktrees.',
      },
      {
        ...WORK.audi,
        description: 'Assembly-line and resource planning for Audi and Volkswagen.',
      },
    ],
  },
  bio: {
    title: 'Bio',
    entries: [
      {
        year: '2002',
        age: '0yo',
        parts: ['Born in Chișinău, Moldova ', { href: MAPS.chisinau, label: '[where?]', nosnippet: true }, '.'],
      },
      { year: '2009', age: '7yo', parts: ['Started tinkering with Linux and custom Android ROMs.'] },
      { year: '2016', age: '14yo', parts: ['Started coding in Python.'] },
      {
        year: '2017',
        age: '15yo',
        parts: ['Implemented extreme Qubes OS opsec setup for a privacy-focused client.'],
      },
      { year: '2018', age: '16yo', parts: ['Built a Unity mobile game.'] },
      {
        year: '2019',
        age: '17yo',
        parts: ['Secured a 6-month frontend contract with a governmental hosting provider in Kazakhstan.'],
      },
      { year: '2020', age: '18yo', parts: ['Moved to Prague the morning after I became a legal adult.'] },
      {
        year: '2021',
        age: '18-21yo',
        parts: ['Developed Audi & Volkswagen assembly line planner apps + other enterprise IIoT systems.'],
      },
      {
        year: '2024',
        age: '21yo',
        parts: [
          'Founded an ',
          { href: 'https://arcoin.net/', label: 'AR/Web3 startup' },
          '. Raised $100k. Led a team of 6.',
        ],
      },
      {
        year: '2025',
        age: '22yo',
        parts: [
          'Moved to Tashkent ',
          { href: MAPS.tashkent, label: '[where?]', nosnippet: true },
          ' with my girlfriend. Closed the startup. Learned from pain.',
        ],
      },
      {
        year: '2026',
        age: '23yo',
        active: true,
        parts: [
          'Started using Neovim, btw. Optimizing my feedback loops with ',
          { href: 'https://lode.my', label: 'Lode' },
          '.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contact',
    items: [
      { label: 'Email', ...CONTACT.email },
      { label: 'Calendar', ...CONTACT.calendar },
      { label: 'GitHub', ...CONTACT.github },
      { label: 'Twitter', ...CONTACT.twitter },
    ],
  },
}
