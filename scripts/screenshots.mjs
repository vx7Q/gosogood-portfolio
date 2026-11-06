import { chromium } from 'playwright-core'
import fs from 'node:fs'

const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const outDir = 'screens'
fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ executablePath, headless: true })
const errors = []

async function revealAll(page) {
  const height = await page.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y)
    await page.waitForTimeout(90)
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1200)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(900)
}

async function shotSections(page, prefix, ids) {
  for (const id of ids) {
    await page.evaluate((sectionId) => {
      const el = document.getElementById(sectionId)
      if (!el) return
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80)
    }, id)
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${outDir}/${prefix}-${id}-vp.png` })
  }
}

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const page = await desktop.newPage()
page.on('pageerror', (error) => errors.push(`PAGEERROR: ${error.message}`))
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`CONSOLE: ${message.text()}`)
})

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.screenshot({ path: `${outDir}/00-loader.png` })
await page.waitForTimeout(3800)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: `${outDir}/01-hero-desktop.png` })

await revealAll(page)
await page.screenshot({ path: `${outDir}/02-fullpage.png`, fullPage: true })

const ids = ['home', 'about', 'skills', 'projects', 'experience', 'services', 'contact']
await shotSections(page, 'vp', ids)

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(800)
await page.screenshot({ path: `${outDir}/03-footer-desktop.png` })

// Project modal
await page.evaluate(() => {
  const el = document.getElementById('projects')
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80)
})
await page.waitForTimeout(600)
await page.getByRole('button', { name: 'Live Demo' }).first().click()
await page.waitForTimeout(900)
await page.screenshot({ path: `${outDir}/04-project-modal.png` })

const dialog = page.getByRole('dialog')
await dialog.getByRole('button', { name: 'Inspect source' }).click()
await page.waitForTimeout(800)
await page.screenshot({ path: `${outDir}/05-source-modal.png` })
await page.keyboard.press('Escape')
await page.waitForTimeout(600)

// Mobile
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
})
const mobilePage = await mobile.newPage()
mobilePage.on('pageerror', (error) => errors.push(`MOBILE PAGEERROR: ${error.message}`))
await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await mobilePage.waitForTimeout(4800)
await mobilePage.evaluate(() => document.fonts.ready)
await mobilePage.screenshot({ path: `${outDir}/10-mobile-hero.png` })
await revealAll(mobilePage)
await shotSections(mobilePage, 'm', ids)

// Mobile menu
await mobilePage.evaluate(() => window.scrollTo(0, 0))
await mobilePage.waitForTimeout(500)
await mobilePage.getByRole('button', { name: 'Open menu' }).click()
await mobilePage.waitForTimeout(700)
await mobilePage.screenshot({ path: `${outDir}/12-mobile-menu.png` })
await mobilePage.getByRole('button', { name: 'Close menu' }).click()
await mobilePage.waitForTimeout(500)

// Mobile modal
await mobilePage.evaluate(() => {
  const el = document.getElementById('projects')
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80)
})
await mobilePage.waitForTimeout(500)
await mobilePage.getByRole('button', { name: 'Live Demo' }).first().click()
await mobilePage.waitForTimeout(800)
await mobilePage.screenshot({ path: `${outDir}/13-mobile-modal.png` })

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none')
await browser.close()
