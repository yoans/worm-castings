import { Link } from 'react-router-dom'
import { CONTACT, COPY } from '@/lib/castings'

export function LearnPage() {
  return (
    <div className="container page-hero learn-page">
      <span className="eyebrow">Portable pamphlet · education → call to buy</span>
      <h1>Start with nitrates. Land on castings.</h1>
      <p className="learn-lede">{COPY.nitrateHook}</p>

      <div className="nitrate-compare" role="group" aria-label="Nitrate load comparison">
        <article className="compare compare--chem">
          <h2>Chemical fertilizer reflex</h2>
          <p>Quick green-up. High soluble nitrates. Nutrients that don&apos;t stick can move with water.</p>
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
          <h2>Worm castings choice</h2>
          <p>
            About <strong>1/5 the nitrates</strong> of chemical fertilizers. Microbes + slow release + nutrients
            anchored in soil structure — better water holding in the root zone.
          </p>
          <div
            className="bar bar--fifth"
            role="img"
            aria-label="Relative nitrate load: about one fifth"
          >
            <span />
          </div>
          <p className="compare__verdict">Relative nitrate load: about 1/5</p>
        </article>
      </div>

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
            Castings are not a watershed fix. They are a concrete household swap: feed soil biology, hold
            moisture in the lawn, and stop reaching for the highest nitrate bag by default — especially when
            your community is living through bans.
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
            </ul>
          </article>
          <article className="fact-card">
            <h3>How to use</h3>
            <ul>
              <li>Top-dress and gently rake into soil</li>
              <li>Mix about 20% into potting soil or seed starter</li>
              <li>Lawns: 20 lbs per 1,000 sq ft</li>
              <li>Best timing: fall and spring</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }} aria-labelledby="how-to-buy-heading">
        <div className="panel panel--readable" style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <span className="eyebrow">How to buy</span>
            <h2 id="how-to-buy-heading">No online store yet — call or visit</h2>
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
