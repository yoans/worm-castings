import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type Meters = {
  temp: number
  moisture: number
  air: number
  food: number
}

type FxKind = 'feed' | 'browns' | 'mist' | 'fluff' | 'temp' | 'rain' | 'hatch' | 'poop' | 'bad'

type FxState = { kind: FxKind; id: number }

type WormTrick = 'jump' | 'dance' | 'spin'

const WORM_TRICKS: WormTrick[] = ['jump', 'dance', 'spin']

const TRICK_SAY: Record<WormTrick, string> = {
  jump: 'Boing! That worm loves to jump.',
  dance: 'Wiggle party! Your worm is dancing.',
  spin: 'Whoosh! Twirly worm!',
}

/** David: keep room temp 65–85°F; humidity/moisture below 65% is the big risk. */
const IDEAL = {
  temp: [65, 85] as const,
  moisture: [65, 85] as const,
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
  if (value < range[0] - 12 || value > range[1] + 12) return '#d64545'
  return 'var(--ranch-orange)'
}

export function PlayPage() {
  const [meters, setMeters] = useState<Meters>({
    temp: 72,
    moisture: 70,
    air: 60,
    food: 55,
  })
  const [castings, setCastings] = useState(0)
  const [eggs, setEggs] = useState(1)
  const [worms, setWorms] = useState(3)
  const [day, setDay] = useState(1)
  const [message, setMessage] = useState('Keep your worms cozy. Watch eggs. Collect castings!')
  const [lastFood, setLastFood] = useState<'good' | 'bad' | null>(null)
  const [fx, setFx] = useState<FxState | null>(null)
  const [paused, setPaused] = useState(false)
  const [toastPop, setToastPop] = useState(0)
  const [scorePop, setScorePop] = useState<Record<string, number>>({})
  const [wormTricks, setWormTricks] = useState<Record<number, { kind: WormTrick; id: number }>>({})
  const fxTimer = useRef<number | null>(null)
  const fxSeq = useRef(0)
  const trickSeq = useRef(0)
  const trickTimers = useRef<Record<number, number>>({})

  const healthy = useMemo(() => {
    return (
      inRange(meters.temp, IDEAL.temp) &&
      inRange(meters.moisture, IDEAL.moisture) &&
      inRange(meters.air, IDEAL.air) &&
      inRange(meters.food, IDEAL.food)
    )
  }, [meters])

  const hatchReady =
    eggs > 0 && inRange(meters.temp, IDEAL.temp) && inRange(meters.moisture, IDEAL.moisture)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setMeters((m) => ({
        temp: clamp(m.temp + (Math.random() * 4 - 2)),
        moisture: clamp(m.moisture - 1.2),
        air: clamp(m.air - 0.8),
        food: clamp(m.food - 1.5),
      }))
      setDay((d) => d + 1)
    }, 3200)
    return () => window.clearInterval(id)
  }, [paused])

  useEffect(() => {
    return () => {
      Object.values(trickTimers.current).forEach((id) => window.clearTimeout(id))
    }
  }, [])

  useEffect(() => {
    if (day === 1) return
    if (!healthy) {
      say('Uh-oh — conditions are drifting. Keep temp 65–85°F and moisture ≥65%.')
      return
    }
    setCastings((c) => {
      const next = c + Math.max(1, Math.floor(worms / 2))
      popScore('castings')
      return next
    })
    bumpFx('poop')
    if (hatchReady && day % 4 === 0) {
      setEggs((e) => Math.max(0, e - 1))
      setWorms((w) => {
        popScore('worms')
        return w + 1
      })
      popScore('eggs')
      bumpFx('hatch')
      say('An egg hatched! More worms = more castings for the garden.')
    } else if (day % 5 === 0 && worms >= 2) {
      setEggs((e) => {
        popScore('eggs')
        return e + 1
      })
      say('Your worms left a new egg. Keep moisture & temp just right to hatch it.')
    } else {
      say('Happy worms! They breathe through their skin and leave castings behind.')
    }
  }, [day]) // eslint-disable-line react-hooks/exhaustive-deps

  function say(text: string) {
    setMessage(text)
    setToastPop((n) => n + 1)
  }

  function popScore(key: string) {
    setScorePop((s) => ({ ...s, [key]: (s[key] || 0) + 1 }))
  }

  function bumpFx(kind: FxKind) {
    fxSeq.current += 1
    const id = fxSeq.current
    setFx({ kind, id })
    if (fxTimer.current) window.clearTimeout(fxTimer.current)
    fxTimer.current = window.setTimeout(
      () => {
        setFx((cur) => (cur && cur.id === id ? null : cur))
      },
      kind === 'poop' ? 2200 : 1800,
    )
  }

  function feed(kind: 'greens' | 'citrus' | 'protein' | 'browns') {
    if (kind === 'citrus' || kind === 'protein') {
      setLastFood('bad')
      bumpFx('bad')
      setMeters((m) => ({
        ...m,
        food: clamp(m.food - 18),
        moisture: clamp(m.moisture + (kind === 'citrus' ? 8 : 0)),
      }))
      say(
        kind === 'citrus'
          ? 'No citrus! It upsets the bin.'
          : 'No protein — worms can get protein poisoning. Stick to plant scraps.',
      )
      return
    }
    setLastFood('good')
    bumpFx(kind === 'greens' ? 'feed' : 'browns')
    setMeters((m) => ({
      ...m,
      food: clamp(m.food + (kind === 'greens' ? 18 : 10)),
      moisture: clamp(m.moisture + (kind === 'greens' ? 6 : -4)),
      air: clamp(m.air + (kind === 'browns' ? 8 : -2)),
    }))
    say(
      kind === 'greens'
        ? 'Yum — plant scraps! Worms wiggle in for dinner.'
        : 'Browns balance the bin and help airflow.',
    )
  }

  function adjust(key: keyof Meters, delta: number, note: string, kind: FxKind) {
    setMeters((m) => ({ ...m, [key]: clamp(m[key] + delta) }))
    bumpFx(kind)
    say(note)
  }

  function rainEvent() {
    setMeters((m) => ({ ...m, moisture: clamp(m.moisture + 22), air: clamp(m.air - 10) }))
    bumpFx('rain')
    say('Heavy rain! Worms breathe through their skin — too wet and they crawl up for air.')
  }

  function tickleWorm(index: number) {
    if (paused) return
    const kind = WORM_TRICKS[Math.floor(Math.random() * WORM_TRICKS.length)]
    trickSeq.current += 1
    const id = trickSeq.current
    if (trickTimers.current[index]) window.clearTimeout(trickTimers.current[index])
    setWormTricks((t) => ({ ...t, [index]: { kind, id } }))
    say(TRICK_SAY[kind])
    trickTimers.current[index] = window.setTimeout(() => {
      setWormTricks((t) => {
        if (t[index]?.id !== id) return t
        const next = { ...t }
        delete next[index]
        return next
      })
      delete trickTimers.current[index]
    }, 1050)
  }

  const wormPositions = useMemo(
    () =>
      Array.from({ length: Math.min(worms, 8) }, (_, i) => ({
        left: `${12 + ((i * 11) % 70)}%`,
        top: `${52 + ((i * 7) % 28)}%`,
        delay: `${i * 0.18}s`,
        size: i % 3 === 0 ? 'lg' : i % 2 === 0 ? 'md' : 'sm',
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

  const binClass = [
    'bin',
    healthy ? 'bin--healthy' : 'bin--stressed',
    paused ? 'bin--paused' : '',
    fx ? `bin--fx-${fx.kind}` : '',
    fx?.kind === 'feed' || fx?.kind === 'browns' ? 'bin--worms-feast' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="container page-hero play-page">
      <span className="eyebrow">Ages 5–10 · parental guidance</span>
      <h1>Keep your worm farm alive</h1>
      <p className="play-lede">
        Keep temp between 65–85°F and moisture at 65%+. Right food, enough air, watch eggs hatch, and collect
        castings — the living fertilizer that helps lawns and gardens.
      </p>

      <div className="game-shell">
        <div className={binClass} aria-label="Worm bin">
          <div className="bin__sky" aria-hidden="true" />
          <div className="bin__soil">
            <span className="bin__bedding" />
            <span className="bin__bedding bin__bedding--2" />
          </div>

          <div className="bin__fx" aria-hidden="true" key={fx ? `${fx.kind}-${fx.id}` : 'idle'}>
            {fx?.kind === 'feed' && (
              <>
                <span className="fx-leaf" />
                <span className="fx-leaf fx-leaf--2" />
                <span className="fx-leaf fx-leaf--3" />
                <span className="fx-crumb" />
                <span className="fx-crumb fx-crumb--2" />
              </>
            )}
            {fx?.kind === 'browns' && (
              <>
                <span className="fx-brown" />
                <span className="fx-brown fx-brown--2" />
                <span className="fx-brown fx-brown--3" />
                <span className="fx-puff" />
                <span className="fx-puff fx-puff--2" />
              </>
            )}
            {fx?.kind === 'mist' && (
              <>
                <span className="fx-spray" />
                <span className="fx-drop" />
                <span className="fx-drop fx-drop--2" />
                <span className="fx-drop fx-drop--3" />
                <span className="fx-drop fx-drop--4" />
                <span className="fx-drop fx-drop--5" />
              </>
            )}
            {fx?.kind === 'fluff' && (
              <>
                <span className="fx-puff" />
                <span className="fx-puff fx-puff--2" />
                <span className="fx-puff fx-puff--3" />
                <span className="fx-puff fx-puff--4" />
                <span className="fx-swirl" />
              </>
            )}
            {fx?.kind === 'temp' && (
              <>
                <span className="fx-thermo" />
                <span className="fx-warm" />
                <span className="fx-warm fx-warm--2" />
              </>
            )}
            {fx?.kind === 'rain' && (
              <>
                <span className="fx-cloud" />
                <span className="fx-rain" />
                <span className="fx-rain fx-rain--2" />
                <span className="fx-rain fx-rain--3" />
                <span className="fx-rain fx-rain--4" />
                <span className="fx-rain fx-rain--5" />
                <span className="fx-rain fx-rain--6" />
                <span className="fx-splash" />
              </>
            )}
            {fx?.kind === 'hatch' && (
              <>
                <span className="fx-spark" />
                <span className="fx-spark fx-spark--2" />
                <span className="fx-spark fx-spark--3" />
                <span className="fx-baby-worm" />
              </>
            )}
            {fx?.kind === 'bad' && (
              <>
                <span className="fx-x" />
                <span className="fx-x fx-x--2" />
                <span className="fx-stink" />
                <span className="fx-stink fx-stink--2" />
              </>
            )}
          </div>

          {/* Behind worms: castings pop from the rear and fall with gravity */}
          {fx?.kind === 'poop' && (
            <div className="bin__castings" aria-hidden="true" key={`casts-${fx.id}`}>
              {wormPositions.flatMap((pos, i) => [
                <span
                  key={`cast-${i}-a`}
                  className="fx-cast"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    animationDelay: `${i * 0.09}s`,
                  }}
                />,
                <span
                  key={`cast-${i}-b`}
                  className="fx-cast fx-cast--small"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    animationDelay: `${0.12 + i * 0.09}s`,
                  }}
                />,
              ])}
            </div>
          )}

          {wormPositions.map((pos, i) => {
            const trick = wormTricks[i]
            return (
              <div
                key={`w-${i}-${worms}-${trick?.id ?? 0}`}
                className={[
                  'bin__worm',
                  `bin__worm--${pos.size}`,
                  healthy ? 'bin__worm--happy' : 'bin__worm--sad',
                  fx?.kind === 'feed' || fx?.kind === 'browns' ? 'bin__worm--feast' : '',
                  fx?.kind === 'bad' ? 'bin__worm--yuck' : '',
                  fx?.kind === 'rain' ? 'bin__worm--climb' : '',
                  trick ? `bin__worm--trick-${trick.kind}` : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ left: pos.left, top: pos.top, animationDelay: trick ? '0s' : pos.delay }}
                role="button"
                tabIndex={0}
                aria-label={`Tickle worm ${i + 1}`}
                onClick={() => tickleWorm(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    tickleWorm(i)
                  }
                }}
              >
                <span className="bin__worm-seg" />
                <span className="bin__worm-seg" />
                <span className="bin__worm-seg" />
                <span className="bin__worm-eye" />
              </div>
            )
          })}

          {eggPositions.map((pos, i) => (
            <div
              key={`e-${i}-${eggs}`}
              className={`bin__egg ${fx?.kind === 'hatch' && i === 0 ? 'bin__egg--hatch' : ''}`}
              style={{ left: pos.left, top: pos.top }}
            />
          ))}

          <div className="bin__scores">
            <ScoreChip label="Day" value={day} popKey={scorePop.day} />
            <ScoreChip label="Worms" value={worms} popKey={scorePop.worms} />
            <ScoreChip label="Eggs" value={eggs} popKey={scorePop.eggs} />
            <ScoreChip label="Castings" value={castings} accent popKey={scorePop.castings} />
          </div>
        </div>

        <div className="panel game-panel">
          <div className="game-toolbar">
            <button
              className={`btn btn--play-pause game-pause ${paused ? 'is-paused' : ''}`}
              type="button"
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
            <span className="game-toolbar__hint">
              {paused ? 'Paused — clock & animations frozen' : 'Day clock running'}
            </span>
          </div>

          <div className="meters">
            <Meter label="Temperature" value={meters.temp} range={IDEAL.temp} hint="Keep 65–85°F" unit="°" />
            <Meter
              label="Soil moisture"
              value={meters.moisture}
              range={IDEAL.moisture}
              hint="Keep at or above 65% — damp like a wrung-out sponge"
            />
            <Meter
              label="Air movement"
              value={meters.air}
              range={IDEAL.air}
              hint="They breathe through their skin"
            />
            <Meter
              label="Food balance"
              value={meters.food}
              range={IDEAL.food}
              hint="Greens + browns, never citrus or protein"
            />
          </div>

          <div className="controls">
            <button className="btn btn--play-greens" type="button" onClick={() => feed('greens')}>
              🥬 Feed greens
            </button>
            <button className="btn btn--play-browns" type="button" onClick={() => feed('browns')}>
              🍂 Add browns
            </button>
            <button
              className="btn btn--play-mist"
              type="button"
              onClick={() => adjust('moisture', 12, 'You misted the bin. Moisture up!', 'mist')}
            >
              💧 Mist water
            </button>
            <button
              className="btn btn--play-fluff"
              type="button"
              onClick={() =>
                adjust('air', 14, 'Fluffed bedding — more air for skin-breathing worms.', 'fluff')
              }
            >
              💨 Fluff air
            </button>
            <button
              className="btn btn--play-temp"
              type="button"
              onClick={() =>
                adjust(
                  'temp',
                  meters.temp > 75 ? -10 : 10,
                  'Moved the bin to a cozier temperature.',
                  'temp',
                )
              }
            >
              🌡 Fix temp
            </button>
            <button className="btn btn--play-rain" type="button" onClick={rainEvent}>
              🌧 Rain storm
            </button>
            <button className="btn btn--play-citrus" type="button" onClick={() => feed('citrus')}>
              🍋 Try citrus?
            </button>
            <button className="btn btn--play-protein" type="button" onClick={() => feed('protein')}>
              🍗 Try protein?
            </button>
          </div>

          <div className={`toast ${lastFood === 'bad' ? 'toast--warn' : ''}`} role="status" key={toastPop}>
            {message}
            {lastFood === 'bad' ? ' Ask a grown-up why that food is unsafe.' : null}
          </div>

          <div className="cta-row play-grownup-cta">
            <Link className="btn btn--primary" to="/lawn">
              Grown-ups: size your lawn
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
  popKey,
}: {
  label: string
  value: number
  accent?: boolean
  popKey?: number
}) {
  return (
    <div
      className={`score-chip ${accent ? 'score-chip--accent' : ''} ${popKey ? 'score-chip--pop' : ''}`}
      key={`${label}-${popKey || 0}-${value}`}
    >
      <span className="score-chip__label">{label}</span>
      <span className="score-chip__value">{value}</span>
    </div>
  )
}

function Meter({
  label,
  value,
  range,
  hint,
  unit = '',
}: {
  label: string
  value: number
  range: readonly [number, number]
  hint: string
  unit?: string
}) {
  const color = meterColor(value, range)
  const ok = inRange(value, range)
  return (
    <div className={`meter ${ok ? 'meter--ok' : 'meter--warn'}`} title={hint}>
      <label>
        <span>{label}</span>
        <span style={{ color }}>
          {Math.round(value)}
          {unit}
        </span>
      </label>
      <div className="meter__track">
        <div className="meter__fill" style={{ width: `${value}%`, background: color }} />
        <span
          className="meter__ideal"
          style={{
            left: `${range[0]}%`,
            width: `${range[1] - range[0]}%`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
