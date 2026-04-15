import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getLevelFromXP, getStreakMultiplier, BADGES } from '../data/gamification'

const today = () => new Date().toISOString().split('T')[0]

const initialState = {
  displayName: 'Learner',
  joinedAt: new Date().toISOString(),
  totalXP: 0,
  badges: ['early-adopter'],
  lastActivityDate: null,
  currentStreak: 0,
  longestStreak: 0,
  activityHistory: [],
  completedLessons: {},
  completedTopics: [],
  quizResults: {},
  quizPassStreak: 0,
  viewedTerms: [],
  savedResources: [],
  sessionLessonsCompleted: 0,
  xpToast: null,
  levelUpPending: null,
  newBadges: [],
}

export const useUserStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setDisplayName: (name) => set({ displayName: name }),

      awardXP: (amount, label = '') => {
        const state = get()
        const streak = state.currentStreak
        const multiplier = getStreakMultiplier(streak)
        const earned = Math.round(amount * multiplier)
        const prevXP = state.totalXP
        const newXP = prevXP + earned
        const prevLevel = getLevelFromXP(prevXP)
        const newLevel = getLevelFromXP(newXP)

        const update = {
          totalXP: newXP,
          xpToast: { amount: earned, label, multiplier },
        }
        if (newLevel.level > prevLevel.level) {
          update.levelUpPending = newLevel
        }
        set(update)
        get().checkBadges()
        return earned
      },

      clearXPToast: () => set({ xpToast: null }),
      clearLevelUp: () => set({ levelUpPending: null }),
      clearNewBadges: () => set({ newBadges: [] }),

      completeLesson: (topicId, lessonId, baseXP) => {
        const state = get()
        if (state.completedLessons[lessonId]) return
        const now = new Date().toISOString()
        const hour = new Date().getHours()
        const sessionCount = (state.sessionLessonsCompleted || 0) + 1

        set({
          completedLessons: {
            ...state.completedLessons,
            [lessonId]: { completedAt: now, topicId, xpEarned: baseXP },
          },
          sessionLessonsCompleted: sessionCount,
        })
        get().awardXP(baseXP, 'Lesson completed')

        // night owl badge
        if (hour >= 0 && hour < 5) get()._grantBadge('night-owl')
        // speed learner
        if (sessionCount >= 3) get()._grantBadge('speed-learner')

        get().checkBadges()
        get().recordActivity()
      },

      completeTopic: (topicId) => {
        const state = get()
        if (state.completedTopics.includes(topicId)) return
        set({ completedTopics: [...state.completedTopics, topicId] })
        get().checkBadges()
      },

      submitQuiz: (quizId, topicId, score, totalQ) => {
        const state = get()
        const pct = score / totalQ
        const prev = state.quizResults[quizId]
        const isPerfect = pct === 1
        const isPassing = pct >= 0.7

        let xp = isPerfect ? 100 : isPassing ? 60 : 20
        const passStreak = isPassing ? (state.quizPassStreak || 0) + 1 : 0

        set({
          quizResults: {
            ...state.quizResults,
            [quizId]: {
              topicId,
              attempts: (prev?.attempts || 0) + 1,
              bestScore: Math.max(prev?.bestScore || 0, pct),
              lastScore: pct,
              xpEarned: Math.max(prev?.xpEarned || 0, xp),
              passedAt: isPassing ? new Date().toISOString() : prev?.passedAt,
            },
          },
          quizPassStreak: passStreak,
        })
        get().awardXP(xp, isPerfect ? 'Perfect score!' : isPassing ? 'Quiz passed!' : 'Quiz attempted')
        if (isPerfect) get()._grantBadge('perfect-score')
        get().checkBadges()
        get().recordActivity()
        return xp
      },

      viewGlossaryTerm: (termId) => {
        const state = get()
        if (state.viewedTerms.includes(termId)) return
        set({ viewedTerms: [...state.viewedTerms, termId] })
        if (state.viewedTerms.length + 1 >= 10) get()._grantBadge('word-nerd')
        if ((state.viewedTerms.length + 1) % 5 === 0) get().awardXP(2, 'Glossary')
      },

      toggleSaveResource: (resourceId) => {
        const state = get()
        const saved = state.savedResources.includes(resourceId)
        const next = saved
          ? state.savedResources.filter(id => id !== resourceId)
          : [...state.savedResources, resourceId]
        set({ savedResources: next })
        if (!saved) {
          get().awardXP(5, 'Resource saved')
          if (next.length >= 5) get()._grantBadge('bookworm')
        }
      },

      recordActivity: () => {
        const state = get()
        const t = today()
        if (state.lastActivityDate === t) return // already counted today

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        const streak = state.lastActivityDate === yesterday
          ? state.currentStreak + 1
          : 1

        set({
          lastActivityDate: t,
          currentStreak: streak,
          longestStreak: Math.max(state.longestStreak, streak),
          activityHistory: [...new Set([...state.activityHistory, t])],
        })
        get().awardXP(15, 'Daily bonus')
        if (streak >= 30) get()._grantBadge('streak-30')
        else if (streak >= 7) get()._grantBadge('streak-7')
        else if (streak >= 3) get()._grantBadge('streak-3')
      },

      _grantBadge: (id) => {
        const state = get()
        if (state.badges.includes(id)) return
        set({
          badges: [...state.badges, id],
          newBadges: [...(state.newBadges || []), id],
        })
      },

      checkBadges: () => {
        const state = get()
        const lessons = Object.keys(state.completedLessons).length
        const quizzes = Object.keys(state.quizResults).length
        const level = getLevelFromXP(state.totalXP).level

        if (lessons >= 1)  get()._grantBadge('first-lesson')
        if (lessons >= 10) get()._grantBadge('ten-lessons')
        if (lessons >= 50) get()._grantBadge('fifty-lessons')
        if (quizzes >= 1)  get()._grantBadge('first-quiz')
        if (quizzes >= 5)  get()._grantBadge('quiz-5')
        if (state.completedTopics.length >= 1) get()._grantBadge('topic-complete')
        if (state.completedTopics.length >= 5) get()._grantBadge('five-topics')
        if (level >= 5)  get()._grantBadge('level-5')
        if (level >= 10) get()._grantBadge('level-10')
      },

      resetProgress: () => set({ ...initialState, badges: ['early-adopter'], joinedAt: new Date().toISOString() }),
    }),
    {
      name: 'mindspark_user',
      version: 1,
    }
  )
)
