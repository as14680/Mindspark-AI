import { useEffect } from 'react'
import { useUserStore } from '../../store/useUserStore'

export default function XPToast() {
  const xpToast = useUserStore(s => s.xpToast)
  const clearXPToast = useUserStore(s => s.clearXPToast)

  useEffect(() => {
    if (!xpToast) return
    const t = setTimeout(clearXPToast, 2500)
    return () => clearTimeout(t)
  }, [xpToast])

  if (!xpToast) return null

  return (
    <div className="fixed bottom-6 right-6 animate-slide-up z-50">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
        <span className="text-xl">⚡</span>
        <div>
          <p className="font-bold text-yellow-400">+{xpToast.amount} XP</p>
          {xpToast.label && <p className="text-xs text-gray-400">{xpToast.label}</p>}
          {xpToast.multiplier > 1 && (
            <p className="text-xs text-orange-400">🔥 {xpToast.multiplier}x streak bonus!</p>
          )}
        </div>
      </div>
    </div>
  )
}
