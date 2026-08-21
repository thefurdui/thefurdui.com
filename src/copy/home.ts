export type Locale = 'en' | 'ru'

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
  index: string
  tag: string
  title: string
  href: string
  host: string
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
    index: '01',
    tag: 'SaaS',
    title: 'Lode Ecosystem',
    href: 'https://lode.my',
    host: 'lode.my',
  },
  arcoin: {
    index: '02',
    tag: 'AR · Web3',
    title: 'ARCOIN',
    href: 'https://arcoin.net',
    host: 'arcoin.net',
  },
  beam: {
    index: '03',
    tag: 'OSS',
    title: 'BEAM CSS',
    href: 'https://beamcss.org',
    host: 'beamcss.org',
  },
  hap: {
    index: '04',
    tag: 'OSS · CLI',
    title: 'hap',
    href: 'https://github.com/thefurdui/hap',
    host: 'github.com/thefurdui/hap',
  },
  wic: {
    index: '05',
    tag: 'OSS · CLI',
    title: 'wic',
    href: 'https://github.com/thefurdui/wic',
    host: 'github.com/thefurdui/wic',
  },
  audi: {
    index: '06',
    tag: 'Enterprise',
    title: 'Audi DPA',
    href: 'https://www.saboit.de/references/audi-dpa',
    host: 'saboit.de',
  },
} as const

const CONTACT = {
  email: { href: 'mailto:andrei@thefurdui.com', value: 'andrei@thefurdui.com' },
  calendar: { href: 'https://cal.com/thefurdui/15min', value: 'cal.com/thefurdui/15min', external: true },
  github: { href: 'https://github.com/thefurdui', value: 'github.com/thefurdui', external: true },
  twitter: { href: 'https://x.com/thefurdui', value: 'x.com/thefurdui', external: true },
} as const

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
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
          description: 'A suite of apps for meticulous self-quantification. You are what you measure.',
        },
        {
          ...WORK.arcoin,
          description: 'A geolocation-based AR metaverse. Peak scale: 120k MAU.',
        },
        {
          ...WORK.beam,
          description: 'A strict, semantic, browser-native CSS architecture. The antidote to Atomic CSS and CSS-in-JS.',
        },
        {
          ...WORK.hap,
          description:
            'A CLI tool to orchestrate parallel AI agents across different Git branches within the same repo.',
        },
        {
          ...WORK.wic,
          description: 'A CLI tool to compile wide-gamut (Display P3) web assets natively via headless Chromium.',
        },
        {
          ...WORK.audi,
          description:
            'Enterprise IIoT infrastructure. An assembly line and resource planner built for Audi and Volkswagen factories.',
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
  },
  ru: {
    meta: {
      title: 'Андрей Фурдуй · Продакт-инженер',
      description:
        'Я создаю продукты. Быстро. Экс-фаундер и бывший инженер Volkswagen. Строю устойчивые системы без лишнего для стартапов.',
    },
    ui: {
      themeToggle: 'Переключить тему',
    },
    hero: {
      tag: 'Продакт-инженер',
      name: 'Андрей Фурдуй',
      lead: 'Я создаю продукты. Быстро.',
    },
    beliefs: {
      title: 'Убеждения',
      items: [
        { index: '01', text: 'Меньше – лучше.' },
        { index: '02', text: 'Постоянство важнее интенсивности.' },
        { index: '03', text: 'Перфекционизм убивает стартапы.' },
        { index: '04', text: 'Код – это балласт. Минимизируй его.' },
        { index: '05', text: 'Техдолг полезен, если проценты по нему не растут.' },
      ],
    },
    work: {
      title: 'Избранные работы',
      items: [
        {
          ...WORK.lode,
          href: 'https://lode.my/ru',
          description: 'Набор приложений для персонального трекинга. Ты – то, что измеряешь.',
        },
        {
          ...WORK.arcoin,
          description: 'AR-метавселенная на основе геолокации. Пик: 120k активных пользователей за месяц.',
        },
        {
          ...WORK.beam,
          description: 'Строгая, семантическая CSS-архитектура. Панацея от Atomic CSS и CSS-in-JS.',
        },
        {
          ...WORK.hap,
          description:
            'CLI-инструмент для оркестрации параллельных ИИ-агентов на разных Git-ветках одного репозитория.',
        },
        {
          ...WORK.wic,
          description:
            'CLI-инструмент для нативной компиляции wide-gamut (Display P3) веб-ассетов через headless Chromium.',
        },
        {
          ...WORK.audi,
          description:
            'Корпоративная IIoT-инфраструктура. Планировщик конвейерных лент и ресурсов для заводов Audi и Volkswagen.',
        },
      ],
    },
    bio: {
      title: 'Путь',
      entries: [
        {
          year: '2002',
          age: '0 лет',
          parts: ['Родился в Кишинёве, Молдова ', { href: MAPS.chisinau, label: '[где?]', nosnippet: true }, '.'],
        },
        { year: '2009', age: '7 лет', parts: ['Начал возиться с Linux и кастомными Android прошивками.'] },
        { year: '2016', age: '14 лет', parts: ['Начал программировать на Python.'] },
        {
          year: '2017',
          age: '15 лет',
          parts: ['Собрал продвинутый opsec-сетап на Qubes OS для клиента с фокусом на анонимность.'],
        },
        { year: '2018', age: '16 лет', parts: ['Создал мобильную игру на Unity.'] },
        {
          year: '2019',
          age: '17 лет',
          parts: ['Заключил полугодовой фронтенд-контракт с государственным хостинг-провайдером в Казахстане.'],
        },
        { year: '2020', age: '18 лет', parts: ['Переехал в Прагу на следующее утро после совершеннолетия.'] },
        {
          year: '2021',
          age: '18–21 год',
          parts: [
            'Разрабатывал софт планировки конвейерных лент Audi и Volkswagen и другие корпоративные IIoT-системы.',
          ],
        },
        {
          year: '2024',
          age: '21 год',
          parts: [
            'Основал ',
            { href: 'https://arcoin.net/', label: 'AR/Веб3-стартап' },
            '. Привлёк $100,000. Руководил командой из 6 человек.',
          ],
        },
        {
          year: '2025',
          age: '22 года',
          parts: [
            'Переехал с девушкой в Ташкент ',
            { href: MAPS.tashkent, label: '[куда?]', nosnippet: true },
            '. Закрыл стартап. Получил бесценные, болезненные уроки.',
          ],
        },
        {
          year: '2026',
          age: '23 года',
          active: true,
          parts: [
            'Перешёл на Neovim, btw. Оптимизирую свои жизненные процессы с ',
            { href: 'https://lode.my', label: 'Lode' },
            '.',
          ],
        },
      ],
    },
    contact: {
      title: 'Контакты',
      items: [
        { label: 'Email', ...CONTACT.email },
        { label: 'Календарь', ...CONTACT.calendar },
        { label: 'GitHub', ...CONTACT.github },
        { label: 'Twitter', ...CONTACT.twitter },
      ],
    },
  },
}
