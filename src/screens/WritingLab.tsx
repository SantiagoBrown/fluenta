import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Eye,
  FileText,
  PenLine,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react'
import { useApp } from '../store'
import { writingPrompts } from '../data/placement'
import { evaluateWriting, promptOptions } from '../lib/writing'
import { formatDate, levelNum } from '../lib/levels'
import type { WritingEvaluation, WritingSubmission } from '../types'
import { AudioButton, LevelChip, Tag } from '../components/ui'

export default function WritingLab() {
  const { state, submitWriting } = useApp()
  const result = state.placement!
  const closest = useMemo(
    () =>
      [...writingPrompts].sort(
        (a, b) => Math.abs(levelNum[a.level] - levelNum[result.overall]) - Math.abs(levelNum[b.level] - levelNum[result.overall]),
      )[0],
    [result.overall],
  )
  const [promptId, setPromptId] = useState(closest.id)
  const [text, setText] = useState('')
  const [evaluation, setEvaluation] = useState<WritingEvaluation | null>(null)
  const [showModel, setShowModel] = useState(false)
  const [viewing, setViewing] = useState<WritingSubmission | null>(null)
  const [justSaved, setJustSaved] = useState(false)

  const prompt = writingPrompts.find((item) => item.id === promptId) ?? writingPrompts[0]
  const submissions = state.progress.writingSubmissions
  const average = submissions.length
    ? Math.round(submissions.reduce((sum, submission) => sum + submission.evaluation.score, 0) / submissions.length)
    : 0
  const best = submissions.length ? Math.max(...submissions.map((submission) => submission.evaluation.score)) : 0
  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0

  const selectPrompt = (id: string) => {
    setPromptId(id)
    setText('')
    setEvaluation(null)
    setShowModel(false)
    setJustSaved(false)
  }

  const evaluate = () => {
    const evalResult = evaluateWriting(text, promptOptions(prompt))
    setEvaluation(evalResult)
    submitWriting({
      promptId: prompt.id,
      title: prompt.title,
      text,
      evaluation: evalResult,
      source: 'lab',
    })
    setJustSaved(true)
  }

  return (
    <div className="writing-page">
      <header className="page-head">
        <div>
          <span className="eyebrow">
            <PenLine size={14} /> Writing Lab
          </span>
          <h1>
            Escribe como
            <br />
            <em>se escribe en tu trabajo.</em>
          </h1>
          <p>
            Cuatro tareas reales, corrección por criterios y errores explicados. No es un corrector ortográfico: es
            un entrenador de escritura profesional.
          </p>
        </div>
        <div className="writing-stats">
          <div>
            <strong>{submissions.length}</strong>
            <span>textos</span>
          </div>
          <div>
            <strong>{average}</strong>
            <span>media /100</span>
          </div>
          <div>
            <strong>{best}</strong>
            <span>mejor</span>
          </div>
        </div>
      </header>

      <div className="writing-layout">
        <aside className="prompt-list">
          <span className="eyebrow">Elige una tarea</span>
          {writingPrompts.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`prompt-item ${promptId === item.id ? 'selected' : ''}`}
              onClick={() => selectPrompt(item.id)}
            >
              <div className="prompt-item-top">
                <LevelChip level={item.level} subtle />
                <span>{item.minWords}–{item.maxWords} palabras</span>
              </div>
              <strong>{item.title}</strong>
              <span className="prompt-item-situation">{item.situation.slice(0, 80)}…</span>
              <span className="prompt-item-arrow">
                <ArrowRight size={14} />
              </span>
            </button>
          ))}
          <div className="prompt-tip">
            <Target size={16} />
            <p>
              Empieza por una tarea de tu nivel. Si te resulta fácil, sube una: la corrección se calibra con el nivel
              de la tarea.
            </p>
          </div>
        </aside>

        <div className="writing-work">
          <div className="writing-brief">
            <div className="writing-brief-head">
              <div>
                <span className="eyebrow">La tarea</span>
                <h2>{prompt.title}</h2>
              </div>
              <Tag tone="lime">{prompt.level}</Tag>
            </div>
            <p className="writing-situation">{prompt.situation}</p>
            <div className="writing-instruction">
              <span>Qué debes hacer</span>
              <p>{prompt.task}</p>
            </div>
            <div className="writing-brief-grid">
              <div>
                <span className="result-summary-label">Incluye</span>
                <ul className="writing-points">
                  {prompt.points.map((point) => (
                    <li key={point}>
                      <Check size={13} /> {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="result-summary-label">Extensión</span>
                <div className="writing-length">
                  <strong>{prompt.minWords}–{prompt.maxWords}</strong>
                  <span>palabras</span>
                </div>
                <span className="writing-length-hint">
                  <Clock3 size={13} /> 15–20 min
                </span>
              </div>
            </div>
          </div>

          <div className="writing-editor">
            <div className="writing-editor-head">
              <span>
                <FileText size={15} /> Tu texto
              </span>
              <span className={wordCount < Math.round(prompt.minWords * 0.5) ? 'wordcount-low' : ''}>{wordCount} palabras</span>
            </div>
            <textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value)
                setJustSaved(false)
              }}
              placeholder="Start writing in English…"
              rows={16}
              spellCheck={false}
            />
            <div className="writing-editor-toolbar">
              <div>
                <span className="editor-hint">
                  {wordCount === 0
                    ? 'Escribe sin traductor. La corrección mide tu inglés real.'
                    : wordCount < prompt.minWords
                      ? `Te faltan ${prompt.minWords - wordCount} palabras para el objetivo.`
                      : 'Extensión dentro del objetivo.'}
                </span>
              </div>
              <div className="editor-actions">
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => {
                    setText('')
                    setEvaluation(null)
                    setShowModel(false)
                    setJustSaved(false)
                  }}
                >
                  <RotateCcw size={14} /> Limpiar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={evaluate}
                  disabled={wordCount < Math.max(30, Math.round(prompt.minWords * 0.5))}
                >
                  <Sparkles size={16} /> Corregir mi texto
                </button>
              </div>
            </div>
          </div>

          {evaluation && (
            <div className="writing-eval">
              <div className="writing-eval-head">
                <div>
                  <span className="eyebrow">Corrección Fluenta</span>
                  <h2>
                    Nivel {evaluation.level} · {evaluation.wordCount} palabras
                  </h2>
                  {justSaved && <span className="saved-note"><Check size={13} /> Guardado en tu historial</span>}
                </div>
                <div className="writing-score-big">
                  <strong>{evaluation.score}</strong>
                  <span>/100</span>
                  <em>{evaluation.level}</em>
                </div>
              </div>

              <div className="writing-eval-grid">
                <div className="writing-criteria">
                  {[
                    { label: 'Extensión y desarrollo', value: evaluation.criteria.length, max: 20 },
                    { label: 'Rango léxico', value: evaluation.criteria.range, max: 20 },
                    { label: 'Precisión gramatical', value: evaluation.criteria.accuracy, max: 25 },
                    { label: 'Cohesión y estructura', value: evaluation.criteria.cohesion, max: 15 },
                    { label: 'Adecuación a la tarea', value: evaluation.criteria.task, max: 20 },
                  ].map((criterion) => (
                    <div className="criterion" key={criterion.label}>
                      <div className="criterion-head">
                        <span>{criterion.label}</span>
                        <span>{criterion.value}/{criterion.max}</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${(criterion.value / criterion.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="writing-eval-feedback">
                  <span className="result-summary-label">Feedback</span>
                  <ul className="feedback-list">
                    {evaluation.feedback.map((item) => (
                      <li key={item}>
                        <span className="feedback-dot" /> {item}
                      </li>
                    ))}
                  </ul>
                  {evaluation.highlights.length > 0 && (
                    <>
                      <span className="result-summary-label">Puntos fuertes</span>
                      <ul className="highlight-list">
                        {evaluation.highlights.map((item) => (
                          <li key={item}>
                            <Check size={13} /> {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {evaluation.issues.length > 0 && (
                <div className="eval-issues">
                  <span className="result-summary-label">Correcciones concretas</span>
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
                </div>
              )}

              <div className="writing-model-wrap">
                <button type="button" className="text-btn" onClick={() => setShowModel((value) => !value)}>
                  {showModel ? 'Ocultar respuesta modelo' : 'Ver respuesta modelo'}
                  <ChevronDown size={15} className={showModel ? 'rotated' : ''} />
                </button>
                {showModel && (
                  <div className="writing-model">
                    <div className="writing-model-head">
                      <span>Respuesta modelo · {prompt.level}</span>
                      <AudioButton text={prompt.model} rate={state.settings.voiceRate} label="Escuchar" variant="small" />
                    </div>
                    <p>{prompt.model}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="writing-history">
        <div className="section-head">
          <div>
            <span className="eyebrow">Historial</span>
            <h2>Tus textos y su evolución</h2>
            <p>La escritura mejora cuando vuelves a los errores. Cada entrega queda registrada con su rúbrica.</p>
          </div>
          <div className="history-trend">
            <TrendingUp size={16} />
            <span>{submissions.length >= 2 ? 'Revisa tu progreso entre entregas' : 'Tu primera entrega inicia la curva'}</span>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="history-empty">
            <FileText size={24} />
            <h3>Aún no has entregado ningún texto</h3>
            <p>Elige una tarea arriba y escribe. La primera corrección es el punto de partida.</p>
          </div>
        ) : (
          <div className="history-list">
            {submissions.map((submission) => (
              <div className="history-row" key={submission.id}>
                <span className="history-icon">
                  <FileText size={16} />
                </span>
                <div className="history-main">
                  <strong>{submission.title}</strong>
                  <span>
                    {formatDate(new Date(submission.createdAt))} · {submission.evaluation.wordCount} palabras ·{' '}
                    {submission.source === 'placement' ? 'Test de nivel' : submission.source === 'lesson' ? 'Lección' : 'Writing Lab'}
                  </span>
                </div>
                <div className="history-score">
                  <LevelChip level={submission.evaluation.level} subtle />
                  <strong>{submission.evaluation.score}</strong>
                  <span>/100</span>
                </div>
                <button type="button" className="icon-btn" onClick={() => setViewing(submission)} aria-label="Ver texto">
                  <Eye size={17} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {viewing && (
        <div className="modal-backdrop" onClick={() => setViewing(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">Entrega · {formatDate(new Date(viewing.createdAt))}</span>
                <h2>{viewing.title}</h2>
              </div>
              <button type="button" className="icon-btn" onClick={() => setViewing(null)} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
            <div className="modal-score-row">
              <LevelChip level={viewing.evaluation.level} />
              <strong>{viewing.evaluation.score}/100</strong>
              <span>{viewing.evaluation.wordCount} palabras</span>
            </div>
            <div className="modal-text">
              {viewing.text.split('\n').map((paragraph, index) =>
                paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
              )}
            </div>
            <div className="modal-feedback">
              <span className="result-summary-label">Feedback</span>
              <ul className="feedback-list">
                {viewing.evaluation.feedback.map((item) => (
                  <li key={item}>
                    <span className="feedback-dot" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            {viewing.evaluation.issues.length > 0 && (
              <div className="modal-feedback">
                <span className="result-summary-label">Correcciones</span>
                {viewing.evaluation.issues.map((issue, index) => (
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
        </div>
      )}
    </div>
  )
}
