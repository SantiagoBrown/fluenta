import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Headphones,
  Info,
  Loader2,
  PenLine,
  Play,
  Sparkles,
  Timer,
  Volume2,
  X,
} from 'lucide-react'
import { useApp } from '../store'
import {
  answerQuestion,
  buildPlacementResult,
  createTest,
  nextQuestion,
  pickListeningClip,
  pickReadingPassage,
  pickWritingPrompt,
} from '../lib/adaptive'
import type { AdaptiveState } from '../lib/adaptive'
import { listeningClips, readingPassages, writingPrompts } from '../data/placement'
import { evaluateWriting, promptOptions } from '../lib/writing'
import { speak, stopSpeech } from '../lib/speech'
import type { ListeningClip, PlacementQuestion, ReadingPassage, WritingPrompt } from '../types'
import { DialoguePlayer } from '../components/Audio'
import { AudioButton, Logo, Tag } from '../components/ui'

type Phase = 'intro' | 'grammar' | 'reading' | 'listening' | 'writing' | 'evaluating'

const sectionIndex: Record<Phase, number> = {
  intro: 0,
  grammar: 1,
  reading: 2,
  listening: 3,
  writing: 4,
  evaluating: 4,
}

const sectionNames = ['Adaptativo', 'Lectura', 'Escucha', 'Escritura']

export default function Placement() {
  const { state, savePlacement } = useApp()
  const navigate = useNavigate()
  const rate = state.settings.voiceRate

  const [phase, setPhase] = useState<Phase>('intro')
  const [test, setTest] = useState<AdaptiveState>(() => createTest())
  const [current, setCurrent] = useState<PlacementQuestion | null>(() => nextQuestion(createTest()))
  const [selected, setSelected] = useState<number | null>(null)
  const [passage, setPassage] = useState<ReadingPassage | null>(null)
  const [clip, setClip] = useState<ListeningClip | null>(null)
  const [prompt, setPrompt] = useState<WritingPrompt | null>(null)
  const [readingStarted, setReadingStarted] = useState(false)
  const [readingIndex, setReadingIndex] = useState(0)
  const [readingChoice, setReadingChoice] = useState<number | null>(null)
  const [readingAnswers, setReadingAnswers] = useState<number[]>([])
  const [readingCorrect, setReadingCorrect] = useState(0)
  const [listeningStarted, setListeningStarted] = useState(false)
  const [listeningIndex, setListeningIndex] = useState(0)
  const [listeningChoice, setListeningChoice] = useState<number | null>(null)
  const [listeningAnswers, setListeningAnswers] = useState<number[]>([])
  const [listeningCorrect, setListeningCorrect] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)
  const [writingText, setWritingText] = useState('')
  const [evaluatingStep, setEvaluatingStep] = useState(0)
  const timeout = useRef<number | null>(null)

  useEffect(() => () => {
    stopSpeech()
    if (timeout.current) window.clearTimeout(timeout.current)
  }, [])

  const start = () => {
    setPhase('grammar')
  }

  const choose = useCallback(
    (index: number) => {
      if (!current || selected !== null) return
      setSelected(index)
      const nextTest = answerQuestion(test, current, index)
      setTest(nextTest)
      timeout.current = window.setTimeout(() => {
        const following = nextQuestion(nextTest)
        if (following) {
          setCurrent(following)
          setSelected(null)
        } else {
          const ability = nextTest.grammarTheta * 0.6 + nextTest.vocabTheta * 0.4
          setPassage(pickReadingPassage(readingPassages, ability))
          setClip(pickListeningClip(listeningClips, ability))
          setPrompt(pickWritingPrompt(writingPrompts, ability))
          setCurrent(null)
          setPhase('reading')
          setReadingStarted(false)
        }
      }, 380)
    },
    [current, selected, test],
  )

  useEffect(() => {
    if (phase !== 'grammar' || selected !== null) return
    const handler = (event: KeyboardEvent) => {
      const index = ['1', '2', '3', '4', 'a', 'b', 'c', 'd'].indexOf(event.key.toLowerCase())
      if (index >= 0 && current) {
        const optionIndex = index >= 4 ? index - 4 : index
        if (optionIndex < current.options.length) choose(optionIndex)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, selected, current, choose])

  const advanceReading = () => {
    if (!passage || readingChoice === null) return
    const answers = [...readingAnswers, readingChoice]
    setReadingAnswers(answers)
    setReadingChoice(null)
    if (readingIndex + 1 >= passage.questions.length) {
      const correct = passage.questions.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0)
      setReadingCorrect(correct)
      setPhase('listening')
      setListeningStarted(false)
    } else {
      setReadingIndex((index) => index + 1)
    }
  }

  const advanceListening = () => {
    if (!clip || listeningChoice === null) return
    const answers = [...listeningAnswers, listeningChoice]
    setListeningAnswers(answers)
    setListeningChoice(null)
    setShowTranscript(false)
    if (listeningIndex + 1 >= clip.questions.length) {
      const correct = clip.questions.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0)
      setListeningCorrect(correct)
      setPhase('writing')
    } else {
      setListeningIndex((index) => index + 1)
    }
  }

  const submitWriting = () => {
    if (!passage || !clip || !prompt) return
    const evaluation = evaluateWriting(writingText, promptOptions(prompt))
    const result = buildPlacementResult({
      test,
      passage,
      readingCorrect,
      readingTotal: passage.questions.length,
      clip,
      listeningCorrect,
      listeningTotal: clip.questions.length,
      prompt,
      writingText,
      writing: evaluation,
    })
    savePlacement(result)
    setPhase('evaluating')
    let step = 0
    const interval = window.setInterval(() => {
      step += 1
      setEvaluatingStep(step)
      if (step >= 3) window.clearInterval(interval)
    }, 520)
    timeout.current = window.setTimeout(() => {
      window.clearInterval(interval)
      navigate('/results')
    }, 2100)
  }

  const answered = test.answers.length
  const section = sectionIndex[phase]
  const progress =
    phase === 'intro'
      ? 2
      : phase === 'grammar'
        ? 4 + (answered / 16) * 38
        : phase === 'reading'
          ? 42 + (readingAnswers.length / 4) * 22
          : phase === 'listening'
            ? 64 + (listeningAnswers.length / 4) * 20
            : phase === 'writing'
              ? 84
              : 100

  return (
    <div className="test-page">
      <header className="test-nav">
        <Link to="/" className="brand-link">
          <Logo />
        </Link>
        <div className="test-nav-center">
          <span>Test de nivel</span>
          <div className="test-nav-progress">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Link to={state.placement ? '/app' : '/'} className="test-exit">
          <X size={16} /> Salir
        </Link>
      </header>

      <div className="test-steps" aria-label="Progreso del test">
        {sectionNames.map((name, index) => (
          <div className={`test-step ${section === index + 1 ? 'active' : ''} ${section > index + 1 ? 'done' : ''}`} key={name}>
            <span>{section > index + 1 ? <Check size={12} /> : index + 1}</span>
            <em>{name}</em>
          </div>
        ))}
      </div>

      <main className="test-main">
        {phase === 'intro' && (
          <div className="test-intro">
            <span className="eyebrow">
              <Sparkles size={14} /> Diagnóstico adaptativo
            </span>
            <h1>
              Vamos a medir tu inglés
              <br />
              <em>como se usa en el trabajo.</em>
            </h1>
            <p className="test-intro-lead">
              Empezamos por lo mas facil y subimos segun tus respuestas. Si aciertas, el nivel sube; si fallas, baja
              para encontrar tu punto real. Responde con honestidad, sin traductor. Al final veras tu porcentaje por
              habilidad y los temas que necesitas reforzar.
            </p>

            <div className="test-intro-grid">
              <div className="intro-item">
                <span className="test-row-icon">
                  <BrainIcon />
                </span>
                <div>
                  <strong>16 preguntas adaptativas</strong>
                  <span>Gramática y vocabulario profesional</span>
                </div>
                <em>≈ 6 min</em>
              </div>
              <div className="intro-item">
                <span className="test-row-icon">
                  <BookOpen size={18} />
                </span>
                <div>
                  <strong>Un texto y un audio</strong>
                  <span>Nivel ajustado a tus respuestas</span>
                </div>
                <em>≈ 8 min</em>
              </div>
              <div className="intro-item">
                <span className="test-row-icon">
                  <PenLine size={18} />
                </span>
                <div>
                  <strong>Una tarea de escritura</strong>
                  <span>Corrección por criterios, no por IA opaca</span>
                </div>
                <em>≈ 5 min</em>
              </div>
            </div>

            <div className="test-audio-check">
              <Volume2 size={18} />
              <div>
                <strong>Comprueba tu audio</strong>
                <span>El listening usa la voz del navegador. Asegúrate de que suena.</span>
              </div>
              <AudioButton
                text="Welcome to Fluenta. This is a short audio check. You will hear a conversation and answer four questions."
                rate={rate}
                label="Probar audio"
                variant="solid"
              />
            </div>

            <div className="test-rules">
              <span>
                <Info size={15} /> No verás si aciertas durante el test.
              </span>
              <span>
                <Timer size={15} /> No hay límite de tiempo, pero no uses traductores.
              </span>
              <span>
                <Headphones size={15} /> Puedes repetir el audio.
              </span>
            </div>

            <button type="button" className="btn btn-primary btn-lg" onClick={start}>
              Empezar el test
              <ArrowRight size={18} />
            </button>
            <p className="test-intro-foot">Sección 1 de 4 · Adaptativo</p>
          </div>
        )}

        {phase === 'grammar' && current && (
          <div className="question-wrap">
            <div className="question-meta">
              <span className="pill pill-lime">
                {current.skill === 'grammar' ? 'Gramática' : 'Vocabulario'}
              </span>
              <span className="question-count">
                Pregunta {answered + 1} de 16
              </span>
              <span className="question-level">Dificultad estimada: {current.level}</span>
            </div>
            <div className="question-card">
              <h2>{current.prompt}</h2>
              <div className="options">
                {current.options.map((option, index) => (
                  <button
                    type="button"
                    key={option}
                    className={`option ${selected === index ? 'selected' : ''}`}
                    onClick={() => choose(index)}
                  >
                    <span className="option-key">{String.fromCharCode(65 + index)}</span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="question-foot">
              <span>Usa las teclas 1–4 o A–D</span>
              <span className="adaptive-note">La dificultad se ajusta en tiempo real</span>
            </div>
          </div>
        )}

        {phase === 'reading' && passage && !readingStarted && (
          <SectionIntro
            icon={<BookOpen size={24} />}
            eyebrow="Sección 2 · Comprensión lectora"
            title="Lee como lo harías en el trabajo."
            text="Vas a leer un texto profesional y responder cuatro preguntas. No necesitas entender cada palabra: identifica la idea principal, los detalles y la intención."
            meta={`Texto estimado: ${passage.level} · ${passage.kind}`}
            onStart={() => setReadingStarted(true)}
            startLabel="Empezar lectura"
          />
        )}

        {phase === 'reading' && passage && readingStarted && (
          <div className="reading-layout">
            <article className="passage-card">
              <div className="passage-head">
                <Tag tone="lime">{passage.level}</Tag>
                <span>{passage.kind}</span>
              </div>
              <h2>{passage.title}</h2>
              <div className="passage-text">
                {passage.text.split('\n').map((paragraph, index) =>
                  paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
                )}
              </div>
            </article>
            <div className="reading-question">
              <div className="question-meta">
                <span className="pill pill-lime">Pregunta {readingIndex + 1} de {passage.questions.length}</span>
                <span className="question-level">Comprensión lectora</span>
              </div>
              <div className="question-card question-card-compact">
                <h2>{passage.questions[readingIndex].prompt}</h2>
                <div className="options">
                  {passage.questions[readingIndex].options.map((option, index) => (
                    <button
                      type="button"
                      key={option}
                      className={`option ${readingChoice === index ? 'selected' : ''}`}
                      onClick={() => setReadingChoice(index)}
                    >
                      <span className="option-key">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" className="btn btn-primary" onClick={advanceReading} disabled={readingChoice === null}>
                {readingIndex + 1 === passage.questions.length ? 'Continuar al audio' : 'Siguiente pregunta'}
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {phase === 'listening' && clip && !listeningStarted && (
          <SectionIntro
            icon={<Headphones size={24} />}
            eyebrow="Sección 3 · Comprensión auditiva"
            title="Escucha una conversación real."
            text="Escucharás una conversación breve relacionada con el trabajo. Puedes repetirla tantas veces como necesites. Después responderás cuatro preguntas."
            meta={`Audio estimado: ${clip.level} · ${clip.context}`}
            onStart={() => setListeningStarted(true)}
            startLabel="Empezar escucha"
          />
        )}

        {phase === 'listening' && clip && listeningStarted && (
          <div className="listening-wrap">
            <div className="listening-card">
              <div className="listening-head">
                <Tag tone="lime">{clip.level}</Tag>
                <span>{clip.context}</span>
              </div>
              <h2>{clip.title}</h2>
              <DialoguePlayer lines={clip.lines} rate={rate} label="Reproducir conversación" />
              <div className="listening-tools">
                <button type="button" className="text-btn" onClick={() => setShowTranscript((value) => !value)}>
                  {showTranscript ? 'Ocultar transcripción' : 'No puedo escuchar: ver transcripción'}
                </button>
                <span>Puedes repetir el audio antes de responder</span>
              </div>
              {showTranscript && (
                <div className="transcript">
                  {clip.lines.map((line, index) => (
                    <p key={index}>
                      <strong>{line.speaker}:</strong> {line.text}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="listening-question">
              <div className="question-meta">
                <span className="pill pill-lime">Pregunta {listeningIndex + 1} de {clip.questions.length}</span>
                <span className="question-level">Comprensión auditiva</span>
              </div>
              <div className="question-card question-card-compact">
                <h2>{clip.questions[listeningIndex].prompt}</h2>
                <div className="options">
                  {clip.questions[listeningIndex].options.map((option, index) => (
                    <button
                      type="button"
                      key={option}
                      className={`option ${listeningChoice === index ? 'selected' : ''}`}
                      onClick={() => setListeningChoice(index)}
                    >
                      <span className="option-key">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" className="btn btn-primary" onClick={advanceListening} disabled={listeningChoice === null}>
                {listeningIndex + 1 === clip.questions.length ? 'Continuar a escritura' : 'Siguiente pregunta'}
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {phase === 'writing' && prompt && (
          <div className="writing-test">
            <div className="writing-test-head">
              <span className="eyebrow">Sección 4 · Escritura</span>
              <h1>
                Una tarea breve.
                <br />
                <em>Tu inglés real, sin traductor.</em>
              </h1>
              <p>
                Escribe directamente en inglés. No buscamos perfección: buscamos ver cómo organizas ideas, qué
                vocabulario movilizas y qué errores aparecen cuando escribes con naturalidad.
              </p>
            </div>

            <div className="writing-test-grid">
              <div className="writing-prompt-card">
                <div className="writing-prompt-head">
                  <Tag tone="lime">{prompt.level}</Tag>
                  <span>
                    {prompt.minWords}–{prompt.maxWords} palabras
                  </span>
                </div>
                <h2>{prompt.title}</h2>
                <p className="prompt-situation">{prompt.situation}</p>
                <div className="prompt-task">
                  <span>Tu tarea</span>
                  <p>{prompt.task}</p>
                </div>
                <div className="prompt-points">
                  <span>Incluye estos puntos</span>
                  <ul>
                    {prompt.points.map((point) => (
                      <li key={point}>
                        <Check size={14} /> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="writing-editor-card">
                <div className="writing-editor-head">
                  <span>Tu respuesta</span>
                  <span className={writingText.trim().split(/\s+/).filter(Boolean).length < 30 ? 'wordcount-low' : ''}>
                    {writingText.trim() ? writingText.trim().split(/\s+/).filter(Boolean).length : 0} palabras
                  </span>
                </div>
                <textarea
                  value={writingText}
                  onChange={(event) => setWritingText(event.target.value)}
                  placeholder="Start writing here…"
                  spellCheck={false}
                  rows={14}
                />
                <div className="writing-editor-foot">
                  <span>Mínimo recomendado: {Math.round(prompt.minWords * 0.6)} palabras para enviar</span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitWriting}
                    disabled={writingText.trim().split(/\s+/).filter(Boolean).length < Math.round(prompt.minWords * 0.5)}
                  >
                    Enviar y ver resultado
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {phase === 'evaluating' && (
          <div className="evaluating">
            <div className="evaluating-orbit">
              <Loader2 size={36} className="spin" />
            </div>
            <span className="eyebrow">Construyendo tu diagnóstico</span>
            <h1>
              Analizando tus respuestas
              <br />
              <em>y trazando tu ruta.</em>
            </h1>
            <div className="evaluating-steps">
              {['Midiendo gramática y vocabulario', 'Calculando comprensión lectora y auditiva', 'Evaluando escritura y generando el plan'].map(
                (label, index) => (
                  <div className={`evaluating-step ${evaluatingStep >= index ? 'done' : ''}`} key={label}>
                    {evaluatingStep > index ? <Check size={14} /> : <span className="dot" />}
                    <span>{label}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function BrainIcon() {
  return <Sparkles size={18} />
}

function SectionIntro({
  icon,
  eyebrow,
  title,
  text,
  meta,
  onStart,
  startLabel,
}: {
  icon: ReactNode
  eyebrow: string
  title: string
  text: string
  meta: string
  onStart: () => void
  startLabel: string
}) {
  return (
    <div className="section-intro">
      <span className="section-intro-icon">{icon}</span>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
      <div className="section-intro-meta">
        <Info size={15} /> {meta}
      </div>
      <div className="section-intro-tips">
        <span>
          <Timer size={15} /> Sin prisa: el tiempo no cuenta para el resultado.
        </span>
        <span>
          <Play size={15} /> Puedes repetir el audio.
        </span>
        <span>
          <ChevronRight size={15} /> Responde sin traducir palabra por palabra.
        </span>
      </div>
      <button type="button" className="btn btn-primary btn-lg" onClick={onStart}>
        {startLabel}
        <ArrowRight size={18} />
      </button>
    </div>
  )
}
