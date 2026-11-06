import { chromium } from 'playwright-core'
import path from 'node:path'

const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await chromium.launch({ executablePath, headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
const svgPath = path.resolve('public/og-image.svg').replace(/\\/g, '/')
await page.goto(`file:///${svgPath}`)
await page.waitForTimeout(500)
await page.screenshot({ path: 'public/og-image.png' })
console.log('og image written')
await browser.close()
