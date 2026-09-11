import source from './resume.md?raw'

// resume.md owns the copy. This adapter understands its headings and two-level
// lists; it deliberately does not render arbitrary Markdown or raw HTML.
const [identity, ...sections] = source.trim().split(/\r?\n## /)
const [name, role] = identity.replace(/^# /, '').split(/\r?\n\s*\r?\n/)
const content = new Map(
  sections.map((section) => {
    const newline = section.indexOf('\n')
    return [section.slice(0, newline).trim(), section.slice(newline + 1).trim()]
  }),
)

function section(name: string) {
  const value = content.get(name)
  if (!value) throw new Error(`resume.md: missing ${name} section`)
  return value
}

function fields(name: string) {
  return section(name)
    .split(/\r?\n/)
    .map((line) => {
      const separator = line.indexOf(':')
      if (separator < 1) throw new Error(`resume.md: invalid ${name} field: ${line}`)
      return { label: line.slice(0, separator), value: line.slice(separator + 1).trim() }
    })
}

function entries(name: string) {
  return section(name)
    .split(/\r?\n\s*\r?\n/)
    .map((entry) => {
      const [heading, ...lines] = entry.split(/\r?\n/)
      const parts = heading.replace(/^- /, '').split(' · ')
      const title = parts.shift()!
      const date = parts.pop()!
      const project = name === 'Selected Projects'
      const host = project ? parts.pop() : undefined
      const bullets = lines.map((line) => {
        if (!/^  - /.test(line)) throw new Error(`resume.md: invalid entry line: ${line}`)
        return line.slice(4).replace(/\\\*/g, '*')
      })

      return { title, date, host, metadata: parts.join(' · '), bullets }
    })
}

export const resume = {
  name,
  role,
  details: fields('Details'),
  profile: section('Profile'),
  experience: entries('Experience'),
  projects: entries('Selected Projects'),
  skills: fields('Technical Skills'),
}

export function emphasize(text: string) {
  return text
    .split(/(122k peak MAU|~\$100k in external funding|Audi and Volkswagen|Led a 6-person team)/g)
    .map((text, index) => ({ text, strong: index % 2 === 1 }))
}
