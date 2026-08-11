import { Link } from 'react-router-dom'
import { asset } from '@/lib/assets'
import { CONTACT, COPY } from '@/lib/castings'

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
            <img src={asset('brand/wildwood-badge-mark.svg')} alt="" />
            <span style={{ fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Wildwood Worm Castings
            </span>
          </div>
          <h1>{COPY.lawnHeadline}</h1>
          <p>{COPY.lawnSub}</p>
          <div className="cta-row">
            <Link className="btn btn--primary" to="/lawn">
              Size my lawn
            </Link>
            <a className="btn btn--secondary" href={`tel:${CONTACT.phoneTel}`}>
              Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <span className="eyebrow">Explore Wildwood worm castings</span>
          <h2>Better lawns. Healthier soil. A mission worth supporting.</h2>
          <p>
            Calculate what your lawn needs, learn why lower-nitrogen soil care matters, or let kids discover
            how worms turn scraps into something gardens can use.
          </p>
        </div>

        <div className="paths">
          <Link to="/lawn" className="path path--lawn">
            <h3>Lawn health</h3>
            <p>Fall &amp; spring. 20 lbs / 1,000 sq ft. Get an instant bag and price estimate.</p>
            <span>Size your lawn →</span>
          </Link>
          <Link to="/learn" className="path path--learn">
            <h3>Water &amp; soil</h3>
            <p>See how a lower-nitrogen, soil-first approach supports living soil and resilient turf.</p>
            <span>Why it matters →</span>
          </Link>
          <Link to="/play" className="path path--play">
            <h3>Keep a worm alive</h3>
            <p>A playful lesson for kids ages 5–10: food, moisture, eggs, worms, and castings.</p>
            <span>Play and learn →</span>
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <span className="eyebrow">Real yard · shared with permission</span>
          <h2>Before and after castings</h2>
          <p>Same home — thicker, greener turf after fall and spring applications.</p>
        </div>
        <div className="before-after">
          <figure className="ba-shot">
            <img src={asset('proof/lawn-before.png')} alt="Lawn before worm castings" />
            <figcaption>
              <strong>Before</strong> — thin, stressed turf
            </figcaption>
          </figure>
          <figure className="ba-shot">
            <img src={asset('proof/lawn-after-real.png')} alt="Lawn after worm castings" />
            <figcaption>
              <strong>After</strong> — denser green after castings
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section container">
        <div className="panel panel--product">
          <div className="panel__product-mark">
            <img src={asset('brand/wildwood-badge-mark.svg')} alt="Wildwood Worm Castings" />
          </div>
          <div>
            <span className="eyebrow">100% natural · chemical free</span>
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
        </div>
      </section>
    </>
  )
}
