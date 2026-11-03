import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  Headphones,
  PenLine,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useApp } from '../store'
import {
  buildDailyPlan,
  buildPath,
  levelFromCompleted,
  moduleProgress,
  nextLessonFor,
  nextMilestone,
  pathProgress,
} from '../lib/path'
import { dueCards } from '../lib/lessonEngine'
import { addDays, formatDate, isoDay, levelLabel, levelNum, levelDescription, weekLabel } from '../lib/levels'
import { trackMap } from '../data/tracks'
import { moduleMap } from '../data/curriculum'
import { AudioButton, LevelChip, LevelLadder, ProgressRing, RadarChart, Tag } from '../components/ui'
import type { DailyPlanItem, Skill } from '../types'

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export default function Dashboard() {
  const { state } = useApp()
  const navigate = useNavigate()
  const [showKit, setShowKit] = useState(false)

  const profile = state.profile!
  const result = state.placement!
  const plan = useMemo(() => buildPath(result, profile), [result, profile])

  const completed = state.progress.completedLessons
  const progress = pathProgress(plan, completed)
  const nextLesson = nextLessonFor(plan, completed)
  const nextModule = nextLesson ? moduleMap[nextLesson.moduleId] : null
  const currentLevel = levelFromCompleted(plan, completed)
  const due = dueCards(state.progress.srs)
  const track = trackMap[profile.track]
  const dailyPlan = buildDailyPlan(plan, profile, due.length, track, completed)
  const todayIndex = (new Date().getDay() + 6) % 7
  const milestone = nextMilestone(plan, completed)

  const todayKey = isoDay()
  const week = Array.from({ length: 7 }, (_, index) => addDays(todayKey, index - 6))
  const weeklyMinutes = week.reduce((sum, day) => sum + (state.progress.activity[day]?.minutes ?? 0), 0)
  const weeklyGoal = profile.weeklyHours * 60
  const weeklyPct = Math.min(100, Math.round((weeklyMinutes / Math.max(1, weeklyGoal)) * 100))
  const maxMinutes = Math.max(45, ...week.map((day) => state.progress.activity[day]?.minutes ?? 0))

  const scores = (Object.keys(result.skills) as Skill[]).reduce(
    (acc, skill) => {
      acc[skill] = result.skills[skill].score
      return acc
    },
    {} as Record<Skill, number>,
  )

  const phrase = nextLesson?.phrases[0] ?? track.phrases[0]
  const greeting = new Date().getHours() < 12 ? 'Buenos días' : new Date().getHours() < 20 ? 'Buenas tardes' : 'Buenas noches'
  const currentStage = plan.stages.find((stage) => !stage.lessons.every((lesson) => completed.includes(lesson.id))) ?? plan.stages[plan.stages.length - 1]

  return (
    <div className="dashboard">
      <header className="dash-head">
        <div>
          <span className="eyebrow">
            <CalendarDays size={14} /> {formatDate(new Date())} · Semana {Math.ceil((Date.now() - new Date(result.completedAt).getTime()) / 604_800_000) + 1} de tu ruta
          </span>
          <h1>
            {greeting}, {profile.name}.
          </h1>
          <p>
            Nivel <strong>{currentLevel}</strong> · {levelDescription[currentLevel]}
          </p>
        </div>
        <div className="dash-head-stats">
          <div className="head-stat">
            <span className="head-stat-icon">
              <Flame size={17} />
            </span>
            <div>
              <strong>{state.progress.streak} días</strong>
              <span>racha</span>
            </div>
          </div>
          <div className="head-stat">
            <span className="head-stat-icon head-stat-xp">
              <Zap size={17} />
            </span>
            <div>
              <strong>{state.progress.xp} XP</strong>
              <span>acumulados</span>
            </div>
          </div>
          <Link to="/app/path" className="btn btn-outline btn-sm">
            Ver ruta <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <section className="dash-hero">
        <div className="dash-hero-glow" />
        <div className="dash-hero-copy">
          <div className="dash-hero-eyebrow">
            <span className="live-dot" />
            {nextLesson ? 'Tu siguiente paso' : 'Ruta completada'}
          </div>
          {nextLesson ? (
            <>
              <div className="dash-hero-tags">
                <Tag tone="lime">{nextLesson.level}</Tag>
                <span>{nextModule?.title}</span>
                <span>
                  <Clock3 size={13} /> {nextLesson.minutes} min
                </span>
              </div>
              <h2>{nextLesson.title}</h2>
              <p>{nextLesson.objective}</p>
              <div className="dash-hero-actions">
                <button type="button" className="btn btn-lime btn-lg" onClick={() => navigate(`/app/lesson/${nextLesson.id}`)}>
                  <Play size={17} fill="currentColor" /> Continuar lección
                </button>
                <button type="button" className="btn btn-dark-ghost btn-lg" onClick={() => navigate('/app/path')}>
                  Ver toda la ruta
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>Has completado toda la ruta hasta C1.</h2>
              <p>Mantén el nivel con práctica deliberada: writing, vocabulario y conversaciones reales.</p>
              <div className="dash-hero-actions">
                <button type="button" className="btn btn-lime btn-lg" onClick={() => navigate('/app/writing')}>
                  <PenLine size={17} /> Ir al Writing Lab
                </button>
              </div>
            </>
          )}
          <div className="dash-hero-foot">
            <div className="hero-week">
              <span>Progreso de la ruta</span>
              <div className="bar-track bar-track-dark">
                <div className="bar-fill bar-fill-lime" style={{ width: `${Math.max(2, progress.percent)}%` }} />
              </div>
              <strong>{progress.percent}%</strong>
            </div>
            <div className="hero-week">
              <span>Objetivo semanal</span>
              <div className="bar-track bar-track-dark">
                <div className="bar-fill bar-fill-mint" style={{ width: `${Math.max(2, weeklyPct)}%` }} />
              </div>
              <strong>{weeklyPct}%</strong>
            </div>
          </div>
        </div>

        <div className="dash-hero-side">
          <div className="dash-ring">
            <ProgressRing value={progress.percent} size={168} stroke={11} label={`${progress.done}/${progress.total}`} sublabel="lecciones" />
          </div>
          <div className="dash-hero-level">
            <span>Nivel actual</span>
            <strong>{currentLevel}</strong>
            <em>{levelLabel[currentLevel]}</em>
          </div>
          <div className="dash-hero-side-foot">
            <span>
              <Target size={14} /> C1 en {plan.weeks} semanas
            </span>
            <span>{profile.weeklyHours} h/semana</span>
          </div>
        </div>
      </section>

      <div className="dash-grid">
        <div className="dash-main">
          <section className="panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Esta semana</span>
                <h2>Tu actividad</h2>
              </div>
              <div className="weekly-total">
                <strong>{Math.round(weeklyMinutes / 60)}h {weeklyMinutes % 60}m</strong>
                <span>de {profile.weeklyHours} h</span>
              </div>
            </div>
            <div className="activity-chart">
              {week.map((day) => {
                const entry = state.progress.activity[day]
                const minutes = entry?.minutes ?? 0
                const isToday = day === todayKey
                return (
                  <div className={`activity-day ${isToday ? 'today' : ''}`} key={day}>
                    <div className="activity-bar-wrap">
                      <div
                        className={`activity-bar ${minutes > 0 ? 'has-value' : ''}`}
                        style={{ height: `${Math.max(minutes > 0 ? 8 : 3, (minutes / maxMinutes) * 100)}%` }}
                        title={`${minutes} min`}
                      />
                    </div>
                    <span>{isToday ? 'Hoy' : weekLabel(day)}</span>
                    <em>{minutes > 0 ? `${minutes}′` : '—'}</em>
                  </div>
                )
              })}
            </div>
            <div className="weekly-foot">
              <span>
                <Flame size={14} /> {state.progress.streak} días de racha · mejor racha {state.progress.bestStreak}
              </span>
              <span>{weeklyPct >= 100 ? 'Objetivo semanal cumplido' : `Te faltan ${Math.max(0, weeklyGoal - weeklyMinutes)} min esta semana`}</span>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Plan recomendado</span>
                <h2>Tu semana, día a día</h2>
              </div>
              <Link to="/app/practice" className="text-btn">
                Práctica pendiente <ChevronRight size={15} />
              </Link>
            </div>
            <div className="week-plan">
              {dailyPlan.map((item, index) => (
                <PlanRow item={item} key={`${item.day}-${index}`} today={index === todayIndex} />
              ))}
            </div>
          </section>

          <section className="panel kit-panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Kit de tu sector</span>
                <h2>{track.label}</h2>
              </div>
              <button type="button" className="text-btn" onClick={() => setShowKit((value) => !value)}>
                {showKit ? 'Ver menos' : 'Ver todo'} <ChevronRight size={15} className={showKit ? 'rotated-90' : ''} />
              </button>
            </div>
            <div className="kit-grid">
              {(showKit ? track.vocab : track.vocab.slice(0, 4)).map((item) => (
                <div className="kit-item" key={item.term}>
                  <div className="kit-item-head">
                    <strong>{item.term}</strong>
                    <AudioButton text={`${item.term}. ${item.example}`} rate={state.settings.voiceRate} variant="small" />
                  </div>
                  <span>{item.es}</span>
                  <p>{item.example}</p>
                </div>
              ))}
            </div>
            <div className="kit-phrases">
              <span>Frases clave</span>
              {track.phrases.slice(0, showKit ? 4 : 2).map((phraseItem) => (
                <div className="kit-phrase" key={phraseItem.en}>
                  <AudioButton text={phraseItem.en} rate={state.settings.voiceRate} variant="small" />
                  <div>
                    <strong>{phraseItem.en}</strong>
                    <span>{phraseItem.es}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="dash-side">
          <section className="panel tutor-panel">
            <div className="tutor-head">
              <span className="tutor-avatar" aria-hidden="true">👨‍🏫</span>
              <div>
                <span className="eyebrow">Tu profesor Fluenta</span>
                <h2>Hola, {profile.name}. Hoy toca reforzar lo que más falta.</h2>
              </div>
            </div>
            <p>
              Tu nivel actual es <strong>{currentLevel}</strong>. La ruta ya prioriza tus habilidades más débiles, así
              que cada lección que completes te acerca a C1 de forma medible. Constancia antes que intensidad.
            </p>
            <Link to={nextLesson ? `/app/lesson/${nextLesson.id}` : '/app/path'} className="btn btn-primary btn-block btn-sm">
              {nextLesson ? 'Empezar la lección de hoy' : 'Ver mi ruta'} <ArrowRight size={15} />
            </Link>
          </section>

          <section className="panel radar-mini-panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Perfil actual</span>
                <h2>Habilidades</h2>
              </div>
              <Link to="/app/progress" className="icon-link" aria-label="Ver progreso">
                <TrendingUp size={17} />
              </Link>
            </div>
            <RadarChart scores={scores} size={270} />
            <LevelLadder current={currentLevel} compact />
          </section>

          <section className="panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Próximo hito</span>
                <h2>{milestone?.title ?? 'Objetivo C1'}</h2>
              </div>
            </div>
            <p className="milestone-detail">{milestone?.detail ?? 'Tu itinerario está completo. Sigue practicando para consolidar.'}</p>
            <div className="milestone-week">
              <span>
                <Clock3 size={14} /> {milestone ? `≈ semana ${milestone.week}` : 'Completado'}
              </span>
              <span>{currentStage.stage.title}</span>
            </div>
            <div className="stage-mini-list">
              {plan.stages.map((stage) => {
                const stageDone = stage.lessons.filter((lesson) => completed.includes(lesson.id)).length
                const stagePercent = Math.round((stageDone / Math.max(1, stage.lessons.length)) * 100)
                const active = stage.stage.level === currentStage.stage.level
                return (
                  <div className={`stage-mini ${active ? 'active' : ''}`} key={stage.stage.level}>
                    <span className={`stage-mini-level ${stagePercent === 100 ? 'done' : ''}`}>
                      {stagePercent === 100 ? <Check size={12} /> : stage.stage.level}
                    </span>
                    <div>
                      <strong>{stage.stage.title}</strong>
                      <div className="bar-track bar-track-light">
                        <div className="bar-fill" style={{ width: `${Math.max(2, stagePercent)}%` }} />
                      </div>
                    </div>
                    <em>{stagePercent}%</em>
                  </div>
                )
              })}
            </div>
            <Link to="/app/path" className="btn btn-outline btn-block btn-sm">
              Abrir mi ruta <ArrowRight size={15} />
            </Link>
          </section>

          <section className="panel review-panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Repaso espaciado</span>
                <h2>{due.length ? `${due.length} tarjetas para hoy` : 'Vocabulario al día'}</h2>
              </div>
              <span className="review-icon">
                <Brain size={18} />
              </span>
            </div>
            <p>
              {due.length
                ? 'Cinco minutos de repaso consolidan más que una hora de lectura pasiva.'
                : 'Vuelve mañana o completa una lección nueva para añadir vocabulario a tu mazo.'}
            </p>
            <Link to="/app/practice" className={`btn ${due.length ? 'btn-primary' : 'btn-outline'} btn-block`}>
              {due.length ? 'Repasar ahora' : 'Ir a práctica'} <ArrowRight size={15} />
            </Link>
          </section>

          {phrase && (
            <section className="phrase-card">
              <div className="phrase-card-top">
                <span>
                  <Sparkles size={14} /> Frase del día
                </span>
                <AudioButton text={phrase.en} rate={state.settings.voiceRate} variant="small" />
              </div>
              <blockquote>{phrase.en}</blockquote>
              <p>{phrase.es}</p>
              {nextLesson && <span className="phrase-source">De: {nextLesson.title}</span>}
            </section>
          )}

          {state.progress.writingSubmissions[0] && (
            <section className="panel latest-writing">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">Última escritura</span>
                  <h2>{state.progress.writingSubmissions[0].title}</h2>
                </div>
                <span className="writing-mini-score">{state.progress.writingSubmissions[0].evaluation.score}</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${state.progress.writingSubmissions[0].evaluation.score}%` }} />
              </div>
              <Link to="/app/writing" className="text-btn">
                Ver corrección <ChevronRight size={14} />
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

function PlanRow({ item, today }: { item: DailyPlanItem; today: boolean }) {
  const icon =
    item.kind === 'lesson' ? (
      <BookOpen size={16} />
    ) : item.kind === 'review' ? (
      <Brain size={16} />
    ) : item.kind === 'listening' ? (
      <Headphones size={16} />
    ) : item.kind === 'writing' ? (
      <PenLine size={16} />
    ) : item.kind === 'speaking' ? (
      <Play size={16} />
    ) : (
      <Clock3 size={16} />
    )
  const content = (
    <>
      <span className={`plan-icon plan-icon-${item.kind}`}>{icon}</span>
      <span className={`plan-day ${today ? 'today' : ''}`}>{item.day}</span>
      <div className="plan-title">
        <strong>{item.title}</strong>
        <span>{item.kind === 'rest' ? 'Sin carga programada' : `${item.minutes} min`}</span>
      </div>
      {today && <span className="plan-today-tag">Hoy</span>}
      {item.to && <ChevronRight size={15} className="plan-chevron" />}
    </>
  )
  if (item.to) {
    return (
      <Link to={item.to} className={`plan-row ${today ? 'is-today' : ''}`}>
        {content}
      </Link>
    )
  }
  return <div className={`plan-row ${today ? 'is-today' : ''}`}>{content}</div>
}
