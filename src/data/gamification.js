export const LEVELS = [
  { level: 1,  name: 'Curious Mind',     minXP: 0,    color: '#94a3b8' },
  { level: 2,  name: 'AI Apprentice',    minXP: 100,  color: '#60a5fa' },
  { level: 3,  name: 'Data Explorer',    minXP: 300,  color: '#34d399' },
  { level: 4,  name: 'Pattern Seeker',   minXP: 600,  color: '#fbbf24' },
  { level: 5,  name: 'Model Builder',    minXP: 1000, color: '#f97316' },
  { level: 6,  name: 'Neural Architect', minXP: 1600, color: '#ef4444' },
  { level: 7,  name: 'Deep Learner',     minXP: 2400, color: '#a855f7' },
  { level: 8,  name: 'AI Researcher',    minXP: 3500, color: '#ec4899' },
  { level: 9,  name: 'Machine Mind',     minXP: 5000, color: '#06b6d4' },
  { level: 10, name: 'Singularity',      minXP: 7000, color: '#f59e0b' },
]

export const XP_REWARDS = {
  lessonComplete: 30,
  quizPerfect: 100,
  quizPassing: 60,
  quizAttempted: 20,
  glossaryTerm: 2,
  resourceSaved: 5,
  dailyLoginBonus: 15,
}

export const STREAK_MULTIPLIERS = [
  { days: 30, multiplier: 2.0 },
  { days: 14, multiplier: 1.5 },
  { days: 7,  multiplier: 1.25 },
  { days: 3,  multiplier: 1.1 },
  { days: 1,  multiplier: 1.0 },
]

export const BADGES = [
  { id: 'early-adopter',  name: 'Early Adopter',      icon: '🚀', description: 'One of the first to join Mindspark AI',       rarity: 'legendary' },
  { id: 'first-lesson',   name: 'First Step',          icon: '👣', description: 'Complete your first lesson',                 rarity: 'common' },
  { id: 'ten-lessons',    name: 'Getting Momentum',    icon: '⚡', description: 'Complete 10 lessons',                        rarity: 'common' },
  { id: 'fifty-lessons',  name: 'Knowledge Machine',   icon: '🧠', description: 'Complete 50 lessons',                        rarity: 'rare' },
  { id: 'first-quiz',     name: 'Quiz Taker',          icon: '📋', description: 'Complete your first quiz',                   rarity: 'common' },
  { id: 'perfect-score',  name: 'Perfectionist',       icon: '⭐', description: 'Score 100% on any quiz',                    rarity: 'rare' },
  { id: 'quiz-5',         name: 'Quiz Champion',       icon: '🏆', description: 'Complete 5 quizzes',                        rarity: 'rare' },
  { id: 'streak-3',       name: 'Consistent',          icon: '🔥', description: 'Maintain a 3-day streak',                   rarity: 'common' },
  { id: 'streak-7',       name: 'Week Warrior',        icon: '📅', description: 'Maintain a 7-day streak',                   rarity: 'rare' },
  { id: 'streak-30',      name: 'Unstoppable',         icon: '🛡️', description: 'Maintain a 30-day streak',                  rarity: 'legendary' },
  { id: 'topic-complete', name: 'Topic Master',        icon: '📖', description: 'Complete any full topic',                   rarity: 'common' },
  { id: 'five-topics',    name: 'Well Rounded',        icon: '🎯', description: 'Complete 5 different topics',               rarity: 'rare' },
  { id: 'word-nerd',      name: 'Word Nerd',           icon: '📚', description: 'Look up 10 glossary terms',                 rarity: 'common' },
  { id: 'level-5',        name: 'Halfway There',       icon: '🏅', description: 'Reach Level 5: Model Builder',              rarity: 'rare' },
  { id: 'level-10',       name: 'Singularity Reached', icon: '✨', description: 'Reach the maximum level',                  rarity: 'legendary' },
  { id: 'night-owl',      name: 'Night Owl',           icon: '🦉', description: 'Complete a lesson after midnight',          rarity: 'rare' },
  { id: 'speed-learner',  name: 'Speed Learner',       icon: '💨', description: 'Complete 3 lessons in one session',         rarity: 'rare' },
  { id: 'bookworm',       name: 'Bookworm',            icon: '🔖', description: 'Save 5 resources to your library',          rarity: 'common' },
]

export function getLevelFromXP(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i]
  }
  return LEVELS[0]
}

export function getProgressToNextLevel(xp) {
  const current = getLevelFromXP(xp)
  const nextIdx = LEVELS.findIndex(l => l.level === current.level + 1)
  if (nextIdx === -1) return 1
  const next = LEVELS[nextIdx]
  return (xp - current.minXP) / (next.minXP - current.minXP)
}

export function getXPToNextLevel(xp) {
  const current = getLevelFromXP(xp)
  const nextIdx = LEVELS.findIndex(l => l.level === current.level + 1)
  if (nextIdx === -1) return 0
  return LEVELS[nextIdx].minXP - xp
}

export function getStreakMultiplier(streak) {
  for (const { days, multiplier } of STREAK_MULTIPLIERS) {
    if (streak >= days) return multiplier
  }
  return 1.0
}
