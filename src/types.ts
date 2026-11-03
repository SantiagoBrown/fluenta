export type CEFR = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export type Skill = 'grammar' | 'vocabulary' | 'reading' | 'listening' | 'writing'
export type ExerciseKind = 'choice' | 'fill' | 'reorder' | 'listen'

export const SKILLS: Skill[] = ['grammar', 'vocabulary', 'reading', 'listening', 'writing']

export const SKILL_LABEL: Record<Skill, string> = {
  grammar: 'Gramática',
  vocabulary: 'Vocabulario',
  reading: 'Comprensión lectora',
  listening: 'Comprensión auditiva',
  writing: 'Escritura',
}

export const SKILL_SHORT: Record<Skill, string> = {
  grammar: 'Gramática',
  vocabulary: 'Vocabulario',
  reading: 'Lectura',
  listening: 'Escucha',
  writing: 'Escritura',
}

export interface SkillEstimate {
  level: CEFR
  score: number // 0–100
}

export interface PlacementQuestion {
  id: string
  skill: 'grammar' | 'vocabulary'
  level: CEFR
  difficulty: number // 1–5
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

export interface ReadingQuestion {
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

export interface ReadingPassage {
  id: string
  level: CEFR
  title: string
  kind: string
  text: string
  questions: ReadingQuestion[]
}

export interface DialogueLine {
  speaker: string
  text: string
}

export interface ListeningClip {
  id: string
  level: CEFR
  title: string
  context: string
  lines: DialogueLine[]
  questions: ReadingQuestion[]
}

export interface WritingPrompt {
  id: string
  level: CEFR
  title: string
  situation: string
  task: string
  points: string[]
  minWords: number
  maxWords: number
  model: string
}

export interface WritingIssue {
  original: string
  suggestion: string
  note: string
}

export interface WritingEvaluation {
  score: number
  level: CEFR
  wordCount: number
  criteria: {
    length: number
    range: number
    accuracy: number
    cohesion: number
    task: number
  }
  issues: WritingIssue[]
  feedback: string[]
  highlights: string[]
}

export interface PlacementResult {
  completedAt: string
  overall: CEFR
  overallScore: number // 0–100
  ability: number
  skills: Record<Skill, SkillEstimate>
  answered: { id: string; level: CEFR; correct: boolean }[]
  reading: { passageId: string; level: CEFR; correct: number; total: number }
  listening: { clipId: string; level: CEFR; correct: number; total: number }
  writing: { promptId: string; text: string; evaluation: WritingEvaluation }
  strengths: Skill[]
  gaps: Skill[]
  confidence: 'media' | 'alta'
}

export interface Profile {
  name: string
  role: string
  track: TrackId
  weeklyHours: number
  motivation: string
  createdAt: string
}

export type TrackId = 'tech' | 'business' | 'finance' | 'health' | 'marketing' | 'general'

export interface Track {
  id: TrackId
  label: string
  short: string
  description: string
  icon: string
  vocab: { term: string; es: string; example: string }[]
  phrases: { en: string; es: string }[]
  scenarios: string[]
}

export interface VocabItem {
  term: string
  es: string
  example: string
}

export interface Phrase {
  en: string
  es: string
  note?: string
}

export interface GrammarFocus {
  title: string
  formula: string
  explanation: string
  examples: string[]
}

export interface Task {
  kind: 'writing' | 'speaking'
  title: string
  prompt: string
  points: string[]
  model: string
  minWords?: number
}

export interface Lesson {
  id: string
  moduleId: string
  level: CEFR
  index: number
  title: string
  subtitle: string
  objective: string
  minutes: number
  grammar: GrammarFocus
  vocab: VocabItem[]
  phrases: Phrase[]
  dialogue: { context: string; lines: DialogueLine[]; question: ReadingQuestion }
  check: { prompt: string; options: string[]; answer: number; explanation: string }
  task: Task
}

export interface Module {
  id: string
  level: CEFR
  title: string
  theme: string
  description: string
  outcome: string
  hours: number
  lessons: Lesson[]
}

export interface Stage {
  level: CEFR
  title: string
  tagline: string
  description: string
  modules: Module[]
}

export type Exercise =
  | {
      kind: 'choice'
      id: string
      prompt: string
      options: string[]
      answer: number
      explanation: string
      label: string
    }
  | {
      kind: 'fill'
      id: string
      prompt: string
      before: string
      after: string
      answer: string
      hint: string
      explanation: string
      label: string
    }
  | {
      kind: 'reorder'
      id: string
      prompt: string
      tokens: string[]
      answer: string
      explanation: string
      label: string
    }
  | {
      kind: 'listen'
      id: string
      prompt: string
      script: string
      options: string[]
      answer: number
      explanation: string
      label: string
    }

export interface SRSCard {
  id: string
  term: string
  es: string
  example: string
  lessonId: string
  level: CEFR
  due: string
  interval: number
  ease: number
  reps: number
  lapses: number
}

export interface WritingSubmission {
  id: string
  promptId: string
  title: string
  text: string
  evaluation: WritingEvaluation
  createdAt: string
  source: 'placement' | 'lesson' | 'lab'
}

export interface ActivityEntry {
  xp: number
  minutes: number
  lessons: number
}

export interface Progress {
  xp: number
  completedLessons: string[]
  lessonScores: Record<string, number>
  completedTasks: string[]
  srs: SRSCard[]
  activity: Record<string, ActivityEntry>
  writingSubmissions: WritingSubmission[]
  streak: number
  bestStreak: number
  lastStudyDate: string | null
  badges: string[]
}

export interface Settings {
  voiceRate: number
  autoPlay: boolean
  sound: boolean
}

export interface AppState {
  version: number
  profile: Profile | null
  placement: PlacementResult | null
  progress: Progress
  settings: Settings
}

export interface PathStage {
  stage: Stage
  modules: Module[]
  lessons: Lesson[]
  completedLessons: number
  locked: boolean
}

export interface PathPlan {
  startLevel: CEFR
  targetLevel: CEFR
  stages: PathStage[]
  modules: Module[]
  lessons: Lesson[]
  totalLessons: number
  totalHours: number
  immersionHours: number
  weeks: number
  weeklyHours: number
  focusSkills: Skill[]
  focusNotes: string[]
  milestones: { week: number; title: string; detail: string }[]
  nextLesson: Lesson | null
}

export interface DailyPlanItem {
  day: string
  kind: 'lesson' | 'review' | 'listening' | 'writing' | 'speaking' | 'rest'
  title: string
  minutes: number
  to?: string
}
