import { NavLink } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { getLevelFromXP, getProgressToNextLevel } from '../../data/gamification'
import { cn } from '../../utils/cn'

const NAV = [
  { to: '/',          icon: '🏠', label: 'Dashboard' },
  { to: '/topics',    icon: '📚', label: 'Learn'     },
  { to: '/glossary',  icon: '📖', label: 'Glossary'  },
  { to: '/quiz',      icon: '🎯', label: 'Quiz'      },
  { to: '/resources', icon: '🔗', label: 'Resources' },
  { to: '/profile',   icon: '👤', label: 'Profile'   },
]

export default function Sidebar() {
  const totalXP = useUserStore(s => s.totalXP)
  const currentStreak = useUserStore(s => s.currentStreak)
  const level = getLevelFromXP(totalXP)
  const progress = getProgressToNextLevel(totalXP)

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-bold text-gray-900 text-lg">Mindspark</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 ml-8">AI Learning Platform</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* XP Bar */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-gray-700" style={{ color: level.color }}>
            {level.name}
          </span>
          <span className="text-xs text-gray-400">Lv {level.level}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: level.color }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-gray-400">{totalXP.toLocaleString()} XP</span>
          {currentStreak > 0 && (
            <span className="text-xs text-orange-500 font-medium">🔥 {currentStreak}d</span>
          )}
        </div>
      </div>
    </aside>
  )
}
