import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AudioPlayer from './AudioPlayer.jsx'

const FALLBACK_LANGUAGE = 'other'

export default function NarrationSamples({ samples }) {
  const { t } = useTranslation()
  const groups = useMemo(() => {
    return samples.reduce((result, sample) => {
      const language = sample.language || FALLBACK_LANGUAGE
      if (!result[language]) result[language] = []
      result[language].push(sample)
      return result
    }, {})
  }, [samples])

  const languages = Object.keys(groups)
  const [activeLanguage, setActiveLanguage] = useState('')
  const [activeAudio, setActiveAudio] = useState(null)
  const tabRefs = useRef([])

  useEffect(() => {
    if (!languages.includes(activeLanguage)) setActiveLanguage(languages[0] || '')
  }, [activeLanguage, languages])

  if (!samples.length) {
    return <p className="rounded-lg bg-slate-50 p-5 text-sm text-slate-500">{t('work.narration.empty')}</p>
  }

  const selectTab = (index) => {
    setActiveLanguage(languages[index])
    setActiveAudio(null)
    tabRefs.current[index]?.focus()
  }

  const handleKeyDown = (event, index) => {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % languages.length
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + languages.length) % languages.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = languages.length - 1
    if (nextIndex !== undefined) {
      event.preventDefault()
      selectTab(nextIndex)
    }
  }

  return (
    <div>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label={t('work.narration.languageTabs')}>
        {languages.map((language, index) => {
          const selected = language === activeLanguage
          return (
            <button
              type="button"
              role="tab"
              id={`narration-tab-${language}`}
              aria-controls={`narration-panel-${language}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              key={language}
              ref={(element) => { tabRefs.current[index] = element }}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`min-h-11 shrink-0 rounded border px-4 py-2 text-sm font-medium ${
                selected
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              {t(`sampleLanguages.${language}`, { defaultValue: language.toUpperCase() })}
              <span className="ml-2 opacity-70">{groups[language].length}</span>
            </button>
          )
        })}
      </div>

      {languages.map((language) => (
        <div
          key={language}
          id={`narration-panel-${language}`}
          role="tabpanel"
          aria-labelledby={`narration-tab-${language}`}
          hidden={language !== activeLanguage}
          className="space-y-4"
        >
          {groups[language].map((sample) => (
            <AudioPlayer key={sample.id} sample={sample} activeId={activeAudio} onPlay={setActiveAudio} />
          ))}
        </div>
      ))}
    </div>
  )
}
