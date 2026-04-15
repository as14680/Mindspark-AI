import { cn } from '../../utils/cn'

export default function AnswerOption({ option, state, onClick }) {
  const base = 'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all'
  const styles = {
    idle:      'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-brand-300 hover:bg-brand-50 dark:hover:border-brand-600 dark:hover:bg-brand-900/20 cursor-pointer',
    correct:   'border-green-400 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    incorrect: 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    revealed:  'border-green-300 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400',
    disabled:  'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed',
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
