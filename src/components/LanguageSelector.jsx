import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSelector() {
  const { i18n, t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
      if (window.scrollY <= 100) setExpanded(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const languages = [
    { code: 'en', label: t('language.en') },
    { code: 'uk', label: t('language.uk') },
  ]

  if (scrolled && !expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        aria-label={t('language.selector')}
        className="w-11 h-11 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center text-sm font-bold text-slate-700 hover:border-slate-400 hover:shadow transition"
      >
        {i18n.language.toUpperCase()}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
      {scrolled && (
        <button
          onClick={() => setExpanded(false)}
          aria-label={t('common.close')}
          className="w-11 h-11 text-slate-400 hover:text-slate-600 font-bold transition"
        >
          ×
        </button>
      )}
      <span className="text-sm text-slate-500 font-medium">{t('language.selector')}:</span>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              i18n.changeLanguage(lang.code)
              if (scrolled) setExpanded(false)
            }}
            aria-pressed={i18n.language === lang.code}
            className={`min-h-11 px-3 py-2 text-sm rounded border transition ${
              i18n.language === lang.code
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}