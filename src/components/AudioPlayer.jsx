import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AudioPlayer({ sample, activeId, onPlay }) {
  const { i18n, t } = useTranslation()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (activeId !== sample.id && playing) {
      audioRef.current?.pause()
      setPlaying(false)
    }
  }, [activeId, playing, sample.id])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || failed) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    try {
      onPlay(sample.id)
      await audio.play()
      setPlaying(true)
    } catch {
      setFailed(true)
      setPlaying(false)
    }
  }

  const label = sample.label?.[i18n.language] || sample.label?.en || sample.id
  const domain = sample.domain?.[i18n.language] || sample.domain?.en || ''

  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 hover:border-slate-300">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}${sample.src.replace(/^\//, '')}`}
        preload="metadata"
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      <button
        type="button"
        onClick={toggle}
        disabled={failed}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-900 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        aria-label={playing ? t('work.narration.pause', { title: label }) : t('work.narration.play', { title: label })}
      >
        {playing ? <Pause size={17} aria-hidden="true" /> : <Play size={17} className="ml-0.5" aria-hidden="true" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-slate-900">{label}</div>
        <div className="text-sm text-slate-500">
          {failed ? t('work.narration.unavailable') : [domain, sample.duration].filter(Boolean).join(' · ')}
        </div>
      </div>
    </div>
  )
}
