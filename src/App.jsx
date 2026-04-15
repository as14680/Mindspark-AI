import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TopicsPage from './pages/TopicsPage'
import TopicDetail from './pages/TopicDetail'
import LessonPage from './pages/LessonPage'
import GlossaryPage from './pages/GlossaryPage'
import QuizPage from './pages/QuizPage'
import ResourcesPage from './pages/ResourcesPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                                           element={<Dashboard />} />
        <Route path="/topics"                                     element={<TopicsPage />} />
        <Route path="/topics/:topicId"                           element={<TopicDetail />} />
        <Route path="/topics/:topicId/lessons/:lessonId"         element={<LessonPage />} />
        <Route path="/glossary"                                   element={<GlossaryPage />} />
        <Route path="/quiz"                                       element={<QuizPage />} />
        <Route path="/quiz/:topicId"                             element={<QuizPage />} />
        <Route path="/resources"                                  element={<ResourcesPage />} />
        <Route path="/profile"                                    element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}
