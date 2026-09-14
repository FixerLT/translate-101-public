import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function TranslationSampleDialog({ sample, pair, domain, onClose }) {
  const { t } = useTranslation()
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !sample) return

    dialog.showModal()
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)

    return () => {
      dialog.removeEventListener('close', handleClose)
      if (dialog.open) dialog.close()
    }
  }, [sample, onClose])

  if (!sample) return null

  return (
    <dialog
      ref={dialogRef}
      className="max-h-[90vh] w-[min(94vw,64rem)] rounded-xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50"
      aria-labelledby="translation-dialog-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
    >
      <article className="relative max-h-[90vh] overflow-y-auto p-5 sm:p-8">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="sticky right-0 top-0 float-right grid h-11 w-11 place-items-center rounded-full bg-white text-slate-500 shadow-sm hover:bg-slate-100 hover:text-slate-900"
          aria-label={t('common.close')}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <p className="mb-2 text-sm font-medium text-slate-500">{pair} · {domain}</p>
        <h3 id="translation-dialog-title" className="mb-6 pr-12 text-2xl font-bold" tabIndex="-1">
          {t('work.translation.fullSample')}
        </h3>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-lg bg-slate-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('work.translation.source')} · {sample.original.lang.toUpperCase()}
            </p>
            <p className="whitespace-pre-line leading-relaxed text-slate-700">{sample.original.text}</p>
          </section>
          <section className="rounded-lg bg-slate-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('work.translation.result')} · {sample.translation.lang.toUpperCase()}
            </p>
            <p className="whitespace-pre-line leading-relaxed text-slate-700">{sample.translation.text}</p>
          </section>
        </div>
      </article>
    </dialog>
  )
}
