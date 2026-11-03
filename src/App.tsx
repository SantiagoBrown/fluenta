import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import Landing from './screens/Landing'
import Setup from './screens/Setup'
import Placement from './screens/Placement'
import Results from './screens/Results'
import Dashboard from './screens/Dashboard'
import Path from './screens/Path'
import LessonScreen from './screens/Lesson'
import Practice from './screens/Practice'
import WritingLab from './screens/WritingLab'
import Progress from './screens/Progress'
import Settings from './screens/Settings'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/start" element={<Setup />} />
        <Route path="/test" element={<Placement />} />
        <Route path="/results" element={<Results />} />

        <Route path="/app" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="path" element={<Path />} />
          <Route path="lesson/:lessonId" element={<LessonScreen />} />
          <Route path="practice" element={<Practice />} />
          <Route path="writing" element={<WritingLab />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
