import type { AppState, Profile, Progress, Settings, WritingSubmission } from '../types'
import { allModules } from '../data/curriculum'
import { isoDay } from '../lib/levels'

export const BADGES: { id: string; title: string; description: string; icon: string }[] = [
  { id: 'placed', title: 'Punto de partida', description: 'Completaste el test de nivel.', icon: 'MapPin' },
  { id: 'first-lesson', title: 'Primer paso', description: 'Completaste tu primera lección.', icon: 'Footprints' },
  { id: 'five-lessons', title: 'En marcha', description: 'Cinco lecciones completadas.', icon: 'Flame' },
  { id: 'ten-lessons', title: 'Constancia', description: 'Diez lecciones completadas.', icon: 'Trophy' },
  { id: 'writer', title: 'Pluma afilada', description: 'Entregaste tu primera tarea de escritura.', icon: 'PenLine' },
  { id: 'reviewer', title: 'Memoria de acero', description: 'Revisaste 20 tarjetas de vocabulario.', icon: 'Brain' },
  { id: 'streak-3', title: 'Tres días', description: 'Mantuviste una racha de 3 días.', icon: 'Zap' },
  { id: 'streak-7', title: 'Semana perfecta', description: 'Mantuviste una racha de 7 días.', icon: 'CalendarCheck' },
  { id: 'streak-30', title: 'Hábito instalado', description: 'Mantuviste una racha de 30 días.', icon: 'Crown' },
  { id: 'module-master', title: 'Módulo dominado', description: 'Completaste todas las lecciones de un módulo.', icon: 'Layers' },
  { id: 'c1-ready', title: 'C1 ejecutivo', description: 'Completaste todo el itinerario C1.', icon: 'Rocket' },
]

export const defaultState: AppState = {
  version: 1,
  profile: null,
  placement: null,
  progress: {
    xp: 0,
    completedLessons: [],
    lessonScores: {},
    completedTasks: [],
    srs: [],
    activity: {},
    writingSubmissions: [],
    streak: 0,
    bestStreak: 0,
    lastStudyDate: null,
    badges: [],
  },
  settings: {
    voiceRate: 0.95,
    autoPlay: true,
    sound: true,
  },
}

const STORAGE_KEY = 'fluenta:state:v1'

export function loadState(): AppState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      ...defaultState,
      ...parsed,
      progress: { ...defaultState.progress, ...(parsed.progress ?? {}) },
      settings: { ...defaultState.settings, ...(parsed.settings ?? {}) },
    }
  } catch {
    return defaultState
  }
}

export function persistState(state: AppState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Almacenamiento no disponible: la app sigue funcionando en memoria.
  }
}

export function clearState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Sin acción.
  }
}

export function touchProgress(progress: Progress, xp: number, minutes: number, lessons: number): Progress {
  const today = isoDay()
  let streak = progress.streak
  if (progress.lastStudyDate !== today) {
    const yesterday = new Date(`${today}T12:00:00`)
    yesterday.setDate(yesterday.getDate() - 1)
    const y = isoDay(yesterday)
    streak = progress.lastStudyDate === y ? Math.max(1, progress.streak + 1) : 1
  }
  const current = progress.activity[today] ?? { xp: 0, minutes: 0, lessons: 0 }
  return {
    ...progress,
    xp: progress.xp + xp,
    streak,
    bestStreak: Math.max(progress.bestStreak, streak),
    lastStudyDate: today,
    activity: {
      ...progress.activity,
      [today]: {
        xp: current.xp + xp,
        minutes: current.minutes + minutes,
        lessons: current.lessons + lessons,
      },
    },
  }
}

export function computeBadges(progress: Progress, placementDone: boolean): string[] {
  const badges = new Set(progress.badges)
  const completedLessons = progress.completedLessons
  if (placementDone) badges.add('placed')
  if (completedLessons.length >= 1) badges.add('first-lesson')
  if (completedLessons.length >= 5) badges.add('five-lessons')
  if (completedLessons.length >= 10) badges.add('ten-lessons')
  if (progress.writingSubmissions.length >= 1) badges.add('writer')
  if (progress.srs.reduce((sum, card) => sum + card.reps, 0) >= 20) badges.add('reviewer')
  if (progress.streak >= 3 || progress.bestStreak >= 3) badges.add('streak-3')
  if (progress.streak >= 7 || progress.bestStreak >= 7) badges.add('streak-7')
  if (progress.streak >= 30 || progress.bestStreak >= 30) badges.add('streak-30')

  if (allModules.some((module) => module.lessons.every((lesson) => completedLessons.includes(lesson.id)))) {
    badges.add('module-master')
  }

  const c1Lessons = completedLessons.filter((id) => id.startsWith('c1-'))
  if (c1Lessons.length >= 6) badges.add('c1-ready')

  return [...badges]
}

export function makeProfile(partial: Partial<Profile>): Profile {
  return {
    name: 'Alex',
    role: '',
    track: 'general',
    weeklyHours: 5,
    motivation: '',
    createdAt: new Date().toISOString(),
    ...partial,
  }
}

export function makeWritingSubmission(
  submission: Omit<WritingSubmission, 'id' | 'createdAt'>,
): WritingSubmission {
  return {
    ...submission,
    id: `w-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  }
}

export function defaultSettings(): Settings {
  return { ...defaultState.settings }
}
