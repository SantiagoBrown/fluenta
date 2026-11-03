import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  Crown,
  Flame,
  Footprints,
  Layers,
  MapPin,
  PenLine,
  Rocket,
  RotateCcw,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'
import { useApp } from '../store'
import { buildPath, levelFromCompleted, nextMilestone, pathProgress } from '../lib/path'
import { addDays, formatDate, isoDay, levelDescription, levelLabel, levelNum } from '../lib/levels'
import { BADGES } from '../lib/store'
import { SKILL_SHORT } from '../types'
import type { Skill } from '../types'
import { LevelLadder, ProgressRing, RadarChart, Tag } from '../components/ui'

const badgeIcons: Record<string, ReactNode> = {
  MapPin: <MapPin size={18} />,
  Footprints: <Footprints size={18} />,
  Flame: <Flame size={18} />,
  Trophy: <Trophy size={18} />,
  PenLine: <PenLine size={18} />,
  Brain: <Brain size={18} />,
  Zap: <Zap size={18} />,
  CalendarCheck: <CalendarCheck size={18} />,
  Crown: <Crown size={18} />,
  Layers: <Layers size={18} />,
  Rocket: <Rocket size={18} />,
}

export default function Progress() {
  const { state } = useApp()
  const profile = state.profile!
  const result = state.placement!
  const plan = useMemo(() => buildPath(result, profile), [result, profile])
  const completed = state.progress.completedLessons
  const progress = pathProgress(plan, completed)
  const currentLevel = levelFromCompleted(plan, completed)
  const milestone = nextMilestone(plan, completed)

  const scores = (Object.keys(result.skills) as Skill[]).reduce(
    (acc, skill) => {
      acc[skill] = result.skills[skill].score
      return acc
    },
    {} as Record<Skill, number>,
  )

  const activityDays = Object.keys(state.progress.activity).length
  const totalMinutes = Object.values(state.progress.activity).reduce((sum, entry) => sum + entry.minutes, 0)
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10
  const targetDate = addDays(isoDay(), plan.weeks * 7)
  const submissions = state.progress.writingSubmissions.slice().reverse()
  const earned = new Set(state.progress.badges)

  const heatmap = useMemo(() => {
    const today = isoDay()
    const start = addDays(today, -83)
    const startDate = new Date(`${start}T12:00:00`)
    const offset = (startDate.getDay() + 6) % 7
    const days = Array.from({ length: 84 }, (_, index) => addDays(start, index))
    const cells: ({ day: string; minutes: number } | null)[] = [
      ...Array.from({ length: offset }, () => null),
      ...days.map((day) => ({ day, minutes: state.progress.activity[day]?.minutes ?? 0 })),
    ]
    const weeks: ({ day: string; minutes: number } | null)[][] = []
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
    return weeks
  }, [state.progress.activity])

  const writingPoints = submissions.map((submission, index) => ({
    x: 50 + (index / Math.max(1, submissions.length - 1)) * 500,
    y: 160 - (submission.evaluation.score / 100) * 130,
    score: submission.evaluation.score,
    title: submission.title,
  }))
  const line = writingPoints.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ')

  return (
    <div className="progress-page">
      <header className="page-head">
        <div>
          <span className="eyebrow">
            <TrendingUp size={14} /> Tu progreso
          </span>
          <h1>
            No es solo una racha.
            <br />
            <em>Es evidencia.</em>
          </h1>
          <p>
            Nivel actual <strong>{currentLevel}</strong> · {levelDescription[currentLevel]} Cada número aquí representa
            algo que ya puedes hacer en inglés.
          </p>
        </div>
        <div className="progress-head-card">
          <ProgressRing value={progress.percent} size={118} stroke={9} label={`${progress.percent}%`} sublabel="ruta" />
          <div>
            <span className="eyebrow">Nivel MCER</span>
            <strong className="progress-level">{currentLevel}</strong>
            <span>{levelLabel[currentLevel]}</span>
          </div>
        </div>
      </header>

      <section className="level-ladder-card">
        <div className="level-ladder-head">
          <div>
            <span className="eyebrow">Escala MCER</span>
            <h2>De {result.overall} a C1</h2>
          </div>
          <Tag tone={currentLevel === 'C1' ? 'lime' : 'dark'}>
            {currentLevel === 'C1' ? 'Objetivo alcanzado' : `${levelNum.C1 - levelNum[currentLevel]} niveles restantes`}
          </Tag>
        </div>
        <LevelLadder current={currentLevel} />
        <div className="level-ladder-labels">
          {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((level) => (
            <div className={`level-ladder-item ${levelNum[level] <= levelNum[currentLevel] ? 'reached' : ''}`} key={level}>
              <strong>{level}</strong>
              <span>{levelLabel[level]}</span>
              <p>{levelDescription[level]}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="progress-grid">
        <section className="panel progress-radar-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">Diagnóstico inicial</span>
              <h2>Tu perfil de habilidades</h2>
            </div>
            <Link to="/test" className="text-btn">
              <RotateCcw size={14} /> Repetir test
            </Link>
          </div>
          <RadarChart scores={scores} size={360} />
          <div className="progress-skill-table">
            {(Object.keys(result.skills) as Skill[]).map((skill) => (
              <div className="progress-skill-row" key={skill}>
                <span>{SKILL_SHORT[skill]}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${scores[skill]}%` }} />
                </div>
                <Tag tone="muted">{result.skills[skill].level}</Tag>
                <strong>{Math.round(scores[skill])}</strong>
              </div>
            ))}
          </div>
        </section>

        <div className="progress-side">
          <section className="panel stats-panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">En números</span>
                <h2>Tu trabajo hasta hoy</h2>
              </div>
            </div>
            <div className="stats-grid">
              <div>
                <strong>{state.progress.xp}</strong>
                <span>XP acumulados</span>
              </div>
              <div>
                <strong>{totalHours} h</strong>
                <span>de práctica</span>
              </div>
              <div>
                <strong>{completed.length}</strong>
                <span>lecciones</span>
              </div>
              <div>
                <strong>{activityDays}</strong>
                <span>días activos</span>
              </div>
              <div>
                <strong>{state.progress.streak}</strong>
                <span>racha actual</span>
              </div>
              <div>
                <strong>{state.progress.bestStreak}</strong>
                <span>mejor racha</span>
              </div>
            </div>
            <div className="target-date">
              <Target size={17} />
              <div>
                <strong>Fecha estimada para C1</strong>
                <span>{formatDate(targetDate)} · {plan.weeks} semanas a {profile.weeklyHours} h/semana</span>
              </div>
            </div>
          </section>

          <section className="panel milestone-panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Siguiente hito</span>
                <h2>{milestone?.title ?? 'C1 consolidado'}</h2>
              </div>
            </div>
            <p>{milestone?.detail ?? 'Has completado el itinerario. Sigue practicando para mantener el nivel.'}</p>
            <div className="milestone-progress">
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${milestone?.percent ?? 100}%` }} />
              </div>
              <span>{milestone ? `Semana ${milestone.week}` : 'Completado'}</span>
            </div>
            <Link to="/app/path" className="btn btn-outline btn-block btn-sm">
              Ver itinerario <ArrowRight size={15} />
            </Link>
          </section>
        </div>
      </div>

      <section className="panel heatmap-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">Consistencia</span>
            <h2>Últimas 12 semanas</h2>
          </div>
          <div className="heatmap-legend">
            <span>Menos</span>
            <i className="heat-0" />
            <i className="heat-1" />
            <i className="heat-2" />
            <i className="heat-3" />
            <i className="heat-4" />
            <span>Más</span>
          </div>
        </div>
        <div className="heatmap">
          <div className="heatmap-days">
            <span>Lun</span>
            <span>Mié</span>
            <span>Vie</span>
          </div>
          <div className="heatmap-weeks">
            {heatmap.map((week, weekIndex) => (
              <div className="heatmap-week" key={weekIndex}>
                {week.map((cell, dayIndex) =>
                  cell ? (
                    <span
                      key={cell.day}
                      className={`heat-cell heat-${heatLevel(cell.minutes)}`}
                      title={`${cell.day}: ${cell.minutes} min`}
                    />
                  ) : (
                    <span key={`empty-${dayIndex}`} className="heat-cell heat-empty" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="heatmap-foot">
          <span>
            <Flame size={14} /> {state.progress.streak} días de racha
          </span>
          <span>{activityDays} días con actividad registrada</span>
        </div>
      </section>

      <div className="progress-bottom-grid">
        <section className="panel writing-chart-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">Escritura</span>
              <h2>Evolución de tus textos</h2>
            </div>
            <Tag tone="dark">{submissions.length} entregas</Tag>
          </div>
          {submissions.length >= 2 ? (
            <>
              <svg className="writing-chart" viewBox="0 0 600 200" role="img" aria-label="Evolución de la puntuación de escritura">
                <line x1="50" y1={160 - 0.82 * 130} x2="550" y2={160 - 0.82 * 130} stroke="var(--coral)" strokeDasharray="5 5" strokeOpacity=".6" />
                <text x="552" y={160 - 0.82 * 130 + 4} className="chart-target">C1</text>
                <line x1="50" y1="160" x2="550" y2="160" stroke="currentColor" strokeOpacity=".18" />
                <line x1="50" y1="95" x2="550" y2="95" stroke="currentColor" strokeOpacity=".08" />
                <line x1="50" y1="30" x2="550" y2="30" stroke="currentColor" strokeOpacity=".08" />
                <path d={`${line} L${writingPoints[writingPoints.length - 1].x},160 L${writingPoints[0].x},160 Z`} fill="var(--lime)" fillOpacity=".2" />
                <path d={line} fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
                {writingPoints.map((point, index) => (
                  <g key={index}>
                    <circle cx={point.x} cy={point.y} r="4" fill="var(--ink)" />
                    <text x={point.x} y={point.y - 12} textAnchor="middle" className="chart-value">
                      {point.score}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="writing-chart-foot">
                <span>Primera entrega: {submissions[0].evaluation.score}/100</span>
                <span>
                  Última: {submissions[submissions.length - 1].evaluation.score}/100
                </span>
              </div>
            </>
          ) : (
            <div className="chart-empty">
              <PenLine size={24} />
              <h3>Necesitas al menos dos entregas</h3>
              <p>Escribe dos textos en el Writing Lab para ver tu curva de mejora.</p>
              <Link to="/app/writing" className="btn btn-primary btn-sm">
                Ir al Writing Lab <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </section>

        <section className="panel badges-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">Logros</span>
              <h2>Insignias</h2>
            </div>
            <Tag tone="muted">{earned.size}/{BADGES.length}</Tag>
          </div>
          <div className="badges-grid">
            {BADGES.map((badge) => {
              const unlocked = earned.has(badge.id)
              return (
                <div className={`badge-card ${unlocked ? 'unlocked' : ''}`} key={badge.id} title={badge.description}>
                  <span className="badge-icon">{badgeIcons[badge.icon] ?? <Trophy size={18} />}</span>
                  <div>
                    <strong>{badge.title}</strong>
                    <span>{badge.description}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

function heatLevel(minutes: number): number {
  if (minutes <= 0) return 0
  if (minutes < 15) return 1
  if (minutes < 30) return 2
  if (minutes < 60) return 3
  return 4
}
