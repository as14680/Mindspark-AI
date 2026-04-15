import { useUserStore } from '../../store/useUserStore'

function getLast30Days() {
  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

export default function StreakCard() {
  const currentStreak  = useUserStore(s => s.currentStreak)
  const longestStreak  = useUserStore(s => s.longestStreak)
  const activityHistory = useUserStore(s => s.activityHistory)
  const historySet = new Set(activityHistory)
  const days = getLast30Days()

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Daily Streak</p>
          <p className="text-3xl font-bold text-orange-500">{currentStreak} <span className="text-lg">days 🔥</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 dark:text-gray-500">Best streak</p>
          <p className="text-lg font-bold text-gray-700 dark:text-gray-200">{longestStreak}d</p>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap">
        {days.map(day => {
          const active = historySet.has(day)
          const isToday = day === new Date().toISOString().split('T')[0]
          return (
            <div
              key={day}
              title={day}
              className={`w-5 h-5 rounded-sm transition-colors ${
                active ? 'bg-orange-400' : 'bg-gray-100 dark:bg-gray-800'
              } ${isToday ? 'ring-2 ring-orange-400 ring-offset-1 dark:ring-offset-gray-900' : ''}`}
            />
          )
        })}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Last 30 days</p>
    </div>
  )
}
