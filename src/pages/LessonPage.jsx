import { useParams, useNavigate, Link } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import LessonContent from '../components/lesson/LessonContent'
import { TOPICS } from '../data/topics'
import { useUserStore } from '../store/useUserStore'

export default function LessonPage() {
  const { topicId, lessonId } = useParams()
  const navigate = useNavigate()
  const topic  = TOPICS.find(t => t.id === topicId)
  const lesson = topic?.lessons.find(l => l.id === lessonId)
  const completedLessons = useUserStore(s => s.completedLessons)
  const completeLesson   = useUserStore(s => s.completeLesson)
  const completeTopic    = useUserStore(s => s.completeTopic)

  if (!topic || !lesson) {
    return (
      <AppShell>
        <div className="text-center py-20">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-gray-500 dark:text-gray-400">Lesson not found.</p>
          <Link to="/topics" className="mt-4 inline-block text-brand-600 hover:underline text-sm">← Back to topics</Link>
        </div>
      </AppShell>
    )
  }

  const lessonIdx  = topic.lessons.findIndex(l => l.id === lessonId)
  const prevLesson = topic.lessons[lessonIdx - 1]
  const nextLesson = topic.lessons[lessonIdx + 1]
  const isDone     = !!completedLessons[lessonId]

  const handleComplete = () => {
    if (!isDone) {
      completeLesson(topicId, lessonId, lesson.xpReward)
      const allDone = topic.lessons.every(l => l.id === lessonId || !!completedLessons[l.id])
      if (allDone) completeTopic(topicId)
    }
    if (nextLesson) navigate(`/topics/${topicId}/lessons/${nextLesson.id}`)
    else navigate(`/topics/${topicId}`)
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-4 flex-wrap">
          <Link to="/topics" className="hover:text-gray-600 dark:hover:text-gray-300">Topics</Link>
          <span>→</span>
          <Link to={`/topics/${topicId}`} className="hover:text-gray-600 dark:hover:text-gray-300">{topic.title}</Link>
          <span>→</span>
          <span className="text-gray-700 dark:text-gray-200">{lesson.title}</span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-5">
          {topic.lessons.map(l => (
            <div
              key={l.id}
              className={`h-1.5 flex-1 rounded-full ${
                completedLessons[l.id] ? 'bg-green-400' :
                l.id === lessonId      ? 'bg-brand-400' :
                'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Lesson header */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Lesson {lessonIdx + 1} of {topic.lessons.length}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-400 dark:text-gray-500">
            <span>⚡ +{lesson.xpReward} XP</span>
            {isDone && <span className="text-green-600 dark:text-green-400 font-medium">✅ Completed</span>}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-6">
          <LessonContent content={lesson.content} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          {prevLesson ? (
            <Link
              to={`/topics/${topicId}/lessons/${prevLesson.id}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              ← Previous
            </Link>
          ) : <div />}

          <button
            onClick={handleComplete}
            className="flex-1 max-w-xs py-3 rounded-xl font-semibold text-white transition-colors"
            style={{ backgroundColor: topic.color }}
          >
            {isDone
              ? nextLesson ? 'Next Lesson →' : 'Back to Topic'
              : nextLesson ? '✓ Complete & Continue' : '✓ Complete Lesson'
            }
          </button>

          {nextLesson ? (
            <Link
              to={`/topics/${topicId}/lessons/${nextLesson.id}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Skip →
            </Link>
          ) : <div />}
        </div>
      </div>
    </AppShell>
  )
}
