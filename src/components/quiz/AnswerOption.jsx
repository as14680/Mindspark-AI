import { cn } from '../../utils/cn'

export default function AnswerOption({ option, state, onClick }) {
  const base = 'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all'
  const styles = {
    idle:      'border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:bg-brand-50 cursor-pointer',
    correct:   'border-green-400 bg-green-50 text-green-800',
    incorrect: 'border-red-400 bg-red-50 text-red-700',
    revealed:  'border-green-300 bg-green-50 text-green-700',
    disabled:  'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed',
  }

  return (
    <button
      className={cn(base, styles[state] || styles.idle)}
      onClick={state === 'idle' ? onClick : undefined}
      disabled={state !== 'idle'}
    >
      <span className="mr-2">
        {state === 'correct'   ? '✅' :
         state === 'incorrect' ? '❌' :
         state === 'revealed'  ? '✅' : '○'}
      </span>
      {option.text}
    </button>
  )
}
