import { Link } from 'react-router-dom'
import { CONTACT, COPY, RATES } from '@/lib/castings'

export function LearnPage() {
  return (
    <div className="container page-hero learn-page">
      <span className="eyebrow">Lower nitrogen · living soil · resilient lawns</span>
      <h1>A soil-first choice for Iowa lawns</h1>
      <p className="learn-lede">{COPY.nitrateHook}</p>

      <div className="nitrate-compare" role="group" aria-label="Nitrate load comparison">
        <article className="compare compare--chem">
          <h2>High-nitrogen fertilizer</h2>
          <p>Fast green-up can come with more soluble nitrogen than the lawn and soil can hold.</p>
          <div
            className="bar bar--full"
            role="img"
            aria-label="Relative nitrate load: high, full bar"
          >
            <span />
          </div>
          <p className="compare__verdict">Relative nitrate load: high</p>
        </article>
        <article className="compare compare--cast">
          <h2>Wildwood worm castings</h2>
          <p>
            <strong>2% total nitrogen</strong>, plus organic matter and living biology that support a slower,
            soil-first approach to feeding turf.
          </p>
          <div
            className="bar bar--fifth"
            role="img"
            aria-label="Total nitrogen by weight: 2 percent compared with a product labeled 10 percent"
          >
            <span />
          </div>
          <p className="compare__verdict">80% lower total nitrogen by weight*</p>
        </article>
      </div>
      <p className="proof-note">
        *Comparison is based on total nitrogen by weight versus a product labeled 10%; application rates
        differ.
      </p>

      <section className="section" style={{ paddingTop: '2.5rem' }} aria-labelledby="iowa-water-heading">
        <div className="panel panel--readable">
          <span className="eyebrow">Iowa water bans &amp; shortages</span>
          <h2 id="iowa-water-heading">Why neighbors already feel this</h2>
          <p>{COPY.waterBanPitch}</p>
          <p>
            In 2025–2026, Central Iowa Water Works restricted lawn watering when source-water nitrates stayed
            elevated and treatment plants ran near capacity. Lawn irrigation can be about{' '}
            <strong>40% of summer demand</strong> — so when nitrates squeeze treatment capacity, outdoor
            watering is the first cut to protect drinking supply.
          </p>
          <p className="learn-callout">
            Castings are not a watershed fix. They are a practical lower-nitrogen lawn choice that supports
            soil biology and moisture retention — especially when your community is living through watering
            restrictions.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }} aria-labelledby="worms-heading">
        <div className="panel panel--readable">
          <span className="eyebrow">Protect the worms that build your soil</span>
          <h2 id="worms-heading">Chemical fertilizers can harm earthworms</h2>
          <p>{COPY.wormProtect}</p>
          <div className="fact-grid" style={{ marginTop: '1rem' }}>
            <article className="fact-card">
              <h3>What hurts worms</h3>
              <ul>
                <li>
                  <strong>Direct toxicity:</strong> anhydrous ammonia and ammonium sulfate can be lethal near
                  the application zone (sudden pH swings and ammonia toxicity)
                </li>
                <li>
                  <strong>Osmotic stress:</strong> concentrated synthetic salts pull moisture out of worms —
                  dehydrating them
                </li>
                <li>
                  Pesticides and insecticides are typically highly toxic to earthworms
                </li>
              </ul>
            </article>
            <article className="fact-card">
              <h3>What builds worm life</h3>
              <ul>
                <li>Shift toward organic alternatives — compost, well-rotted manure, plant mulches</li>
                <li>Worm castings feed soil life instead of stressing it with synthetic salts</li>
                <li>
                  If you must use chemical fertilizer, stick to manufacturer rates — over-application burns
                  and dehydrates worms
                </li>
              </ul>
            </article>
          </div>
          <p className="proof-note" style={{ marginBottom: 0 }}>
            Regular applications of chemical fertilizer at recommended rates may not wipe out whole
            populations — and plant growth can add organic matter over time — but if you want to actively
            protect and grow worms, organics are the clearer path.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }} aria-labelledby="what-castings-heading">
        <div className="section__head">
          <span className="eyebrow">What are worm castings?</span>
          <h2 id="what-castings-heading">Natural dirt enhancer. Vermicast.</h2>
          <p>Produced from earthworms — the product of worm digestion. {COPY.safeLine}</p>
        </div>

        <div className="fact-grid">
          <article className="fact-card">
            <h3>Benefits</h3>
            <ul>
              <li>Naturally full of desirable microorganisms</li>
              <li>Slow-release plant nutrients</li>
              <li>Helps soil hold water and stay aerated</li>
              <li>Anchors nutrients that would otherwise leach away</li>
              <li>Safe for kids, pets, and pollinators — no burn, no harsh synthetic salts</li>
              <li>Supports the mission and programs of Wildwood Hills Ranch</li>
            </ul>
          </article>
          <article className="fact-card">
            <h3>How to use</h3>
            <ul>
              <li>Lawns: by hand (toss and rake) or a top dresser — not a fertilizer spreader</li>
              <li>Top-dress gardens and gently rake in</li>
              <li>Mix about {RATES.pottingMixPercent}% into potting soil or seed starter</li>
              <li>Lawns: 20 lbs per 1,000 sq ft · fall and spring</li>
              <li>Find a top dresser rental, or hire 5 Sons of Winterset to apply</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }} aria-labelledby="how-to-buy-heading">
        <div className="panel panel--readable" style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <span className="eyebrow">How to buy</span>
            <h2 id="how-to-buy-heading">Call or text to order</h2>
            <p style={{ marginBottom: '0.35rem' }}>
              <strong>{CONTACT.ranchName}</strong>
              <br />
              {CONTACT.addressLine1}, {CONTACT.addressLine2}
            </p>
            <p style={{ marginBottom: 0 }}>
              Phone:{' '}
              <a className="text-link" href={`tel:${CONTACT.phoneTel}`}>
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </div>
          <div className="cta-row">
            <Link className="btn btn--forest" to="/lawn#buy">
              Size lawn &amp; build inquiry
            </Link>
            <a className="btn btn--ghost" href={`tel:${CONTACT.phoneTel}`}>
              Call {CONTACT.phoneDisplay}
            </a>
            <Link className="btn btn--ghost" to="/play">
              Play the worm farm
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
