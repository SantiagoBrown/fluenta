import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, Square, Volume2 } from 'lucide-react'
import { SKILLS, SKILL_SHORT } from '../types'
import type { CEFR, Skill } from '../types'
import { levelLabel, levelNum } from '../lib/levels'
import { speak, stopSpeech } from '../lib/speech'

export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <span className={`logo ${light ? 'logo-light' : ''}`} aria-label="Fluenta">
      <span className="logo-mark">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M7 25V7h17v4.2H11.6v3.4h10.2v4.1H11.6V25H7Z" fill="currentColor" />
          <circle cx="25.5" cy="9.5" r="2.5" fill="currentColor" opacity=".55" />
        </svg>
      </span>
      {!compact && (
        <span className="logo-type">
          fluenta<span className="logo-dot">.</span>
        </span>
      )}
    </span>
  )
}

export function LevelChip({ level, subtle = false }: { level: CEFR; subtle?: boolean }) {
  return (
    <span className={`level-chip ${subtle ? 'level-chip-subtle' : ''}`}>
      <strong>{level}</strong>
      <span>{levelLabel[level]}</span>
    </span>
  )
}

export function ProgressRing({
  value,
  size = 120,
  stroke = 9,
  label,
  sublabel,
}: {
  value: number
  size?: number
  stroke?: number
  label?: string
  sublabel?: string
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="ring-progress"
        />
      </svg>
      <div className="ring-label">
        <strong>{label ?? `${Math.round(value)}%`}</strong>
        {sublabel && <span>{sublabel}</span>}
      </div>
    </div>
  )
}

export function RadarChart({
  scores,
  size = 320,
  showLabels = true,
}: {
  scores: Record<Skill, number>
  size?: number
  showLabels?: boolean
}) {
  const width = size
  const height = size
  const cx = size / 2
  const cy = size / 2 + 4
  const radius = size * 0.31
  const keys = SKILLS
  const angle = (index: number) => -Math.PI / 2 + (index * Math.PI * 2) / keys.length

  const point = (index: number, value: number) => {
    const r = radius * (value / 100)
    return [cx + Math.cos(angle(index)) * r, cy + Math.sin(angle(index)) * r]
  }

  const polygon = (value: number) =>
    keys.map((_, index) => point(index, value).join(',')).join(' ')

  const dataPolygon = keys.map((key, index) => point(index, scores[key]).join(',')).join(' ')

  const labelPos = (index: number) => {
    const r = radius + 30
    const x = cx + Math.cos(angle(index)) * r
    const y = cy + Math.sin(angle(index)) * r
    const cos = Math.cos(angle(index))
    const anchor: 'middle' | 'start' | 'end' = Math.abs(cos) < 0.25 ? 'middle' : cos > 0 ? 'start' : 'end'
    return { x, y, anchor }
  }

  return (
    <svg className="radar" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Perfil de habilidades">
      {[25, 50, 75, 100].map((level) => (
        <polygon key={level} points={polygon(level)} fill="none" stroke="currentColor" strokeOpacity={level === 100 ? 0.22 : 0.1} strokeWidth="1" />
      ))}
      {keys.map((key, index) => {
        const [x, y] = point(index, 100)
        return <line key={key} x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" strokeOpacity=".1" />
      })}
      <polygon points={dataPolygon} fill="var(--lime)" fillOpacity=".38" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      {keys.map((key, index) => {
        const [x, y] = point(index, scores[key])
        return <circle key={key} cx={x} cy={y} r="3.5" fill="var(--ink)" />
      })}
      {showLabels &&
        keys.map((key, index) => {
          const { x, y, anchor } = labelPos(index)
          return (
            <g key={key}>
              <text x={x} y={y - 2} textAnchor={anchor} className="radar-label">
                {SKILL_SHORT[key]}
              </text>
              <text x={x} y={y + 12} textAnchor={anchor} className="radar-value">
                {Math.round(scores[key])}
              </text>
            </g>
          )
        })}
    </svg>
  )
}

export function SkillBars({ scores, levels }: { scores: Record<Skill, number>; levels?: Record<Skill, CEFR> }) {
  return (
    <div className="skill-bars">
      {SKILLS.map((skill) => (
        <div className="skill-bar" key={skill}>
          <div className="skill-bar-head">
            <span>{SKILL_SHORT[skill]}</span>
            <span className="skill-bar-value">
              {levels?.[skill] ?? ''} <em>{Math.round(scores[skill])}</em>
            </span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${Math.max(3, Math.min(100, scores[skill]))}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AudioButton({
  text,
  rate = 0.95,
  label = 'Escuchar',
  variant = 'ghost',
}: {
  text: string
  rate?: number
  label?: string
  variant?: 'ghost' | 'solid' | 'small'
}) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => () => stopSpeech(), [])

  const toggle = async () => {
    if (playing) {
      stopSpeech()
      setPlaying(false)
      return
    }
    setPlaying(true)
    await speak(text, rate)
    setPlaying(false)
  }

  if (variant === 'small') {
    return (
      <button type="button" className="audio-mini" onClick={toggle} aria-label={label} title={label}>
        {playing ? <Square size={12} /> : <Volume2 size={14} />}
      </button>
    )
  }

  return (
    <button type="button" className={`audio-btn audio-${variant} ${playing ? 'is-playing' : ''}`} onClick={toggle}>
      {playing ? <Square size={16} /> : <Volume2 size={18} />}
      <span>{playing ? 'Detener' : label}</span>
    </button>
  )
}

export function Stat({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: string; accent?: boolean }) {
  return (
    <div className={`stat ${accent ? 'stat-accent' : ''}`}>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  )
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  sub?: string
  action?: ReactNode
}) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  )
}

export function LevelLadder({ current, compact = false }: { current: CEFR; compact?: boolean }) {
  return (
    <div className={`ladder ${compact ? 'ladder-compact' : ''}`}>
      {(['A1', 'A2', 'B1', 'B2', 'C1'] as CEFR[]).map((level) => {
        const state = levelNum[level] < levelNum[current] ? 'done' : level === current ? 'current' : 'next'
        return (
          <div className={`ladder-step ${state}`} key={level}>
            <span className="ladder-dot">{state === 'done' ? '✓' : level}</span>
            {!compact && <span className="ladder-label">{levelLabel[level]}</span>}
          </div>
        )
      })}
    </div>
  )
}

export function NextButton({ children, onClick, disabled }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {children}
      <ArrowRight size={17} />
    </button>
  )
}

export function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  )
}

export function Waveform({ active = false, bars = 28 }: { active?: boolean; bars?: number }) {
  return (
    <div className={`waveform ${active ? 'waveform-active' : ''}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, index) => (
        <span key={index} style={{ height: `${18 + ((index * 37) % 62)}%` }} />
      ))}
    </div>
  )
}

export function Tag({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'lime' | 'coral' | 'dark' }) {
  return <span className={`tag tag-${tone}`}>{children}</span>
}
