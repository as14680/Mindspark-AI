import { cn } from '../../utils/cn'

const CALLOUT_STYLES = {
  info:    { bg: 'bg-blue-50 dark:bg-blue-950/40',   border: 'border-blue-200 dark:border-blue-800',  icon: 'ℹ️'  },
  tip:     { bg: 'bg-green-50 dark:bg-green-950/40', border: 'border-green-200 dark:border-green-800', icon: '💡'  },
  warning: { bg: 'bg-yellow-50 dark:bg-yellow-950/40', border: 'border-yellow-200 dark:border-yellow-800', icon: '⚠️' },
}

export default function LessonContent({ content }) {
  return (
    <div className="space-y-5 max-w-2xl">
      {content.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-6 first:mt-0">
              {block.text}
            </h2>
          )
        }
        if (block.type === 'paragraph') {
          return (
            <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {block.text}
            </p>
          )
        }
        if (block.type === 'callout') {
          const style = CALLOUT_STYLES[block.variant] || CALLOUT_STYLES.info
          return (
            <div key={i} className={cn('flex gap-3 p-4 rounded-xl border', style.bg, style.border)}>
              <span className="text-lg shrink-0">{style.icon}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{block.text}</p>
            </div>
          )
        }
        if (block.type === 'keypoint') {
          return (
            <div key={i} className="flex gap-3 p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">
              <span className="text-lg shrink-0">🔑</span>
              <p className="text-sm font-medium text-brand-900 dark:text-brand-300 leading-relaxed">{block.text}</p>
            </div>
          )
        }
        if (block.type === 'code') {
          return (
            <div key={i} className="bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
              {block.language && (
                <div className="px-4 py-2 bg-gray-800 dark:bg-gray-900 text-xs text-gray-400 font-mono">{block.language}</div>
              )}
              <pre className="p-4 text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
                {block.text}
              </pre>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
