import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ClipboardCheck,
  Compass,
  Headphones,
  PenLine,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
} from 'lucide-react'
import { useApp } from '../store'
import { Logo, RadarChart, Tag } from '../components/ui'
import type { Skill } from '../types'

const demo: Record<Skill, number> = {
  grammar: 58,
  vocabulary: 52,
  reading: 64,
  listening: 55,
  writing: 46,
}

export default function Landing() {
  const { state } = useApp()
  const hasPlacement = Boolean(state.placement)
  const cta = hasPlacement ? '/app' : state.profile ? '/test' : '/start'
  const ctaLabel = hasPlacement ? 'Continuar mi ruta' : state.profile ? 'Continuar mi test' : 'Hacer el test de nivel'

  return (
    <div className="landing">
      <header className="landing-nav">
        <Link to="/" className="brand-link">
          <Logo />
        </Link>
        <nav className="landing-links">
          <a href="#metodo">Método</a>
          <a href="#ruta">La ruta</a>
          <a href="#test">El test</a>
        </nav>
        <div className="landing-actions">
          {hasPlacement ? (
            <Link to="/app" className="btn btn-ghost btn-sm">
              Mi panel
            </Link>
          ) : (
            <Link to="/start" className="btn btn-ghost btn-sm">
              Empezar
            </Link>
          )}
          <Link to={cta} className="btn btn-primary btn-sm">
            {hasPlacement ? 'Continuar' : 'Test de nivel'}
            <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-line">
            <Compass size={14} /> Inglés profesional · A1 → C1
          </span>
          <h1>
            Tu inglés no necesita más teoría.
            <br />
            <em>Necesita una ruta.</em>
          </h1>
          <p className="hero-lead">
            Un test adaptativo mide tu comprensión, tu gramática y tu escritura. Con ese diagnóstico construimos
            un plan personalizado para que uses el inglés en el trabajo y llegues a C1.
          </p>
          <p className="hero-personal" style={{ marginTop: '6px', marginBottom: '18px', fontSize: '13px', opacity: 0.78, lineHeight: 1.4, wordBreak: 'break-word' }}>
            Preparado para Santiago Benavidez Ramirez y Elizabeth Cuervo Poveda.
          </p>
          <div className="hero-cta">
            <Link to={cta} className="btn btn-primary btn-lg">
              {ctaLabel}
              <ArrowRight size={18} />
            </Link>
            <a href="#metodo" className="btn btn-outline btn-lg">
              Cómo funciona
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <Timer size={15} /> 15–20 min
            </span>
            <span>
              <BrainCircuit size={15} /> Test adaptativo
            </span>
            <span>
              <ShieldCheck size={15} /> Sin registro
            </span>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>AM</span>
              <span>LC</span>
              <span>DR</span>
              <span>+</span>
            </div>
            <p>
              Diseñado sobre el marco MCER y situaciones reales de trabajo.
              <strong> Tus datos quedan en tu navegador.</strong>
            </p>
          </div>
        </div>

        <div className="hero-art" aria-label="Vista previa del diagnóstico">
          <div className="hero-grid-glow" />
          <div className="hero-card">
            <div className="hero-card-top">
              <div>
                <span className="mini-label">Tu diagnóstico</span>
                <div className="hero-level">
                  <span className="hero-level-from">B1</span>
                  <ArrowRight size={18} />
                  <span className="hero-level-to">C1</span>
                </div>
              </div>
              <Tag tone="lime">En progreso</Tag>
            </div>
            <div className="hero-radar">
              <RadarChart scores={demo} size={282} />
            </div>
            <div className="hero-skill-list">
              {[
                { label: 'Comprensión lectora', value: 64, tone: 'lime' },
                { label: 'Comprensión auditiva', value: 55, tone: 'mint' },
                { label: 'Escritura', value: 46, tone: 'coral' },
              ].map((item) => (
                <div className="hero-skill" key={item.label}>
                  <span>{item.label}</span>
                  <div className="bar-track bar-track-light">
                    <div className={`bar-fill bar-fill-${item.tone}`} style={{ width: `${item.value}%` }} />
                  </div>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="hero-card-foot">
              <span>
                <Target size={14} /> Ruta estimada hasta C1
              </span>
              <strong>18 semanas</strong>
            </div>
          </div>

          <div className="floating-card float-a">
            <span className="float-icon">
              <ClipboardCheck size={16} />
            </span>
            <div>
              <strong>Test adaptativo</strong>
              <span>16 preguntas que se ajustan a ti</span>
            </div>
          </div>

          <div className="floating-card float-b">
            <span className="float-icon float-icon-lime">
              <RouteIcon size={16} />
            </span>
            <div>
              <strong>Ruta personalizada</strong>
              <span>Desde tu nivel, no desde cero</span>
            </div>
          </div>

          <div className="hero-stamp">
            <Sparkles size={16} />
            <span>
              Tu primera clase
              <br />
              empieza donde tú estás
            </span>
          </div>
        </div>
      </section>

      <div className="logo-strip">
        <span>Basado en el MCER</span>
        <i />
        <span>Listening real</span>
        <i />
        <span>Writing con corrección</span>
        <i />
        <span>Enfoque laboral</span>
        <i />
        <span>A1 → C1</span>
      </div>

      <section className="method" id="metodo">
        <div className="section-head section-head-center">
          <span className="eyebrow">El método Fluenta</span>
          <h2>
            Diagnóstico primero.
            <br />
            <em>Ruta después.</em>
          </h2>
          <p>La mayoría de cursos empiezan en la lección uno. Nosotros empezamos por saber exactamente dónde estás.</p>
        </div>

        <div className="method-grid">
          <article className="method-card">
            <span className="method-num">01</span>
            <div className="method-icon">
              <ClipboardCheck size={22} />
            </div>
            <h3>Un test que se adapta a tus respuestas</h3>
            <p>
              Gramática, vocabulario, lectura, escucha y escritura. La dificultad sube o baja según aciertas, así que
              no pierdes tiempo en preguntas que no te miden.
            </p>
            <ul className="mini-list">
              <li>
                <Check size={14} /> 16 preguntas adaptativas
              </li>
              <li>
                <Check size={14} /> Audio y textos reales
              </li>
              <li>
                <Check size={14} /> Corrección de writing por criterios
              </li>
            </ul>
          </article>

          <article className="method-card method-card-dark">
            <span className="method-num">02</span>
            <div className="method-icon">
              <RouteIcon size={22} />
            </div>
            <h3>Una ruta que empieza en tu nivel exacto</h3>
            <p>
              Si ya eres B1, no vas a repetir el presente simple. Tu plan prioriza tus puntos débiles y avanza hacia
              el inglés que se usa en reuniones, correos y negociaciones.
            </p>
            <ul className="mini-list">
              <li>
                <Check size={14} /> Módulos hasta C1
              </li>
              <li>
                <Check size={14} /> Foco en tus habilidades más débiles
              </li>
              <li>
                <Check size={14} /> Fechas y carga semanal realistas
              </li>
            </ul>
          </article>

          <article className="method-card">
            <span className="method-num">03</span>
            <div className="method-icon">
              <PenLine size={22} />
            </div>
            <h3>Práctica que se parece a tu trabajo</h3>
            <p>
              Reuniones, propuestas, feedback, entrevistas. Cada lección termina con una tarea de producción y una
              corrección concreta, no con un “muy bien”.
            </p>
            <ul className="mini-list">
              <li>
                <Check size={14} /> Writing Lab con rúbrica
              </li>
              <li>
                <Check size={14} /> Repaso espaciado de vocabulario
              </li>
              <li>
                <Check size={14} /> Práctica de speaking con micrófono
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="path-preview" id="ruta">
        <div className="path-preview-copy">
          <span className="eyebrow eyebrow-light">Así se ve tu ruta</span>
          <h2>
            De “entiendo pero no hablo”
            <br />
            a <em>decidir en inglés.</em>
          </h2>
          <p>
            Cinco etapas, trece módulos y veintiséis lecciones diseñadas para el trabajo real. Cada etapa termina con
            una habilidad que puedes usar al día siguiente.
          </p>
          <div className="path-stats">
            <div>
              <strong>26</strong>
              <span>lecciones guiadas</span>
            </div>
            <div>
              <strong>13</strong>
              <span>módulos aplicados</span>
            </div>
            <div>
              <strong>5</strong>
              <span>niveles MCER</span>
            </div>
          </div>
        </div>
        <div className="path-preview-timeline">
          {[
            { level: 'A2', title: 'Base laboral', text: 'Correos, presentaciones y small talk.', state: 'done' },
            { level: 'B1', title: 'Comunicación funcional', text: 'Reuniones, updates y presentaciones.', state: 'current' },
            { level: 'B2', title: 'Fluidez profesional', text: 'Negociación, feedback y reporting.', state: 'next' },
            { level: 'C1', title: 'Dominio ejecutivo', text: 'Influencia, escritura avanzada y carrera.', state: 'next' },
          ].map((item) => (
            <div className={`preview-step preview-${item.state}`} key={item.level}>
              <span className="preview-dot">{item.state === 'done' ? <Check size={14} /> : item.level}</span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
              {item.state === 'current' && <Tag tone="lime">Tu siguiente etapa</Tag>}
            </div>
          ))}
        </div>
      </section>

      <section className="test-section" id="test">
        <div className="test-copy">
          <span className="eyebrow">El test</span>
          <h2>
            Cinco habilidades.
            <br />
            Una foto honesta de tu inglés.
          </h2>
          <p>
            No medimos cuántas palabras memorizas. Medimos si puedes entender, interpretar y producir inglés en
            contextos profesionales.
          </p>
          <div className="test-skills">
            <span>
              <BarChart3 size={16} /> Gramática y vocabulario
            </span>
            <span>
              <ClipboardCheck size={16} /> Comprensión lectora
            </span>
            <span>
              <Headphones size={16} /> Comprensión auditiva
            </span>
            <span>
              <PenLine size={16} /> Escritura
            </span>
          </div>
        </div>
        <div className="test-card">
          <div className="test-card-head">
            <span>Test de nivel · Fluenta</span>
            <Tag tone="dark">15–20 min</Tag>
          </div>
          <div className="test-sections">
            {[
              { icon: <BrainCircuit size={18} />, name: 'Adaptativo', detail: '16 preguntas', time: '6 min' },
              { icon: <ClipboardCheck size={18} />, name: 'Lectura', detail: 'Texto profesional', time: '4 min' },
              { icon: <Headphones size={18} />, name: 'Escucha', detail: 'Audio con voz real', time: '4 min' },
              { icon: <PenLine size={18} />, name: 'Escritura', detail: 'Tarea breve', time: '5 min' },
            ].map((item) => (
              <div className="test-row" key={item.name}>
                <span className="test-row-icon">{item.icon}</span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.detail}</span>
                </div>
                <em>{item.time}</em>
              </div>
            ))}
          </div>
          <div className="test-card-foot">
            <div className="test-progress">
              <span style={{ width: '100%' }} />
            </div>
            <Link to={cta} className="btn btn-primary btn-block">
              {ctaLabel}
              <ArrowRight size={17} />
            </Link>
            <small>Al terminar verás tu nivel MCER por habilidad y tu ruta hasta C1.</small>
          </div>
        </div>
      </section>

      <section className="quote-band">
        <blockquote>
          “No necesitas saberlo todo para empezar a usar el inglés. Necesitas saber <em>qué te falta</em> y practicarlo
          en el contexto correcto.”
        </blockquote>
        <span>Principio Fluenta · Diagnóstico → práctica → producción</span>
      </section>

      <section className="final-cta">
        <div>
          <span className="eyebrow eyebrow-light">Tu punto de partida</span>
          <h2>
            Descubre tu nivel hoy.
            <br />
            <em>Llega a C1 con un plan.</em>
          </h2>
        </div>
        <div className="final-cta-actions">
          <Link to={cta} className="btn btn-lime btn-lg">
            {ctaLabel}
            <ArrowRight size={18} />
          </Link>
          <span>15–20 min · resultado inmediato · sin tarjeta</span>
        </div>
      </section>

      <footer className="footer">
        <Logo light />
        <p>Inglés profesional con diagnóstico y ruta personalizada. Tus datos se guardan solo en tu navegador.</p>
        <span>© {new Date().getFullYear()} Fluenta</span>
      </footer>
    </div>
  )
}
