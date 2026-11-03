import type { DialogueLine } from '../types'

let session = 0
let cachedVoices: SpeechSynthesisVoice[] = []

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function englishVoices(): SpeechSynthesisVoice[] {
  if (!speechSupported()) return []
  const all = window.speechSynthesis.getVoices()
  if (all.length) cachedVoices = all
  const english = cachedVoices.filter((voice) => voice.lang.toLowerCase().startsWith('en'))
  return english.length ? english : cachedVoices
}

export function stopSpeech(): void {
  session += 1
  if (speechSupported()) window.speechSynthesis.cancel()
}

function speakParts(
  parts: { text: string; rate?: number; pitch?: number; voiceIndex?: number }[],
  baseRate: number,
): Promise<void> {
  if (!speechSupported() || !parts.length) return Promise.resolve()
  stopSpeech()
  const mySession = session
  const voices = englishVoices()

  return new Promise((resolve) => {
    let index = 0

    const next = () => {
      if (mySession !== session) {
        resolve()
        return
      }
      if (index >= parts.length) {
        resolve()
        return
      }
      const part = parts[index]
      index += 1
      const utterance = new SpeechSynthesisUtterance(part.text)
      utterance.lang = voices[0]?.lang ?? 'en-US'
      utterance.rate = part.rate ?? baseRate
      utterance.pitch = part.pitch ?? 1
      if (voices.length) {
        const voice = voices[(part.voiceIndex ?? 0) % voices.length]
        utterance.voice = voice
        utterance.lang = voice.lang
      }
      utterance.onend = () => window.setTimeout(next, 180)
      utterance.onerror = () => resolve()
      window.speechSynthesis.speak(utterance)
    }

    next()
  })
}

export function speak(text: string, rate = 0.95): Promise<void> {
  return speakParts([{ text }], rate)
}

export function playDialogue(lines: DialogueLine[], rate = 0.92): Promise<void> {
  return speakParts(
    lines.map((line, index) => ({
      text: line.text,
      rate,
      pitch: index % 2 === 0 ? 1 : 0.92,
      voiceIndex: index % 2,
    })),
    rate,
  )
}

export function playScript(text: string, rate = 0.92): Promise<void> {
  return speak(text, rate)
}

export type RecognitionResult = { transcript: string; supported: boolean }

export function recognitionSupported(): boolean {
  if (typeof window === 'undefined') return false
  const w = window as unknown as Record<string, unknown>
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition)
}

export function listenOnce(lang = 'en-US'): Promise<RecognitionResult> {
  const w = window as unknown as Record<string, any>
  const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition
  if (!Recognition) return Promise.resolve({ transcript: '', supported: false })

  return new Promise((resolve) => {
    const recognition = new Recognition()
    recognition.lang = lang
    recognition.interimResults = false
    recognition.continuous = false
    recognition.maxAlternatives = 1
    let settled = false

    const finish = (transcript: string) => {
      if (settled) return
      settled = true
      resolve({ transcript, supported: true })
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? ''
      finish(transcript)
    }
    recognition.onerror = () => finish('')
    recognition.onend = () => finish('')
    try {
      recognition.start()
    } catch {
      finish('')
    }
  })
}
