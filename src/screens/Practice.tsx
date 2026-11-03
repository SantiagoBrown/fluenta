import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Layers,
  Plus,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useApp } from '../store'
import { dueCards, reviewCard } from '../lib/lessonEngine'
import type { ReviewRating } from '../lib/lessonEngine'
import { addDays, isoDay, percent } from '../lib/levels'
import { trackMap } from '../data/tracks'
import type { SRSCard } from '../types'
import { AudioButton, EmptyState, LevelChip, Tag } from '../components/ui'

export default function Practice() {
  const { state, review, addCards } = useApp()
  const profile = state.profile!
  const result = state.placement!
  const track = trackMap[profile.track]
  const cards = state.progress.srs
  const due = dueCards(cards)
  const [queue, setQueue] = useState<SRSCard[] | null>(null)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [again, setAgain] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [sessionMode, setSessionMode] = useState<'due' | 'all'>('due')

  const trackCards = useMemo<SRSCard[]>(
    () =>
      track.vocab.map((item, itemIndex) => ({
        id: `track-${track.id}-${itemIndex}`,
        term: item.term,
        es: item.es,
        example: item.example,
        lessonId: '',
        level: result.overall,
        due: isoDay(),
        interval: 0,
        ease: 2.5,
        reps: 0,
        lapses: 0,
      })),
    [track, result.overall],
  )
  const trackInDeck = trackCards.filter((card) => cards.some((existing) => existing.id === card.id)).length
  const reviews = cards.reduce((sum, card) => sum + card.reps, 0)

  useEffect(() => {
    if (!queue || completed) return
    const handler = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        setFlipped((value) => !value)
      }
      if (flipped && ['1', '2', '3', '4'].includes(event.key)) {
        rate(['again', 'hard', 'good', 'easy'][Number(event.key) - 1] as ReviewRating)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const start = (mode: 'due' | 'all') => {
    const source = mode === 'all' ? cards : due
    if (!source.length) return
    setSessionMode(mode)
    setQueue(source.slice(0, 24))
    setIndex(0)
    setFlipped(false)
    setReviewed(0)
    setAgain(0)
    setCompleted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const rate = (rating: ReviewRating) => {
    if (!queue) return
    const card = queue[index]
    if (!card) return
    review(card.id, rating)
    setReviewed((value) => value + 1)
    if (rating === 'again') setAgain((value) => value + 1)
    if (index + 1 >= queue.length) {
      setCompleted(true)
      setFlipped(false)
    } else {
      setFlipped(false)
      setIndex((value) => value + 1)
    }
  }

  const nextDue = cards.length
    ? cards
        .map((card) => card.due)
        .filter((day) => day > isoDay())
        .sort()[0]
    : null

  return (
    <div className="practice-page">
      <header className="page-head">
        <div>
          <span className="eyebrow">
            <Brain size={14} /> Repaso espaciado
          </span>
          <h1>
            Tu vocabulario,
            <br />
            <em>en el momento justo.</em>
          </h1>
          <p>
            Cada palabra vuelve justo antes de que la olvides. Ocho minutos hoy valen más que una hora de lista
            memorizada.
          </p>
        </div>
        <div className="practice-stats">
          <div>
            <strong>{due.length}</strong>
            <span>para hoy</span>
          </div>
          <div>
            <strong>{cards.length}</strong>
            <span>en tu mazo</span>
          </div>
          <div>
            <strong>{reviews}</strong>
            <span>repasos</span>
          </div>
        </div>
      </header>

      {!queue && !completed && (
        <div className="practice-start">
          <div className="practice-start-main">
            <div className="practice-start-visual">
              <span className="orbit orbit-1" />
              <span className="orbit orbit-2" />
              <span className="practice-start-icon">
                <Brain size={32} />
              </span>
              <span className="practice-float practice-float-1">again</span>
              <span className="practice-float practice-float-2">good</span>
              <span className="practice-float practice-float-3">easy</span>
            </div>
            <div className="practice-start-copy">
              <span className="eyebrow">Sesión de hoy</span>
              <h2>{due.length ? `${due.length} tarjetas te esperan.` : 'Hoy no tienes repasos pendientes.'}</h2>
              <p>
                {due.length
                  ? 'Primero intenta recordar el significado. Después revela la tarjeta y sé honesto con la dificultad: eso ajusta el intervalo.'
                  : 'Puedes adelantar una sesión libre con todo tu mazo o añadir el vocabulario de tu sector.'}
              </p>
              <div className="practice-start-actions">
                {due.length > 0 ? (
                  <button type="button" className="btn btn-primary btn-lg" onClick={() => start('due')}>
                    Empezar repaso <ArrowRight size={18} />
                  </button>
                ) : cards.length > 0 ? (
                  <button type="button" className="btn btn-primary btn-lg" onClick={() => start('all')}>
                    Sesión libre <ArrowRight size={18} />
                  </button>
                ) : null}
                {cards.length > due.length && due.length > 0 && (
                  <button type="button" className="btn btn-outline btn-lg" onClick={() => start('all')}>
                    Practicar todo ({cards.length})
                  </button>
                )}
              </div>
              {nextDue && <span className="next-review">Próximo repaso programado: {formatDue(nextDue)}</span>}
            </div>
          </div>

          <div className="practice-kit-card">
            <div className="practice-kit-head">
              <span className="kit-icon">
                <Layers size={18} />
              </span>
              <div>
                <span className="eyebrow">Kit de tu sector</span>
                <h3>{track.label}</h3>
              </div>
              <Tag tone="dark">{trackInDeck}/{trackCards.length}</Tag>
            </div>
            <p>Vocabulario específico de {track.short.toLowerCase()} para que practiques lo que de verdad usas.</p>
            <div className="practice-kit-words">
              {(trackCards.length ? trackCards : []).slice(0, 4).map((card) => (
                <div key={card.id}>
                  <strong>{card.term}</strong>
                  <span>{card.es}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-outline btn-block"
              onClick={() => addCards(trackCards)}
              disabled={trackInDeck === trackCards.length}
            >
              {trackInDeck === trackCards.length ? (
                <>
                  <Check size={15} /> Kit completo en tu mazo
                </>
              ) : (
                <>
                  <Plus size={15} /> Añadir {trackCards.length - trackInDeck} palabras
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {queue && !completed && queue[index] && (
        <div className="flash-session">
          <div className="flash-top">
            <button type="button" className="text-btn" onClick={() => setQueue(null)}>
              <ChevronRight size={14} className="rotated-180" /> Salir de la sesión
            </button>
            <div className="flash-progress">
              <span style={{ width: `${((index + 1) / queue.length) * 100}%` }} />
            </div>
            <span className="flash-count">
              {index + 1} / {queue.length}
            </span>
          </div>

          <div className="flash-stage">
            <button type="button" className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((value) => !value)}>
              <div className="flashcard-front">
                <div className="flashcard-meta">
                  <LevelChip level={queue[index].level} />
                  <span>{sessionMode === 'due' ? 'Repaso de hoy' : 'Sesión libre'}</span>
                </div>
                <strong className="flash-term">{queue[index].term}</strong>
                <div className="flash-audio">
                  <AudioButton text={`${queue[index].term}. ${queue[index].example}`} rate={state.settings.voiceRate} variant="small" />
                  <span>Escuchar pronunciación</span>
                </div>
                <span className="flash-hint">Pulsa la tarjeta para revelar</span>
              </div>
              <div className="flashcard-back">
                <span className="flash-back-label">Significado</span>
                <strong>{queue[index].es}</strong>
                <div className="flash-example">
                  <span>En contexto</span>
                  <p>{queue[index].example}</p>
                </div>
                <span className="flash-term-small">{queue[index].term}</span>
              </div>
            </button>

            {flipped ? (
              <div className="rating-row">
                {(
                  [
                    { rating: 'again', label: 'Otra vez', key: '1', tone: 'again' },
                    { rating: 'hard', label: 'Difícil', key: '2', tone: 'hard' },
                    { rating: 'good', label: 'Bien', key: '3', tone: 'good' },
                    { rating: 'easy', label: 'Fácil', key: '4', tone: 'easy' },
                  ] as { rating: ReviewRating; label: string; key: string; tone: string }[]
                ).map((item) => {
                  const interval = reviewCard(queue[index], item.rating).interval
                  return (
                    <button type="button" className={`rating-btn rating-${item.tone}`} key={item.rating} onClick={() => rate(item.rating)}>
                      <span className="rating-key">{item.key}</span>
                      <strong>{item.label}</strong>
                      <span>{interval === 0 ? 'hoy' : interval === 1 ? 'mañana' : `${interval} días`}</span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="flash-instruction">Intenta recordar antes de girar. La honestidad es lo que hace funcionar el repaso.</p>
            )}
          </div>
        </div>
      )}

      {completed && (
        <div className="flash-complete">
          <span className="complete-badge">
            <Check size={28} />
          </span>
          <span className="eyebrow">Sesión completada</span>
          <h2>
            {reviewed} tarjetas revisadas.
            <br />
            <em>Memoria un poco más sólida.</em>
          </h2>
          <p>
            {again > 0
              ? `${again} tarjeta${again === 1 ? '' : 's'} volverá${again === 1 ? '' : 'n'} mañana para reforzar. Ese es exactamente el sistema funcionando.`
              : 'Has recordado todo el mazo de hoy. Mañana volverán las que toquen.'}
          </p>
          <div className="flash-complete-stats">
            <div>
              <strong>{reviewed}</strong>
              <span>revisadas</span>
            </div>
            <div>
              <strong>{again}</strong>
              <span>para reforzar</span>
            </div>
            <div>
              <strong>{state.progress.streak}</strong>
              <span>días de racha</span>
            </div>
          </div>
          <div className="complete-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => {
                setQueue(null)
                setCompleted(false)
              }}
            >
              Volver a práctica <ArrowRight size={17} />
            </button>
            <Link to="/app/writing" className="btn btn-outline btn-lg">
              Ir al Writing Lab
            </Link>
          </div>
        </div>
      )}

      {!queue && (
        <section className="deck-section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Tu mazo</span>
              <h2>{cards.length} palabras en aprendizaje</h2>
              <p>Las tarjetas vuelven según tu desempeño. No necesitas gestionarlas: el sistema lo hace.</p>
            </div>
            <div className="deck-legend">
              <span>
                <i className="legend-dot due" /> Para hoy
              </span>
              <span>
                <i className="legend-dot later" /> Programadas
              </span>
            </div>
          </div>

          {cards.length === 0 ? (
            <EmptyState
              icon={<Brain size={26} />}
              title="Tu mazo está vacío"
              text="Completa tu primera lección para añadir vocabulario automáticamente, o empieza con el kit de tu sector."
              action={
                <div className="empty-actions">
                  <Link to="/app/path" className="btn btn-primary">
                    Ir a mi ruta <ArrowRight size={16} />
                  </Link>
                  <button type="button" className="btn btn-outline" onClick={() => addCards(trackCards)}>
                    <Plus size={16} /> Añadir kit de {track.short}
                  </button>
                </div>
              }
            />
          ) : (
            <div className="deck-grid">
              {cards
                .slice()
                .sort((a, b) => a.due.localeCompare(b.due))
                .map((card) => {
                  const isDue = card.due <= isoDay()
                  return (
                    <div className={`deck-card ${isDue ? 'due' : ''}`} key={card.id}>
                      <div className="deck-card-top">
                        <strong>{card.term}</strong>
                        <AudioButton text={`${card.term}. ${card.example}`} rate={state.settings.voiceRate} variant="small" />
                      </div>
                      <span>{card.es}</span>
                      <div className="deck-card-foot">
                        <span className={`deck-status ${isDue ? 'due' : ''}`}>
                          {isDue ? (
                            <>
                              <Zap size={12} /> Para hoy
                            </>
                          ) : (
                            <>
                              <CalendarDays size={12} /> {formatDue(card.due)}
                            </>
                          )}
                        </span>
                        <span>{card.reps} repasos</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

function formatDue(day: string): string {
  const today = isoDay()
  if (day <= today) return 'Hoy'
  if (day === addDays(today, 1)) return 'Mañana'
  const date = new Date(`${day}T12:00:00`)
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}
