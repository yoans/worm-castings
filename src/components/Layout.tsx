import { NavLink } from 'react-router-dom'
import { asset } from '@/lib/assets'
import { CONTACT } from '@/lib/castings'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="brand">
          <img
            className="brand__mark"
            src={asset('brand/wildwood-badge-mark.svg')}
            alt="Wildwood Worm Castings"
          />
          <span className="brand__text">
            <span className="brand__product">Worm Castings</span>
            <span className="brand__ranch">Wildwood Hills Ranch</span>
          </span>
        </NavLink>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/lawn" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Lawn
          </NavLink>
          <NavLink to="/learn" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Learn
          </NavLink>
          <NavLink to="/play" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            <span className="nav__full">Worm Farm</span>
            <span className="nav__short">Farm</span>
          </NavLink>
          <a className="nav-phone" href={`tel:${CONTACT.phoneTel}`}>
            <span className="nav__full">{CONTACT.phoneDisplay}</span>
            <span className="nav__short">Call</span>
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
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{CONTACT.productName}</h3>
          <p style={{ margin: '0 0 0.65rem', maxWidth: '42ch' }}>{CONTACT.mission}</p>
          <p style={{ margin: 0, maxWidth: '42ch' }}>
            Youth-connected worm castings that boost lawn and soil health — call or text to buy.
          </p>
        </div>
        <div>
          <p style={{ margin: '0 0 0.35rem', fontWeight: 800, color: 'var(--ranch-orange)' }}>Buy / inquire</p>
          <p style={{ margin: 0 }}>
            {CONTACT.ranchName}
            <br />
            {CONTACT.addressLine1}
            <br />
            {CONTACT.addressLine2}
            <br />
            <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
            <br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <br />
            <a href={CONTACT.ranchSite} target="_blank" rel="noreferrer">
              wildwoodhillsranch.org
            </a>
          </p>
        </div>
        <p style={{ margin: 0, gridColumn: '1 / -1', opacity: 0.85, fontSize: '0.92rem' }}>
          Fall &amp; spring · <strong>20 lbs per 1,000 sq ft</strong> · <strong>$40 per 40 lb bag</strong>
        </p>
        <p className="footer-credit">
          Site by{' '}
          <a href={CONTACT.hostUrl} target="_blank" rel="noreferrer">
            Build Beyond Belief
          </a>
          <span aria-hidden="true"> · </span>
          worm-castings.buildbeyondbelief.com
        </p>
      </div>
    </footer>
  )
}
