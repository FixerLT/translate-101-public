import { useCallback } from 'react'
import { ArrowDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  const scrollToWork = useCallback(() => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section aria-labelledby="page-title" className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 id="page-title" className="text-6xl font-bold tracking-tight mb-4 font-brand">{t('brand')}</h1>
        <p className="text-2xl md:text-3xl font-medium text-slate-600 mb-10">
          {t('hero.title')}
        </p>

        <ul className="text-lg text-slate-700 space-y-3 mb-10 max-w-xl mx-auto text-left md:text-center md:list-none">
          <li>• {t('hero.bullet1')}</li>
          <li>• {t('hero.bullet2')}</li>
          <li>• {t('hero.bullet3')}</li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:translate.101.team@gmail.com"
            className="px-8 py-3 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 transition"
          >
            {t('hero.cta')}
          </a>
          <button
            onClick={scrollToWork}
            className="px-8 py-3 text-slate-600 font-medium hover:text-slate-900 transition flex items-center gap-2"
          >
            {t('hero.seeWork')} <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}