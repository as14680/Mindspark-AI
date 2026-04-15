import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useUserStore } from '../../store/useUserStore'
import XPToast from '../gamification/XPToast'
import LevelUpModal from '../gamification/LevelUpModal'

export default function AppShell({ children }) {
  const xpToast = useUserStore(s => s.xpToast)
  const levelUpPending = useUserStore(s => s.levelUpPending)
  const clearLevelUp = useUserStore(s => s.clearLevelUp)

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      {xpToast && <XPToast />}
      {levelUpPending && <LevelUpModal level={levelUpPending} onClose={clearLevelUp} />}
    </div>
  )
}
