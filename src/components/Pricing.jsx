import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export default function Pricing() {
  const { t } = useTranslation()

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">{t('pricing.title')}</h2>
        <p className="text-center text-slate-600 mb-16 max-w-xl mx-auto">
          {t('pricing.subtitle')}
        </p>

        {/* Main row: Translation Book-Scale + Narration */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-8 border-2 border-slate-900">
            <h3 className="text-lg font-semibold mb-2">{t('pricing.translationMain.name')}</h3>
            <div className="text-4xl font-bold mb-1">
              {t('pricing.translationMain.price')}<span className="text-lg font-medium text-slate-500">{t('pricing.translationMain.unit')}</span>
            </div>
            <div className="text-sm text-slate-500 mb-4">{t('pricing.translationMain.desc')}</div>
            <div className="text-sm text-slate-700">{t('pricing.translationMain.examples')}</div>
          </div>

          <div className="bg-white rounded-lg p-8 border-2 border-slate-900">
            <h3 className="text-lg font-semibold mb-2">{t('pricing.narrationMain.name')}</h3>
            <div className="text-4xl font-bold mb-1">
              {t('pricing.narrationMain.price')}<span className="text-lg font-medium text-slate-500">{t('pricing.narrationMain.unit')}</span>
            </div>
            <div className="text-sm text-slate-500 mb-4">{t('pricing.narrationMain.desc')}</div>
            <div className="text-sm text-slate-700">{t('pricing.narrationMain.examples')}</div>
          </div>
        </div>

        {/* Sub row: Medium + Small */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="text-lg font-semibold mb-2">{t('pricing.translationMid.name')}</h3>
            <div className="text-3xl font-bold mb-1">
              {t('pricing.translationMid.price')}<span className="text-lg font-medium text-slate-500">{t('pricing.translationMid.unit')}</span>
            </div>
            <div className="text-sm text-slate-500 mb-4">{t('pricing.translationMid.desc')}</div>
            <div className="text-sm text-slate-700">{t('pricing.translationMid.examples')}</div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="text-lg font-semibold mb-2">{t('pricing.translationSmall.name')}</h3>
            <div className="text-3xl font-bold mb-1">
              {t('pricing.translationSmall.price')}<span className="text-lg font-medium text-slate-500">{t('pricing.translationSmall.unit')}</span>
            </div>
            <div className="text-sm text-slate-500 mb-4">{t('pricing.translationSmall.desc')}</div>
            <div className="text-sm text-slate-700">{t('pricing.translationSmall.examples')}</div>
          </div>
        </div>

        {/* Fine print */}
        <div className="text-center text-sm text-slate-600">
          <p className="mb-2">{t('pricing.narrationNote')}</p>
          <p className="text-xs text-slate-500 mb-2">{t('pricing.turnaround')}</p>
          <p className="text-xs text-slate-400">{t('pricing.pageNote')}</p>
        </div>

        {/* Free Demo Banner */}
        <div className="mt-16 max-w-3xl mx-auto bg-slate-900 text-white rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-2">{t('pricing.demo.title')}</h3>
          <p className="text-slate-300 mb-6">{t('pricing.demo.description')}</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 font-medium rounded hover:bg-slate-100 transition"
          >
            {t('pricing.demo.cta')} <ArrowRight size={18} />
          </a>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 transition"
          >
            {t('pricing.contactCta')} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}