# ⚡ Mindspark AI — AI Learning Platform

> A gamified web app to learn everything about Artificial Intelligence — from core concepts to cutting-edge research.

---

## What is Mindspark AI?

Mindspark AI is an interactive, self-paced learning platform designed to help anyone — from complete beginners to seasoned developers — build a strong foundation in Artificial Intelligence. It combines structured lessons, a searchable glossary, quizzes, and curated resources with a full gamification system to make learning engaging and rewarding.

All progress is stored locally in your browser. No account or login required.

---

## Features

### 📚 Learn
- **8 AI topics** covering the full landscape of modern AI:
  - What is AI?
  - Machine Learning Basics
  - Neural Networks
  - NLP Fundamentals
  - Generative AI
  - Computer Vision
  - AI Ethics & Safety
  - Tools & Frameworks
- Each topic has **3 structured lessons** with rich content — explanations, callouts, key points, and code examples
- Lessons unlock sequentially — complete one to unlock the next

### 📖 Glossary
- **50+ essential AI terms** with short and full definitions
- A–Z index for quick navigation
- Live search across all terms
- Related terms linked per entry
- Expanding term cards — click to reveal the full definition

### 🎯 Quizzes
- **5-question multiple choice quiz** per topic
- Instant feedback after each answer with a clear explanation
- Score summary with star rating (1–3 stars)
- XP rewards based on performance
- Retry as many times as you like

### 🔗 Resources
- **20 curated links** to the best AI learning materials on the internet — videos, courses, papers, tools, and books
- Filter by content type (video, course, article, paper, tool, book)
- Save resources to your personal library with one click
- Featured resources highlighted for quick discovery

### 🏆 Gamification
- **XP Points** — earned for completing lessons, passing quizzes, looking up glossary terms, and saving resources
- **10 Levels** — progress from *Curious Mind* all the way to *Singularity*
- **18 Badges** — unlock achievements for milestones, streaks, perfect scores, and more
- **Daily Streaks** — log in and learn every day to maintain your streak
- **Streak Multipliers** — earn bonus XP at 3, 7, 14, and 30-day streaks (up to 2×)
- **Level-Up Modal** — full-screen celebration when you reach a new level
- **XP Toast Notifications** — see your XP earned in real time

### 👤 Profile
- Personal dashboard with full stats: XP, level, streak, badges, lessons, topics, quizzes
- Edit your display name
- Full badge collection view (locked badges shown greyed out)
- Quiz history with best scores
- 30-day activity heatmap
- Reset progress option (with confirmation)

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | React 18 + Vite                   |
| Styling     | Tailwind CSS 3 + Inter font       |
| Routing     | React Router v6                   |
| State       | Zustand with localStorage persist |
| Animations  | CSS keyframes                     |
| Icons/Emoji | Native emoji (no icon dependency) |

No backend. No database. No authentication. Everything runs in the browser.

---

## Getting Started

### Prerequisites
- Node.js 18+ (install via `brew install node` on Mac)

### Run locally

```bash
git clone https://github.com/as14680/Mindspark-AI.git
cd Mindspark-AI
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── data/            # Static content (topics, glossary, quizzes, resources, gamification config)
├── store/           # Zustand store — all user state persisted to localStorage
├── pages/           # Route-level page components (Dashboard, Topics, Lesson, Quiz, etc.)
├── components/
│   ├── layout/      # AppShell, Sidebar, Topbar
│   ├── dashboard/   # WelcomeBanner, QuickStats, StreakCard, XPProgressBar, RecentActivity
│   ├── topics/      # TopicCard, CategoryFilter
│   ├── lesson/      # LessonContent (block renderer)
│   ├── quiz/        # QuizCard, AnswerOption, FeedbackOverlay, QuizSummary, QuizProgress
│   ├── glossary/    # TermCard
│   ├── resources/   # ResourceCard
│   └── gamification/# BadgeCard, XPToast, LevelUpModal
└── utils/           # cn() helper
```

---

## Gamification Rules

### XP Rewards

| Action                    | XP Earned                          |
|---------------------------|-------------------------------------|
| Complete a lesson         | +30 XP (base)                      |
| Pass a quiz (≥70%)        | +60 XP                             |
| Perfect quiz score (100%) | +100 XP                            |
| Attempt a quiz (<70%)     | +20 XP                             |
| Look up glossary terms    | +2 XP (every 5 terms)              |
| Save a resource           | +5 XP                              |
| Daily login bonus         | +15 XP (once per calendar day)     |

### Streak Multipliers

| Streak         | XP Multiplier |
|----------------|---------------|
| 1–2 days       | 1.0× (base)   |
| 3–6 days       | 1.1×          |
| 7–13 days      | 1.25×         |
| 14–29 days     | 1.5×          |
| 30+ days       | 2.0×          |

### Levels

| Level | Name             | XP Required |
|-------|------------------|-------------|
| 1     | Curious Mind     | 0           |
| 2     | AI Apprentice    | 100         |
| 3     | Data Explorer    | 300         |
| 4     | Pattern Seeker   | 600         |
| 5     | Model Builder    | 1,000       |
| 6     | Neural Architect | 1,600       |
| 7     | Deep Learner     | 2,400       |
| 8     | AI Researcher    | 3,500       |
| 9     | Machine Mind     | 5,000       |
| 10    | Singularity      | 7,000       |

### Badges

| Badge              | How to Unlock                          | Rarity    |
|--------------------|----------------------------------------|-----------|
| 🚀 Early Adopter   | Granted on first launch                | Legendary |
| 👣 First Step      | Complete your first lesson             | Common    |
| ⚡ Getting Momentum | Complete 10 lessons                   | Common    |
| 🧠 Knowledge Machine| Complete 50 lessons                  | Rare      |
| 📋 Quiz Taker      | Complete your first quiz               | Common    |
| ⭐ Perfectionist    | Score 100% on any quiz                | Rare      |
| 🏆 Quiz Champion   | Complete 5 quizzes                     | Rare      |
| 🔥 Consistent      | Maintain a 3-day streak                | Common    |
| 📅 Week Warrior    | Maintain a 7-day streak                | Rare      |
| 🛡️ Unstoppable     | Maintain a 30-day streak               | Legendary |
| 📖 Topic Master    | Complete any full topic                | Common    |
| 🎯 Well Rounded    | Complete 5 different topics            | Rare      |
| 📚 Word Nerd       | Look up 10 glossary terms              | Common    |
| 🏅 Halfway There   | Reach Level 5 (Model Builder)          | Rare      |
| ✨ Singularity Reached | Reach Level 10                    | Legendary |
| 🦉 Night Owl       | Complete a lesson after midnight       | Rare      |
| 💨 Speed Learner   | Complete 3 lessons in one session      | Rare      |
| 🔖 Bookworm        | Save 5 resources to your library       | Common    |

---

## Data & Privacy

- All data is stored in your browser's `localStorage` under the key `mindspark_user`
- No data is ever sent to any server
- You can reset all progress from the Profile page at any time

---

## Contributing

Contributions are welcome. To add new topics, lessons, glossary terms, quizzes, or resources, edit the files in `src/data/`. All content is plain JavaScript objects — no database required.

---

## License

MIT
