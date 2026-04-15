import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { TOPICS } from '../../data/topics'

export default function RecentActivity() {
  const completedLessons = useUserStore(s => s.completedLessons)
  const quizResults = useUserStore(s => s.quizResults)

  const lessonEntries = Object.entries(completedLessons).map(([lessonId, data]) => ({
    type: 'lesson', lessonId, ...data,
    ts: new Date(data.completedAt).getTime(),
  }))
  const quizEntries = Object.entries(quizResults).map(([quizId, data]) => ({
    type: 'quiz', quizId, ...data,
    ts: data.passedAt ? new Date(data.passedAt).getTime() : 0,
  }))

  const all = [...lessonEntries, ...quizEntries]
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 6)

  if (all.length === 0) {
    return (
      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-3">Recent Activity</h3>
        <p className="text-sm text-gray-400 text-center py-4">
          Complete lessons and quizzes to see your activity here.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-3">Recent Activity</h3>
      <div className="space-y-2">
        {all.map((item, i) => {
          if (item.type === 'lesson') {
            const topic = TOPICS.find(t => t.id === item.topicId)
            const lesson = topic?.lessons.find(l => l.id === item.lessonId)
            return (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-lg">✅</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{lesson?.title || item.lessonId}</p>
                  <p className="text-xs text-gray-400">{topic?.title}</p>
                </div>
                <span className="text-xs text-yellow-600 font-medium shrink-0">+{item.xpEarned} XP</span>
              </div>
            )
          }
          const topic = TOPICS.find(t => t.quizId === item.quizId)
          return (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <span className="text-lg">🎯</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">Quiz: {topic?.title}</p>
                <p className="text-xs text-gray-400">{Math.round(item.bestScore * 100)}% best score</p>
              </div>
              <span className="text-xs text-yellow-600 font-medium shrink-0">+{item.xpEarned} XP</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
