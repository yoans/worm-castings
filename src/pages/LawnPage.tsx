import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BuyInquire } from '@/components/BuyInquire'
import { asset } from '@/lib/assets'
import { COPY, RATES, bagsNeeded, estimatePrice, lbsNeeded } from '@/lib/castings'

export function LawnPage() {
  const [sqFt, setSqFt] = useState(5000)
  const [seasons, setSeasons] = useState(2)
  const presets = [2000, 5000, 10000, 15000, 25000, 50000]
  const presetValue = presets.includes(sqFt) ? String(sqFt) : ''

  const result = useMemo(() => estimatePrice(sqFt, seasons), [sqFt, seasons])
  const perSeasonLbs = lbsNeeded(sqFt)
  const perSeasonBags = bagsNeeded(sqFt)
  const estimateLabel = `~${result.lbs.toLocaleString()} lbs (~${result.bags} bags) · ~$${result.price.toLocaleString()}`

  return (
    <div className="container page-hero">
      <span className="eyebrow">A healthier way to greener lawns</span>
      <h1>{COPY.lawnHeadline}</h1>
      <p>
        Size your yard, see bags and price, then call or text to order. Spread by hand or with a top
        dresser — fall and spring for best results.
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
          <select
            id="preset"
            value={presetValue}
            onChange={(e) => setSqFt(Number(e.target.value))}
          >
            <option value="" disabled>
              Custom size
            </option>
            <option value="2000">Small city lot · 2,000 sq ft</option>
            <option value="5000">Typical lot · 5,000 sq ft</option>
            <option value="10000">Large lot · 10,000 sq ft</option>
            <option value="15000">~0.45 acre lawn · 15,000 sq ft</option>
            <option value="25000">Estate · 25,000 sq ft</option>
            <option value="50000">50,000 sq ft</option>
          </select>

          <label htmlFor="seasons">Application plan</label>
          <select id="seasons" value={seasons} onChange={(e) => setSeasons(Number(e.target.value))}>
            <option value={1}>Fall only</option>
            <option value={2}>Fall + spring (recommended)</option>
          </select>

          <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
            Rate: <strong>{RATES.lbsPerThousandSqFt} lbs per 1,000 sq ft</strong>. Price:{' '}
            <strong>${RATES.bagPrice} per {RATES.bagLbs} lb bag</strong> (covers 2,000 sq ft) · $
            {RATES.smallBagPrice} {RATES.smallBagLabel} · ${RATES.bulkPrice} per 1,000 lb.
          </p>
        </div>

        <div className="calc__result">
          <div>
            <div className="calc__metric">
              {result.lbs.toLocaleString()} lbs
              <small>
                {seasons === 2 ? 'Fall + spring total' : 'This season'} · {result.bags} × {RATES.bagLbs} lb
                bags
              </small>
            </div>
          </div>
          <div className="calc__metric" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            ~${result.price.toLocaleString()}
            <small>{result.note}</small>
          </div>
          <p style={{ margin: 0, position: 'relative', zIndex: 1 }}>
            Each season: <strong>{perSeasonLbs.toLocaleString()} lbs</strong> ({perSeasonBags} bags). Spread
            by hand or with a rented top dresser.
          </p>
          <div className="cta-row" style={{ marginTop: 0, position: 'relative', zIndex: 1 }}>
            <a className="btn btn--primary" href="#buy">
              Call / text to buy
            </a>
            <a className="btn btn--secondary" href="#nitrates">
              Why castings help
            </a>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }} aria-labelledby="proof-heading">
        <div className="section__head">
          <span className="eyebrow">Proof from a real lawn</span>
          <h2 id="proof-heading">Before and after</h2>
        </div>
        <div className="before-after">
          <figure className="ba-shot">
            <img src={asset('proof/lawn-before.png')} alt="Lawn before worm castings" />
            <figcaption>
              <strong>Before</strong>
            </figcaption>
          </figure>
          <figure className="ba-shot">
            <img src={asset('proof/lawn-after-real.png')} alt="Lawn after worm castings" />
            <figcaption>
              <strong>After</strong> fall + spring applications
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="stat-strip">
        <div className="stat">
          <strong>20 lbs</strong>
          <span>per 1,000 sq ft</span>
        </div>
        <div className="stat">
          <strong>80% lower</strong>
          <span>total nitrogen by weight*</span>
        </div>
        <div className="stat">
          <strong>$40</strong>
          <span>per 40 lb bag · covers 2,000 sq ft</span>
        </div>
      </div>

      <section className="section" id="nitrates" style={{ paddingTop: '2.5rem' }}>
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
              Wildwood castings contain <strong>2% total nitrogen</strong> — 80% lower by weight than a
              fertilizer labeled 10% total nitrogen. They support a slower, soil-first approach while feeding
              turf.
            </p>
            <p className="compare__verdict">Slow-release nutrition that stays where you put it</p>
          </article>
        </div>
        <p className="proof-note">
          *Comparison is based on total nitrogen by weight; product application rates differ.
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
          <p>
            Castings stay moist, so they clog a typical fertilizer spreader. A mesh compost barrel does not
            control flow well either. Spread by hand, rent a top dresser, or hire it applied.
          </p>
        </div>

        <div className="spread-grid" role="list">
          <article className="fact-card" role="listitem">
            <h3>By hand</h3>
            <p>
              Toss handfuls evenly across the lawn, then rake for coverage. Works well for smaller yards or
              when you have extra hands.
            </p>
          </article>
          <article className="fact-card" role="listitem">
            <h3>Top dresser</h3>
            <p>
              The machine that handles moist material. Find a rental and ask for a{' '}
              <strong>top dresser</strong> — not a fertilizer spreader or mesh compost barrel.
            </p>
          </article>
          <article className="fact-card" role="listitem">
            <h3>Hire it applied</h3>
            <p>
              <strong>5 Sons Landscaping of Winterset</strong> applies Wildwood castings. Ask when you order
              if you want application included.
            </p>
          </article>
        </div>

        <div className="panel methods">
          <article className="method">
            <div className="method__num">1</div>
            <div>
              <h3>Dry top-dressing</h3>
              <p style={{ marginBottom: '0.35rem' }}>
                <strong>Best for overall soil health.</strong> Apply about 15–20 pounds per 1,000 sq ft.
                Spread evenly by hand or with a <strong>top dresser</strong>. For best distribution, apply
                just before mowing and use a mulching attachment.
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
                <strong>Best for compacted soil.</strong> Core-aerate the lawn, then spread castings by hand
                or with a top dresser. Watering or rain washes nutrient-rich castings down into the aeration
                holes.
              </p>
            </div>
          </article>
          <article className="method">
            <div className="method__num">3</div>
            <div>
              <h3>Gardens, pots &amp; beds</h3>
              <p style={{ margin: 0 }}>
                Top-dress and gently rake in, or mix <strong>{RATES.pottingMixPercent}%</strong> castings into
                potting soil / seed starter. Natural and odor-free; follow label directions.
              </p>
            </div>
          </article>
        </div>
        <p className="proof-note" style={{ marginTop: '1rem' }}>
          Tip: take delivery Friday or Saturday when you can apply soon — castings work best before they dry
          out.
        </p>
      </section>
    </div>
  )
}
