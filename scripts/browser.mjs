import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

export async function launchBrowser() {
  if (process.env.CHROME_PATH) {
    return chromium.launch({ executablePath: process.env.CHROME_PATH })
  }

  if (process.platform === 'linux' && process.arch === 'x64') {
    const { default: headlessChromium, inflate, setupLambdaEnvironment } = await import('@sparticuz/chromium')
    // Outside Lambda, extract the shared libraries as well as the executable.
    const runtimePath = await inflate(fileURLToPath(new URL('../bin/al2023.tar.br', import.meta.resolve('@sparticuz/chromium'))))
    setupLambdaEnvironment(`${runtimePath}/lib`)
    return chromium.launch({
      args: headlessChromium.args,
      executablePath: await headlessChromium.executablePath(),
    })
  }

  return chromium.launch({ channel: 'chrome' })
}
