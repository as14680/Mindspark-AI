import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { getLevelFromXP } from '../../data/gamification'

export default function WelcomeBanner() {
  const displayName = useUserStore(s => s.displayName)
  const totalXP = useUserStore(s => s.totalXP)
  const level = getLevelFromXP(totalXP)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div
      className="rounded-2xl p-6 text-white relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${level.color}, ${level.color}aa)` }}
    >
      <div className="relative z-10">
        <p className="text-white/80 text-sm font-medium">{greeting},</p>
        <h1 className="text-2xl font-bold mt-0.5">{displayName} 👋</h1>
        <p className="text-white/80 mt-2 text-sm">
          You're a <strong className="text-white">{level.name}</strong> · Level {level.level}. Keep learning to level up!
        </p>
        <div className="flex gap-3 mt-4">
          <Link
            to="/topics"
            className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            📚 Continue Learning
          </Link>
          <Link
            to="/quiz"
            className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            🎯 Take a Quiz
          </Link>
        </div>
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-8xl opacity-10 select-none">⚡</div>
    </div>
  )
}
