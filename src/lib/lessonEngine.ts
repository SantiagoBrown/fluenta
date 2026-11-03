import type { Exercise, Lesson, SRSCard } from '../types'
import { phrasePool } from '../data/curriculum'
import { addDays, isoDay } from './levels'

function hashString(input: string): number {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffle<T>(items: T[], seed: number): T[] {
  const copy = [...items]
  const random = mulberry32(seed)
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function normalizeSentence(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getExercises(lesson: Lesson): Exercise[] {
  const seed = hashString(lesson.id)
  const exercises: Exercise[] = []

  // 1 · Gramática / uso en contexto
  exercises.push({
    kind: 'choice',
    id: `${lesson.id}-ex1`,
    label: 'Gramática en contexto',
    prompt: lesson.check.prompt,
    options: lesson.check.options,
    answer: lesson.check.answer,
    explanation: lesson.check.explanation,
  })

  // 2 · Cloze de vocabulario
  const vocab = lesson.vocab[0]
  if (vocab) {
    const match = vocab.example.match(new RegExp(escapeRegExp(vocab.term), 'i'))
    if (match && match.index !== undefined) {
      exercises.push({
        kind: 'fill',
        id: `${lesson.id}-ex2`,
        label: 'Vocabulario',
        prompt: 'Completa la frase con la palabra que falta.',
        before: vocab.example.slice(0, match.index),
        after: vocab.example.slice(match.index + match[0].length),
        answer: vocab.term,
        hint: `Pista: ${vocab.es}`,
        explanation: `“${vocab.term}” significa “${vocab.es}”. Ejemplo: ${vocab.example}`,
      })
    }
  }

  // 3 · Traducción de una frase clave
  const phrase = lesson.phrases[0] ?? lesson.phrases[1]
  if (phrase) {
    const distractors = phrasePool
      .filter((candidate) => candidate.lessonId !== lesson.id && candidate.en !== phrase.en)
      .sort((a, b) => hashString(a.en + lesson.id) - hashString(b.en + lesson.id))
      .slice(0, 3)
      .map((candidate) => candidate.en)
    while (distractors.length < 3) distractors.push(`Not ${distractors.length + 1}`)
    const options = shuffle([phrase.en, ...distractors], seed + 7)
    exercises.push({
      kind: 'choice',
      id: `${lesson.id}-ex3`,
      label: 'Traduce la intención',
      prompt: `¿Cómo dirías: “${phrase.es}”?`,
      options,
      answer: options.indexOf(phrase.en),
      explanation: `La frase correcta es “${phrase.en}”.`,
    })
  }

  // 4 · Reordenar una frase
  const reorderPhrase = lesson.phrases[1] ?? lesson.phrases[2]
  if (reorderPhrase) {
    const answer = reorderPhrase.en
    const tokens = answer.split(' ')
    const shuffled = shuffle(tokens, seed + 19)
    if (normalizeSentence(shuffled.join(' ')) !== normalizeSentence(answer)) {
      exercises.push({
        kind: 'reorder',
        id: `${lesson.id}-ex4`,
        label: 'Ordena la frase',
        prompt: 'Pulsa las palabras en el orden correcto.',
        tokens: shuffled,
        answer,
        explanation: `“${answer}” = “${reorderPhrase.es}”.`,
      })
    }
  }

  // 5 · Comprensión auditiva
  exercises.push({
    kind: 'listen',
    id: `${lesson.id}-ex5`,
    label: 'Escucha y responde',
    prompt: lesson.dialogue.question.prompt,
    script: lesson.dialogue.lines.map((line) => line.text).join(' '),
    options: lesson.dialogue.question.options,
    answer: lesson.dialogue.question.answer,
    explanation: lesson.dialogue.question.explanation,
  })

  return exercises
}

export function makeCards(lesson: Lesson): SRSCard[] {
  const today = isoDay()
  return lesson.vocab.map((item, index) => ({
    id: `${lesson.id}-v${index + 1}`,
    term: item.term,
    es: item.es,
    example: item.example,
    lessonId: lesson.id,
    level: lesson.level,
    due: today,
    interval: 0,
    ease: 2.5,
    reps: 0,
    lapses: 0,
  }))
}

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy'

export function reviewCard(card: SRSCard, rating: ReviewRating): SRSCard {
  const today = isoDay()
  let { interval, ease, lapses } = card
  if (rating === 'again') {
    interval = 1
    ease = Math.max(1.3, ease - 0.2)
    lapses += 1
  } else if (rating === 'hard') {
    interval = Math.max(1, Math.round((interval || 1) * 1.2))
    ease = Math.max(1.3, ease - 0.05)
  } else if (rating === 'good') {
    interval = interval <= 0 ? 1 : Math.max(1, Math.round(interval * (ease || 2.5)))
  } else {
    interval = Math.max(2, Math.round((interval || 1) * (ease || 2.5) * 1.3))
    ease = Math.min(3.2, ease + 0.15)
  }
  return {
    ...card,
    interval,
    ease,
    lapses,
    reps: card.reps + 1,
    due: addDays(today, interval),
  }
}

export function dueCards(cards: SRSCard[], today = isoDay()): SRSCard[] {
  return cards.filter((card) => card.due <= today).sort((a, b) => a.due.localeCompare(b.due))
}

export function speechScore(target: string, transcript: string): { score: number; matched: string[]; missing: string[] } {
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9' ]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  const targetWords = normalize(target)
  const spoken = new Set(normalize(transcript))
  const matched = targetWords.filter((word) => spoken.has(word))
  const missing = targetWords.filter((word) => !spoken.has(word))
  return {
    score: targetWords.length ? Math.round((matched.length / targetWords.length) * 100) : 0,
    matched,
    missing,
  }
}
