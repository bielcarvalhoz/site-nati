import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { ACADEMICOS, PROJECTS, REALIZADOS } from './projects'
import { JOURNEY } from './journey'
import { SERVICES, TOOLS } from './services'
import { METRICS } from './metrics'
import { TESTIMONIALS } from './testimonials'
import Placeholder from '../components/Placeholder'

const nonEmpty = (s: string) => typeof s === 'string' && s.trim().length > 0

describe('projects', () => {
  it('have unique ids', () => {
    const ids = PROJECTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('have a valid category, plausible year, and filled outcome copy', () => {
    const thisYear = new Date().getFullYear()
    for (const p of PROJECTS) {
      expect(['realizado', 'academico']).toContain(p.category)
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
    for (const p of PROJECTS) {
      if ('cover' in p) expect(nonEmpty(p.cover as string)).toBe(true)
      if ('gallery' in p) {
        const g = p.gallery as readonly string[]
        expect(g.length).toBeGreaterThan(0)
        for (const src of g) expect(nonEmpty(src)).toBe(true)
      }
    }
  })

  it('has enough built and academic work to fill both blocks', () => {
    expect(REALIZADOS.length).toBeGreaterThanOrEqual(6)
    expect(ACADEMICOS.length).toBeGreaterThanOrEqual(3)
    expect(REALIZADOS.length + ACADEMICOS.length).toBe(PROJECTS.length)
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

describe('testimonials', () => {
  it('are filled quote/author/role triples', () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    for (const t of TESTIMONIALS) {
      expect(nonEmpty(t.quote)).toBe(true)
      expect(nonEmpty(t.author)).toBe(true)
      expect(nonEmpty(t.role)).toBe(true)
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
