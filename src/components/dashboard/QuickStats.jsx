import { useUserStore } from '../../store/useUserStore'
import { getLevelFromXP } from '../../data/gamification'

export default function QuickStats() {
  const totalXP = useUserStore(s => s.totalXP)
  const badges = useUserStore(s => s.badges)
  const currentStreak = useUserStore(s => s.currentStreak)
  const completedTopics = useUserStore(s => s.completedTopics)
  const completedLessons = useUserStore(s => s.completedLessons)
  const level = getLevelFromXP(totalXP)

  const stats = [
    { label: 'Total XP',      value: totalXP.toLocaleString(), icon: '⚡', color: 'text-yellow-500' },
    { label: 'Current Level', value: level.name,               icon: '🏅', color: 'text-brand-500'  },
    { label: 'Day Streak',    value: `${currentStreak}d`,      icon: '🔥', color: 'text-orange-500' },
    { label: 'Badges Earned', value: badges.length,            icon: '🎖️', color: 'text-purple-500' },
    { label: 'Topics Done',   value: completedTopics.length,   icon: '📚', color: 'text-green-500'  },
    { label: 'Lessons Done',  value: Object.keys(completedLessons).length, icon: '✅', color: 'text-blue-500' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map(({ label, value, icon, color }) => (
        <div key={label} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 text-center">
          <span className={`text-2xl ${color}`}>{icon}</span>
          <p className="font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  )
}
