import { useEffect, useState, type ReactNode } from 'react'
import { CONTACT_ID, CONTENT_ID, NAV_ITEMS, TOP_ID } from '../lib/nav'
import { SITE } from '../data/site'
import styles from './Layout.module.css'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 8)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href={`#${CONTENT_ID}`}>
        Pular para o conteúdo
      </a>

      <header className={styles.header} data-scrolled={scrolled}>
        <div className={`container container-wide ${styles.bar}`}>
          <a href={`#${TOP_ID}`} className={styles.brand}>
            {SITE.name}
            <span>Arquitetura</span>
          </a>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={menuOpen}
              aria-controls="menu-sections"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? 'Fechar' : 'Menu'}
            </button>

            <nav aria-label="Seções do site">
              <ul id="menu-sections" className={styles.navList} data-open={menuOpen}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a href={`#${CONTACT_ID}`} className={styles.cta}>
              Vamos conversar
            </a>
          </div>
        </div>
      </header>

      <main id={CONTENT_ID} tabIndex={-1}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={`container container-wide ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <div className={styles.footerName}>{SITE.fullName}</div>
            <p>{SITE.footerLine}</p>
            <a href={`#${CONTACT_ID}`} className={styles.footerCta}>
              Vamos conversar
            </a>
          </div>
          <div className={styles.footerMeta}>
            {SITE.whatsapp && (
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            )}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {SITE.instagram && (
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            <a href={`#${TOP_ID}`}>Voltar ao topo ↑</a>
            {SITE.cau && <span className={styles.muted}>{SITE.cau}</span>}
          </div>
        </div>
        <div className={styles.footerLegal}>
          <div className="container container-wide">
            <span>
              © {new Date().getFullYear()} {SITE.fullName}
            </span>
            <span>{SITE.city}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
