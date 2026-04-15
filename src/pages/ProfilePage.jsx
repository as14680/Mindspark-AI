import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import BadgeCard from '../components/gamification/BadgeCard'
import { useUserStore } from '../store/useUserStore'
import { getLevelFromXP, getProgressToNextLevel, getXPToNextLevel, BADGES, LEVELS } from '../data/gamification'
import { TOPICS } from '../data/topics'

export default function ProfilePage() {
  const {
    displayName, setDisplayName, totalXP, badges, currentStreak, longestStreak,
    completedLessons, completedTopics, quizResults, joinedAt, resetProgress
  } = useUserStore()

  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState(displayName)
  const [confirmReset, setConfirmReset] = useState(false)

  const level = getLevelFromXP(totalXP)
  const progress = getProgressToNextLevel(totalXP)
  const xpLeft = getXPToNextLevel(totalXP)

  const handleSaveName = () => {
    if (nameInput.trim()) setDisplayName(nameInput.trim())
    setEditing(false)
  }

  const handleReset = () => {
    if (confirmReset) {
      resetProgress()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
    }
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
            style={{ backgroundColor: level.color }}
          >
            {displayName[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex gap-2 mb-1">
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-brand-400"
                  autoFocus
                />
                <button onClick={handleSaveName} className="bg-brand-600 text-white px-3 py-1.5 rounded-lg text-sm">Save</button>
                <button onClick={() => setEditing(false)} className="text-gray-400 text-sm px-2">Cancel</button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
                <button onClick={() => setEditing(true)} className="text-gray-400 hover:text-gray-600 text-xs">✏️</button>
              </div>
            )}
            <p className="text-sm text-gray-400">
              Member since {new Date(joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <div className="flex gap-3 mt-3">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: level.color }}
              >
                Level {level.level} · {level.name}
              </div>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">XP Progress</span>
            <span className="text-sm text-gray-400">{totalXP.toLocaleString()} total XP</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: level.color }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Level {level.level}</span>
            {level.level < LEVELS.length
              ? <span>{xpLeft.toLocaleString()} XP to Level {level.level + 1}</span>
              : <span className="text-yellow-500 font-semibold">✨ Max level!</span>
            }
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total XP',      value: totalXP.toLocaleString(), icon: '⚡' },
            { label: 'Current Streak',value: `${currentStreak}d`,      icon: '🔥' },
            { label: 'Best Streak',   value: `${longestStreak}d`,      icon: '🏆' },
            { label: 'Lessons Done',  value: Object.keys(completedLessons).length, icon: '✅' },
            { label: 'Topics Done',   value: completedTopics.length,   icon: '📚' },
            { label: 'Quizzes Done',  value: Object.keys(quizResults).length,      icon: '🎯' },
            { label: 'Badges Earned', value: badges.length,            icon: '🎖️' },
            { label: 'Level',         value: level.level,              icon: '🏅' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <span className="text-2xl">{icon}</span>
              <p className="font-bold text-gray-900 mt-1">{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-1">Badges</h3>
          <p className="text-sm text-gray-400 mb-4">{badges.length} / {BADGES.length} unlocked</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {BADGES.map(badge => (
              <BadgeCard key={badge.id} badge={badge} unlocked={badges.includes(badge.id)} />
            ))}
          </div>
        </div>

        {/* Quiz history */}
        {Object.keys(quizResults).length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Quiz History</h3>
            <div className="space-y-2">
              {Object.entries(quizResults).map(([quizId, result]) => {
                const topic = TOPICS.find(t => t.quizId === quizId)
                return (
                  <div key={quizId} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <span className="text-lg">{topic?.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{topic?.title}</p>
                      <p className="text-xs text-gray-400">{result.attempts} attempt{result.attempts > 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{Math.round(result.bestScore * 100)}%</p>
                      <p className="text-xs text-gray-400">best</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Danger zone */}
        <div className="bg-white rounded-xl border border-red-100 p-5">
          <h3 className="font-bold text-red-700 mb-1">Danger Zone</h3>
          <p className="text-sm text-gray-500 mb-4">Resetting your progress is permanent and cannot be undone.</p>
          <button
            onClick={handleReset}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              confirmReset
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            {confirmReset ? '⚠️ Click again to confirm reset' : '🗑️ Reset all progress'}
          </button>
          {confirmReset && (
            <button
              onClick={() => setConfirmReset(false)}
              className="ml-3 text-sm text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </AppShell>
  )
}
