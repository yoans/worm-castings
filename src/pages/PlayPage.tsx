import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Meters = {
  temp: number
  moisture: number
  air: number
  food: number
}

const IDEAL = {
  temp: [55, 80] as const,
  moisture: [55, 75] as const,
  air: [40, 90] as const,
  food: [35, 85] as const,
}

function inRange(value: number, range: readonly [number, number]) {
  return value >= range[0] && value <= range[1]
}

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n))
}

function meterColor(value: number, range: readonly [number, number]) {
  if (inRange(value, range)) return 'var(--lime)'
  if (value < range[0] - 15 || value > range[1] + 15) return '#d64545'
  return 'var(--ranch-orange)'
}

export function PlayPage() {
  const [meters, setMeters] = useState<Meters>({
    temp: 68,
    moisture: 65,
    air: 60,
    food: 55,
  })
  const [castings, setCastings] = useState(0)
  const [eggs, setEggs] = useState(1)
  const [worms, setWorms] = useState(3)
  const [day, setDay] = useState(1)
  const [message, setMessage] = useState('Keep your worms cozy. Watch eggs. Collect castings!')
  const [lastFood, setLastFood] = useState<'good' | 'bad' | null>(null)

  const healthy = useMemo(() => {
    return (
      inRange(meters.temp, IDEAL.temp) &&
      inRange(meters.moisture, IDEAL.moisture) &&
      inRange(meters.air, IDEAL.air) &&
      inRange(meters.food, IDEAL.food)
    )
  }, [meters])

  const hatchReady =
    eggs > 0 &&
    inRange(meters.temp, IDEAL.temp) &&
    inRange(meters.moisture, IDEAL.moisture)

  useEffect(() => {
    const id = window.setInterval(() => {
      setMeters((m) => ({
        temp: clamp(m.temp + (Math.random() * 4 - 2)),
        moisture: clamp(m.moisture - 1.2),
        air: clamp(m.air - 0.8),
        food: clamp(m.food - 1.5),
      }))
      setDay((d) => d + 1)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!healthy) {
      setMessage('Uh-oh — conditions are drifting. Adjust temp, moisture, air, or food.')
      return
    }
    setCastings((c) => c + Math.max(1, Math.floor(worms / 2)))
    if (hatchReady && day % 4 === 0) {
      setEggs((e) => Math.max(0, e - 1))
      setWorms((w) => w + 1)
      setMessage('An egg hatched! More worms = more castings.')
    } else if (day % 5 === 0 && worms >= 2) {
      setEggs((e) => e + 1)
      setMessage('Your worms left a new egg. Keep moisture & temp just right to hatch it.')
    } else {
      setMessage('Happy worms! They breathe through their skin and are busy pooping castings.')
    }
  }, [day]) // eslint-disable-line react-hooks/exhaustive-deps

  function feed(kind: 'greens' | 'citrus' | 'protein' | 'browns') {
    if (kind === 'citrus' || kind === 'protein') {
      setLastFood('bad')
      setMeters((m) => ({ ...m, food: clamp(m.food - 18), moisture: clamp(m.moisture + (kind === 'citrus' ? 8 : 0)) }))
      setMessage(
        kind === 'citrus'
          ? 'No citrus! It upsets the bin.'
          : 'No protein — worms can get protein poisoning. Stick to plant scraps.',
      )
      return
    }
    setLastFood('good')
    setMeters((m) => ({
      ...m,
      food: clamp(m.food + (kind === 'greens' ? 18 : 10)),
      moisture: clamp(m.moisture + (kind === 'greens' ? 6 : -4)),
      air: clamp(m.air + (kind === 'browns' ? 8 : -2)),
    }))
    setMessage(kind === 'greens' ? 'Yum — plant scraps!' : 'Browns help airflow and balance moisture.')
  }

  function adjust(key: keyof Meters, delta: number, note: string) {
    setMeters((m) => ({ ...m, [key]: clamp(m[key] + delta) }))
    setMessage(note)
  }

  function rainEvent() {
    setMeters((m) => ({ ...m, moisture: clamp(m.moisture + 22), air: clamp(m.air - 10) }))
    setMessage('Heavy rain! Worms breathe through their skin — too wet and they crawl up for air.')
  }

  const wormPositions = useMemo(
    () =>
      Array.from({ length: Math.min(worms, 8) }, (_, i) => ({
        left: `${12 + ((i * 11) % 70)}%`,
        top: `${52 + ((i * 7) % 28)}%`,
        delay: `${i * 0.2}s`,
      })),
    [worms],
  )

  const eggPositions = useMemo(
    () =>
      Array.from({ length: Math.min(eggs, 6) }, (_, i) => ({
        left: `${20 + i * 12}%`,
        top: `${62 + (i % 2) * 10}%`,
      })),
    [eggs],
  )

  return (
    <div className="container page-hero">
      <span className="eyebrow">Ages 5–10 · parental guidance</span>
      <h1>Keep your worm farm alive</h1>
      <p>
        Narrow ranges matter: temperature, humidity, soil moisture, air movement, and the right food. Shelter
        from birds. Hatch eggs. Watch the castings pile up.
      </p>

      <div className="game-shell" style={{ marginTop: '1.5rem' }}>
        <div className="bin" aria-label="Worm bin">
          <div className="bin__soil" />
          {wormPositions.map((pos, i) => (
            <div
              key={`w-${i}`}
              className="bin__worm"
              style={{ left: pos.left, top: pos.top, animationDelay: pos.delay }}
            />
          ))}
          {eggPositions.map((pos, i) => (
            <div key={`e-${i}`} className="bin__egg" style={{ left: pos.left, top: pos.top }} />
          ))}
          <div
            style={{
              position: 'absolute',
              left: '1rem',
              top: '1rem',
              right: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <ScoreChip label="Day" value={day} />
            <ScoreChip label="Worms" value={worms} />
            <ScoreChip label="Eggs" value={eggs} />
            <ScoreChip label="Castings" value={castings} accent />
          </div>
        </div>

        <div className="panel">
          <div className="meters">
            <Meter
              label="Temperature"
              value={meters.temp}
              range={IDEAL.temp}
              hint="Worms like it not too hot, not too cold"
            />
            <Meter
              label="Soil moisture"
              value={meters.moisture}
              range={IDEAL.moisture}
              hint="Damp like a wrung-out sponge — eggs need this to hatch"
            />
            <Meter label="Air movement" value={meters.air} range={IDEAL.air} hint="They breathe through their skin" />
            <Meter label="Food balance" value={meters.food} range={IDEAL.food} hint="Greens + browns, never citrus or protein" />
          </div>

          <div className="controls">
            <button className="btn btn--forest" type="button" onClick={() => feed('greens')}>
              Feed greens
            </button>
            <button className="btn btn--ghost" type="button" onClick={() => feed('browns')}>
              Add browns
            </button>
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => adjust('moisture', 12, 'You misted the bin. Moisture up!')}
            >
              Mist water
            </button>
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => adjust('air', 14, 'Fluffed bedding — more air for skin-breathing worms.')}
            >
              Fluff air
            </button>
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => adjust('temp', meters.temp > 70 ? -10 : 10, 'Moved the bin to a better temperature.')}
            >
              Fix temp
            </button>
            <button className="btn btn--ghost" type="button" onClick={rainEvent}>
              Rain storm
            </button>
            <button className="btn btn--ghost" type="button" onClick={() => feed('citrus')}>
              Try citrus?
            </button>
            <button className="btn btn--ghost" type="button" onClick={() => feed('protein')}>
              Try protein?
            </button>
          </div>

          <div className="toast" role="status">
            {message}
            {lastFood === 'bad' ? ' Ask a grown-up why that food is unsafe.' : null}
          </div>

          <div className="cta-row" style={{ marginTop: '1rem' }}>
            <Link className="btn btn--primary" to="/lawn#buy">
              Grown-ups: size lawn &amp; call to buy
            </Link>
            <Link className="btn btn--ghost" to="/learn">
              Learn about castings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScoreChip({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div
      style={{
        background: accent ? 'var(--ranch-orange)' : 'rgba(255,255,255,0.92)',
        color: accent ? 'var(--soil)' : 'var(--forest-deep)',
        borderRadius: '999px',
        padding: '0.35rem 0.75rem',
        fontWeight: 800,
        fontSize: '0.85rem',
      }}
    >
      {label}: {value}
    </div>
  )
}

function Meter({
  label,
  value,
  range,
  hint,
}: {
  label: string
  value: number
  range: readonly [number, number]
  hint: string
}) {
  const color = meterColor(value, range)
  return (
    <div className="meter" title={hint}>
      <label>
        <span>{label}</span>
        <span style={{ color }}>{Math.round(value)}</span>
      </label>
      <div className="meter__track">
        <div className="meter__fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  )
}
