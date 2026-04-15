import { useUserStore } from '../../store/useUserStore'
import { getLevelFromXP } from '../../data/gamification'

export default function Topbar() {
  const totalXP = useUserStore(s => s.totalXP)
  const currentStreak = useUserStore(s => s.currentStreak)
  const badges = useUserStore(s => s.badges)
  const level = getLevelFromXP(totalXP)

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-end px-6 gap-4 shrink-0">
      {currentStreak > 0 && (
        <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
          🔥 <span>{currentStreak} day streak</span>
        </div>
      )}
      <div className="flex items-center gap-1.5 bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm">
        🏅 <span>{badges.length} badges</span>
      </div>
      <div
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: level.color }}
      >
        <span>Lv {level.level}</span>
        <span className="opacity-80">·</span>
        <span>{level.name}</span>
      </div>
    </header>
  )
}
