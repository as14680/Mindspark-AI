import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import QuizProgress from '../components/quiz/QuizProgress'
import AnswerOption from '../components/quiz/AnswerOption'
import FeedbackOverlay from '../components/quiz/FeedbackOverlay'
import QuizSummary from '../components/quiz/QuizSummary'
import TopicCard from '../components/topics/TopicCard'
import { QUIZZES } from '../data/quizzes'
import { TOPICS } from '../data/topics'
import { useUserStore } from '../store/useUserStore'

export default function QuizPage() {
  const { topicId } = useParams()
  const submitQuiz  = useUserStore(s => s.submitQuiz)

  if (!topicId) return <QuizSelector />

  const topic = TOPICS.find(t => t.id === topicId)
  const quiz  = topic ? QUIZZES[topic.quizId] : null

  if (!quiz || !topic) {
    return (
      <AppShell>
        <div className="text-center py-20">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-gray-500 dark:text-gray-400">Quiz not found.</p>
          <Link to="/quiz" className="mt-4 inline-block text-brand-600 hover:underline text-sm">← All quizzes</Link>
        </div>
      </AppShell>
    )
  }

  return <QuizRunner quiz={quiz} topic={topic} submitQuiz={submitQuiz} />
}

function QuizSelector() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quizzes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Test your knowledge on each topic. Complete all lessons first!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map(topic => <TopicCard key={topic.id} topic={topic} />)}
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-4 text-center">
          Click any topic to go to it and unlock its quiz by completing all lessons.
        </p>
      </div>
    </AppShell>
  )
}

function QuizRunner({ quiz, topic, submitQuiz }) {
  const [current, setCurrent]         = useState(0)
  const [selected, setSelected]       = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers]         = useState([])
  const [optionStates, setOptionStates] = useState({})
  const [done, setDone]               = useState(false)
  const [score, setScore]             = useState(0)
  const [xpEarned, setXpEarned]       = useState(0)

  const question = quiz.questions[current]
  const isLast   = current === quiz.questions.length - 1

  const handleSelect = (option) => {
    if (showFeedback || selected) return
    setSelected(option.id)
    const isCorrect = !!option.isCorrect

    const newStates = {}
    quiz.questions[current].options.forEach(o => {
      if (o.id === option.id) newStates[o.id] = isCorrect ? 'correct' : 'incorrect'
      else if (o.isCorrect)   newStates[o.id] = 'revealed'
      else                    newStates[o.id] = 'disabled'
    })
    setOptionStates(newStates)
    setAnswers(prev => [...prev, isCorrect ? 'correct' : 'incorrect'])
    setShowFeedback(true)
    if (isCorrect) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (isLast) {
      const earned = submitQuiz(quiz.id, topic.id, score, quiz.questions.length)
      setXpEarned(earned)
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setShowFeedback(false)
      setOptionStates({})
    }
  }

  const handleRetry = () => {
    setCurrent(0); setSelected(null); setShowFeedback(false)
    setAnswers([]); setOptionStates({}); setDone(false)
    setScore(0); setXpEarned(0)
  }

  if (done) {
    return (
      <AppShell>
        <div className="max-w-xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <QuizSummary score={score} total={quiz.questions.length} xpEarned={xpEarned} topicId={topic.id} onRetry={handleRetry} />
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">Quiz</p>
            <h2 className="font-bold text-gray-900 dark:text-white">{topic.title}</h2>
          </div>
          <Link to={`/topics/${topic.id}`} className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            ✕ Exit
          </Link>
        </div>

        <QuizProgress total={quiz.questions.length} current={current} answers={answers} />

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            Question {current + 1} of {quiz.questions.length}
          </p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 leading-snug">
            {question.text}
          </h3>
          <div className="space-y-3">
            {question.options.map(option => (
              <AnswerOption
                key={option.id}
                option={option}
                state={optionStates[option.id] || 'idle'}
                onClick={() => handleSelect(option)}
              />
            ))}
          </div>
          {showFeedback && (
            <FeedbackOverlay
              isCorrect={quiz.questions[current].options.find(o => o.id === selected)?.isCorrect}
              explanation={question.explanation}
              onNext={handleNext}
              isLast={isLast}
            />
          )}
        </div>
      </div>
    </AppShell>
  )
}
