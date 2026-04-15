import { Link } from 'react-router-dom'

export default function QuizSummary({ score, total, xpEarned, topicId, onRetry }) {
  const pct = Math.round((score / total) * 100)
  const stars = pct === 100 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0

  return (
    <div className="text-center py-8 animate-fade-in">
      <div className="text-6xl mb-4">
        {pct === 100 ? '🏆' : pct >= 70 ? '🎯' : pct >= 40 ? '📚' : '💪'}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        {score}/{total} correct
      </h2>
      <p className="text-gray-500 mb-2">{pct}% score</p>

      {/* Stars */}
      <div className="flex justify-center gap-2 text-3xl mb-4">
        {[1, 2, 3].map(s => (
          <span key={s} className={s <= stars ? 'opacity-100' : 'opacity-20'}>⭐</span>
        ))}
      </div>

      {/* XP */}
      <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full mb-6">
        <span className="text-yellow-500">⚡</span>
        <span className="font-bold text-yellow-700">+{xpEarned} XP earned</span>
      </div>

      <p className="text-sm text-gray-500 mb-8">
        {pct === 100 ? 'Perfect! You mastered this topic!' :
         pct >= 70  ? 'Great job! Quiz passed!' :
         'Keep studying and try again!'}
      </p>

      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          🔄 Retry
        </button>
        <Link
          to={`/topics/${topicId}`}
          className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
        >
          📚 Back to Topic
        </Link>
        <Link
          to="/topics"
          className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          🗺️ All Topics
        </Link>
      </div>
    </div>
  )
}
