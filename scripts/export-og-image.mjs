import { readFile, writeFile } from 'node:fs/promises'
import { preview } from 'astro'
import { launchBrowser } from './browser.mjs'

const scale = 2
const server = await preview({ server: { host: '127.0.0.1', port: 0 } })
let browser

try {
  browser = await launchBrowser()
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: scale,
    colorScheme: 'light',
  })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
  })
  page.on('requestfailed', (request) => errors.push(`${request.failure()?.errorText} ${request.url()}`))

  await page.goto(`http://127.0.0.1:${server.port}/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => {
    const hero = document.querySelector('.home_page-section[data-section="hero"]')
    const bottomMark = document.querySelector('.home_page-section[data-section="contact"] > .home_page-registration_mark_anchor:last-child')
    if (!hero || !bottomMark) throw new Error('OG export requires the homepage hero and registration marks.')

    hero.append(bottomMark.cloneNode())
    document.querySelectorAll('.home_page-section:not([data-section="hero"]), .home_page-footer').forEach((node) => node.remove())
  })
  await page.addStyleTag({ content: await readFile(new URL('./og-image.css', import.meta.url), 'utf8') })

  const frame = await page.locator('.home_page-rails').evaluate((rails) => {
    const bounds = rails.getBoundingClientRect()
    const border = parseFloat(getComputedStyle(rails).borderLeftWidth)
    for (const selector of ['.home_page-title', '.home_page-role']) {
      const text = rails.querySelector(selector).getBoundingClientRect()
      if (text.left < bounds.left || text.right > bounds.right || text.top < bounds.top || text.bottom > bounds.bottom) {
        throw new Error(`OG text overflows: ${selector}`)
      }
    }
    return {
      left: bounds.left + border / 2,
      right: bounds.right - border / 2,
      top: bounds.top + border / 2,
      bottom: bounds.bottom - border / 2,
    }
  })
  if (errors.length) throw new Error(`OG image failed to load:\n${errors.join('\n')}`)

  const png = await page.screenshot({ animations: 'disabled' })
  // Compare the actual PNG strokes, not just DOM positions: background-image
  // rounding can shift painted pixels while the element's geometry is correct.
  const alignment = await page.evaluate(async ({ data, frame, scale }) => {
    const image = new Image()
    image.src = `data:image/png;base64,${data}`
    await image.decode()
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)

    function stroke(axis, center, fixed) {
      const start = Math.round(center * scale) - 4
      const at = Math.floor(fixed * scale)
      const { data } = context.getImageData(axis === 'x' ? start : at, axis === 'x' ? at : start, axis === 'x' ? 9 : 1, axis === 'x' ? 1 : 9)
      const levels = Array.from({ length: 9 }, (_, i) => data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2])
      const lightest = Math.max(...levels)
      const contrast = lightest - Math.min(...levels)
      if (contrast < 10) throw new Error('Registration mark or frame stroke is missing.')
      return levels.flatMap((level, i) => lightest - level >= contrast * 0.75 ? [start + i] : [])
    }

    return ['top', 'bottom'].flatMap((vertical) => ['left', 'right'].map((horizontal) => {
      const x = frame[horizontal]
      const y = frame[vertical]
      const dx = horizontal === 'left' ? 1 : -1
      const dy = vertical === 'top' ? 1 : -1
      const markX = stroke('x', x, y + dy * 3)
      const railX = stroke('x', x, y + dy * 16)
      const markY = stroke('y', y, x + dx * 3)
      const railY = stroke('y', y, x + dx * 16)
      return {
        corner: `${vertical}-${horizontal}`,
        aligned: JSON.stringify(markX) === JSON.stringify(railX) && JSON.stringify(markY) === JSON.stringify(railY),
        markX, railX, markY, railY,
      }
    }))
  }, { data: png.toString('base64'), frame, scale })
  if (alignment.some((corner) => !corner.aligned)) {
    throw new Error(`OG registration marks are misaligned:\n${JSON.stringify(alignment, null, 2)}`)
  }

  await writeFile(new URL('../public/og-image.png', import.meta.url), png)
  await writeFile(new URL('../dist/og-image.png', import.meta.url), png)
  console.log(`Exported og-image.png (2400 × 1260, ${Math.round(png.length / 1024)} KB); all four crosses align with the frame pixels.`)
} finally {
  try {
    await browser?.close()
  } finally {
    await server.stop()
  }
}
