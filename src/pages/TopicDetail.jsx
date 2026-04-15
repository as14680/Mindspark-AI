import { useParams, Link } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import { TOPICS } from '../data/topics'
import { useUserStore } from '../store/useUserStore'
import { cn } from '../utils/cn'

export default function TopicDetail() {
  const { topicId } = useParams()
  const topic = TOPICS.find(t => t.id === topicId)
  const completedLessons = useUserStore(s => s.completedLessons)
  const completedTopics  = useUserStore(s => s.completedTopics)

  if (!topic) {
    return (
      <AppShell>
        <div className="text-center py-20">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-gray-500 dark:text-gray-400">Topic not found.</p>
          <Link to="/topics" className="mt-4 inline-block text-brand-600 hover:underline text-sm">← All topics</Link>
        </div>
      </AppShell>
    )
  }

  const doneLessons    = topic.lessons.filter(l => completedLessons[l.id]).length
  const allDone        = doneLessons === topic.lessons.length
  const isTopicComplete = completedTopics.includes(topicId)

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-4">
          <Link to="/topics" className="hover:text-gray-600 dark:hover:text-gray-300">Topics</Link>
          <span>→</span>
          <span className="text-gray-700 dark:text-gray-200">{topic.title}</span>
        </div>

        {/* Hero */}
        <div
          className="rounded-2xl p-6 mb-6 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${topic.color}, ${topic.color}99)` }}
        >
          <div className="text-5xl mb-3">{topic.icon}</div>
          <h1 className="text-2xl font-bold mb-1">{topic.title}</h1>
          <p className="text-white/80">{topic.tagline}</p>
          <div className="flex gap-4 mt-4 text-sm text-white/80">
            <span>📚 {topic.lessons.length} lessons</span>
            <span>⏱ ~{topic.estimatedMinutes} min</span>
            <span>{topic.difficulty}</span>
          </div>
          {isTopicComplete && (
            <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium">
              ✅ Topic Complete!
            </div>
          )}
        </div>

        {/* Lessons */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 dark:text-white">Lessons ({doneLessons}/{topic.lessons.length})</h2>
          <span className="text-sm text-gray-400 dark:text-gray-500">{Math.round(doneLessons / topic.lessons.length * 100)}% complete</span>
        </div>

        <div className="space-y-2 mb-6">
          {topic.lessons.map((lesson, idx) => {
            const done     = !!completedLessons[lesson.id]
            const prevDone = idx === 0 ? true : !!completedLessons[topic.lessons[idx - 1].id]
            const unlocked = prevDone || done

            return (
              <Link
                key={lesson.id}
                to={unlocked ? `/topics/${topicId}/lessons/${lesson.id}` : '#'}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border transition-all',
                  done    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                  unlocked? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-sm' :
                  'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 opacity-60 cursor-not-allowed'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold',
                  done    ? 'bg-green-400 text-white' :
                  unlocked? 'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-400' :
                  'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                )}>
                  {done ? '✓' : unlocked ? '🔓' : '🔒'}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{lesson.title}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">+{lesson.xpReward} XP</p>
                </div>
                {done    && <span className="text-xs text-green-600 dark:text-green-400 font-medium">Done</span>}
                {unlocked && !done && <span className="text-xs text-brand-600 dark:text-brand-400">Start →</span>}
              </Link>
            )
          })}
        </div>

        {/* Quiz CTA */}
        {topic.quizId && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Take the Quiz</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {allDone ? 'Test your knowledge!' : `Complete all lessons to unlock. (${doneLessons}/${topic.lessons.length} done)`}
              </p>
            </div>
            <Link
              to={allDone ? `/quiz/${topicId}` : '#'}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-colors',
                allDone
                  ? 'bg-brand-600 text-white hover:bg-brand-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              )}
            >
              🎯 {allDone ? 'Start Quiz' : 'Locked'}
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  )
}
