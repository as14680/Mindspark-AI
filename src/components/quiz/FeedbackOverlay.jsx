export default function FeedbackOverlay({ isCorrect, explanation, onNext, isLast }) {
  return (
    <div className={`mt-4 p-4 rounded-xl border-2 animate-slide-up ${
      isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{isCorrect ? '🎉' : '😬'}</span>
        <p className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect ? 'Correct!' : 'Not quite!'}
        </p>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{explanation}</p>
      <button
        onClick={onNext}
        className="mt-4 w-full py-2.5 rounded-xl font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors text-sm"
      >
        {isLast ? 'See Results →' : 'Next Question →'}
      </button>
    </div>
  )
}
