import type {
  CEFR,
  ListeningClip,
  PlacementQuestion,
  PlacementResult,
  ReadingPassage,
  Skill,
  SkillEstimate,
  WritingEvaluation,
  WritingPrompt,
} from '../types'
import { questionBank } from '../data/placement'
import { clamp, levelFromAbility, levelFromScore, levelNum, scoreFromLevel } from './levels'

export const GRAMMAR_TOTAL = 12
export const VOCAB_TOTAL = 4
export const TEST_TOTAL = GRAMMAR_TOTAL + VOCAB_TOTAL

export interface AnswerRecord {
  id: string
  skill: 'grammar' | 'vocabulary'
  level: CEFR
  correct: boolean
  chosen: number
}

export interface AdaptiveState {
  asked: string[]
  grammarTheta: number
  vocabTheta: number
  grammarCount: number
  vocabCount: number
  answers: AnswerRecord[]
  correctGrammar: number
  correctVocab: number
}

export function createTest(): AdaptiveState {
  return {
    asked: [],
    grammarTheta: 1.0,
    vocabTheta: 1.0,
    grammarCount: 0,
    vocabCount: 0,
    answers: [],
    correctGrammar: 0,
    correctVocab: 0,
  }
}

function expectedCorrect(theta: number, difficulty: number): number {
  return 1 / (1 + Math.exp(-(theta - difficulty)))
}

function pickQuestion(
  questions: PlacementQuestion[],
  asked: string[],
  theta: number,
  skill: 'grammar' | 'vocabulary',
): PlacementQuestion | null {
  const pool = questions.filter((q) => q.skill === skill && !asked.includes(q.id))
  if (!pool.length) {
    const fallback = questions.filter((q) => !asked.includes(q.id))
    return fallback[0] ?? null
  }
  const target = clamp(theta, 1, 5)
  return [...pool].sort((a, b) => {
    const da = Math.abs(a.difficulty - target)
    const db = Math.abs(b.difficulty - target)
    if (da !== db) return da - db
    return a.id.localeCompare(b.id)
  })[0]
}

export function nextQuestion(state: AdaptiveState): PlacementQuestion | null {
  if (state.asked.length >= TEST_TOTAL) return null
  const vocabPositions = [2, 5, 8, 11]
  const wantsVocab = vocabPositions.includes(state.asked.length) && state.vocabCount < VOCAB_TOTAL
  const skill: 'grammar' | 'vocabulary' = wantsVocab ? 'vocabulary' : 'grammar'
  const theta = skill === 'grammar' ? state.grammarTheta : state.vocabTheta
  return pickQuestion(questionBank, state.asked, theta, skill)
}

export function answerQuestion(state: AdaptiveState, question: PlacementQuestion, chosen: number): AdaptiveState {
  const correct = chosen === question.answer
  const isGrammar = question.skill === 'grammar'
  const theta = isGrammar ? state.grammarTheta : state.vocabTheta
  const expected = expectedCorrect(theta, question.difficulty)
  const k = isGrammar ? 0.72 : 1.0
  const updated = clamp(theta + k * ((correct ? 1 : 0) - expected), 1, 5.3)

  return {
    ...state,
    asked: [...state.asked, question.id],
    grammarTheta: isGrammar ? updated : state.grammarTheta,
    vocabTheta: isGrammar ? state.vocabTheta : updated,
    grammarCount: state.grammarCount + (isGrammar ? 1 : 0),
    vocabCount: state.vocabCount + (isGrammar ? 0 : 1),
    answers: [
      ...state.answers,
      {
        id: question.id,
        skill: question.skill,
        level: question.level,
        correct,
        chosen,
      },
    ],
    correctGrammar: state.correctGrammar + (isGrammar && correct ? 1 : 0),
    correctVocab: state.correctVocab + (!isGrammar && correct ? 1 : 0),
  }
}

export function pickReadingPassage(passages: ReadingPassage[], ability: number): ReadingPassage {
  return [...passages].sort(
    (a, b) => Math.abs(levelNum[a.level] - ability) - Math.abs(levelNum[b.level] - ability),
  )[0]
}

export function pickListeningClip(clips: ListeningClip[], ability: number): ListeningClip {
  return [...clips].sort(
    (a, b) => Math.abs(levelNum[a.level] - ability) - Math.abs(levelNum[b.level] - ability),
  )[0]
}

export function pickWritingPrompt(prompts: WritingPrompt[], ability: number): WritingPrompt {
  return [...prompts].sort(
    (a, b) => Math.abs(levelNum[a.level] - ability) - Math.abs(levelNum[b.level] - ability),
  )[0]
}

export function abilityScore(ability: number): number {
  return Math.round(clamp(10 + (ability - 1) * 20, 0, 100))
}

function estimateFromAbility(ability: number): SkillEstimate {
  return { level: levelFromAbility(ability), score: abilityScore(ability) }
}

export interface ResultInput {
  test: AdaptiveState
  passage: ReadingPassage
  readingCorrect: number
  readingTotal: number
  clip: ListeningClip
  listeningCorrect: number
  listeningTotal: number
  prompt: WritingPrompt
  writingText: string
  writing: WritingEvaluation
}

const WEIGHTS: Record<Skill, number> = {
  grammar: 0.2,
  vocabulary: 0.15,
  reading: 0.2,
  listening: 0.2,
  writing: 0.25,
}

export function buildPlacementResult(input: ResultInput): PlacementResult {
  const {
    test,
    passage,
    readingCorrect,
    readingTotal,
    clip,
    listeningCorrect,
    listeningTotal,
    prompt,
    writingText,
    writing,
  } = input

  const vocabTheta = clamp(test.vocabTheta * 0.72 + test.grammarTheta * 0.28, 1, 5.3)
  const readingAbility = clamp(
    levelNum[passage.level] + ((readingCorrect - readingTotal / 2) / (readingTotal / 2)) * 0.62,
    1,
    5.3,
  )
  const listeningAbility = clamp(
    levelNum[clip.level] + ((listeningCorrect - listeningTotal / 2) / (listeningTotal / 2)) * 0.62,
    1,
    5.3,
  )

  const skills: Record<Skill, SkillEstimate> = {
    grammar: estimateFromAbility(test.grammarTheta),
    vocabulary: estimateFromAbility(vocabTheta),
    reading: estimateFromAbility(readingAbility),
    listening: estimateFromAbility(listeningAbility),
    writing: { level: writing.level, score: writing.score },
  }

  const overallScore = Math.round(
    (Object.keys(WEIGHTS) as Skill[]).reduce((sum, skill) => sum + skills[skill].score * WEIGHTS[skill], 0),
  )
  const overall = levelFromScore(overallScore)

  const ranked = (Object.keys(skills) as Skill[]).sort((a, b) => skills[b].score - skills[a].score)
  const strengths = ranked.slice(0, 2)
  const gaps = ranked.slice(-2).reverse()
  const confidence: 'media' | 'alta' =
    writingText.trim().split(/\s+/).length >= 80 && readingTotal >= 4 && listeningTotal >= 4 ? 'alta' : 'media'

  return {
    completedAt: new Date().toISOString(),
    overall,
    overallScore,
    ability: (levelNum[overall] + clamp((overallScore - scoreFromLevel(overall)) / 25, 0, 0.9)),
    skills,
    answered: test.answers.map(({ id, level, correct }) => ({ id, level, correct })),
    reading: { passageId: passage.id, level: passage.level, correct: readingCorrect, total: readingTotal },
    listening: { clipId: clip.id, level: clip.level, correct: listeningCorrect, total: listeningTotal },
    writing: { promptId: prompt.id, text: writingText, evaluation: writing },
    strengths,
    gaps,
    confidence,
  }
}
