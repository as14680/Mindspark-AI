import { CATEGORIES } from '../../data/topics'
import { cn } from '../../utils/cn'

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('all')}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
          active === 'all'
            ? 'bg-brand-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        )}
      >
        All Topics
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
            active === cat.id
              ? 'text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
          style={active === cat.id ? { backgroundColor: cat.color } : {}}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
