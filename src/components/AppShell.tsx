import { useMemo, useState } from 'react'
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import {
  Brain,
  Flame,
  LayoutDashboard,
  MessageCircle,
  Menu,
  PenLine,
  Route as RouteIcon,
  Settings,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react'
import { useApp } from '../store'
import { buildPath, levelFromCompleted, pathProgress } from '../lib/path'
import { isoDay, levelLabel, levelNum } from '../lib/levels'
import { Logo } from './ui'

const navItems = [
  { to: '/app', label: 'Panel', icon: LayoutDashboard, end: true },
  { to: '/app/path', label: 'Mi ruta', icon: RouteIcon },
  { to: '/app/practice', label: 'Práctica', icon: Brain },
  { to: '/app/writing', label: 'Writing Lab', icon: PenLine },
  { to: '/app/chat', label: 'Chat', icon: MessageCircle },
  { to: '/app/progress', label: 'Progreso', icon: TrendingUp },
]

export function AppShell() {
  const { state } = useApp()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const plan = useMemo(
    () => (state.placement && state.profile ? buildPath(state.placement, state.profile) : null),
    [state.placement, state.profile],
  )

  if (!state.profile) return <Navigate to="/start" replace />
  if (!state.placement) return <Navigate to="/test" replace />

  const progress = plan ? pathProgress(plan, state.progress.completedLessons) : { done: 0, total: 0, percent: 0 }
  const currentLevel = plan ? levelFromCompleted(plan, state.progress.completedLessons) : state.placement.overall
  const remaining = Math.max(0, levelNum.C1 - levelNum[currentLevel])

  const close = () => setOpen(false)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar-head">
          <NavLink to="/app" onClick={close} className="brand-link">
            <Logo light />
          </NavLink>
          <button type="button" className="sidebar-close" onClick={close} aria-label="Cerrar menú">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-level">
          <div className="sidebar-level-top">
            <span>Nivel actual</span>
            <span className="sidebar-dot" />
          </div>
          <div className="sidebar-level-main">
            <strong>{currentLevel}</strong>
            <div>
              <span>{levelLabel[currentLevel]}</span>
              <small>{remaining === 0 ? 'Objetivo alcanzado' : `${remaining} nivel${remaining === 1 ? '' : 'es'} hasta C1`}</small>
            </div>
          </div>
          <div className="sidebar-progress">
            <div className="sidebar-progress-head">
              <span>Ruta completada</span>
              <span>{progress.percent}%</span>
            </div>
            <div className="bar-track bar-track-dark">
              <div className="bar-fill bar-fill-lime" style={{ width: `${Math.max(2, progress.percent)}%` }} />
            </div>
            <small>
              {progress.done} de {progress.total} lecciones
            </small>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Principal">
          <span className="sidebar-eyebrow">Tu espacio</span>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={close}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
                {item.to === '/app/practice' && progress.done > 0 && <span className="nav-count">{state.progress.srs.filter((card) => card.due <= isoDay()).length || ''}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-streak">
            <span className="streak-flame">
              <Flame size={18} />
            </span>
            <div>
              <strong>{state.progress.streak} días</strong>
              <span>racha actual</span>
            </div>
            <span className="xp-pill">{state.progress.xp} XP</span>
          </div>
          <NavLink to="/app/settings" onClick={close} className={({ isActive }) => `nav-link nav-link-settings ${isActive ? 'active' : ''}`}>
            <span className="avatar">{state.profile.name.slice(0, 1).toUpperCase()}</span>
            <span className="nav-profile">
              <strong>{state.profile.name}</strong>
              <small>Ajustes y perfil</small>
            </span>
            <Settings size={17} />
          </NavLink>
        </div>
      </aside>

      {open && <button type="button" className="sidebar-overlay" onClick={close} aria-label="Cerrar menú" />}

      <div className="app-main">
        <header className="mobile-topbar">
          <button type="button" className="icon-btn" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu size={22} />
          </button>
          <Logo />
          <span className="mobile-streak">
            <Flame size={16} /> {state.progress.streak}
          </span>
        </header>
        <div className="mobile-nav">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                <Icon size={19} />
                <span>{item.label === 'Writing Lab' ? 'Writing' : item.label}</span>
              </NavLink>
            )
          })}
        </div>

        <main className={`page ${location.pathname.includes('/lesson/') ? 'page-lesson' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function AppBadge() {
  return (
    <span className="app-badge">
      <Sparkles size={13} /> Ruta C1
    </span>
  )
}
