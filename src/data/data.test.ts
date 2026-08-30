import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { PROJECTS } from './projects'
import { JOURNEY } from './journey'
import { SERVICES, TOOLS } from './services'
import { METRICS } from './metrics'
import { SITE } from './site'
import type { Project } from './types'
import Placeholder from '../components/Placeholder'

const nonEmpty = (s: string) => typeof s === 'string' && s.trim().length > 0
const projects: readonly Project[] = PROJECTS

describe('projects', () => {
  it('have unique ids', () => {
    const ids = PROJECTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('have a plausible year and filled outcome copy', () => {
    const thisYear = new Date().getFullYear()
    for (const p of PROJECTS) {
      expect(p.year).toBeGreaterThanOrEqual(2000)
      expect(p.year).toBeLessThanOrEqual(thisYear)
      expect(nonEmpty(p.title)).toBe(true)
      expect(nonEmpty(p.summary)).toBe(true)
      expect(nonEmpty(p.context)).toBe(true)
      expect(nonEmpty(p.solution)).toBe(true)
      expect(nonEmpty(p.discipline)).toBe(true)
    }
  })

  it('when a gallery or cover is present, it is non-empty', () => {
    for (const p of projects) {
      if (p.cover !== undefined) expect(nonEmpty(p.cover)).toBe(true)
      if (p.gallery !== undefined) {
        expect(p.gallery.length).toBeGreaterThan(0)
        for (const src of p.gallery) expect(nonEmpty(src)).toBe(true)
      }
    }
  })

  it('has enough projects to fill the grid', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(4)
  })
})

describe('journey', () => {
  it('has a filled timeline', () => {
    expect(JOURNEY.length).toBeGreaterThanOrEqual(4)
    for (const e of JOURNEY) {
      expect(nonEmpty(e.period)).toBe(true)
      expect(nonEmpty(e.role)).toBe(true)
      expect(nonEmpty(e.org)).toBe(true)
      expect(nonEmpty(e.description)).toBe(true)
    }
  })
})

describe('services', () => {
  it('have unique ids and at least one deliverable each', () => {
    const ids = SERVICES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(SERVICES.length).toBeGreaterThanOrEqual(3)
    for (const s of SERVICES) {
      expect(nonEmpty(s.title)).toBe(true)
      expect(nonEmpty(s.description)).toBe(true)
      expect(s.deliverables.length).toBeGreaterThan(0)
      for (const d of s.deliverables) expect(nonEmpty(d)).toBe(true)
    }
  })

  it('lists tools', () => {
    expect(TOOLS.length).toBeGreaterThan(0)
    for (const t of TOOLS) expect(nonEmpty(t)).toBe(true)
  })
})

describe('site contact values', () => {
  it('whatsapp is digits only (wa.me needs a bare number)', () => {
    if (SITE.whatsapp !== undefined) expect(SITE.whatsapp).toMatch(/^\d+$/)
  })

  it('linkedin, if set, is an https URL', () => {
    if (SITE.linkedin !== undefined) expect(SITE.linkedin.startsWith('https://')).toBe(true)
  })
})

describe('metrics', () => {
  it('are a short list of filled value/label pairs', () => {
    expect(METRICS.length).toBeGreaterThanOrEqual(3)
    expect(METRICS.length).toBeLessThanOrEqual(5)
    for (const m of METRICS) {
      expect(nonEmpty(m.value)).toBe(true)
      expect(nonEmpty(m.label)).toBe(true)
    }
  })
})

describe('Placeholder', () => {
  it('is deterministic for a given seed', () => {
    const once = renderToStaticMarkup(createElement(Placeholder, { seed: 'casa-cotia', label: 'x' }))
    const twice = renderToStaticMarkup(createElement(Placeholder, { seed: 'casa-cotia', label: 'x' }))
    expect(once).toBe(twice)
  })

  it('differs between seeds', () => {
    const a = renderToStaticMarkup(createElement(Placeholder, { seed: 'a', label: 'x' }))
    const b = renderToStaticMarkup(createElement(Placeholder, { seed: 'b-different', label: 'x' }))
    expect(a).not.toBe(b)
  })
})
