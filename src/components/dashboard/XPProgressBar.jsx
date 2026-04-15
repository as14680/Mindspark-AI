import { useUserStore } from '../../store/useUserStore'
import { getLevelFromXP, getProgressToNextLevel, getXPToNextLevel, LEVELS } from '../../data/gamification'

export default function XPProgressBar() {
  const totalXP = useUserStore(s => s.totalXP)
  const level = getLevelFromXP(totalXP)
  const progress = getProgressToNextLevel(totalXP)
  const xpLeft = getXPToNextLevel(totalXP)
  const isMax = level.level === LEVELS.length

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-500">Level Progress</p>
          <p className="text-lg font-bold" style={{ color: level.color }}>{level.name}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{totalXP.toLocaleString()}</p>
          <p className="text-xs text-gray-400">total XP</p>
        </div>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: level.color }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>Level {level.level}</span>
        {isMax
          ? <span className="text-yellow-500 font-semibold">✨ Max level reached!</span>
          : <span>{xpLeft.toLocaleString()} XP to Level {level.level + 1}</span>
        }
      </div>
    </div>
  )
}
