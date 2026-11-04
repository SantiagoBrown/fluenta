import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Check,
  Code2,
  Download,
  Globe2,
  HeartPulse,
  LineChart,
  Megaphone,
  RotateCcw,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  Volume2,
} from 'lucide-react'
import { useApp } from '../store'
import { tracks } from '../data/tracks'
import type { ReactNode } from 'react'
import type { TrackId } from '../types'
import { AudioButton } from '../components/ui'

const trackIcons: Record<string, ReactNode> = {
  Code2: <Code2 size={19} />,
  Briefcase: <Briefcase size={19} />,
  LineChart: <LineChart size={19} />,
  HeartPulse: <HeartPulse size={19} />,
  Megaphone: <Megaphone size={19} />,
  Globe2: <Globe2 size={19} />,
}

const hourOptions = [
  { value: 3, label: '3 h', hint: 'Ritmo ligero' },
  { value: 5, label: '5 h', hint: 'Constante' },
  { value: 8, label: '8 h', hint: 'Intensivo' },
  { value: 12, label: '12 h', hint: 'Inmersión' },
]

const voiceSamples = [
  'This is how your lessons will sound. Clear, natural and at your own pace.',
  'Let’s review the agenda before the meeting starts.',
  'Could you walk me through the main risks of this proposal?',
]

export default function Settings() {
  const { state, updateProfile, updateSettings, resetAll, activeUser, switchUser, exportData, importData } = useApp()
  const profile = state.profile!

  const [name, setName] = useState(profile.name)
  const [role, setRole] = useState(profile.role)
  const [track, setTrack] = useState<TrackId>(profile.track)
  const [weeklyHours, setWeeklyHours] = useState(profile.weeklyHours)
  const [motivation, setMotivation] = useState(profile.motivation)
  const [voiceRate, setVoiceRate] = useState(state.settings.voiceRate)
  const [autoPlay, setAutoPlay] = useState(state.settings.autoPlay)
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [importMessage, setImportMessage] = useState('')

  const sample = voiceSamples[Math.round((voiceRate - 0.6) * 4) % voiceSamples.length]

  const exportFile = () => {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `fluenta-progreso-${activeUser}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const success = importData(String(reader.result ?? ''))
      setImportMessage(success ? 'Datos importados correctamente.' : 'No se pudo importar el archivo.')
      window.setTimeout(() => setImportMessage(''), 3000)
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const save = (event: FormEvent) => {
    event.preventDefault()
    updateProfile({
      name: name.trim() || profile.name,
      role: role.trim(),
      track,
      weeklyHours,
      motivation,
    })
    updateSettings({ voiceRate, autoPlay })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2600)
  }

  return (
    <div className="settings-page">
      <header className="page-head">
        <div>
          <span className="eyebrow">
            <SlidersHorizontal size={14} /> Ajustes y perfil
          </span>
          <h1>
            Tu contexto.
            <br />
            <em>Tu ritmo.</em>
          </h1>
          <p>
            Todo lo que ajustas aquí cambia el vocabulario, los escenarios y la estimación de semanas de tu ruta.
            Nada se envía a ningún servidor.
          </p>
        </div>
        <div className="settings-head-card">
          <span className="avatar avatar-large">{profile.name.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{profile.name}</strong>
            <span>{profile.role || 'Sin rol definido'}</span>
            <small>
              <ShieldCheck size={13} /> Datos solo en este navegador
            </small>
          </div>
        </div>
      </header>

      <form onSubmit={save} className="settings-grid">
        <div className="settings-main">
          <section className="panel settings-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Perfil</span>
                <h2>Cómo te llamamos y qué haces</h2>
              </div>
              <span className="settings-section-icon">
                <UserRound size={19} />
              </span>
            </div>

            <div className="form-row">
              <label className="field">
                <span>Nombre</span>
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" />
              </label>
              <label className="field">
                <span>Rol profesional</span>
                <input
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  placeholder="Ej. Product manager"
                />
              </label>
            </div>

            <label className="field">
              <span>¿Qué te trae aquí?</span>
              <input
                value={motivation}
                onChange={(event) => setMotivation(event.target.value)}
                placeholder="Tu objetivo principal"
              />
              <small className="field-hint">Lo usamos para recordarte por qué empezaste, no para enviarte correos.</small>
            </label>
          </section>

          <section className="panel settings-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Sector</span>
                <h2>El inglés de tu trabajo</h2>
              </div>
              <span className="settings-section-icon">
                <Briefcase size={19} />
              </span>
            </div>
            <div className="track-grid track-grid-settings">
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
            <small className="field-hint">
              {tracks.find((item) => item.id === track)?.description}
            </small>
          </section>

          <section className="panel settings-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Carga semanal</span>
                <h2>Cuánto tiempo real tienes</h2>
              </div>
              <span className="settings-section-icon">
                <Sparkles size={19} />
              </span>
            </div>
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
              Al guardar, la estimación de semanas y el plan diario se recalculan con esta carga.
            </small>
          </section>

          <section className="panel settings-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Audio</span>
                <h2>Voz de las lecciones</h2>
              </div>
              <span className="settings-section-icon">
                <Volume2 size={19} />
              </span>
            </div>

            <div className="voice-row">
              <label className="field voice-field">
                <span>
                  Velocidad de la voz <strong>{voiceRate.toFixed(2)}×</strong>
                </span>
                <input
                  type="range"
                  min="0.6"
                  max="1.2"
                  step="0.05"
                  value={voiceRate}
                  onChange={(event) => setVoiceRate(Number(event.target.value))}
                />
                <div className="range-labels">
                  <span>Más lenta</span>
                  <span>Natural</span>
                  <span>Más rápida</span>
                </div>
              </label>
              <AudioButton text={sample} rate={voiceRate} label="Probar voz" variant="solid" />
            </div>

            <div className="toggle-list">
              <button
                type="button"
                className={`toggle-row ${autoPlay ? 'on' : ''}`}
                onClick={() => setAutoPlay((value) => !value)}
                aria-pressed={autoPlay}
              >
                <span>
                  <strong>Reproducir audio automáticamente</strong>
                  <small>En lecciones con listening, empieza sin pulsar play.</small>
                </span>
                <span className="switch" aria-hidden="true">
                  <i />
                </span>
              </button>
            </div>
            <p className="settings-note">
              La voz la genera tu navegador. Si no escuchas nada, revisa el volumen del sistema o prueba en otro
              navegador con voces en inglés instaladas.
            </p>
          </section>
        </div>

        <aside className="settings-side">
          <div className="panel settings-account-card">
            <span className="eyebrow">Cuentas de Fluenta</span>
            <div className="chip-grid account-user-switch">
              <button
                type="button"
                className={`choice-chip ${activeUser === 'santiago' ? 'selected' : ''}`}
                onClick={() => switchUser('santiago')}
              >
                Santiago
              </button>
              <button
                type="button"
                className={`choice-chip ${activeUser === 'elizabeth' ? 'selected' : ''}`}
                onClick={() => switchUser('elizabeth')}
              >
                Elizabeth
              </button>
            </div>
            <p className="settings-note">
              Cada perfil guarda su propio progreso en este navegador. Cambia entre Santiago y Elizabeth sin mezclar
              datos.
            </p>
            <div className="account-row">
              <span>Progreso</span>
              <strong>{state.progress.completedLessons.length} lecciones</strong>
            </div>
            <button type="button" className="btn btn-outline btn-block btn-sm" onClick={exportFile}>
              <Download size={15} /> Exportar datos
            </button>
            <label className="btn btn-outline btn-block btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={15} /> Importar datos
              <input type="file" accept="application/json" onChange={importFile} hidden />
            </label>
            {importMessage && <span className="settings-saved">{importMessage}</span>}
          </div>

          <div className="panel settings-save-card">
            <span className="eyebrow">Guardar cambios</span>
            <p>Los cambios se aplican a tu ruta y a tus próximas lecciones.</p>
            <button type="submit" className="btn btn-primary btn-block">
              {saved ? (
                <>
                  <Check size={16} /> Guardado
                </>
              ) : (
                <>
                  <Save size={16} /> Guardar ajustes
                </>
              )}
            </button>
            <Link to="/app/path" className="btn btn-outline btn-block btn-sm">
              Ver mi ruta <ArrowRight size={15} />
            </Link>
            {saved && <span className="settings-saved">Tus preferencias se han actualizado.</span>}
          </div>

          <div className="panel settings-account-card">
            <span className="eyebrow">Tu cuenta</span>
            <div className="account-row">
              <span>Perfil creado</span>
              <strong>
                {profile.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '—'}
              </strong>
            </div>
            <div className="account-row">
              <span>Nivel diagnosticado</span>
              <strong>{state.placement?.overall ?? 'Sin test'}</strong>
            </div>
            <div className="account-row">
              <span>Lecciones completadas</span>
              <strong>{state.progress.completedLessons.length}</strong>
            </div>
            <div className="account-row">
              <span>Datos</span>
              <strong>Solo local</strong>
            </div>
            <p className="settings-note">
              Fluenta no crea cuentas ni sincroniza datos. Si borras los datos del navegador, perderás tu progreso.
            </p>
          </div>

          <div className="panel danger-zone">
            <span className="eyebrow">Zona de reinicio</span>
            <h3>Empezar de cero</h3>
            <p>
              Borra tu perfil, tu diagnóstico, tus lecciones, tu vocabulario y tu historial de escritura. No se puede
              deshacer.
            </p>
            {confirmReset ? (
              <div className="confirm-box">
                <span>¿Seguro que quieres borrar todo?</span>
                <div>
                  <button type="button" className="btn btn-danger btn-sm" onClick={resetAll}>
                    <Trash2 size={15} /> Sí, borrar todo
                  </button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setConfirmReset(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" className="btn btn-outline btn-block btn-sm" onClick={() => setConfirmReset(true)}>
                <RotateCcw size={15} /> Reiniciar Fluenta
              </button>
            )}
          </div>
        </aside>
      </form>
    </div>
  )
}
