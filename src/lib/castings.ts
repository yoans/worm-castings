/** Public contact + pricing for Urban Pasture / Wildwood worm castings. */
export const CONTACT = {
  ranchName: 'Wildwood Hills Ranch of Iowa',
  productName: 'Wildwood Worm Castings',
  addressLine1: '2552 Union Lane',
  addressLine2: 'St. Charles, Iowa 50240',
  /** Order line — David Strege */
  phoneDisplay: '515-556-3302',
  phoneTel: '5155563302',
  email: 'dstrege@wildwoodhillsranch.org',
  website: 'https://worm-castings.buildbeyondbelief.com',
  lawnUrl: 'https://worm-castings.buildbeyondbelief.com/lawn',
  hostCredit: 'Build Beyond Belief',
  hostUrl: 'https://buildbeyondbelief.com',
  ranchSite: 'https://www.wildwoodhillsranch.org/',
  castingsPage: 'https://www.wildwoodhillsranch.org/who-we-are/wc/',
  contactPage: 'https://www.wildwoodhillsranch.org/contact/',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=2552+Union+Lane+St.+Charles+Iowa+50240',
  directions:
    'About 20 miles south of West Des Moines. Take I-35 south exit 52, then a short drive on Hwy G50.',
  mission: 'Breaking Cycles. Building Leaders. Transforming Communities.',
} as const

export const RATES = {
  lbsPerThousandSqFt: 20,
  /** $40 covers 2,000 sq ft at 20 lbs / 1,000 sq ft (= one 40 lb bag). */
  pricePerTwoThousandSqFt: 40,
  bagLbs: 40,
  bagPrice: 40,
  smallBagLabel: '6 qt bag',
  smallBagPrice: 10,
  bulkLbs: 1000,
  bulkPrice: 750,
  pottingMixPercent: 20,
} as const

export function lbsNeeded(sqFt: number) {
  return Math.ceil((sqFt / 1000) * RATES.lbsPerThousandSqFt)
}

export function bagsNeeded(sqFt: number) {
  return Math.ceil(lbsNeeded(sqFt) / RATES.bagLbs)
}

export function estimatePrice(sqFt: number, seasons = 1) {
  const lbs = lbsNeeded(sqFt) * seasons
  const bags = Math.ceil(lbs / RATES.bagLbs)

  if (lbs >= RATES.bulkLbs) {
    const bulkUnits = Math.floor(lbs / RATES.bulkLbs)
    const remainderLbs = lbs - bulkUnits * RATES.bulkLbs
    const remainderBags = Math.ceil(remainderLbs / RATES.bagLbs)
    const price = bulkUnits * RATES.bulkPrice + remainderBags * RATES.bagPrice
    return {
      lbs,
      bags,
      price,
      tier: 'bulk' as const,
      note:
        remainderBags > 0
          ? `${bulkUnits} × 1,000 lb ($${RATES.bulkPrice}) + ${remainderBags} × ${RATES.bagLbs} lb bags`
          : `${bulkUnits} × 1,000 lb at $${RATES.bulkPrice}`,
    }
  }

  return {
    lbs,
    bags,
    price: bags * RATES.bagPrice,
    tier: 'standard' as const,
    note: `${bags} × ${RATES.bagLbs} lb bags at $${RATES.bagPrice} (covers 2,000 sq ft each)`,
  }
}

export function buildInquiryMessage(opts: {
  name: string
  sqFt: number
  seasons: number
  note?: string
}) {
  const result = estimatePrice(opts.sqFt, opts.seasons)
  const plan = opts.seasons === 2 ? 'fall + spring' : 'this season'
  return [
    `Hi — I'd like to buy Wildwood worm castings for my lawn.`,
    `Name: ${opts.name || '(not provided)'}`,
    `Yard: ${opts.sqFt.toLocaleString()} sq ft`,
    `Plan: ${plan}`,
    `Estimate: ~${result.lbs.toLocaleString()} lbs (~${result.bags} ${result.bags === 1 ? 'bag' : 'bags'}) · ~$${result.price.toLocaleString()}`,
    `Pricing basis: $${RATES.bagPrice} per ${RATES.bagLbs} lb bag (covers 2,000 sq ft) · $${RATES.bulkPrice} per 1,000 lb`,
    opts.note?.trim() ? `Note: ${opts.note.trim()}` : null,
    `Please confirm availability, pickup/delivery, and total.`,
    `Site: ${CONTACT.lawnUrl}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export const COPY = {
  lawnHeadline: 'Worm castings for greener lawns',
  lawnSub:
    'Apply in fall and spring. 20 lbs per 1,000 sq ft. 2% total nitrogen — 80% lower by weight than a fertilizer labeled 10% total nitrogen.',
  nitrateHook:
    'Lots of people reach for high-nitrogen fertilizer first. Wildwood worm castings contain 2% total nitrogen and support a slower, soil-first approach to lawn care.',
  waterBanPitch:
    'Central Iowa has faced lawn-watering bans when source-water nitrates rise and treatment plants approach capacity. Castings offer a lower-nitrogen lawn option while supporting soil that holds water better.',
  safeLine:
    'A natural, odor-free soil amendment that is safe for kids, pets, and pollinators — no harsh synthetic salts, no burn.',
  wormProtect:
    'Certain chemical fertilizers can harm or kill earthworms. High concentrations of synthetic salts dehydrate them, and acidic formulas with ammonium can create toxic environments. Organic matter like worm castings feeds soil life instead of stressing it.',
} as const
