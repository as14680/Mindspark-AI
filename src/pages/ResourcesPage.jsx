import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import ResourceCard from '../components/resources/ResourceCard'
import { RESOURCES } from '../data/resources'
import { useUserStore } from '../store/useUserStore'

const TYPES = ['all', 'video', 'course', 'article', 'paper', 'tool', 'book']

export default function ResourcesPage() {
  const [type, setType]         = useState('all')
  const [search, setSearch]     = useState('')
  const [showSaved, setShowSaved] = useState(false)
  const savedResources = useUserStore(s => s.savedResources)

  const featured = RESOURCES.filter(r => r.isFeatured)
  const filtered = RESOURCES.filter(r => {
    const matchType   = type === 'all' || r.type === type
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
    const matchSaved  = !showSaved || savedResources.includes(r.id)
    return matchType && matchSearch && matchSaved
  })

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Resources</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Curated links to the best AI learning materials on the internet.</p>
        </div>

        {/* Featured */}
        {!search && !showSaved && type === 'all' && (
          <div className="mb-8">
            <h2 className="font-bold text-gray-900 dark:text-white mb-3">⭐ Featured Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-brand-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            onClick={() => setShowSaved(s => !s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0 ${
              showSaved
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            🔖 Saved ({savedResources.length})
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                type === t
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <h2 className="font-bold text-gray-900 dark:text-white mb-3">
          {showSaved ? 'Saved Resources' : 'All Resources'} ({filtered.length})
        </h2>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-4xl mb-3">📭</p>
            <p>{showSaved ? 'No saved resources yet.' : 'No resources match your filters.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
          </div>
        )}
      </div>
    </AppShell>
  )
}
