import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { preview } from 'astro'
import { chromium } from 'playwright-core'

// Export the built route, so the downloadable document uses the same copy,
// typography, icons and links as the web preview. No PDF renderer in the client.
const server = await preview({ server: { host: '127.0.0.1', port: 0 } })
let browser

try {
  let launchOptions = { channel: 'chrome' }
  if (process.env.CHROME_PATH) {
    launchOptions = { executablePath: process.env.CHROME_PATH }
  } else if (process.platform === 'linux' && process.arch === 'x64') {
    // Pages builds run on Linux x64. This package supplies headless Chromium
    // without requiring a system Chrome installation or root access.
    const { default: headlessChromium, inflate, setupLambdaEnvironment } = await import('@sparticuz/chromium')
    // Outside Lambda the package does not extract its shared libraries itself.
    // Supply them here too, so the build does not need OS package installation.
    const runtimePath = await inflate(fileURLToPath(new URL('../bin/al2023.tar.br', import.meta.resolve('@sparticuz/chromium'))))
    setupLambdaEnvironment(`${runtimePath}/lib`)
    launchOptions = {
      args: headlessChromium.args,
      executablePath: await headlessChromium.executablePath(),
    }
  }
  browser = await chromium.launch(launchOptions)
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
  })
  page.on('requestfailed', (request) => errors.push(`${request.failure()?.errorText} ${request.url()}`))

  await page.emulateMedia({ media: 'print', colorScheme: 'light' })
  await page.goto(`http://127.0.0.1:${server.port}/resume`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  const fits = await page.locator('.resume_page-sheet').evaluate((sheet) => {
    const bounds = sheet.getBoundingClientRect()
    const style = getComputedStyle(sheet)
    const top = bounds.top + parseFloat(style.paddingTop)
    const bottom = bounds.bottom - parseFloat(style.paddingBottom)
    const left = bounds.left + parseFloat(style.paddingLeft)
    const right = bounds.right - parseFloat(style.paddingRight)
    // Check the rendered content, not just the sheet's fixed height. A fixed
    // page can otherwise appear valid while its final lines spill onto page 2.
    return [...sheet.querySelectorAll('header, section, p, h1, h2, h3, li, dt, dd, .resume_page-date, .resume_page-project_link')].every((element) => {
      const box = element.getBoundingClientRect()
      return box.top >= top - 1 && box.bottom <= bottom + 1 && box.right <= right + 1 && box.left >= left - 1
    })
  })
  if (!fits) throw new Error('Resume exceeds the US Letter print area. Adjust the layout before exporting.')
  if (errors.length) throw new Error(`Resume failed to load:\n${errors.join('\n')}`)

  const pdf = await page.pdf({
    format: 'Letter',
    scale: 1,
    preferCSSPageSize: true,
    printBackground: true,
    displayHeaderFooter: false,
    tagged: true,
    outline: true,
  })
  const filename = 'andrei-furdui-resume.pdf'
  await writeFile(new URL(`../dist/${filename}`, import.meta.url), pdf)
  console.log(`Exported ${filename} (${Math.round(pdf.length / 1024)} KB); all content fits US Letter.`)
} finally {
  try {
    await browser?.close()
  } finally {
    await server.stop()
  }
}
