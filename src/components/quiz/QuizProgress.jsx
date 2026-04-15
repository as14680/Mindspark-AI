import { cn } from '../../utils/cn'

export default function QuizProgress({ total, current, answers }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }, (_, i) => {
        const answered = answers[i]
        const isCurrent = i === current
        return (
          <div
            key={i}
            className={cn(
              'flex-1 h-2 rounded-full transition-all duration-300',
              answered === 'correct'   ? 'bg-green-400' :
              answered === 'incorrect' ? 'bg-red-400'   :
              isCurrent                ? 'bg-brand-400' :
              'bg-gray-200'
            )}
          />
        )
      })}
    </div>
  )
}
