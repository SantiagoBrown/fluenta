import type { CEFR, WritingEvaluation, WritingIssue, WritingPrompt } from '../types'
import { levelWordBank } from '../data/placement'
import { clamp, levelFromScore, nextLevel, scoreFromLevel } from './levels'

interface EvaluateOptions {
  minWords?: number
  maxWords?: number
  promptLevel?: CEFR
  promptId?: string
}

interface RubricPoint {
  label: string
  keywords: string[]
}

const rubrics: Record<string, RubricPoint[]> = {
  'w-a2': [
    { label: 'una disculpa', keywords: ['apolog', 'sorry', 'apologies'] },
    { label: 'un nuevo día y hora', keywords: ['thursday', 'jueves', 'reschedule', 'move', 'new time', '10'] },
    { label: 'un motivo breve', keywords: ['because', 'due to', 'unfortunately', 'cannot', 'can’t', "can't", 'unable', 'conflict'] },
    { label: 'lo que enviarás antes', keywords: ['send', 'attach', 'proposal', 'agenda', 'prepare', 'before'] },
  ],
  'w-b1': [
    { label: 'progreso desde la última semana', keywords: ['progress', 'completed', 'finished', 'since last week', 'this week'] },
    { label: 'un bloqueo concreto', keywords: ['blocker', 'blocked', 'delay', 'waiting', 'issue', 'not confirmed'] },
    { label: 'qué necesitas o propones', keywords: ['need', 'propose', 'suggest', 'recommend', 'support', 'help'] },
    { label: 'una fecha para el próximo update', keywords: ['monday', 'friday', 'next week', 'by ', 'update on', 'deadline'] },
  ],
  'w-b2': [
    { label: 'el problema y su coste', keywords: ['problem', 'hours', 'cost', 'time', 'spend', 'meeting'] },
    { label: 'una recomendación clara', keywords: ['recommend', 'propose', 'suggest', 'replace', 'instead'] },
    { label: 'impacto esperado', keywords: ['impact', 'reduce', 'increase', 'improv', 'expect', 'result'] },
    { label: 'un riesgo y su mitigación', keywords: ['risk', 'mitigat', 'concern', 'review', 'trial', 'pilot'] },
  ],
  'w-c1': [
    { label: 'reconocimiento de la preocupación', keywords: ['thank', 'appreciate', 'understand', 'share your concern', 'fair point'] },
    { label: 'defensa del alcance con evidencia', keywords: ['data', 'pilot', 'evidence', 'showed', 'percent', '%', 'research'] },
    { label: 'una alternativa concreta', keywords: ['alternative', 'suggest', 'propose', 'phase', 'option', 'instead'] },
    { label: 'quién decide y cuándo', keywords: ['decide', 'decision', 'review', 'council', 'by ', 'thursday', 'friday'] },
  ],
}

const errorRules: { pattern: RegExp; replacement: string; note: string }[] = [
  { pattern: /\bI am agree\b/gi, replacement: 'I agree', note: '“Agree” es un verbo: se dice “I agree”, no “I am agree”.' },
  { pattern: /\bpeople is\b/gi, replacement: 'people are', note: '“People” es plural en inglés: people are.' },
  { pattern: /\binformations\b/gi, replacement: 'information', note: '“Information” es incontable y no lleva plural.' },
  { pattern: /\badvices\b/gi, replacement: 'advice', note: '“Advice” es incontable: no se dice “advices”.' },
  { pattern: /\bfeedbacks\b/gi, replacement: 'feedback', note: '“Feedback” es incontable en inglés.' },
  { pattern: /\bequipments\b/gi, replacement: 'equipment', note: '“Equipment” es incontable.' },
  { pattern: /\bpeoples\b/gi, replacement: 'people', note: 'El plural de “person” es “people”, no “peoples”.' },
  { pattern: /\bI have (\d+) years\b(?! of)/gi, replacement: 'I am $1 years old', note: 'La edad se expresa con “be”: I am 30 years old.' },
  { pattern: /\bI have (\d+) years old\b/gi, replacement: 'I am $1 years old', note: 'Para la edad usamos “I am … years old”.' },
  { pattern: /\b(he|she|it) don['’]?t\b/gi, replacement: '$1 doesn’t', note: 'Con he/she/it el auxiliar negativo es “doesn’t”.' },
  { pattern: /\bdidn['’]?t (went|saw|had|took|made|gave|wrote)\b/gi, replacement: 'didn’t go', note: 'Tras “didn’t” el verbo va en forma base, no en pasado.' },
  { pattern: /\bmore (better|easier|worse|cheaper)\b/gi, replacement: '$1', note: 'No se combina “more” con un comparativo irregular.' },
  { pattern: /\bexplain me\b/gi, replacement: 'explain to me', note: 'La estructura es “explain something to someone”.' },
  { pattern: /\bmake a question\b/gi, replacement: 'ask a question', note: 'En inglés se “asks a question”, no se “makes a question”.' },
  { pattern: /\bassist to\b/gi, replacement: 'attend', note: 'Para asistir a un evento se usa “attend”, no “assist to”.' },
  { pattern: /\bI['’]?m boring\b/gi, replacement: 'I’m bored', note: '“Boring” describe algo aburrido; “bored” describe cómo te sientes.' },
  { pattern: /\bdepend of\b/gi, replacement: 'depend on', note: 'La colocación es “depend on”.' },
  { pattern: /\bI will can\b/gi, replacement: 'I will be able to', note: 'No se combinan dos modales; usa “will be able to”.' },
  { pattern: /\bmust to\b/gi, replacement: 'must', note: '“Must” va seguido directamente del verbo base.' },
  { pattern: /\bcan to\b/gi, replacement: 'can', note: '“Can” va seguido del verbo base, sin “to”.' },
  { pattern: /\bdespite of\b/gi, replacement: 'despite', note: '“Despite” no lleva “of”.' },
  { pattern: /\bdiscuss about\b/gi, replacement: 'discuss', note: '“Discuss” es transitivo: discuss the plan.' },
  { pattern: /\bI['’]?m interesting in\b/gi, replacement: 'I’m interested in', note: 'Se dice “interested in”, no “interesting in”.' },
  { pattern: /\bI am working here since\b/gi, replacement: 'I have been working here since', note: 'Con “since” usamos present perfect: I have been working here since.' },
  { pattern: /\bfor to\b/gi, replacement: 'to', note: '“For to” no existe; usa el infinitivo con “to”.' },
  { pattern: /\bthe most easy\b/gi, replacement: 'the easiest', note: 'Los adjetivos cortos forman el superlativo con -est.' },
  { pattern: /\bthe most cheap\b/gi, replacement: 'the cheapest', note: 'Los adjetivos cortos forman el superlativo con -est.' },
  { pattern: /\bthe most fast\b/gi, replacement: 'the fastest', note: 'Los adjetivos cortos forman el superlativo con -est.' },
  { pattern: /\bthe most healthy\b/gi, replacement: 'the healthiest', note: 'Los adjetivos cortos forman el superlativo con -est.' },
  { pattern: /\bdont\b/gi, replacement: 'don’t', note: 'Falta el apóstrofo en la contracción.' },
  { pattern: /\bcant\b/gi, replacement: 'can’t', note: 'Falta el apóstrofo en la contracción.' },
  { pattern: /\bwont\b/gi, replacement: 'won’t', note: 'Falta el apóstrofo en la contracción.' },
  { pattern: /\bim\b/gi, replacement: 'I’m', note: 'La contracción de “I am” lleva mayúscula y apóstrofo.' },
  { pattern: /\bive\b/gi, replacement: 'I’ve', note: 'La contracción de “I have” lleva mayúscula y apóstrofo.' },
  { pattern: /\bisnt\b/gi, replacement: 'isn’t', note: 'Falta el apóstrofo en la contracción.' },
  { pattern: /\barent\b/gi, replacement: 'aren’t', note: 'Falta el apóstrofo en la contracción.' },
]

const simpleConnectors = levelWordBank.connectors

function words(text: string): string[] {
  return text.match(/[A-Za-zÀ-ÿ'’-]+/g) ?? []
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
}

function countMatches(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

function rubricCoverage(text: string, promptId?: string): { covered: RubricPoint[]; missing: RubricPoint[] } {
  const rubric = promptId ? rubrics[promptId] ?? [] : []
  if (!rubric.length) return { covered: [], missing: [] }
  const covered: RubricPoint[] = []
  const missing: RubricPoint[] = []
  for (const point of rubric) {
    if (point.keywords.some((keyword) => countMatches(text, keyword))) covered.push(point)
    else missing.push(point)
  }
  return { covered, missing }
}

export function detectIssues(text: string): WritingIssue[] {
  const issues: WritingIssue[] = []
  const seen = new Set<string>()

  for (const rule of errorRules) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags)
    const matches = [...text.matchAll(regex)]
    for (const match of matches.slice(0, 2)) {
      const original = match[0]
      const suggestion = original.replace(rule.pattern, rule.replacement)
      const key = `${original}→${suggestion}`
      if (seen.has(key)) continue
      seen.add(key)
      issues.push({ original, suggestion, note: rule.note })
    }
  }

  const repeated = text.match(/\b([A-Za-zÀ-ÿ]+)\s+\1\b/gi) ?? []
  for (const match of repeated.slice(0, 2)) {
    const original = match.trim()
    const suggestion = original.split(/\s+/)[0]
    if (!seen.has(`rep-${original}`)) {
      seen.add(`rep-${original}`)
      issues.push({ original, suggestion, note: 'Hay una palabra repetida consecutiva.' })
    }
  }

  const lowerI = text.match(/\bi\b/g) ?? []
  if (lowerI.length) {
    issues.push({
      original: 'i',
      suggestion: 'I',
      note: 'El pronombre “I” siempre se escribe con mayúscula.',
    })
  }

  for (const sentence of sentences(text).slice(0, 6)) {
    const first = sentence.match(/[A-Za-zÀ-ÿ]/)
    if (first && first[0] === first[0].toLowerCase()) {
      issues.push({
        original: sentence.slice(0, 28) + (sentence.length > 28 ? '…' : ''),
        suggestion: sentence.charAt(0).toUpperCase() + sentence.slice(1, 28),
        note: 'La oración debería empezar con mayúscula.',
      })
      break
    }
  }

  return issues.slice(0, 9)
}

function scoreTask(
  text: string,
  promptId: string | undefined,
  minWords: number,
  wordCount: number,
  paragraphCount: number,
): { score: number; missing: RubricPoint[]; covered: RubricPoint[] } {
  const { covered, missing } = rubricCoverage(text, promptId)
  if (covered.length || missing.length) {
    const total = covered.length + missing.length
    let score = (covered.length / total) * 20
    if (wordCount < minWords * 0.7) score = Math.min(score, 12)
    return { score: Math.round(score), missing, covered }
  }

  if (wordCount < minWords) return { score: Math.round(clamp((wordCount / minWords) * 16, 0, 16)), missing: [], covered: [] }
  if (paragraphCount >= 3) return { score: 20, missing: [], covered: [] }
  if (paragraphCount === 2) return { score: 17, missing: [], covered: [] }
  return { score: 13, missing: [], covered: [] }
}

export function evaluateWriting(text: string, options: EvaluateOptions = {}): WritingEvaluation {
  const minWords = options.minWords ?? 60
  const maxWords = options.maxWords ?? Math.max(minWords * 2, minWords + 80)
  const wordCount = words(text).length
  const sentenceList = sentences(text)
  const paragraphCount = Math.max(paragraphs(text).length, text.trim() ? 1 : 0)
  const contentWords = words(text)
    .map((word) => word.toLowerCase())
    .filter((word) => word.length > 3)
  const unique = new Set(contentWords)
  const ttr = contentWords.length ? unique.size / contentWords.length : 0
  const lower = text.toLowerCase()
  const advancedHits = new Set(levelWordBank.advanced.filter((word) => lower.includes(word)))
  const connectorHits = new Set(simpleConnectors.filter((connector) => lower.includes(connector)))
  const avgWordLength =
    contentWords.length > 0
      ? contentWords.reduce((sum, word) => sum + word.length, 0) / contentWords.length
      : 0

  const issues = detectIssues(text)

  // Longitud: hasta 20 puntos.
  let length: number
  if (wordCount === 0) length = 0
  else if (wordCount < minWords) length = (wordCount / minWords) * 20
  else if (wordCount > maxWords * 1.6) length = 17
  else length = 20

  // Rango léxico: hasta 20 puntos.
  let range = 0
  if (ttr >= 0.72) range += 8
  else if (ttr >= 0.58) range += 6.5
  else if (ttr >= 0.45) range += 5
  else if (ttr >= 0.32) range += 3
  else range += 1.5
  if (advancedHits.size >= 5) range += 7
  else if (advancedHits.size >= 3) range += 5
  else if (advancedHits.size >= 1) range += 2.5
  if (avgWordLength >= 5.2) range += 5
  else if (avgWordLength >= 4.7) range += 4
  else if (avgWordLength >= 4.2) range += 2.5
  else range += 1
  range = clamp(range, 0, 20)

  // Precisión: hasta 25 puntos.
  const accuracy = clamp(25 - issues.length * 3.1, 3, 25)

  // Cohesión: hasta 15 puntos.
  let cohesion = 0
  if (connectorHits.size >= 5) cohesion += 12
  else if (connectorHits.size >= 3) cohesion += 9
  else if (connectorHits.size >= 2) cohesion += 6
  else if (connectorHits.size >= 1) cohesion += 3
  if (paragraphCount >= 3) cohesion += 3
  else if (paragraphCount === 2) cohesion += 2
  cohesion = clamp(cohesion, 0, 15)

  // Adecuación a la tarea: hasta 20 puntos.
  const taskResult = scoreTask(text, options.promptId, minWords, wordCount, paragraphCount)
  const task = taskResult.score

  const rawScore = Math.round(length + range + accuracy + cohesion + task)
  let level = levelFromScore(rawScore)
  if (wordCount < 25) level = 'A1'
  if (options.promptLevel) {
    const cap = nextLevel(options.promptLevel)
    if (scoreFromLevel(level) > scoreFromLevel(cap)) level = cap
  }
  const scoreCeiling = level === 'A1' ? 29 : level === 'A2' ? 47 : level === 'B1' ? 63 : level === 'B2' ? 81 : 100
  const score = Math.min(rawScore, scoreCeiling)

  const feedback: string[] = []
  const highlights: string[] = []

  if (wordCount < minWords) {
    feedback.push(`Tu texto tiene ${wordCount} palabras y el objetivo es ${minWords}. Desarrolla cada punto con un ejemplo o una consecuencia.`)
  } else if (wordCount > maxWords * 1.4) {
    feedback.push(`El texto es más largo de lo necesario (${wordCount} palabras). Prioriza claridad: elimina repeticiones antes de añadir contenido.`)
  } else {
    highlights.push(`Extensión adecuada (${wordCount} palabras) para la tarea.`)
  }

  if (range < 13) {
    feedback.push('Amplía el rango léxico: sustituye palabras genéricas (“good”, “thing”, “do”) por términos precisos del contexto profesional.')
  } else {
    highlights.push('Buen rango de vocabulario, con términos específicos del entorno laboral.')
  }

  if (issues.length) {
    feedback.push(`Detecté ${issues.length} patrón${issues.length === 1 ? '' : 'es'} de error. Revisa la lista y aplica las correcciones; son los puntos que más rápido te subirán de nivel.`)
  } else {
    highlights.push('No se detectaron errores típicos de hispanohablantes en este texto.')
  }

  if (cohesion < 10) {
    feedback.push('Trabaja la cohesión: añade conectores precisos (“however”, “as a result”, “that said”) y separa ideas en párrafos.')
  } else {
    highlights.push('El texto fluye y usa conectores para enlazar ideas.')
  }

  if (taskResult.missing.length) {
    feedback.push(`La respuesta no cubre: ${taskResult.missing.map((point) => point.label).join(', ')}. La tarea pide explícitamente esos elementos.`)
  } else if (taskResult.covered.length) {
    highlights.push('Cubre todos los puntos que pide la tarea.')
  }

  if (sentenceList.length > 0 && wordCount / sentenceList.length > 30) {
    feedback.push('Algunas frases son muy largas. Divide las ideas para que el lector pueda seguirlas sin releer.')
  }

  if (paragraphCount === 1 && wordCount > 100) {
    feedback.push('Organiza el texto en párrafos: contexto, desarrollo y cierre o petición.')
  }

  return {
    score,
    level,
    wordCount,
    criteria: {
      length: Math.round(length),
      range: Math.round(range),
      accuracy: Math.round(accuracy),
      cohesion: Math.round(cohesion),
      task: Math.round(task),
    },
    issues,
    feedback: feedback.slice(0, 6),
    highlights: highlights.slice(0, 4),
  }
}

export function promptOptions(prompt: WritingPrompt): EvaluateOptions {
  return {
    minWords: prompt.minWords,
    maxWords: prompt.maxWords,
    promptLevel: prompt.level,
    promptId: prompt.id,
  }
}
