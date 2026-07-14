/** Confirmed from wildwoodhillsranch.org/contact — no online castings checkout found. */
export const CONTACT = {
  ranchName: 'Wildwood Hills Ranch of Iowa',
  addressLine1: '2552 Union Lane',
  addressLine2: 'St. Charles, Iowa 50240',
  phoneDisplay: '641-396-2414',
  phoneTel: '6413962414',
  website: 'https://www.wildwoodhillsranch.org/',
  castingsPage: 'https://www.wildwoodhillsranch.org/who-we-are/wc/',
  contactPage: 'https://www.wildwoodhillsranch.org/contact/',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=2552+Union+Lane+St.+Charles+Iowa+50240',
  directions:
    'About 20 miles south of West Des Moines. Take I-35 south exit 52, then a short drive on Hwy G50.',
} as const

export const RATES = {
  lbsPerThousandSqFt: 20,
  pricePerTwoThousandSqFt: 40,
  bulkLbs: 1000,
  bulkPrice: 750,
  /** Confirm bag weight with the Ranch before printing labels — 40 lb used for estimates. */
  bagLbs: 40,
} as const

export function lbsNeeded(sqFt: number) {
  return Math.ceil((sqFt / 1000) * RATES.lbsPerThousandSqFt)
}

export function bagsNeeded(sqFt: number) {
  return Math.ceil(lbsNeeded(sqFt) / RATES.bagLbs)
}

export function estimatePrice(sqFt: number, seasons = 1) {
  const lbs = lbsNeeded(sqFt) * seasons
  if (lbs >= RATES.bulkLbs) {
    const bulkUnits = Math.ceil(lbs / RATES.bulkLbs)
    return {
      lbs,
      price: bulkUnits * RATES.bulkPrice,
      tier: 'bulk' as const,
      note: `${bulkUnits} × 1,000 lb at $${RATES.bulkPrice}`,
    }
  }
  const units = Math.ceil(lbs / 2000)
  return {
    lbs,
    price: units * RATES.pricePerTwoThousandSqFt,
    tier: 'standard' as const,
    note: `About $${RATES.pricePerTwoThousandSqFt} per 2,000 sq ft`,
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
    `Hi Wildwood — I'd like to buy worm castings for my lawn.`,
    `Name: ${opts.name || '(not provided)'}`,
    `Yard: ${opts.sqFt.toLocaleString()} sq ft`,
    `Plan: ${plan}`,
    `Estimate: ~${result.lbs.toLocaleString()} lbs · ~$${result.price.toLocaleString()} (${result.note})`,
    opts.note?.trim() ? `Note: ${opts.note.trim()}` : null,
    `Please confirm availability, bag sizes, pickup/delivery, and total.`,
  ]
    .filter(Boolean)
    .join('\n')
}

export const COPY = {
  lawnHeadline: 'Boost lawn health naturally with worm castings',
  lawnSub:
    'Apply in fall and spring. 20 lbs per 1,000 sq ft of yard. Transform your lawn naturally.',
  nitrateHook:
    'Lots of people reach for nitrates first. Worm castings carry about 1/5 the nitrates of chemical fertilizers — and they hold nutrients in the soil instead of washing them toward drinking water.',
  waterBanPitch:
    'Central Iowa has faced lawn-watering bans when river nitrates spike and treatment plants hit capacity. Choosing castings won’t fix the watershed alone — but it is one household way to feed your lawn with far less soluble nitrate load, help soil hold water, and ease the habits that add demand during shortages.',
  safeLine: "Safe for all plants — won't burn them, and it doesn't smell.",
} as const
