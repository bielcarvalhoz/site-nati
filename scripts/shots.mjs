// Deterministic screenshots for visual review.
// Usage: node scripts/shots.mjs [baseURL]
// Assumes a server is already running (npm run preview / npm run dev).
import { mkdir, rm } from 'node:fs/promises'
import { chromium } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:4173'
const OUT = 'screenshots'

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
]

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const problems = []

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => problems.push(`[${vp.label}] pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error') problems.push(`[${vp.label}] console.error: ${m.text()}`)
  })

  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/home-${vp.label}.png`, fullPage: true })
  console.log('saved', `${OUT}/home-${vp.label}.png`)

  // open the first project card and capture the dialog
  const firstCard = page.locator('#projetos ul button').first()
  await firstCard.click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/dialog-${vp.label}.png` })
  console.log('saved', `${OUT}/dialog-${vp.label}.png`)

  await ctx.close()
}

await browser.close()

if (problems.length) {
  console.error('\nBROWSER PROBLEMS:\n' + problems.join('\n'))
  process.exit(1)
}
console.log('\nno console/page errors')
