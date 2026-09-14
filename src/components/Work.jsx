import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import NarrationSamples from './NarrationSamples.jsx'
import TranslationCarousel from './TranslationCarousel.jsx'

export default function Work() {
  const { t } = useTranslation()
  const [audioSamples, setAudioSamples] = useState([])
  const [textSamples, setTextSamples] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}assets/audios/samples.json`)
      .then((r) => r.json())
      .then(setAudioSamples)
      .catch(console.error)

    fetch(`${import.meta.env.BASE_URL}assets/texts/samples.json`)
      .then((r) => r.json())
      .then(setTextSamples)
      .catch(console.error)
  }, [])

  return (
    <section id="work" className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">{t('work.title')}</h2>

        <div className="grid min-w-0 md:grid-cols-2 gap-8">
          <div className="min-w-0 bg-white border border-slate-200 rounded-lg p-4 sm:p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2 text-slate-800">{t('work.narration.title')}</h3>
            <p className="text-slate-600 mb-6 text-sm">{t('work.narration.description')}</p>
            <div className="flex-1">
              <NarrationSamples samples={audioSamples} />
            </div>
          </div>

          <div className="min-w-0 bg-white border border-slate-200 rounded-lg p-4 sm:p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2 text-slate-800">{t('work.translation.title')}</h3>
            <p className="text-slate-600 mb-6 text-sm">{t('work.translation.description')}</p>
            <div className="flex-1">
              <TranslationCarousel samples={textSamples} />
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-8 py-3 text-slate-900 font-medium hover:text-slate-600 transition"
          >
            {t('work.cta')} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}