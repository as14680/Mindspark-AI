export default function FeedbackOverlay({ isCorrect, explanation, onNext, isLast }) {
  return (
    <div className={`mt-4 p-4 rounded-xl border-2 animate-slide-up ${
      isCorrect
        ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
        : 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{isCorrect ? '🎉' : '😬'}</span>
        <p className={`font-bold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
          {isCorrect ? 'Correct!' : 'Not quite!'}
        </p>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{explanation}</p>
      <button
        onClick={onNext}
        className="mt-4 w-full py-2.5 rounded-xl font-semibold text-white bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm"
      >
        {isLast ? 'See Results →' : 'Next Question →'}
      </button>
    </div>
  )
}
