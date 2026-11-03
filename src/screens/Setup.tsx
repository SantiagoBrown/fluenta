import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Clock3,
  Code2,
  Globe2,
  HeartPulse,
  LineChart,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { useApp } from '../store'
import { makeProfile } from '../lib/store'
import { tracks } from '../data/tracks'
import type { TrackId } from '../types'
import { Logo } from '../components/ui'

const trackIcons: Record<string, ReactNode> = {
  Code2: <Code2 size={20} />,
  Briefcase: <Briefcase size={20} />,
  LineChart: <LineChart size={20} />,
  HeartPulse: <HeartPulse size={20} />,
  Megaphone: <Megaphone size={20} />,
  Globe2: <Globe2 size={20} />,
}

const hourOptions = [
  { value: 3, label: '3 h', hint: 'Ritmo ligero' },
  { value: 5, label: '5 h', hint: 'Constante' },
  { value: 8, label: '8 h', hint: 'Intensivo' },
  { value: 12, label: '12 h', hint: 'Inmersión' },
]

const motivations = [
  'Trabajar con equipos internacionales',
  'Preparar una entrevista o ascenso',
  'Escribir mejor en mi trabajo',
  'Presentar y negociar con confianza',
  'Mudarme al extranjero',
]

export default function Setup() {
  const { state, setProfile } = useApp()
  const navigate = useNavigate()
  const existing = state.profile
  const [name, setName] = useState(existing?.name ?? '')
  const [role, setRole] = useState(existing?.role ?? '')
  const [track, setTrack] = useState<TrackId>(existing?.track ?? 'tech')
  const [weeklyHours, setWeeklyHours] = useState(existing?.weeklyHours ?? 5)
  const [motivation, setMotivation] = useState(existing?.motivation ?? motivations[0])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setProfile(
      makeProfile({
        name: name.trim() || 'Alex',
        role: role.trim(),
        track,
        weeklyHours,
        motivation,
        createdAt: existing?.createdAt,
      }),
    )
    navigate('/test')
  }

  return (
    <div className="setup-page">
      <header className="setup-nav">
        <Link to="/" className="brand-link">
          <Logo />
        </Link>
        {state.placement && (
          <Link to="/app" className="btn btn-ghost btn-sm">
            Volver a mi panel
          </Link>
        )}
      </header>

      <div className="setup-layout">
        <div className="setup-main">
          <Link to="/" className="back-link">
            <ArrowLeft size={15} /> Inicio
          </Link>
          <span className="eyebrow">Paso 1 · Tu contexto</span>
          <h1>
            Antes de medir tu inglés,
            <br />
            <em>háblame de tu trabajo.</em>
          </h1>
          <p className="setup-lead">
            No es un formulario para venderte nada. Es lo que nos permite priorizar el vocabulario, los escenarios y
            el orden de tu ruta.
          </p>

          <form onSubmit={submit} className="setup-form">
            <div className="form-row">
              <label className="field">
                <span>¿Cómo te llamas?</span>
                <div className="chip-grid name-presets">
                  {['Santiago Benavidez Ramirez', 'Elizabeth Cuervo Poveda'].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      className={`choice-chip ${name === preset ? 'selected' : ''}`}
                      onClick={() => setName(preset)}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                />
              </label>
              <label className="field">
                <span>
                  Tu rol <em>(opcional)</em>
                </span>
                <input
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  placeholder="Ej. Product manager"
                  autoComplete="organization-title"
                />
              </label>
            </div>

            <div className="field">
              <span>¿Cuál es tu sector?</span>
              <div className="track-grid">
                {tracks.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`track-option ${track === item.id ? 'selected' : ''}`}
                    onClick={() => setTrack(item.id)}
                  >
                    <span className="track-icon">{trackIcons[item.icon]}</span>
                    <span>
                      <strong>{item.short}</strong>
                      <small>{item.scenarios[0]}</small>
                    </span>
                    {track === item.id && (
                      <span className="track-check">
                        <Check size={13} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <small className="field-hint">{tracks.find((item) => item.id === track)?.description}</small>
            </div>

            <div className="field">
              <span>¿Cuánto tiempo real puedes dedicar por semana?</span>
              <div className="segmented">
                {hourOptions.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    className={weeklyHours === item.value ? 'selected' : ''}
                    onClick={() => setWeeklyHours(item.value)}
                  >
                    <strong>{item.label}</strong>
                    <small>{item.hint}</small>
                  </button>
                ))}
              </div>
              <small className="field-hint">
                Usaremos esta cifra para calcular una fecha realista, no para prometerte milagros.
              </small>
            </div>

            <div className="field">
              <span>¿Qué te trae aquí?</span>
              <div className="chip-grid">
                {motivations.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`choice-chip ${motivation === item ? 'selected' : ''}`}
                    onClick={() => setMotivation(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg setup-submit">
              Ir al test de nivel
              <ArrowRight size={18} />
            </button>
            <p className="form-privacy">
              <ShieldCheck size={14} /> Sin cuenta, sin correo. Todo se guarda en este navegador.
            </p>
          </form>
        </div>

        <aside className="setup-aside">
          <div className="setup-card-dark">
            <span className="mini-label">Tu test de nivel</span>
            <h2>
              20 minutos para saber
              <br />
              <em>dónde empezar.</em>
            </h2>
            <div className="setup-steps">
              <div>
                <span>01</span>
                <div>
                  <strong>Adaptativo</strong>
                  <small>16 preguntas de gramática y vocabulario</small>
                </div>
                <em>6 min</em>
              </div>
              <div>
                <span>02</span>
                <div>
                  <strong>Comprensión</strong>
                  <small>Un texto y un audio de tu nivel estimado</small>
                </div>
                <em>8 min</em>
              </div>
              <div>
                <span>03</span>
                <div>
                  <strong>Escritura</strong>
                  <small>Una tarea breve con corrección por criterios</small>
                </div>
                <em>5 min</em>
              </div>
            </div>
            <div className="setup-card-foot">
              <Clock3 size={16} />
              <span>Puedes hacerlo de una vez o volver más tarde.</span>
            </div>
          </div>

          <div className="setup-card-light">
            <span className="setup-badge">
              <Sparkles size={14} /> Lo que recibirás
            </span>
            <ul>
              <li>
                <Check size={15} /> Tu nivel MCER global y por habilidad
              </li>
              <li>
                <Check size={15} /> Fortalezas y brechas concretas
              </li>
              <li>
                <Check size={15} /> Una ruta desde tu nivel hasta C1
              </li>
              <li>
                <Check size={15} /> Una estimación de semanas según tu carga
              </li>
            </ul>
            <div className="setup-mini-quote">
              <Target size={18} />
              <p>“El objetivo no es estudiar inglés. Es poder usarlo cuando importa.”</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
