import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Send, ShieldCheck } from 'lucide-react'
import { useApp } from '../store'
import { Logo } from '../components/ui'

interface ChatMessage {
  id: string
  sender: 'santiago' | 'elizabeth'
  name: string
  text: string
  createdAt: string
}

const STORAGE_KEY = 'fluenta:chat:v1'

function loadMessages(): ChatMessage[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ChatMessage[]) : []
  } catch {
    return []
  }
}

function saveMessages(messages: ChatMessage[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch {
    // Sin acción.
  }
}

function isEnglish(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return false
  if (/[áéíóúñÁÉÍÓÚÑ]/.test(trimmed)) return false
  return /^[A-Za-z0-9\s.,!?'"()\-:;]+$/.test(trimmed)
}

export default function Chat() {
  const { activeUser, state } = useApp()
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages())
  const [text, setText] = useState('')
  const [warning, setWarning] = useState('')

  useEffect(() => {
    saveMessages(messages)
  }, [messages])

  const currentName = activeUser === 'santiago' ? 'Santiago' : 'Elizabeth'

  const send = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    if (!isEnglish(trimmed)) {
      setWarning('Por favor escribe solo en inglés. No se permiten acentos ni palabras en español.')
      return
    }
    setWarning('')
    const message: ChatMessage = {
      id: `m-${Date.now().toString(36)}`,
      sender: activeUser,
      name: currentName,
      text: trimmed,
      createdAt: new Date().toISOString(),
    }
    setMessages((current) => [...current, message])
    setText('')
  }

  return (
    <div className="chat-page">
      <header className="page-head">
        <div>
          <span className="eyebrow">
            <MessageCircle size={14} /> Chat en inglés
          </span>
          <h1>
            Habla solo en inglés.
            <br />
            <em>Como en una clase real.</em>
          </h1>
          <p>
            Este chat guarda los mensajes en este navegador. Para que Santiago y Elizabeth se vean en tiempo real en
            diferentes dispositivos, hay que conectarlo a Supabase Realtime.
          </p>
        </div>
        <div className="settings-head-card">
          <span className="avatar avatar-large">{currentName.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{currentName}</strong>
            <span>Modo local</span>
            <small>
              <ShieldCheck size={13} /> Solo inglés
            </small>
          </div>
        </div>
      </header>

      <section className="panel chat-panel">
        <div className="chat-messages">
          {messages.length === 0 && (
            <p className="chat-empty">Empieza la conversación en inglés. Ejemplo: “How was your day?”</p>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${message.sender === activeUser ? 'mine' : 'theirs'}`}
            >
              <span className="chat-author">{message.name}</span>
              <p>{message.text}</p>
              <time>{new Date(message.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</time>
            </div>
          ))}
        </div>

        {warning && <p className="chat-warning">{warning}</p>}

        <div className="chat-composer">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') send()
            }}
            placeholder="Write in English only..."
          />
          <button type="button" className="btn btn-primary" onClick={send}>
            <Send size={17} /> Enviar
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">Próximo paso</span>
            <h2>Chat real entre dispositivos</h2>
          </div>
        </div>
        <p>
          Para que Santiago y Elizabeth se vean en tiempo real desde celulares diferentes, el siguiente paso es crear
          una tabla <code>messages</code> en Supabase y usar Realtime. Yo puedo darte los pasos exactos y el SQL; no
          necesito tus credenciales, solo la URL y la anon key pública cuando quieras.
        </p>
        <Link to="/app" className="btn btn-outline btn-sm">
          <ArrowLeft size={15} /> Volver al panel
        </Link>
      </section>
    </div>
  )
}
