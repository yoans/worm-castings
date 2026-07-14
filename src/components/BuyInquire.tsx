import { useMemo, useState } from 'react'
import { CONTACT, buildInquiryMessage } from '@/lib/castings'

type BuyInquireProps = {
  sqFt: number
  seasons: number
  estimateLabel: string
}

export function BuyInquire({ sqFt, seasons, estimateLabel }: BuyInquireProps) {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [copied, setCopied] = useState(false)

  const message = useMemo(
    () => buildInquiryMessage({ name, sqFt, seasons, note }),
    [name, sqFt, seasons, note],
  )

  const smsHref = `sms:${CONTACT.phoneTel}?&body=${encodeURIComponent(message)}`
  const mailHref = `mailto:?subject=${encodeURIComponent('Worm castings lawn inquiry')}&body=${encodeURIComponent(message)}`

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section" id="buy" style={{ paddingTop: '2rem' }}>
      <div className="section__head">
        <span className="eyebrow">No online checkout yet</span>
        <h2>Call, visit, or send your yard estimate</h2>
        <p>
          Research confirms Wildwood sells castings by inquiry — not a live cart. Use the Ranch phone or
          address. A Stripe storefront can plug in later; this path works for Farmer&apos;s Market season now.
        </p>
      </div>

      <div className="buy-grid">
        <div className="panel buy-card">
          <h3>Buy / inquire here</h3>
          <p className="buy-card__place">
            <strong>{CONTACT.ranchName}</strong>
            <br />
            {CONTACT.addressLine1}
            <br />
            {CONTACT.addressLine2}
          </p>
          <a className="btn btn--primary buy-card__phone" href={`tel:${CONTACT.phoneTel}`}>
            Call {CONTACT.phoneDisplay}
          </a>
          <div className="cta-row" style={{ marginTop: '0.75rem' }}>
            <a className="btn btn--ghost" href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">
              Open in Maps
            </a>
            <a className="btn btn--ghost" href={CONTACT.contactPage} target="_blank" rel="noreferrer">
              Ranch contact page
            </a>
          </div>
          <p className="buy-card__note">{CONTACT.directions}</p>
          <p className="buy-card__note" style={{ marginBottom: 0 }}>
            Ask about inventory, bag sizes, Farmer&apos;s Market pickup, and delivery for larger lawn orders.
            Your estimate: <strong>{estimateLabel}</strong>
          </p>
        </div>

        <div className="panel calc__form">
          <h3>Build your inquiry</h3>
          <p style={{ color: 'var(--muted)' }}>
            We prefill your calculator numbers. Call, text, email, or copy — staff can confirm price and
            availability.
          </p>

          <label htmlFor="buyer-name">Your name</label>
          <input
            id="buyer-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and last"
            autoComplete="name"
          />

          <label htmlFor="buyer-note">Optional note</label>
          <input
            id="buyer-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Pickup timing, delivery, market day…"
          />

          <label htmlFor="inquiry-preview">Message preview</label>
          <textarea id="inquiry-preview" className="inquiry-preview" readOnly rows={8} value={message} />

          <div className="cta-row">
            <a className="btn btn--forest" href={`tel:${CONTACT.phoneTel}`}>
              Call to order
            </a>
            <a className="btn btn--ghost" href={smsHref}>
              Text this estimate
            </a>
            <a className="btn btn--ghost" href={mailHref}>
              Email estimate
            </a>
            <button className="btn btn--ghost" type="button" onClick={copyMessage}>
              {copied ? 'Copied' : 'Copy message'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
