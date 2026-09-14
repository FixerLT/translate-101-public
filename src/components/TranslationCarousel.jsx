import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import TranslationSampleDialog from './TranslationSampleDialog.jsx'

const PREVIEW_LIMIT = 420

export default function TranslationCarousel({ samples }) {
  const [current, setCurrent] = useState(0)
  const [expandedSample, setExpandedSample] = useState(null)
  const { i18n, t } = useTranslation()

  useEffect(() => {
    if (current >= samples.length) setCurrent(0)
  }, [current, samples.length])

  if (!samples.length) {
    return <p className="rounded-lg bg-slate-50 p-5 text-sm text-slate-500">{t('work.translation.empty')}</p>
  }

  const prev = () => setCurrent((value) => (value === 0 ? samples.length - 1 : value - 1))
  const next = () => setCurrent((value) => (value === samples.length - 1 ? 0 : value + 1))
  const slide = samples[current]
  const pair = slide.pair?.[i18n.language] || slide.pair?.en
  const domain = slide.domain?.[i18n.language] || slide.domain?.en
  const isLong = slide.original.text.length > PREVIEW_LIMIT || slide.translation.text.length > PREVIEW_LIMIT

  return (
    <>
      <div className="rounded-lg border border-slate-200 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
          <span className="font-medium text-slate-700">{pair}</span>
          <span>{domain}</span>
        </div>

        <div className="mb-5 space-y-4">
          {[['source', slide.original], ['result', slide.translation]].map(([key, text]) => (
            <div key={key} className="relative rounded bg-slate-50 p-4">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t(`work.translation.${key}`)} · {text.lang.toUpperCase()}
              </div>
              <p className={`text-sm leading-relaxed text-slate-700 ${isLong ? 'sample-preview' : ''}`}>
                {text.text}
              </p>
            </div>
          ))}
        </div>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpandedSample(slide)}
            className="mb-5 inline-flex min-h-11 items-center gap-2 rounded px-2 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
          >
            <Maximize2 size={17} aria-hidden="true" />
            {t('work.translation.expand')}
          </button>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            className="grid h-11 w-11 place-items-center rounded hover:bg-slate-100"
            aria-label={t('work.translation.previous')}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2" aria-label={t('work.translation.samplePosition', { current: current + 1, total: samples.length })}>
            {samples.map((sample, index) => (
              <button
                type="button"
                key={sample.id}
                onClick={() => setCurrent(index)}
                className="grid h-11 w-6 place-items-center"
                aria-label={t('work.translation.goToSample', { number: index + 1 })}
                aria-current={index === current ? 'true' : undefined}
              >
                <span className={`block h-2 w-2 rounded-full ${index === current ? 'bg-slate-900' : 'bg-slate-300'}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="grid h-11 w-11 place-items-center rounded hover:bg-slate-100"
            aria-label={t('work.translation.next')}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <TranslationSampleDialog
        sample={expandedSample}
        pair={pair}
        domain={domain}
        onClose={() => setExpandedSample(null)}
      />
    </>
  )
}
