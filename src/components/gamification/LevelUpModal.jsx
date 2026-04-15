export default function LevelUpModal({ level, onClose }) {
  if (!level) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 max-w-sm w-full mx-4 text-center shadow-2xl animate-pop border border-gray-100 dark:border-gray-800">
        <div className="text-6xl mb-4">🎉</div>
        <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-1">Level Up!</p>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Level {level.level}</h2>
        <p className="text-xl font-semibold mb-6" style={{ color: level.color }}>{level.name}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">You've reached a new level. Keep learning to unlock more!</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: level.color }}
        >
          Continue Learning
        </button>
      </div>
    </div>
  )
}
