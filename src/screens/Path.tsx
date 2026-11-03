import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Lock,
  Play,
  Route as RouteIcon,
  Sparkles,
  Target,
} from 'lucide-react'
import { useApp } from '../store'
import {
  buildPath,
  levelFromCompleted,
  nextLessonFor,
  nextMilestone,
  pathProgress,
} from '../lib/path'
import { addDays, formatDate, isoDay, levelLabel } from '../lib/levels'
import { moduleMap } from '../data/curriculum'
import { LevelChip, ProgressRing, Tag } from '../components/ui'

export default function Path() {
  const { state } = useApp()
  const navigate = useNavigate()
  const profile = state.profile!
  const result = state.placement!
  const plan = useMemo(() => buildPath(result, profile), [result, profile])
  const completed = state.progress.completedLessons
  const progress = pathProgress(plan, completed)
  const next = nextLessonFor(plan, completed)
  const currentLevel = levelFromCompleted(plan, completed)
  const milestone = nextMilestone(plan, completed)

  const currentStageIndex = plan.stages.findIndex(
    (stage) => !stage.lessons.every((lesson) => completed.includes(lesson.id)),
  )
  const activeStageIndex = currentStageIndex === -1 ? plan.stages.length : currentStageIndex
  const targetDate = addDays(isoDay(), plan.weeks * 7)

  return (
    <div className="path-page">
      <header className="page-head path-head">
        <div>
          <span className="eyebrow">
            <RouteIcon size={14} /> Tu itinerario personalizado
          </span>
          <h1>
            De {plan.startLevel} a C1,
            <br />
            <em>sin saltarte lo importante.</em>
          </h1>
          <p>
            Ruta núcleo: {plan.totalLessons} lecciones y {plan.modules.length} módulos. Con {profile.weeklyHours} h
            semanales, tu fecha estimada es <strong>{formatDate(targetDate)}</strong>.
          </p>
        </div>
        <div className="path-head-stats">
          <div className="path-stat">
            <ProgressRing value={progress.percent} size={104} stroke={8} label={`${progress.percent}%`} sublabel="completado" />
          </div>
          <div className="path-stat-list">
            <div>
              <strong>{progress.done}/{progress.total}</strong>
              <span>lecciones</span>
            </div>
            <div>
              <strong>{plan.weeks}</strong>
              <span>semanas</span>
            </div>
            <div>
              <strong>{currentLevel}</strong>
              <span>nivel actual</span>
            </div>
          </div>
        </div>
      </header>

      <div className="path-layout">
        <div className="path-timeline">
          {plan.stages.map((entry, stageIndex) => {
            const stageDone = entry.lessons.filter((lesson) => completed.includes(lesson.id)).length
            const stagePercent = Math.round((stageDone / Math.max(1, entry.lessons.length)) * 100)
            const stageComplete = stageDone === entry.lessons.length
            const stageCurrent = stageIndex === currentStageIndex
            const locked = stageIndex > currentStageIndex && currentStageIndex !== -1
            const isPast = stageIndex < currentStageIndex
            return (
              <section className={`path-stage ${stageCurrent ? 'current' : ''} ${stageComplete ? 'complete' : ''} ${locked ? 'locked' : ''}`} key={entry.stage.level}>
                <div className="path-stage-rail">
                  <span className={`path-stage-node ${stageComplete ? 'done' : stageCurrent ? 'active' : ''}`}>
                    {stageComplete ? <Check size={18} /> : stageIndex + 1}
                  </span>
                  {stageIndex < plan.stages.length - 1 && <span className="path-stage-line" />}
                </div>
                <div className="path-stage-content">
                  <div className="path-stage-head">
                    <div>
                      <div className="path-stage-tags">
                        <LevelChip level={entry.stage.level} />
                        {stageCurrent && <Tag tone="lime">Estás aquí</Tag>}
                        {stageComplete && <Tag tone="dark">Completada</Tag>}
                        {locked && (
                          <Tag tone="muted">
                            <Lock size={11} /> Bloqueada
                          </Tag>
                        )}
                      </div>
                      <h2>{entry.stage.title}</h2>
                      <p>{entry.stage.description}</p>
                    </div>
                    <div className="stage-progress">
                      <strong>{stagePercent}%</strong>
                      <span>{stageDone}/{entry.lessons.length} lecciones</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${Math.max(2, stagePercent)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="path-modules">
                    {entry.modules.map((module) => {
                      const moduleDone = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
                      const moduleComplete = moduleDone === module.lessons.length
                      return (
                        <article className={`path-module ${moduleComplete ? 'done' : ''}`} key={module.id}>
                          <div className="path-module-head">
                            <span className={`module-icon ${moduleComplete ? 'done' : ''}`}>
                              {moduleComplete ? <Check size={16} /> : <BookOpen size={16} />}
                            </span>
                            <div>
                              <span className="module-theme">{module.theme}</span>
                              <h3>{module.title}</h3>
                              <p>{module.description}</p>
                            </div>
                            <div className="module-meta">
                              <span>
                                <Clock3 size={13} /> {module.hours} h
                              </span>
                              <span>{moduleDone}/{module.lessons.length}</span>
                            </div>
                          </div>

                          <div className="lesson-list">
                            {module.lessons.map((lesson) => {
                              const done = completed.includes(lesson.id)
                              const isNext = next?.id === lesson.id
                              const lessonLocked = locked
                              return (
                                <button
                                  type="button"
                                  key={lesson.id}
                                  className={`lesson-row ${done ? 'done' : ''} ${isNext ? 'next' : ''} ${lessonLocked ? 'locked' : ''}`}
                                  onClick={() => !lessonLocked && navigate(`/app/lesson/${lesson.id}`)}
                                  disabled={lessonLocked}
                                >
                                  <span className={`lesson-status ${done ? 'done' : isNext ? 'next' : ''}`}>
                                    {lessonLocked ? <Lock size={12} /> : done ? <Check size={13} /> : isNext ? <Play size={11} fill="currentColor" /> : lesson.index}
                                  </span>
                                  <div className="lesson-row-main">
                                    <div className="lesson-row-title">
                                      <strong>{lesson.title}</strong>
                                      {isNext && <Tag tone="lime">Siguiente</Tag>}
                                    </div>
                                    <span>{lesson.subtitle} · {lesson.minutes} min</span>
                                  </div>
                                  <ChevronRight size={16} className="lesson-chevron" />
                                </button>
                              )
                            })}
                          </div>

                          <div className="module-foot">
                            <span>{module.outcome}</span>
                            {moduleComplete ? (
                              <span className="module-complete-label">
                                <Check size={13} /> Módulo completado
                              </span>
                            ) : (
                              <Link to={`/app/lesson/${module.lessons.find((lesson) => !completed.includes(lesson.id))?.id}`} className="text-btn">
                                {moduleDone ? 'Continuar módulo' : 'Empezar módulo'} <ArrowRight size={14} />
                              </Link>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        <aside className="path-aside">
          <div className="path-aside-card dark">
            <span className="mini-label">Siguiente lección</span>
            {next ? (
              <>
                <h3>{next.title}</h3>
                <p>{moduleMap[next.moduleId]?.title} · {next.minutes} min</p>
                <button type="button" className="btn btn-lime btn-block" onClick={() => navigate(`/app/lesson/${next.id}`)}>
                  <Play size={15} fill="currentColor" /> Empezar ahora
                </button>
              </>
            ) : (
              <>
                <h3>Itinerario completado</h3>
                <p>Has recorrido todas las lecciones. Ahora consolida con práctica libre.</p>
                <Link to="/app/writing" className="btn btn-lime btn-block">
                  Practicar writing <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>

          <div className="path-aside-card">
            <span className="eyebrow">Próximo hito</span>
            <h3>{milestone?.title ?? 'C1 · Dominio ejecutivo'}</h3>
            <p>{milestone?.detail ?? 'Mantén el nivel con práctica deliberada.'}</p>
            <div className="aside-meta">
              <span>
                <Clock3 size={14} /> {milestone ? `Semana ${milestone.week}` : 'Completado'}
              </span>
              <span>
                <Target size={14} /> {levelLabel[currentLevel]}
              </span>
            </div>
          </div>

          <div className="path-aside-card">
            <span className="eyebrow">Plan de refuerzo</span>
            <div className="focus-aside-list">
              {plan.focusSkills.map((skill, index) => (
                <div className="focus-aside-item" key={skill}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{focusName(skill)}</strong>
                    <p>{focusText(skill)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="path-aside-card minutes-card">
            <span className="eyebrow">Tu compromiso</span>
            <div className="commitment">
              <strong>{profile.weeklyHours} h</strong>
              <span>por semana</span>
            </div>
            <p>
              {Math.round((plan.totalHours + plan.immersionHours) * 60)} minutos de ruta núcleo + práctica recomendada.
              La constancia importa más que la intensidad.
            </p>
            <div className="commitment-line">
              <CalendarDays size={14} />
              <span>Hasta {formatDate(targetDate)}</span>
            </div>
          </div>

          <div className="path-aside-quote">
            <Sparkles size={16} />
            <p>“Aprender inglés es menos acumular lecciones y más convertir lo aprendido en algo que puedes usar mañana.”</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function focusName(skill: string): string {
  const names: Record<string, string> = {
    grammar: 'Gramática',
    vocabulary: 'Vocabulario',
    reading: 'Lectura',
    listening: 'Escucha',
    writing: 'Escritura',
  }
  return names[skill] ?? skill
}

function focusText(skill: string): string {
  const texts: Record<string, string> = {
    grammar: 'Una regla al día aplicada a una frase de tu trabajo.',
    vocabulary: 'Repaso espaciado 4 veces por semana, en contexto.',
    reading: 'Diez minutos de lectura profesional y un resumen de dos frases.',
    listening: 'Quince minutos de escucha activa, con y sin transcripción.',
    writing: 'Dos textos cortos por semana con corrección aplicada.',
  }
  return texts[skill] ?? 'Práctica deliberada y constancia.'
}
