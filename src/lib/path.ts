import type {
  CEFR,
  DailyPlanItem,
  Lesson,
  Module,
  PathPlan,
  PathStage,
  PlacementResult,
  Profile,
  Progress,
  Skill,
  Track,
} from '../types'
import { curriculum } from '../data/curriculum'
import { SKILL_SHORT } from '../types'
import { levelNum, percent } from './levels'

const TARGET: CEFR = 'C1'

const focusLibrary: Record<Skill, string> = {
  grammar:
    'Dedica 10 minutos diarios a una regla concreta y úsala de inmediato en una frase sobre tu trabajo. La gramática sin producción no se automatiza.',
  vocabulary:
    'Activa el repaso espaciado 4 veces por semana. Aprende las palabras dentro de frases de tu sector, no como listas aisladas.',
  reading:
    'Lee un artículo profesional de 10 minutos al día y resume la idea principal en dos frases. Marca las estructuras que quieras reutilizar.',
  listening:
    'Haz 15 minutos de escucha activa al día (podcast o reunión grabada). Escucha una vez sin transcripción y otra con ella para detectar lo que se te escapó.',
  writing:
    'Escribe dos textos cortos por semana en el Writing Lab y aplica las correcciones. La escritura es donde más rápido se consolidan gramática y vocabulario.',
}

export function buildPath(result: PlacementResult, profile: Profile): PathPlan {
  const start = result.overall
  const startNum = levelNum[start]
  const stages = curriculum.filter((stage) => levelNum[stage.level] >= startNum && levelNum[stage.level] <= 5)

  const pathStages: PathStage[] = stages.map((stage) => {
    const lessons = stage.modules.flatMap((module) => module.lessons)
    return {
      stage,
      modules: stage.modules,
      lessons,
      completedLessons: 0,
      locked: false,
    }
  })

  const modules = pathStages.flatMap((entry) => entry.modules)
  const lessons = pathStages.flatMap((entry) => entry.lessons)
  const totalHours = modules.reduce((sum, module) => sum + module.hours, 0)
  const immersionHours = Math.round(totalHours * 1.8)
  const weeklyHours = Math.max(1, profile.weeklyHours)
  const weeks = Math.max(1, Math.ceil((totalHours + immersionHours) / weeklyHours))

  const ranked = (Object.keys(result.skills) as Skill[]).sort(
    (a, b) => result.skills[a].score - result.skills[b].score,
  )
  const focusSkills = ranked.filter((skill) => result.skills[skill].score < result.overallScore - 2).slice(0, 3)
  if (!focusSkills.length) focusSkills.push(ranked[0])

  const focusNotes = focusSkills.map((skill) => focusLibrary[skill])

  if (result.overall === 'C1') {
    focusNotes.unshift(
      'Ya estás en C1. La ruta se convierte en mantenimiento y especialización: foco en precisión, registro y exposición real en tu sector.',
    )
  }

  const milestones: { week: number; title: string; detail: string }[] = []
  let cumulative = 0
  for (const entry of pathStages) {
    cumulative += entry.modules.reduce((sum, module) => sum + module.hours, 0)
    const week = Math.max(1, Math.ceil((cumulative * 2.8) / weeklyHours))
    const titles: Record<CEFR, { title: string; detail: string }> = {
      A1: { title: 'Primeras conversaciones', detail: 'Te presentas y resuelves necesidades básicas en la oficina.' },
      A2: { title: 'Base laboral consolidada', detail: 'Escribes correos simples y mantienes small talk con soltura.' },
      B1: { title: 'Reuniones con confianza', detail: 'Participas, presentas y escribes actualizaciones profesionales.' },
      B2: { title: 'Influencia profesional', detail: 'Negocias, das feedback y defendes propuestas con evidencia.' },
      C1: { title: 'C1 · Dominio ejecutivo', detail: 'Influyes en decisiones y escribes con precisión ejecutiva.' },
    }
    milestones.push({ week, ...titles[entry.stage.level] })
  }

  if (milestones.length && milestones[milestones.length - 1].week > weeks) {
    milestones[milestones.length - 1].week = weeks
  }

  return {
    startLevel: start,
    targetLevel: TARGET,
    stages: pathStages,
    modules,
    lessons,
    totalLessons: lessons.length,
    totalHours,
    immersionHours,
    weeks,
    weeklyHours,
    focusSkills,
    focusNotes,
    milestones,
    nextLesson: lessons[0] ?? null,
  }
}

export function nextLessonFor(plan: PathPlan, completed: string[]): Lesson | null {
  return plan.lessons.find((lesson) => !completed.includes(lesson.id)) ?? null
}

export function moduleProgress(module: Module, completed: string[]): { done: number; total: number; percent: number; complete: boolean } {
  const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
  return { done, total: module.lessons.length, percent: percent(done, module.lessons.length), complete: done === module.lessons.length }
}

export function pathProgress(plan: PathPlan, completed: string[]): { done: number; total: number; percent: number } {
  const done = plan.lessons.filter((lesson) => completed.includes(lesson.id)).length
  return { done, total: plan.lessons.length, percent: percent(done, plan.lessons.length) }
}

export function buildDailyPlan(
  plan: PathPlan,
  profile: Profile,
  dueCount: number,
  track: Track,
  completed: string[] = [],
): DailyPlanItem[] {
  const next = nextLessonFor(plan, completed)
  const hours = profile.weeklyHours
  const baseMinutes = Math.max(15, Math.round((hours * 60) / Math.max(3, Math.min(6, Math.ceil(hours / 1.5)))))
  const lessonTitle = next ? `Lección: ${next.title}` : 'Práctica libre: elige una lección'
  const writing = track.scenarios[0] ?? 'Correo profesional'
  const speaking = track.scenarios[1] ?? 'Reunión de equipo'

  if (hours <= 3) {
    return [
      { day: 'Lun', kind: 'lesson', title: lessonTitle, minutes: baseMinutes },
      { day: 'Mar', kind: 'rest', title: 'Descanso activo: repasa tus notas', minutes: 0 },
      { day: 'Mié', kind: 'review', title: `Repaso de vocabulario (${dueCount} tarjetas)`, minutes: 15, to: '/app/practice' },
      { day: 'Jue', kind: 'rest', title: 'Descanso', minutes: 0 },
      { day: 'Vie', kind: 'listening', title: `Escucha: ${track.scenarios[0] ?? 'reunión'}`, minutes: 15 },
      { day: 'Sáb', kind: 'writing', title: `Writing Lab: ${writing}`, minutes: baseMinutes, to: '/app/writing' },
      { day: 'Dom', kind: 'rest', title: 'Descanso', minutes: 0 },
    ]
  }

  if (hours <= 6) {
    return [
      { day: 'Lun', kind: 'lesson', title: lessonTitle, minutes: baseMinutes, to: '/app/path' },
      { day: 'Mar', kind: 'review', title: `Repaso de vocabulario (${dueCount} tarjetas)`, minutes: 15, to: '/app/practice' },
      { day: 'Mié', kind: 'listening', title: `Escucha activa: ${track.scenarios[0] ?? 'reunión'}`, minutes: 20 },
      { day: 'Jue', kind: 'lesson', title: 'Segunda lección de la semana', minutes: baseMinutes, to: '/app/path' },
      { day: 'Vie', kind: 'speaking', title: `Speaking: ${speaking}`, minutes: 20 },
      { day: 'Sáb', kind: 'writing', title: `Writing Lab: ${writing}`, minutes: baseMinutes, to: '/app/writing' },
      { day: 'Dom', kind: 'rest', title: 'Descanso y repaso ligero', minutes: 0 },
    ]
  }

  return [
    { day: 'Lun', kind: 'lesson', title: lessonTitle, minutes: baseMinutes, to: '/app/path' },
    { day: 'Mar', kind: 'review', title: `Repaso de vocabulario (${dueCount} tarjetas)`, minutes: 15, to: '/app/practice' },
    { day: 'Mié', kind: 'listening', title: `Escucha activa: ${track.scenarios[0] ?? 'reunión'}`, minutes: 20 },
    { day: 'Jue', kind: 'lesson', title: 'Lección de profundización', minutes: baseMinutes, to: '/app/path' },
    { day: 'Vie', kind: 'speaking', title: `Speaking: ${speaking}`, minutes: 25 },
    { day: 'Sáb', kind: 'writing', title: `Writing Lab: ${writing}`, minutes: baseMinutes, to: '/app/writing' },
    { day: 'Dom', kind: 'review', title: 'Repaso ligero y planificación', minutes: 15, to: '/app/practice' },
  ]
}

export function nextMilestone(plan: PathPlan, completed: string[]): { title: string; detail: string; week: number; percent: number } | null {
  const stagesDone = plan.stages.map((stage) => {
    const lessons = stage.lessons
    const done = lessons.filter((lesson) => completed.includes(lesson.id)).length
    return done / Math.max(1, lessons.length)
  })
  const nextIndex = stagesDone.findIndex((value) => value < 1)
  if (nextIndex === -1) return null
  const stage = plan.stages[nextIndex].stage
  const titles: Record<CEFR, { title: string; detail: string }> = {
    A1: { title: 'Primeras conversaciones', detail: 'Te presentas y resuelves necesidades básicas.' },
    A2: { title: 'Base laboral consolidada', detail: 'Correos simples y small talk con soltura.' },
    B1: { title: 'Reuniones con confianza', detail: 'Participas, presentas y escribes actualizaciones.' },
    B2: { title: 'Influencia profesional', detail: 'Negocias y defendes propuestas con evidencia.' },
    C1: { title: 'Dominio ejecutivo', detail: 'Influyes en decisiones y escribes con precisión.' },
  }
  return {
    ...titles[stage.level],
    week: plan.milestones[nextIndex]?.week ?? plan.weeks,
    percent: Math.round((stagesDone.filter((value) => value >= 1).length / Math.max(1, plan.stages.length)) * 100),
  }
}

export function levelFromCompleted(plan: PathPlan, completed: string[]): CEFR {
  let level: CEFR = plan.startLevel
  for (const stage of plan.stages) {
    const done = stage.lessons.every((lesson) => completed.includes(lesson.id))
    if (done) level = stage.stage.level
  }
  return level
}

export function overallStats(progress: Progress) {
  const days = Object.entries(progress.activity)
  const totalMinutes = days.reduce((sum, [, entry]) => sum + entry.minutes, 0)
  const activeDays = days.length
  const lessons = progress.completedLessons.length
  return { totalMinutes, activeDays, lessons, xp: progress.xp }
}

export function skillSummaryLabel(skill: Skill): string {
  return SKILL_SHORT[skill]
}
