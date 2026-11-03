import type { Lesson, Module, Stage } from '../../types'
import { stageA1 } from './a1'
import { stageA2 } from './a2'
import { stageB1 } from './b1'
import { stageB2 } from './b2'
import { stageC1 } from './c1'

export const curriculum: Stage[] = [stageA1, stageA2, stageB1, stageB2, stageC1]

export const allLessons: Lesson[] = curriculum.flatMap((stage) =>
  stage.modules.flatMap((module) => module.lessons),
)

export const lessonMap: Record<string, Lesson> = Object.fromEntries(
  allLessons.map((lesson) => [lesson.id, lesson]),
)

export const allModules: Module[] = curriculum.flatMap((stage) => stage.modules)

export const moduleMap: Record<string, Module> = Object.fromEntries(
  allModules.map((module) => [module.id, module]),
)

export const stageByLevel = Object.fromEntries(curriculum.map((stage) => [stage.level, stage])) as Record<
  Stage['level'],
  Stage
>

/** Banco global de frases para generar distractores de traducción. */
export const phrasePool = allLessons.flatMap((lesson) =>
  lesson.phrases.map((phrase) => ({ en: phrase.en, es: phrase.es, lessonId: lesson.id })),
)

/** Todas las tarjetas de vocabulario del currículo, disponibles para SRS y práctica. */
export const vocabPool = allLessons.flatMap((lesson) =>
  lesson.vocab.map((item) => ({
    ...item,
    lessonId: lesson.id,
    level: lesson.level,
  })),
)
