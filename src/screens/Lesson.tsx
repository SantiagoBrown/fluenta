import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock3,
  Headphones,
  Lightbulb,
  ListChecks,
  Mic,
  MicOff,
  PenLine,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  Target,
  Trophy,
  Volume2,
  X,
} from 'lucide-react'
import { useApp } from '../store'
import { getExercises, normalizeSentence, speechScore } from '../lib/lessonEngine'
import { buildPath, nextLessonFor } from '../lib/path'
import { evaluateWriting } from '../lib/writing'
import { listenOnce, recognitionSupported, speak, stopSpeech } from '../lib/speech'
import { moduleMap } from '../data/curriculum'
import type { Exercise, WritingEvaluation } from '../types'
import { DialoguePlayer } from '../components/Audio'
import { AudioButton, Tag, Waveform } from '../components/ui'

type Step = 'content' | 'practice' | 'summary' | 'production' | 'complete'

export default function LessonScreen() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { state, completeLesson, submitWriting } = useApp()
  const profile = state.profile!
  const result = state.placement!
  const plan = useMemo(() => buildPath(result, profile), [result, profile])
  const lesson = plan.lessons.find((item) => item.id === lessonId)

  const [step, setStep] = useState<Step>('content')
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [fillValue, setFillValue] = useState('')
  const [order, setOrder] = useState<number[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [attempted, setAttempted] = useState(false)
  const [writingText, setWritingText] = useState('')
  const [evaluation, setEvaluation] = useState<WritingEvaluation | null>(null)
  const [taskDone, setTaskDone] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [speechResult, setSpeechResult] = useState<{ score: number; matched: string[]; missing: string[] } | null>(null)
  const [finished, setFinished] = useState(false)

  const completed = state.progress.completedLessons.includes(lessonId ?? '')
  const nextLesson = nextLessonFor(plan, state.progress.completedLessons)

  useEffect(() => {
    stopSpeech()
  }, [lessonId])

  if (!lesson) return <Navigate to="/app/path" replace />

  const exercises = getExercises(lesson)
  const currentExercise = exercises[exerciseIndex]
  const module = moduleMap[lesson.moduleId]
  const practiceScore = exercises.length ? Math.round((correctCount / exercises.length) * 100) : 0

  const resetInteraction = () => {
    setSelectedOption(null)
    setFillValue('')
    setOrder([])
    setFeedback(null)
    setAttempted(false)
  }

  const nextExercise = () => {
    if (exerciseIndex + 1 >= exercises.length) {
      setStep('summary')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setExerciseIndex((index) => index + 1)
    resetInteraction()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const answerChoice = (exercise: Extract<Exercise, { kind: 'choice' | 'listen' }>, index: number) => {
    if (attempted) return
    setSelectedOption(index)
    setAttempted(true)
    const correct = index === exercise.answer
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) setCorrectCount((count) => count + 1)
  }

  const answerFill = (exercise: Extract<Exercise, { kind: 'fill' }>) => {
    if (attempted) return
    const correct = normalizeSentence(fillValue) === normalizeSentence(exercise.answer)
    setAttempted(true)
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) setCorrectCount((count) => count + 1)
  }

  const answerReorder = (exercise: Extract<Exercise, { kind: 'reorder' }>) => {
    if (attempted) return
    const attempt = order.map((index) => exercise.tokens[index]).join(' ')
    const correct = normalizeSentence(attempt) === normalizeSentence(exercise.answer)
    setAttempted(true)
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) setCorrectCount((count) => count + 1)
  }

  const evaluateTask = () => {
    if (!lesson.task.minWords) return
    const evalResult = evaluateWriting(writingText, {
      minWords: lesson.task.minWords,
      maxWords: lesson.task.minWords * 2,
      promptLevel: lesson.level,
    })
    setEvaluation(evalResult)
    setTaskDone(true)
    submitWriting({
      promptId: lesson.id,
      title: lesson.task.title,
      text: writingText,
      evaluation: evalResult,
      source: 'lesson',
    })
  }

  const recordSpeech = async () => {
    if (listening) {
      stopSpeech()
      setListening(false)
      return
    }
    setListening(true)
    setTranscript('')
    setSpeechResult(null)
    const response = await listenOnce('en-US')
    setListening(false)
    if (!response.supported) {
      setTaskDone(false)
      return
    }
    if (response.transcript) {
      setTranscript(response.transcript)
      setSpeechResult(speechScore(lesson.task.model, response.transcript))
      setTaskDone(true)
    }
  }

  const finishLesson = () => {
    if (finished) return
    completeLesson(lesson, practiceScore, taskDone)
    setFinished(true)
    setStep('complete')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stepIndex = step === 'content' ? 1 : step === 'practice' ? 2 : step === 'complete' ? 4 : 3
  const exercise = currentExercise

  return (
    <div className="lesson-page">
      <div className="lesson-topbar">
        <Link to="/app/path" className="back-link">
          <ArrowLeft size={15} /> Mi ruta
        </Link>
        <div className="lesson-breadcrumb">
          <span>{module?.title}</span>
          <ChevronRight size={13} />
          <span>{lesson.title}</span>
        </div>
        <div className="lesson-minutes">
          <Clock3 size={14} /> {lesson.minutes} min
        </div>
      </div>

      <header className="lesson-head">
        <div>
          <div className="lesson-tags">
            <Tag tone="lime">{lesson.level}</Tag>
            <Tag tone="muted">{module?.theme}</Tag>
            {completed && (
              <Tag tone="dark">
                <Check size={11} /> Completada
              </Tag>
            )}
          </div>
          <h1>{lesson.title}</h1>
          <p>{lesson.objective}</p>
        </div>
        <div className="lesson-steps">
          <div className={`lesson-step ${stepIndex >= 1 ? 'done' : ''}`}>
            <span>1</span>
            <em>Aprender</em>
          </div>
          <div className={`lesson-step ${stepIndex >= 2 ? 'done' : ''} ${step === 'practice' ? 'active' : ''}`}>
            <span>2</span>
            <em>Practicar</em>
          </div>
          <div className={`lesson-step ${stepIndex >= 3 ? 'done' : ''} ${step === 'production' ? 'active' : ''}`}>
            <span>3</span>
            <em>Producir</em>
          </div>
        </div>
      </header>

      {step === 'content' && (
        <div className="lesson-layout">
          <div className="lesson-content">
            <section className="panel tutor-panel lesson-tutor">
              <div className="tutor-head">
                <span className="tutor-avatar" aria-hidden="true">👨‍🏫</span>
                <div>
                  <span className="eyebrow">Tu profesor Fluenta</span>
                  <h2>{lesson.title}</h2>
                </div>
              </div>
              <p>
                Hoy trabajamos {lesson.objective.toLowerCase()}. Lee la regla, escucha los ejemplos y practica. Si te
                equivocas, te explico por qué y repetimos hasta que salga solo.
              </p>
            </section>

            <section className="lesson-block grammar-block">
              <div className="block-head">
                <span className="block-icon">
                  <Lightbulb size={18} />
                </span>
                <div>
                  <span className="eyebrow">La regla</span>
                  <h2>{lesson.grammar.title}</h2>
                </div>
              </div>
              <div className="grammar-formula">{lesson.grammar.formula}</div>
              <p className="grammar-explanation">{lesson.grammar.explanation}</p>
              <div className="example-list">
                {lesson.grammar.examples.map((example) => (
                  <div className="example-row" key={example}>
                    <span>{example}</span>
                    <AudioButton text={example} rate={state.settings.voiceRate} variant="small" />
                  </div>
                ))}
              </div>
            </section>

            <section className="lesson-block">
              <div className="block-head">
                <span className="block-icon">
                  <BookOpen size={18} />
                </span>
                <div>
                  <span className="eyebrow">Vocabulario</span>
                  <h2>Palabras que usarás</h2>
                </div>
              </div>
              <div className="vocab-grid">
                {lesson.vocab.map((item) => (
                  <div className="vocab-card" key={item.term}>
                    <div className="vocab-card-head">
                      <strong>{item.term}</strong>
                      <AudioButton text={`${item.term}. ${item.example}`} rate={state.settings.voiceRate} variant="small" />
                    </div>
                    <span>{item.es}</span>
                    <p>{item.example}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="lesson-block">
              <div className="block-head">
                <span className="block-icon">
                  <Volume2 size={18} />
                </span>
                <div>
                  <span className="eyebrow">Frases clave</span>
                  <h2>Así se dice en el trabajo</h2>
                </div>
              </div>
              <div className="phrase-list">
                {lesson.phrases.map((phrase) => (
                  <div className="phrase-row" key={phrase.en}>
                    <AudioButton text={phrase.en} rate={state.settings.voiceRate} variant="small" />
                    <div>
                      <strong>{phrase.en}</strong>
                      <span>{phrase.es}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="lesson-block dialogue-block">
              <div className="block-head">
                <span className="block-icon">
                  <Headphones size={18} />
                </span>
                <div>
                  <span className="eyebrow">En contexto</span>
                  <h2>Escucha la conversación</h2>
                </div>
              </div>
              <p className="dialogue-context">{lesson.dialogue.context}</p>
              <DialoguePlayer lines={lesson.dialogue.lines} rate={state.settings.voiceRate} />
              <div className="dialogue-lines">
                {lesson.dialogue.lines.map((line, index) => (
                  <div className="dialogue-line" key={index}>
                    <span className={`speaker-badge speaker-${index % 2}`}>{line.speaker}</span>
                    <p>{line.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lesson-aside">
            <div className="lesson-aside-card">
              <span className="eyebrow">En esta lección</span>
              <ul className="lesson-checklist">
                <li>
                  <Check size={14} /> {lesson.grammar.title}
                </li>
                <li>
                  <Check size={14} /> {lesson.vocab.length} palabras clave
                </li>
                <li>
                  <Check size={14} /> {lesson.phrases.length} frases profesionales
                </li>
                <li>
                  <Check size={14} /> Comprensión auditiva
                </li>
              </ul>
              <div className="lesson-task-preview">
                <span className="task-type">{lesson.task.kind === 'writing' ? <PenLine size={15} /> : <Mic size={15} />}</span>
                <div>
                  <strong>{lesson.task.kind === 'writing' ? 'Tarea de escritura' : 'Tarea de speaking'}</strong>
                  <p>{lesson.task.title}</p>
                </div>
              </div>
              <button type="button" className="btn btn-primary btn-block" onClick={() => setStep('practice')}>
                Empezar práctica <ArrowRight size={16} />
              </button>
              <small className="lesson-aside-note">5 ejercicios interactivos · sin límite de tiempo</small>
            </div>

            <div className="lesson-aside-tip">
              <Sparkles size={16} />
              <p>
                No memorices las frases de forma aislada. Léelas en voz alta y cámbialas por detalles de tu propio
                trabajo.
              </p>
            </div>
          </aside>
        </div>
      )}

      {step === 'practice' && exercise && (
        <div className="practice-wrap">
          <div className="practice-progress">
            <div className="practice-progress-head">
              <span>
                Ejercicio {exerciseIndex + 1} de {exercises.length}
              </span>
              <span>{feedback ? (feedback === 'correct' ? 'Correcto' : 'Revisado') : 'En curso'}</span>
            </div>
            <div className="practice-dots">
              {exercises.map((item, index) => (
                <span
                  key={item.id}
                  className={`practice-dot ${index < exerciseIndex ? 'done' : ''} ${index === exerciseIndex ? 'active' : ''} ${item.id === exercise.id && feedback === 'correct' ? 'correct' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="exercise-card">
            <div className="exercise-head">
              <span className="pill pill-lime">{exercise.label}</span>
              <span className="exercise-kind">{kindLabel(exercise.kind)}</span>
            </div>

            {exercise.kind === 'choice' && (
              <>
                <h2>{exercise.prompt}</h2>
                <div className="options">
                  {exercise.options.map((option, index) => (
                    <button
                      type="button"
                      key={option}
                      className={`option ${selectedOption === index ? 'selected' : ''} ${attempted && index === exercise.answer ? 'correct' : ''} ${attempted && selectedOption === index && index !== exercise.answer ? 'wrong' : ''}`}
                      onClick={() => answerChoice(exercise, index)}
                      disabled={attempted}
                    >
                      <span className="option-key">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                      {attempted && index === exercise.answer && <Check size={16} />}
                      {attempted && selectedOption === index && index !== exercise.answer && <X size={16} />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {exercise.kind === 'fill' && (
              <>
                <h2>{exercise.prompt}</h2>
                <div className="fill-sentence">
                  <span>{exercise.before}</span>
                  <input
                    value={fillValue}
                    onChange={(event) => setFillValue(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && answerFill(exercise)}
                    placeholder="…"
                    disabled={attempted}
                    autoFocus
                    spellCheck={false}
                  />
                  <span>{exercise.after}</span>
                </div>
                <p className="fill-hint">{exercise.hint}</p>
                {!attempted && (
                  <button type="button" className="btn btn-primary" onClick={() => answerFill(exercise)} disabled={!fillValue.trim()}>
                    Comprobar <Check size={16} />
                  </button>
                )}
              </>
            )}

            {exercise.kind === 'reorder' && (
              <>
                <h2>{exercise.prompt}</h2>
                <div className="reorder-answer">
                  {order.length === 0 && <span className="reorder-placeholder">Pulsa las palabras para construir la frase…</span>}
                  {order.map((tokenIndex, index) => (
                    <button
                      type="button"
                      key={`${tokenIndex}-${index}`}
                      className="reorder-chip selected"
                      onClick={() => !attempted && setOrder((current) => current.filter((_, i) => i !== index))}
                    >
                      {exercise.tokens[tokenIndex]}
                    </button>
                  ))}
                </div>
                <div className="reorder-bank">
                  {exercise.tokens.map((token, index) => (
                    <button
                      type="button"
                      key={`${token}-${index}`}
                      className="reorder-chip"
                      disabled={order.includes(index) || attempted}
                      onClick={() => setOrder((current) => [...current, index])}
                    >
                      {token}
                    </button>
                  ))}
                </div>
                {!attempted && (
                  <div className="exercise-actions">
                    <button type="button" className="text-btn" onClick={() => setOrder([])}>
                      <RotateCcw size={14} /> Reiniciar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => answerReorder(exercise)}
                      disabled={order.length !== exercise.tokens.length}
                    >
                      Comprobar <Check size={16} />
                    </button>
                  </div>
                )}
              </>
            )}

            {exercise.kind === 'listen' && (
              <>
                <div className="exercise-listen">
                  <AudioButton text={exercise.script} rate={state.settings.voiceRate} label="Reproducir audio" variant="solid" />
                  <Waveform />
                </div>
                <h2>{exercise.prompt}</h2>
                <div className="options">
                  {exercise.options.map((option, index) => (
                    <button
                      type="button"
                      key={option}
                      className={`option ${selectedOption === index ? 'selected' : ''} ${attempted && index === exercise.answer ? 'correct' : ''} ${attempted && selectedOption === index && index !== exercise.answer ? 'wrong' : ''}`}
                      onClick={() => answerChoice(exercise, index)}
                      disabled={attempted}
                    >
                      <span className="option-key">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {feedback && (
              <div className={`feedback ${feedback}`}>
                <span className="feedback-icon">{feedback === 'correct' ? <CircleCheck size={20} /> : <CircleX size={20} />}</span>
                <div>
                  <strong>{feedback === 'correct' ? 'Correcto' : 'Casi. Así se resuelve'}</strong>
                  <p>{exercise.explanation}</p>
                </div>
              </div>
            )}

            {attempted && (
              <button type="button" className="btn btn-primary exercise-next" onClick={nextExercise}>
                {exerciseIndex + 1 >= exercises.length ? 'Ver resultado' : 'Siguiente ejercicio'} <ArrowRight size={16} />
              </button>
            )}
          </div>

          <p className="practice-note">
            <Lightbulb size={14} /> Si fallas, la explicación importa más que la puntuación. Puedes repetir la práctica
            al terminar.
          </p>
        </div>
      )}

      {step === 'summary' && (
        <div className="practice-summary">
          <div className="summary-ring">
            <Trophy size={30} />
            <strong>{practiceScore}%</strong>
          </div>
          <span className="eyebrow">Práctica completada</span>
          <h1>
            {practiceScore >= 80 ? 'Sólido.' : practiceScore >= 50 ? 'Buena base.' : 'Esto es exactamente lo que toca practicar.'}
            <br />
            <em>Ahora llévalo a tu propio contexto.</em>
          </h1>
          <p>
            Has acertado {correctCount} de {exercises.length} ejercicios. La práctica no termina aquí: la tarea de
            producción es donde el inglés se vuelve tuyo.
          </p>
          <div className="summary-actions">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => setStep('production')}>
              Ir a la tarea de producción <ArrowRight size={18} />
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => {
                setExerciseIndex(0)
                setCorrectCount(0)
                resetInteraction()
                setStep('practice')
              }}
            >
              <RotateCcw size={16} /> Repetir práctica
            </button>
          </div>
        </div>
      )}

      {step === 'production' && (
        <div className="production-wrap">
          <div className="production-head">
            <span className="eyebrow">{lesson.task.kind === 'writing' ? 'Tarea de escritura' : 'Tarea de speaking'}</span>
            <h1>{lesson.task.title}</h1>
            <p>{lesson.task.prompt}</p>
          </div>

          <div className="production-grid">
            <div className="production-task">
              <div className="task-card">
                <div className="task-card-head">
                  <span className="task-type">{lesson.task.kind === 'writing' ? <PenLine size={16} /> : <Mic size={16} />}</span>
                  <span>{lesson.task.kind === 'writing' ? 'Escribe en inglés' : 'Habla en inglés'}</span>
                </div>
                <h2>Incluye estos puntos</h2>
                <ul className="task-points">
                  {lesson.task.points.map((point) => (
                    <li key={point}>
                      <Check size={14} /> {point}
                    </li>
                  ))}
                </ul>
                <div className="task-model-toggle">
                  <button type="button" className="text-btn" onClick={() => setShowModel((value) => !value)}>
                    {showModel ? 'Ocultar respuesta modelo' : 'Ver respuesta modelo'}
                  </button>
                </div>
                {showModel && (
                  <div className="task-model">
                    <span>Modelo</span>
                    <p>{lesson.task.model}</p>
                    <AudioButton text={lesson.task.model} rate={state.settings.voiceRate} label="Escuchar modelo" variant="ghost" />
                  </div>
                )}
              </div>
            </div>

            <div className="production-work">
              {lesson.task.kind === 'writing' ? (
                <div className="writing-task-card">
                  <div className="writing-editor-head">
                    <span>Tu respuesta</span>
                    <span>{writingText.trim() ? writingText.trim().split(/\s+/).filter(Boolean).length : 0} palabras</span>
                  </div>
                  <textarea
                    value={writingText}
                    onChange={(event) => setWritingText(event.target.value)}
                    rows={13}
                    placeholder="Write your answer in English…"
                    spellCheck={false}
                  />
                  <div className="writing-task-foot">
                    <span>Objetivo: {lesson.task.minWords} palabras</span>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={evaluateTask}
                      disabled={writingText.trim().split(/\s+/).filter(Boolean).length < Math.max(25, (lesson.task.minWords ?? 60) * 0.5)}
                    >
                      Corregir mi texto <Sparkles size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="speaking-task-card">
                  <div className="speaking-target">
                    <span>Tu objetivo</span>
                    <blockquote>{lesson.task.model}</blockquote>
                    <AudioButton text={lesson.task.model} rate={state.settings.voiceRate} label="Escuchar objetivo" variant="ghost" />
                  </div>
                  {recognitionSupported() ? (
                    <>
                      <button type="button" className={`record-btn ${listening ? 'listening' : ''}`} onClick={recordSpeech}>
                        <span className="record-icon">{listening ? <Square size={20} /> : <Mic size={22} />}</span>
                        <span>{listening ? 'Escuchando… pulsa para detener' : 'Grabar mi respuesta'}</span>
                        {listening && <span className="record-pulse" />}
                      </button>
                      {transcript && (
                        <div className="speech-result">
                          <div className="speech-result-head">
                            <span>Lo que se entendió</span>
                            {speechResult && <strong>{speechResult.score}% de coincidencia</strong>}
                          </div>
                          <p className="speech-transcript">“{transcript}”</p>
                          {speechResult && (
                            <div className="bar-track">
                              <div className="bar-fill" style={{ width: `${speechResult.score}%` }} />
                            </div>
                          )}
                          {speechResult && speechResult.missing.length > 0 && (
                            <p className="speech-missing">Repite con atención: {speechResult.missing.slice(0, 6).join(' · ')}</p>
                          )}
                        </div>
                      )}
                      <p className="recognition-note">
                        <MicOff size={14} /> El reconocimiento de voz usa el micrófono de tu navegador. Si no funciona,
                        puedes practicar en voz alta y marcar la tarea como hecha.
                      </p>
                    </>
                  ) : (
                    <div className="speech-unsupported">
                      <MicOff size={22} />
                      <p>Tu navegador no permite reconocimiento de voz. Lee el objetivo en voz alta tres veces y marca la tarea como practicada.</p>
                    </div>
                  )}
                  <button type="button" className="btn btn-outline" onClick={() => setTaskDone(true)}>
                    <Check size={15} /> Marcar como practicada
                  </button>
                </div>
              )}

              {evaluation && lesson.task.kind === 'writing' && (
                <div className="task-evaluation">
                  <div className="task-evaluation-head">
                    <div>
                      <span className="eyebrow">Corrección</span>
                      <h3>Nivel {evaluation.level} · {evaluation.wordCount} palabras</h3>
                    </div>
                    <div className="writing-score">
                      <strong>{evaluation.score}</strong>
                      <span>/100</span>
                    </div>
                  </div>
                  <div className="evaluation-bars">
                    {[
                      { label: 'Extensión', value: evaluation.criteria.length, max: 20 },
                      { label: 'Rango', value: evaluation.criteria.range, max: 20 },
                      { label: 'Precisión', value: evaluation.criteria.accuracy, max: 25 },
                      { label: 'Cohesión', value: evaluation.criteria.cohesion, max: 15 },
                      { label: 'Tarea', value: evaluation.criteria.task, max: 20 },
                    ].map((item) => (
                      <div className="criterion" key={item.label}>
                        <div className="criterion-head">
                          <span>{item.label}</span>
                          <span>{item.value}/{item.max}</span>
                        </div>
                        <div className="bar-track">
                          <div className="bar-fill" style={{ width: `${(item.value / item.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <ul className="feedback-list">
                    {evaluation.feedback.map((item) => (
                      <li key={item}>
                        <span className="feedback-dot" /> {item}
                      </li>
                    ))}
                  </ul>
                  {evaluation.issues.length > 0 && (
                    <div className="issue-list">
                      {evaluation.issues.map((issue, index) => (
                        <div className="issue" key={`${issue.original}-${index}`}>
                          <div className="issue-change">
                            <del>{issue.original}</del>
                            <ArrowRight size={13} />
                            <ins>{issue.suggestion}</ins>
                          </div>
                          <p>{issue.note}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="production-finish">
                <div>
                  <strong>{taskDone ? 'Tarea completada' : 'Cuando termines, cierra la lección'}</strong>
                  <span>Se guardará tu progreso y el vocabulario entrará en repaso espaciado.</span>
                </div>
                <button type="button" className="btn btn-primary btn-lg" onClick={finishLesson}>
                  Completar lección <Check size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'complete' && (
        <div className="lesson-complete">
          <div className="complete-burst">
            <span className="burst-ring" />
            <span className="burst-ring burst-ring-2" />
            <span className="complete-check">
              <Check size={38} />
            </span>
          </div>
          <span className="eyebrow">Lección completada</span>
          <h1>
            Un paso más cerca
            <br />
            <em>de decidir en inglés.</em>
          </h1>
          <p>
            Has ganado <strong>{50 + Math.round(practiceScore * 0.1) + (taskDone ? 20 : 0)} XP</strong> y añadido{' '}
            {lesson.vocab.length} palabras a tu repaso espaciado. La constancia es lo que convierte el conocimiento en
            fluidez.
          </p>
          <div className="complete-stats">
            <div>
              <strong>{practiceScore}%</strong>
              <span>práctica</span>
            </div>
            <div>
              <strong>{lesson.vocab.length}</strong>
              <span>palabras nuevas</span>
            </div>
            <div>
              <strong>{state.progress.streak}</strong>
              <span>días de racha</span>
            </div>
          </div>
          <div className="complete-actions">
            {nextLesson && nextLesson.id !== lesson.id && (
              <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate(`/app/lesson/${nextLesson.id}`)}>
                Siguiente lección <ArrowRight size={18} />
              </button>
            )}
            <Link to="/app" className="btn btn-outline btn-lg">
              Volver al panel
            </Link>
            <Link to="/app/practice" className="btn btn-outline btn-lg">
              <ListChecks size={16} /> Repasar vocabulario
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function kindLabel(kind: Exercise['kind']): string {
  const labels: Record<Exercise['kind'], string> = {
    choice: 'Comprensión y uso',
    fill: 'Producción escrita',
    reorder: 'Sintaxis',
    listen: 'Listening',
  }
  return labels[kind]
}
