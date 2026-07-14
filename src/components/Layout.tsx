import { NavLink } from 'react-router-dom'
import { CONTACT } from '@/lib/castings'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="brand">
          <img src="/brand/whr-logo.png" alt="Wildwood Hills Ranch of Iowa" />
          <span className="brand__text">
            <span className="brand__product">Worm Castings</span>
            <span className="brand__ranch">Wildwood Hills Ranch</span>
          </span>
        </NavLink>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/lawn" className={({ isActive }) => (isActive ? 'active nav--orange' : 'nav--orange')}>
            Lawn
          </NavLink>
          <NavLink to="/learn" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Learn
          </NavLink>
          <NavLink to="/play" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Worm Farm
          </NavLink>
          <a className="nav-phone" href={`tel:${CONTACT.phoneTel}`}>
            {CONTACT.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner footer-grid">
        <div>
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{CONTACT.ranchName}</h3>
          <p style={{ margin: 0, maxWidth: '42ch' }}>
            Youth-connected worm castings that boost lawn and soil health — call or visit to buy. Online
            checkout coming later if a Stripe storefront is added.
          </p>
        </div>
        <div>
          <p style={{ margin: '0 0 0.35rem', fontWeight: 800, color: 'var(--ranch-orange)' }}>Buy / inquire</p>
          <p style={{ margin: 0 }}>
            {CONTACT.addressLine1}
            <br />
            {CONTACT.addressLine2}
            <br />
            <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
            <br />
            <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">
              Directions
            </a>
            {' · '}
            <a href={CONTACT.castingsPage} target="_blank" rel="noreferrer">
              Castings page
            </a>
          </p>
        </div>
        <p style={{ margin: 0, gridColumn: '1 / -1', opacity: 0.85, fontSize: '0.92rem' }}>
          Fall &amp; spring · <strong>20 lbs per 1,000 sq ft</strong> · Farmer&apos;s Market signage from
          mid-August
        </p>
      </div>
    </footer>
  )
}
