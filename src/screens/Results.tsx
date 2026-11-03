import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  PenLine,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { useApp } from '../store'
import { buildPath } from '../lib/path'
import { levelDescription, levelLabel, levelNum } from '../lib/levels'
import type { Skill } from '../types'
import { LevelChip, LevelLadder, Logo, ProgressRing, RadarChart, SkillBars, Tag } from '../components/ui'

const criteriaMeta = [
  { key: 'length', label: 'Extensión y desarrollo', max: 20 },
  { key: 'range', label: 'Rango léxico', max: 20 },
  { key: 'accuracy', label: 'Precisión gramatical', max: 25 },
  { key: 'cohesion', label: 'Cohesión y estructura', max: 15 },
  { key: 'task', label: 'Adecuación a la tarea', max: 20 },
] as const

export default function Results() {
  const { state } = useApp()
  const navigate = useNavigate()
  const [showWriting, setShowWriting] = useState(false)

  const result = state.placement
  const profile = state.profile

  const plan = useMemo(() => (result && profile ? buildPath(result, profile) : null), [result, profile])

  if (!result || !profile || !plan) return <Navigate to="/test" replace />

  const scores = (Object.keys(result.skills) as Skill[]).reduce(
    (acc, skill) => {
      acc[skill] = result.skills[skill].score
      return acc
    },
    {} as Record<Skill, number>,
  )
  const levels = (Object.keys(result.skills) as Skill[]).reduce(
    (acc, skill) => {
      acc[skill] = result.skills[skill].level
      return acc
    },
    {} as Record<Skill, 'A1' | 'A2' | 'B1' | 'B2' | 'C1'>,
  )
  const writing = result.writing.evaluation
  const readingPct = Math.round((result.reading.correct / result.reading.total) * 100)
  const listeningPct = Math.round((result.listening.correct / result.listening.total) * 100)
  const goalReached = result.overall === 'C1'

  return (
    <div className="results-page">
      <header className="results-nav">
        <Link to="/" className="brand-link">
          <Logo />
        </Link>
        <div className="results-nav-actions">
          <Link to="/test" className="btn btn-ghost btn-sm">
            <RotateCcw size={15} /> Repetir test
          </Link>
          <Link to="/app" className="btn btn-primary btn-sm">
            Ir a mi panel <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main className="results-main">
        <section className="results-hero">
          <div className="results-hero-copy">
            <span className="eyebrow">
              <Sparkles size={14} /> Tu diagnóstico · {new Date(result.completedAt).toLocaleDateString('es-ES')}
            </span>
            <h1>
              {result.overall === 'C1' ? (
                <>
                  Ya estás en C1.
                  <br />
                  <em>Ahora toca especializarlo.</em>
                </>
              ) : (
                <>
                  {profile.name}, tu nivel actual es
                  <br />
                  <em>{levelLabel[result.overall]} ({result.overall}).</em>
                </>
              )}
            </h1>
            <p>
              {levelDescription[result.overall]} Tu perfil muestra un punto de partida claro: no empiezas de cero,
              empiezas desde {result.overall}. La ruta ya está ajustada a tus habilidades más débiles.
            </p>
            <div className="results-hero-actions">
              <Link to="/app" className="btn btn-primary btn-lg">
                Empezar mi ruta
                <ArrowRight size={18} />
              </Link>
              <button type="button" className="btn btn-outline btn-lg" onClick={() => setShowWriting((value) => !value)}>
                Ver mi escritura
                <ChevronDown size={17} className={showWriting ? 'rotated' : ''} />
              </button>
            </div>
            <div className="results-confidence">
              <span className={`confidence-dot ${result.confidence}`} />
              <span>
                Precisión del diagnóstico: <strong>{result.confidence}</strong>
              </span>
              <span className="results-confidence-note">
                {result.confidence === 'alta'
                  ? 'El test incluyó producción escrita suficiente para una lectura fiable.'
                  : 'Puedes repetir el test tras dos semanas de práctica para afinar el resultado.'}
              </span>
            </div>
          </div>

          <div className="results-seal">
            <div className="seal-ring">
              <div className="seal-inner">
                <span>Nivel MCER</span>
                <strong>{result.overall}</strong>
                <em>{result.overallScore}/100</em>
              </div>
            </div>
            <LevelLadder current={result.overall} compact />
            <div className="seal-foot">
              <span>Meta</span>
              <strong>C1</strong>
              <span>
                {goalReached ? 'Objetivo alcanzado' : `${levelNum.C1 - levelNum[result.overall]} niveles por recorrer`}
              </span>
            </div>
          </div>
        </section>

        <section className="results-grid">
          <article className="panel radar-panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Perfil de habilidades</span>
                <h2>Dónde estás fuerte y dónde intervenir</h2>
              </div>
              <Tag tone="dark">5 dimensiones</Tag>
            </div>
            <div className="radar-wrap">
              <RadarChart scores={scores} size={360} />
            </div>
            <SkillBars scores={scores} levels={levels} />
          </article>

          <div className="results-side">
            <article className="panel tutor-panel">
              <div className="tutor-head">
                <span className="tutor-avatar" aria-hidden="true">👨‍🏫</span>
                <div>
                  <span className="eyebrow">Tu profesor Fluenta</span>
                  <h2>{profile.name}, este es tu punto de partida real.</h2>
                </div>
              </div>
              <p>
                Tu nivel global es <strong>{result.overall}</strong> ({result.overallScore}/100). Vamos a reforzar primero
                tus áreas más débiles: {result.gaps.map((skill) => skillName(skill)).join(' y ')}. Cada lección te dará
                feedback inmediato, como en una clase particular.
              </p>
              <div className="result-tags">
                {result.gaps.map((skill) => (
                  <span className="result-tag gap" key={skill}>
                    <AlertCircle size={13} /> {result.skills[skill].score}% · {skillName(skill)}
                  </span>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">Lectura del resultado</span>
                  <h2>Tu punto de partida</h2>
                </div>
              </div>
              <div className="result-summary">
                <div>
                  <span className="result-summary-label">Fortalezas</span>
                  <div className="result-tags">
                    {result.strengths.map((skill) => (
                      <span className="result-tag good" key={skill}>
                        <Check size={13} /> {levels[skill]} · {skillName(skill)}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="result-summary-label">Prioridades de trabajo</span>
                  <div className="result-tags">
                    {result.gaps.map((skill) => (
                      <span className="result-tag gap" key={skill}>
                        <AlertCircle size={13} /> {levels[skill]} · {skillName(skill)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="result-meaning">
                <Target size={18} />
                <p>
                  Con {profile.weeklyHours} h/semana, tu ruta núcleo + práctica recomendada suma{' '}
                  <strong>{plan.weeks} semanas</strong> hasta C1. No es una promesa: es una estimación basada en tu
                  punto de partida y tu carga real.
                </p>
              </div>
            </article>

            <article className="panel">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">Comprensión</span>
                  <h2>Lectura y escucha</h2>
                </div>
              </div>
              <div className="comp-grid">
                <div className="comp-card">
                  <span className="comp-icon">
                    <BookOpen size={18} />
                  </span>
                  <div>
                    <strong>{result.reading.correct}/{result.reading.total}</strong>
                    <span>Lectura · nivel {result.reading.level}</span>
                  </div>
                  <div className="mini-meter">
                    <span style={{ width: `${readingPct}%` }} />
                  </div>
                </div>
                <div className="comp-card">
                  <span className="comp-icon">
                    <Headphones size={18} />
                  </span>
                  <div>
                    <strong>{result.listening.correct}/{result.listening.total}</strong>
                    <span>Escucha · nivel {result.listening.level}</span>
                  </div>
                  <div className="mini-meter mini-meter-coral">
                    <span style={{ width: `${listeningPct}%` }} />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="panel writing-result-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">Corrección de escritura</span>
              <h2>
                Tu texto: {writing.wordCount} palabras · nivel {writing.level}
              </h2>
            </div>
            <div className="writing-score">
              <strong>{writing.score}</strong>
              <span>/100</span>
            </div>
          </div>

          <div className="writing-result-grid">
            <div className="writing-criteria">
              {criteriaMeta.map((criterion) => {
                const value = writing.criteria[criterion.key]
                return (
                  <div className="criterion" key={criterion.key}>
                    <div className="criterion-head">
                      <span>{criterion.label}</span>
                      <span>
                        {value}/{criterion.max}
                      </span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(value / criterion.max) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="writing-feedback">
              <span className="result-summary-label">Lo que observamos</span>
              <ul className="feedback-list">
                {writing.feedback.map((item) => (
                  <li key={item}>
                    <span className="feedback-dot" /> {item}
                  </li>
                ))}
              </ul>
              {writing.highlights.length > 0 && (
                <>
                  <span className="result-summary-label">Puntos fuertes</span>
                  <ul className="highlight-list">
                    {writing.highlights.map((item) => (
                      <li key={item}>
                        <Check size={14} /> {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {showWriting && (
            <div className="writing-expanded">
              <div className="writing-text-preview">
                <span className="result-summary-label">Tu texto original</span>
                <p>{result.writing.text}</p>
              </div>
              <div className="issue-list">
                <span className="result-summary-label">Correcciones sugeridas</span>
                {writing.issues.length ? (
                  writing.issues.map((issue, index) => (
                    <div className="issue" key={`${issue.original}-${index}`}>
                      <div className="issue-change">
                        <del>{issue.original}</del>
                        <ArrowRight size={13} />
                        <ins>{issue.suggestion}</ins>
                      </div>
                      <p>{issue.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-issues">
                    <Check size={15} /> No se detectaron errores típicos en este texto. Sigue trabajando el rango y la
                    precisión.
                  </p>
                )}
              </div>
            </div>
          )}

          <button type="button" className="text-btn writing-toggle" onClick={() => setShowWriting((value) => !value)}>
            {showWriting ? 'Ocultar texto y correcciones' : 'Ver texto completo y correcciones'}
            <ChevronDown size={15} className={showWriting ? 'rotated' : ''} />
          </button>
        </section>

        <section className="panel route-result-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">Tu ruta óptima</span>
              <h2>De {result.overall} a C1, sin repetir lo que ya sabes</h2>
            </div>
            <div className="route-summary-pills">
              <span>
                <Clock3 size={14} /> {plan.weeks} semanas
              </span>
              <span>
                <TrendingUp size={14} /> {plan.totalLessons} lecciones
              </span>
            </div>
          </div>

          <div className="route-stages">
            {plan.stages.map((entry, index) => (
              <div className="route-stage" key={entry.stage.level}>
                <div className="route-stage-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="route-stage-body">
                  <div className="route-stage-head">
                    <LevelChip level={entry.stage.level} />
                    <span>{entry.stage.modules.length} módulos · {entry.stage.modules.reduce((sum, module) => sum + module.lessons.length, 0)} lecciones</span>
                  </div>
                  <h3>{entry.stage.title}</h3>
                  <p>{entry.stage.tagline}</p>
                </div>
                <span className="route-stage-week">
                  {plan.milestones[index] ? `≈ sem. ${plan.milestones[index].week}` : ''}
                </span>
              </div>
            ))}
          </div>

          <div className="focus-plan">
            <span className="result-summary-label">Plan de refuerzo personalizado</span>
            <div className="focus-grid">
              {plan.focusSkills.map((skill, index) => (
                <div className="focus-card" key={skill}>
                  <span className="focus-number">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{skillName(skill)}</strong>
                  <p>{plan.focusNotes[index + (plan.focusNotes.length - plan.focusSkills.length)]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="route-cta">
            <div>
              <strong>Tu ruta ya está lista.</strong>
              <span>Empieza por la primera lección y avanza a tu ritmo.</span>
            </div>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/app')}>
              Entrar en mi panel
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

function skillName(skill: Skill): string {
  const names: Record<Skill, string> = {
    grammar: 'Gramática',
    vocabulary: 'Vocabulario',
    reading: 'Lectura',
    listening: 'Escucha',
    writing: 'Escritura',
  }
  return names[skill]
}
