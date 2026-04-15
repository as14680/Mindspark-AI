import { useState, useMemo } from 'react'
import AppShell from '../components/layout/AppShell'
import TermCard from '../components/glossary/TermCard'
import { GLOSSARY } from '../data/glossary'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossaryPage() {
  const [search, setSearch] = useState('')

  const sorted = useMemo(() =>
    [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term)),
  [])

  const filtered = search
    ? sorted.filter(t =>
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.shortDef.toLowerCase().includes(search.toLowerCase())
      )
    : sorted

  const grouped = useMemo(() => {
    if (search) return null
    const g = {}
    sorted.forEach(t => {
      const letter = t.term[0].toUpperCase()
      if (!g[letter]) g[letter] = []
      g[letter].push(t)
    })
    return g
  }, [sorted, search])

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Glossary</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {GLOSSARY.length} essential AI terms, explained clearly.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-brand-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* Alpha index */}
        {!search && (
          <div className="flex flex-wrap gap-1 mb-6">
            {ALPHABET.map(letter => {
              const hasTerms = grouped?.[letter]
              return (
                <a
                  key={letter}
                  href={hasTerms ? `#letter-${letter}` : undefined}
                  className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition-colors ${
                    hasTerms
                      ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-default'
                  }`}
                >
                  {letter}
                </a>
              )
            })}
          </div>
        )}

        {/* Terms */}
        {search ? (
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <p className="text-4xl mb-3">🔍</p>
                <p>No terms match "{search}"</p>
              </div>
            ) : filtered.map(term => <TermCard key={term.id} term={term} />)}
          </div>
        ) : (
          <div className="space-y-8">
            {ALPHABET.map(letter => {
              const terms = grouped?.[letter]
              if (!terms) return null
              return (
                <div key={letter} id={`letter-${letter}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-brand-600 dark:text-brand-400">{letter}</h2>
                    <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">{terms.length} terms</span>
                  </div>
                  <div className="space-y-2">
                    {terms.map(term => <TermCard key={term.id} term={term} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AppShell>
  )
}
