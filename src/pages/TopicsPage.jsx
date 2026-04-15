import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import TopicCard from '../components/topics/TopicCard'
import CategoryFilter from '../components/topics/CategoryFilter'
import { TOPICS } from '../data/topics'

export default function TopicsPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = TOPICS.filter(t => {
    const matchCat    = category === 'all' || t.category === category
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.tagline.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learn AI</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Explore topics and build your AI knowledge from the ground up.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-brand-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <div className="mb-5">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">No topics match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(topic => <TopicCard key={topic.id} topic={topic} />)}
          </div>
        )}
      </div>
    </AppShell>
  )
}
