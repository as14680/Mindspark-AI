import { useState } from 'react'
import { useUserStore } from '../../store/useUserStore'

export default function TermCard({ term }) {
  const [expanded, setExpanded] = useState(false)
  const viewGlossaryTerm = useUserStore(s => s.viewGlossaryTerm)

  const handleExpand = () => {
    if (!expanded) viewGlossaryTerm(term.id)
    setExpanded(e => !e)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 hover:border-gray-200 dark:hover:border-gray-700 transition-all">
      <button className="w-full text-left" onClick={handleExpand}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{term.term}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{term.shortDef}</p>
          </div>
          <span className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 animate-slide-up">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{term.fullDef}</p>
          {term.relatedTerms?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-xs text-gray-400 dark:text-gray-500">Related:</span>
              {term.relatedTerms.map(r => (
                <span key={r} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                  {r.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
