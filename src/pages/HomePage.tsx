import { Link } from 'react-router-dom'
import { asset } from '@/lib/assets'
import { COPY } from '@/lib/castings'

export function HomePage() {
  return (
    <>
      <section className="hero" aria-label="Worm castings hero">
        <div
          className="hero__media"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(105deg, rgba(0, 56, 46, 0.88) 0%, rgba(0, 80, 64, 0.55) 45%, rgba(0, 56, 46, 0.35) 100%),
              url(${asset('brand/hero-lawn.png')})
            `,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="hero__content">
          <div className="hero__brand">
            <img src={asset('brand/whr-logo.png')} alt="" />
            <span style={{ fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Wildwood Hills Ranch of Iowa
            </span>
          </div>
          <h1>{COPY.lawnHeadline}</h1>
          <p>{COPY.lawnSub}</p>
          <div className="cta-row">
            <Link className="btn btn--primary" to="/lawn">
              Size my lawn
            </Link>
            <Link className="btn btn--secondary" to="/learn">
              Water bans &amp; nitrates
            </Link>
            <a className="btn btn--secondary" href="tel:6413962414">
              Call 641-396-2414
            </a>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <span className="eyebrow">Three ways in</span>
          <h2>Sell today. Educate Iowa. Grow tomorrow&apos;s customers.</h2>
          <p>
            Lawn demand can move inventory this fall. The nitrate story earns trust. The worm farm game
            programs kids — and their parents — into castings as the natural choice.
          </p>
        </div>

        <div className="paths">
          <Link to="/lawn" className="path path--lawn">
            <h3>Lawn health</h3>
            <p>Fall &amp; spring. 20 lbs / 1,000 sq ft. Instant bag &amp; price estimate.</p>
            <span>Explosive conversion →</span>
          </Link>
          <Link to="/learn" className="path path--learn">
            <h3>Nitrates &amp; soil</h3>
            <p>Low nitrogen. Absorbs into soil. Protects worms from synthetic-salt shock.</p>
            <span>Portable pamphlet →</span>
          </Link>
          <Link to="/play" className="path path--play">
            <h3>Keep a worm alive</h3>
            <p>Kids 5–10: moisture, food, eggs, castings. Cute loop. Parental co-play.</p>
            <span>Customers of tomorrow →</span>
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="panel">
          <span className="eyebrow">From the brochure</span>
          <h2>What are worm castings?</h2>
          <p>
            Worm castings are a natural dirt enhancer produced from earthworms. Also known as vermicast —
            the product of worm digestion. {COPY.safeLine}
          </p>
          <p style={{ marginBottom: 0 }}>
            Naturally full of desirable microorganisms. They produce, store, and slowly release plant
            nutrients — helping increase water retention, improve aeration, and anchor nutrients that would
            otherwise leach away with water.
          </p>
        </div>
      </section>
    </>
  )
}
