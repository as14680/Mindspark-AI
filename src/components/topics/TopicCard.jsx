import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'

const DIFFICULTY_LABELS = { beginner: '🟢 Beginner', intermediate: '🟡 Intermediate', advanced: '🔴 Advanced' }

export default function TopicCard({ topic }) {
  const completedLessons = useUserStore(s => s.completedLessons)
  const completedTopics  = useUserStore(s => s.completedTopics)

  const done  = topic.lessons.filter(l => completedLessons[l.id]).length
  const total = topic.lessons.length
  const pct   = total > 0 ? done / total : 0
  const isComplete = completedTopics.includes(topic.id)

  return (
    <Link to={`/topics/${topic.id}`} className="group block">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ backgroundColor: `${topic.color}20` }}
          >
            {topic.icon}
          </div>
          {isComplete && <span className="text-green-500 text-lg">✅</span>}
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {topic.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex-1">{topic.tagline}</p>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
          <span>{DIFFICULTY_LABELS[topic.difficulty]}</span>
          <span>·</span>
          <span>⏱ {topic.estimatedMinutes}m</span>
          <span>·</span>
          <span>{total} lessons</span>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1">
            <span>{done}/{total} lessons</span>
            <span>{Math.round(pct * 100)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct * 100}%`, backgroundColor: topic.color }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
