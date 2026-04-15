import AppShell from '../components/layout/AppShell'
import WelcomeBanner from '../components/dashboard/WelcomeBanner'
import QuickStats from '../components/dashboard/QuickStats'
import XPProgressBar from '../components/dashboard/XPProgressBar'
import StreakCard from '../components/dashboard/StreakCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import TopicCard from '../components/topics/TopicCard'
import { TOPICS } from '../data/topics'
import { useUserStore } from '../store/useUserStore'

export default function Dashboard() {
  const completedLessons = useUserStore(s => s.completedLessons)

  // Show topics with most progress (or first 3 if no progress)
  const sorted = [...TOPICS].sort((a, b) => {
    const aDone = a.lessons.filter(l => completedLessons[l.id]).length
    const bDone = b.lessons.filter(l => completedLessons[l.id]).length
    return bDone - aDone
  }).slice(0, 3)

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-5">
        <WelcomeBanner />
        <QuickStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <XPProgressBar />
          <StreakCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <h2 className="font-bold text-gray-900 mb-3">Continue Learning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sorted.map(topic => <TopicCard key={topic.id} topic={topic} />)}
            </div>
          </div>
          <RecentActivity />
        </div>
      </div>
    </AppShell>
  )
}
