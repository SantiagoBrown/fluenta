import type { CEFR, Lesson, Module } from '../../types'

export type LessonSeed = Omit<Lesson, 'id' | 'moduleId' | 'level' | 'index'>

export function mod(
  id: string,
  level: CEFR,
  title: string,
  theme: string,
  description: string,
  outcome: string,
  hours: number,
  seeds: LessonSeed[],
): Module {
  return {
    id,
    level,
    title,
    theme,
    description,
    outcome,
    hours,
    lessons: seeds.map((seed, i) => ({
      ...seed,
      id: `${id}-l${i + 1}`,
      moduleId: id,
      level,
      index: i + 1,
    })),
  }
}
