import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BuyInquire } from '@/components/BuyInquire'
import { asset } from '@/lib/assets'
import { COPY, RATES, bagsNeeded, estimatePrice, lbsNeeded } from '@/lib/castings'

export function LawnPage() {
  const [sqFt, setSqFt] = useState(15000)
  const [seasons, setSeasons] = useState(2)

  const result = useMemo(() => estimatePrice(sqFt, seasons), [sqFt, seasons])
  const perSeasonLbs = lbsNeeded(sqFt)
  const perSeasonBags = bagsNeeded(sqFt)
  const estimateLabel = `~${result.lbs.toLocaleString()} lbs · ~$${result.price.toLocaleString()}`

  return (
    <div className="container page-hero">
      <span className="eyebrow">Fall lawn push · call or visit to buy</span>
      <h1>{COPY.lawnHeadline}</h1>
      <p>
        Boost lawn health naturally by applying worm castings in fall and spring. Size your yard, see the
        nitrate / water-ban pitch, then call or visit the Ranch — there is no online cart yet.
      </p>

      <div className="calc" style={{ marginTop: '1.75rem' }}>
        <div className="panel calc__form">
          <label htmlFor="sqft">How big is your yard? (sq ft)</label>
          <input
            id="sqft"
            type="number"
            min={500}
            step={500}
            value={sqFt}
            onChange={(e) => setSqFt(Math.max(500, Number(e.target.value) || 500))}
          />

          <label htmlFor="preset">Quick presets</label>
          <select id="preset" value={String(sqFt)} onChange={(e) => setSqFt(Number(e.target.value))}>
            <option value="2000">Small city lot · 2,000 sq ft</option>
            <option value="5000">Typical lot · 5,000 sq ft</option>
            <option value="10000">Large lot · 10,000 sq ft</option>
            <option value="15000">~0.45 acre lawn · 15,000 sq ft</option>
            <option value="25000">Estate · 25,000 sq ft</option>
            <option value="50000">Two applications on 25k · 50,000 sq ft total</option>
          </select>

          <label htmlFor="seasons">Application plan</label>
          <select id="seasons" value={seasons} onChange={(e) => setSeasons(Number(e.target.value))}>
            <option value={1}>Fall only</option>
            <option value={2}>Fall + spring (recommended)</option>
          </select>

          <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
            Rate: <strong>{RATES.lbsPerThousandSqFt} lbs per 1,000 sq ft</strong>. Pricing guide from Ranch
            conversations: about ${RATES.pricePerTwoThousandSqFt} per 2,000 sq ft · ${RATES.bulkPrice} for{' '}
            {RATES.bulkLbs.toLocaleString()} lbs. Bag weight shown as ~{RATES.bagLbs} lb for estimates — confirm
            when you call.
          </p>
        </div>

        <div className="calc__result">
          <div>
            <div className="calc__metric">
              {result.lbs.toLocaleString()} lbs
              <small>
                {seasons === 2 ? 'Fall + spring total' : 'This season'} · ~{perSeasonBags} bags / season (est.)
              </small>
            </div>
          </div>
          <div className="calc__metric" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            ~${result.price.toLocaleString()}
            <small>{result.note}</small>
          </div>
          <p style={{ margin: 0, position: 'relative', zIndex: 1 }}>
            Each season: <strong>{perSeasonLbs.toLocaleString()} lbs</strong>. Apply with a fertilizer
            spreader. No online checkout; call or visit to purchase.
          </p>
          <div className="cta-row" style={{ marginTop: 0, position: 'relative', zIndex: 1 }}>
            <a className="btn btn--primary" href="#buy">
              Call / visit to buy
            </a>
            <a className="btn btn--secondary" href="#nitrates">
              Why this helps in water bans
            </a>
          </div>
        </div>
      </div>

      <div className="stat-strip">
        <div className="stat">
          <strong>20 lbs</strong>
          <span>per 1,000 sq ft</span>
        </div>
        <div className="stat">
          <strong>Low N</strong>
          <span>absorbs into soil — kinder to drinking water</span>
        </div>
        <div className="stat">
          <strong>2×</strong>
          <span>fall + spring for best lawn recovery</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="section__head">
          <span className="eyebrow">Customer proof</span>
          <h2>Before &amp; after lawn health</h2>
          <p>
            Illustrative before/after while we gather photo documentation. Real results below from a Central
            Iowa lawn treated fall and spring by 5 Sons Landscaping of Winterset.
          </p>
        </div>

        <div className="before-after">
          <figure className="ba-shot">
            <img
              src={asset('proof/lawn-before.png')}
              alt="Patchy lawn before soil improvement with worm castings"
              width={1200}
              height={900}
            />
            <figcaption>
              <strong>Before</strong> — thin cover, stress patches, soil that needs biology
            </figcaption>
          </figure>
          <figure className="ba-shot">
            <img
              src={asset('proof/lawn-after.png')}
              alt="Dense green lawn after worm castings program"
              width={1200}
              height={900}
            />
            <figcaption>
              <strong>After</strong> — thicker turf from soil-first care (illustrative target look)
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" id="nitrates" style={{ paddingTop: '1.5rem' }}>
        <div className="section__head">
          <span className="eyebrow">Nitrates · water bans · shortages</span>
          <h2>Less soluble nitrate. More water held in the lawn.</h2>
          <p>{COPY.waterBanPitch}</p>
        </div>

        <div className="nitrate-compare" role="group" aria-label="Water ban context versus castings choice">
          <article className="compare compare--chem">
            <h3>What central Iowa felt</h3>
            <p>
              When Des Moines / Raccoon River nitrates stay high, treatment capacity tightens. Lawn watering —
              often ~40% of summer demand — gets restricted so drinking water stays reliable.
            </p>
            <p className="compare__verdict">High nitrate + high lawn demand = bans &amp; shortages</p>
          </article>
          <article className="compare compare--cast">
            <h3>What castings change at home</h3>
            <p>
              Worm castings are <strong>low in nitrogen</strong> and absorb better into the soil — helping
              avoid exacerbating nitrate issues in Central Iowa&apos;s drinking water. They also help soil
              hold moisture.
            </p>
            <p className="compare__verdict">Household swap that supports soil, not spike-and-flush</p>
          </article>
        </div>
        <p className="proof-note">
          Honest frame: farm runoff drives most river nitrates. Your yard is still a place to model better
          habits — especially when neighbors are living through watering bans.
        </p>
        <div className="cta-row">
          <Link className="btn btn--ghost" to="/learn">
            Full nitrate pamphlet
          </Link>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1.5rem' }} aria-labelledby="testimonial-heading">
        <div className="section__head">
          <span className="eyebrow">Testimonial · shared with permission</span>
          <h2 id="testimonial-heading">100% improvement — fall and spring</h2>
        </div>

        <blockquote className="testimonial testimonial--featured">
          <p>
            “We had 5 Sons Landscaping of Winterset apply Wildwood worm castings to our struggling lawn in the
            fall and the spring. These treatments provided a 100% improvement of our lawn. This natural dirt
            enhancer is safe for pets and people. Worm castings are low in nitrogen and absorb better into the
            soil to avoid exacerbating the nitrate issues in Central Iowa&apos;s drinking water.”
          </p>
          <footer>
            <strong>Rick Ball</strong>
            <span>Applied by 5 Sons Landscaping of Winterset · fall + spring</span>
          </footer>
        </blockquote>
      </section>

      <BuyInquire sqFt={sqFt} seasons={seasons} estimateLabel={estimateLabel} />

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="section__head">
          <span className="eyebrow">Application methods</span>
          <h2>For the best results</h2>
          <p>Use a fertilizer spreader for lawns — not a compost spreader (that&apos;s for vermicompost).</p>
        </div>

        <div className="panel methods">
          <article className="method">
            <div className="method__num">1</div>
            <div>
              <h3>Dry top-dressing</h3>
              <p style={{ marginBottom: '0.35rem' }}>
                <strong>Best for overall soil health.</strong> Apply about 15–20 pounds per 1,000 sq ft.
                Broadcast evenly by hand or with a <strong>fertilizer spreader</strong>. For best
                distribution, apply just before mowing and use a mulching attachment.
              </p>
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Timing: spring and fall — help roots recover and prep soil for temperature changes.
              </p>
            </div>
          </article>
          <article className="method">
            <div className="method__num">2</div>
            <div>
              <h3>Post-aeration application</h3>
              <p style={{ margin: 0 }}>
                <strong>Best for compacted soil.</strong> Core-aerate the lawn, then spread castings with a
                fertilizer spreader. Watering or rain washes nutrient-rich castings down into the aeration
                holes.
              </p>
            </div>
          </article>
          <article className="method">
            <div className="method__num">3</div>
            <div>
              <h3>Gardens, pots &amp; beds</h3>
              <p style={{ margin: 0 }}>
                From the ranch brochure: sprinkle as top dressing and gently rake in, or mix about 20%
                castings into potting soil / seed starter. Safe for all plants — won&apos;t burn, doesn&apos;t
                smell.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="panel" style={{ background: 'linear-gradient(135deg, #fff8e6, #f3faf5)' }}>
          <span className="eyebrow" style={{ color: 'var(--ranch-orange-deep)' }}>
            Mid-August signage
          </span>
          <h2>Market board copy</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--forest-deep)', fontWeight: 700 }}>
            <li>Boost lawn growth naturally with worm castings.</li>
            <li>Boost lawn health naturally with worm castings.</li>
            <li>Boost lawn health naturally by applying worm castings in fall and spring.</li>
            <li>20 lbs per 1,000 sq ft.</li>
            <li>Transform your lawn naturally with worm castings!</li>
            <li>Call 641-396-2414 · 2552 Union Lane, St. Charles</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
