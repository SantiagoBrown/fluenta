import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type {
  AppState,
  Lesson,
  PlacementResult,
  Profile,
  SRSCard,
  Settings,
  WritingSubmission,
} from './types'
import { makeCards, reviewCard } from './lib/lessonEngine'
import type { ReviewRating } from './lib/lessonEngine'
import {
  clearState,
  computeBadges,
  defaultState,
  loadState,
  makeWritingSubmission,
  persistState,
  touchProgress,
} from './lib/store'

interface AppContextValue {
  state: AppState
  setProfile: (profile: Profile) => void
  updateProfile: (partial: Partial<Profile>) => void
  savePlacement: (result: PlacementResult) => void
  completeLesson: (lesson: Lesson, score: number, taskDone: boolean) => void
  submitWriting: (submission: Omit<WritingSubmission, 'id' | 'createdAt'>) => WritingSubmission
  review: (cardId: string, rating: ReviewRating) => void
  addCards: (cards: SRSCard[]) => void
  updateSettings: (partial: Partial<Settings>) => void
  resetAll: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  useEffect(() => {
    persistState(state)
  }, [state])

  const value = useMemo<AppContextValue>(() => {
    const setProfile = (profile: Profile) => setState((current) => ({ ...current, profile }))

    const updateProfile = (partial: Partial<Profile>) =>
      setState((current) => ({
        ...current,
        profile: current.profile ? { ...current.profile, ...partial } : current.profile,
      }))

    const savePlacement = (result: PlacementResult) =>
      setState((current) => {
        let progress = touchProgress(current.progress, 30, 20, 0)
        const submission = makeWritingSubmission({
          promptId: result.writing.promptId,
          title: 'Test de nivel · Writing',
          text: result.writing.text,
          evaluation: result.writing.evaluation,
          source: 'placement',
        })
        progress = {
          ...progress,
          writingSubmissions: [submission, ...progress.writingSubmissions],
        }
        progress = { ...progress, badges: computeBadges(progress, true) }
        return { ...current, placement: result, progress }
      })

    const completeLesson = (lesson: Lesson, score: number, taskDone: boolean) =>
      setState((current) => {
        const already = current.progress.completedLessons.includes(lesson.id)
        const xp = already ? 10 : 50 + Math.round(score * 0.1) + (taskDone ? 20 : 0)
        const minuteValue = already ? Math.round(lesson.minutes * 0.4) : lesson.minutes
        let progress = touchProgress(current.progress, xp, minuteValue, already ? 0 : 1)

        progress = {
          ...progress,
          completedLessons: already
            ? progress.completedLessons
            : [...progress.completedLessons, lesson.id],
          lessonScores: {
            ...progress.lessonScores,
            [lesson.id]: Math.max(progress.lessonScores[lesson.id] ?? 0, score),
          },
          completedTasks:
            taskDone && !progress.completedTasks.includes(lesson.id)
              ? [...progress.completedTasks, lesson.id]
              : progress.completedTasks,
          srs: [
            ...progress.srs,
            ...makeCards(lesson).filter((card) => !progress.srs.some((existing) => existing.id === card.id)),
          ],
        }
        progress = { ...progress, badges: computeBadges(progress, Boolean(current.placement)) }
        return { ...current, progress }
      })

    const submitWriting = (submission: Omit<WritingSubmission, 'id' | 'createdAt'>) => {
      const full = makeWritingSubmission(submission)
      setState((current) => {
        let progress = touchProgress(current.progress, 25, 15, 0)
        progress = { ...progress, writingSubmissions: [full, ...progress.writingSubmissions] }
        progress = { ...progress, badges: computeBadges(progress, Boolean(current.placement)) }
        return { ...current, progress }
      })
      return full
    }

    const review = (cardId: string, rating: ReviewRating) =>
      setState((current) => {
        const card = current.progress.srs.find((item) => item.id === cardId)
        if (!card) return current
        const updated = reviewCard(card, rating)
        let progress = touchProgress(current.progress, 5, 1, 0)
        progress = {
          ...progress,
          srs: progress.srs.map((item) => (item.id === cardId ? updated : item)),
        }
        progress = { ...progress, badges: computeBadges(progress, Boolean(current.placement)) }
        return { ...current, progress }
      })

    const addCards = (cards: SRSCard[]) =>
      setState((current) => {
        const existing = new Set(current.progress.srs.map((card) => card.id))
        const fresh = cards.filter((card) => !existing.has(card.id))
        if (!fresh.length) return current
        let progress = { ...current.progress, srs: [...current.progress.srs, ...fresh] }
        progress = { ...progress, badges: computeBadges(progress, Boolean(current.placement)) }
        return { ...current, progress }
      })

    const updateSettings = (partial: Partial<Settings>) =>
      setState((current) => ({ ...current, settings: { ...current.settings, ...partial } }))

    const resetAll = () => {
      clearState()
      setState({ ...defaultState })
    }

    return {
      state,
      setProfile,
      updateProfile,
      savePlacement,
      completeLesson,
      submitWriting,
      review,
      addCards,
      updateSettings,
      resetAll,
    }
  }, [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside AppProvider')
  return context
}
