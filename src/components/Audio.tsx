import { useEffect, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import type { DialogueLine } from '../types'
import { playDialogue, stopSpeech } from '../lib/speech'
import { Waveform } from './ui'

export function DialoguePlayer({
  lines,
  rate = 0.92,
  label = 'Reproducir audio',
  compact = false,
}: {
  lines: DialogueLine[]
  rate?: number
  label?: string
  compact?: boolean
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
    await playDialogue(lines, rate)
    setPlaying(false)
  }

  return (
    <div className={`dialogue-player ${compact ? 'dialogue-player-compact' : ''}`}>
      <button type="button" className={`play-btn ${playing ? 'playing' : ''}`} onClick={toggle} aria-label={playing ? 'Detener audio' : label}>
        {playing ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
      </button>
      <div className="dialogue-player-main">
        <div className="dialogue-player-top">
          <span>{playing ? 'Reproduciendo…' : label}</span>
          <span className="dialogue-player-meta">
            <RotateCcw size={13} /> {lines.length} intervenciones
          </span>
        </div>
        <Waveform active={playing} bars={compact ? 26 : 42} />
      </div>
    </div>
  )
}
