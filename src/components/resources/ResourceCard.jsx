import { useUserStore } from '../../store/useUserStore'
import { cn } from '../../utils/cn'

const TYPE_STYLES = {
  video:   { icon: '🎥', color: 'bg-red-100 text-red-700'    },
  course:  { icon: '🎓', color: 'bg-blue-100 text-blue-700'  },
  article: { icon: '📝', color: 'bg-green-100 text-green-700'},
  paper:   { icon: '📄', color: 'bg-purple-100 text-purple-700'},
  tool:    { icon: '🛠️', color: 'bg-orange-100 text-orange-700'},
  book:    { icon: '📚', color: 'bg-yellow-100 text-yellow-700'},
}

export default function ResourceCard({ resource }) {
  const savedResources = useUserStore(s => s.savedResources)
  const toggleSaveResource = useUserStore(s => s.toggleSaveResource)
  const isSaved = savedResources.includes(resource.id)
  const typeStyle = TYPE_STYLES[resource.type] || TYPE_STYLES.article

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all flex flex-col">
      {resource.isFeatured && (
        <div className="text-xs font-medium text-yellow-600 mb-2">⭐ Featured</div>
      )}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl shrink-0">{typeStyle.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{resource.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{resource.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 flex-1 leading-relaxed">{resource.description}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <div className="flex gap-1 flex-wrap">
          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', typeStyle.color)}>
            {resource.type}
          </span>
          {resource.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => toggleSaveResource(resource.id)}
            className={cn(
              'text-sm px-2 py-1 rounded-lg transition-colors',
              isSaved ? 'text-brand-600 bg-brand-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            )}
            title={isSaved ? 'Remove from library' : 'Save to library'}
          >
            {isSaved ? '🔖' : '📌'}
          </button>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-brand-600 text-white px-3 py-1 rounded-lg hover:bg-brand-700 transition-colors font-medium"
          >
            Open →
          </a>
        </div>
      </div>
    </div>
  )
}
