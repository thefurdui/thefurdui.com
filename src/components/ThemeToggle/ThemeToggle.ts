type Theme = 'light' | 'dark'
type ThemePreference = Theme | 'auto'

const STORAGE_KEY = 'thefurdui.theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

const isThemePreference = (v: string | null): v is ThemePreference => v === 'light' || v === 'auto' || v === 'dark'

const readStored = (): ThemePreference => {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return isThemePreference(v) ? v : 'auto'
  } catch {
    return 'auto'
  }
}

const writeStored = (pref: ThemePreference) => {
  try {
    localStorage.setItem(STORAGE_KEY, pref)
  } catch {}
}

const resolveTheme = (pref: ThemePreference): Theme => {
  if (pref !== 'auto') return pref
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

const applyTheme = (active: Theme) => {
  document.documentElement.setAttribute('data-theme', active)

  // Sync meta theme-color with --bg-page
  const resolved = getComputedStyle(document.documentElement).getPropertyValue('--bg-page').trim()

  if (resolved) {
    let meta = document.getElementById('meta-theme-color') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.id = 'meta-theme-color'
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', resolved)
  }
}

let preference = readStored()
// The inline script in <head> already applied the correct data-theme
applyTheme(resolveTheme(preference))

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const current = resolveTheme(preference)
  const next: Theme = current === 'light' ? 'dark' : 'light'

  preference = next
  writeStored(next)
  applyTheme(next)
})

window.matchMedia(DARK_QUERY).addEventListener('change', (e) => {
  if (preference === 'auto') {
    applyTheme(e.matches ? 'dark' : 'light')
  }
})
