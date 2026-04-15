import { cn } from '../../utils/cn'

const RARITY_COLORS = {
  common:    'border-gray-200 bg-gray-50',
  rare:      'border-blue-200 bg-blue-50',
  legendary: 'border-yellow-300 bg-yellow-50',
}

export default function BadgeCard({ badge, unlocked }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
        unlocked ? RARITY_COLORS[badge.rarity] : 'border-gray-100 bg-gray-50 opacity-40 grayscale'
      )}
      title={badge.description}
    >
      <span className="text-3xl">{badge.icon}</span>
      <p className="text-xs font-semibold text-gray-700 text-center leading-tight">{badge.name}</p>
      {unlocked && (
        <span className={cn(
          'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
          badge.rarity === 'legendary' ? 'bg-yellow-200 text-yellow-800' :
          badge.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
          'bg-gray-200 text-gray-600'
        )}>
          {badge.rarity}
        </span>
      )}
    </div>
  )
}
