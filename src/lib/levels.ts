import type { CEFR, Skill } from '../types'

export const CEFR_LEVELS: CEFR[] = ['A1', 'A2', 'B1', 'B2', 'C1']

export const levelNum: Record<CEFR, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5 }

export const levelLabel: Record<CEFR, string> = {
  A1: 'Principiante',
  A2: 'Básico',
  B1: 'Intermedio',
  B2: 'Intermedio alto',
  C1: 'Avanzado',
}

export const levelDescription: Record<CEFR, string> = {
  A1: 'Comprendes y usas expresiones cotidianas muy básicas.',
  A2: 'Te comunicas en tareas simples y rutinarias.',
  B1: 'Manejas la mayoría de situaciones laborales habituales.',
  B2: 'Argumentas con fluidez y comprendes textos complejos.',
  C1: 'Te expresas con flexibilidad, precisión y matiz profesional.',
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function levelFromAbility(ability: number): CEFR {
  if (ability < 1.5) return 'A1'
  if (ability < 2.5) return 'A2'
  if (ability < 3.5) return 'B1'
  if (ability < 4.5) return 'B2'
  return 'C1'
}

export function levelFromScore(score: number): CEFR {
  if (score < 30) return 'A1'
  if (score < 48) return 'A2'
  if (score < 64) return 'B1'
  if (score < 82) return 'B2'
  return 'C1'
}

export function scoreFromLevel(level: CEFR): number {
  const map: Record<CEFR, number> = { A1: 18, A2: 40, B1: 55, B2: 70, C1: 86 }
  return map[level]
}

export function nextLevel(level: CEFR): CEFR {
  const i = CEFR_LEVELS.indexOf(level)
  return CEFR_LEVELS[Math.min(i + 1, CEFR_LEVELS.length - 1)]
}

export function abilityFromLevel(level: CEFR): number {
  return levelNum[level]
}

export function averageLevel(levels: CEFR[]): CEFR {
  const avg = levels.reduce((sum, level) => sum + levelNum[level], 0) / Math.max(levels.length, 1)
  return levelFromAbility(avg)
}

export function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(`${value}T12:00:00`) : value
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function isoDay(date = new Date()): string {
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60_000)
  return local.toISOString().slice(0, 10)
}

export function addDays(day: string, days: number): string {
  const date = new Date(`${day}T12:00:00`)
  date.setDate(date.getDate() + days)
  return isoDay(date)
}

export function daysBetween(from: string, to: string): number {
  const a = new Date(`${from}T12:00:00`).getTime()
  const b = new Date(`${to}T12:00:00`).getTime()
  return Math.round((b - a) / 86_400_000)
}

export function weekLabel(day: string): string {
  const date = new Date(`${day}T12:00:00`)
  return date.toLocaleDateString('es-ES', { weekday: 'short' })
}

export function uid(prefix = ''): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
}

export const skillLabelShort: Record<Skill, string> = {
  grammar: 'Gramática',
  vocabulary: 'Vocabulario',
  reading: 'Lectura',
  listening: 'Escucha',
  writing: 'Escritura',
}

export function percent(value: number, total: number): number {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

export function formatHours(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`
  if (Number.isInteger(hours)) return `${hours} h`
  return `${hours.toFixed(1)} h`
}
