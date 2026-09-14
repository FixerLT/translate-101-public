import { useEffect, useRef } from 'react'
import { Mail, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const EMAIL = 'translate.101.team@gmail.com'

export default function ContactUnavailableDialog({ channel, onClose }) {
  const { t } = useTranslation()
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !channel) return

    dialog.showModal()
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)

    return () => {
      dialog.removeEventListener('close', handleClose)
      if (dialog.open) dialog.close()
    }
  }, [channel, onClose])

  if (!channel) return null

  return (
    <dialog
      ref={dialogRef}
      className="w-[min(92vw,30rem)] rounded-xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50"
      aria-labelledby="contact-dialog-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label={t('common.close')}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{channel}</p>
        <h3 id="contact-dialog-title" className="mb-3 pr-10 text-2xl font-bold">
          {t('contact.unavailable.title')}
        </h3>
        <p className="mb-6 leading-relaxed text-slate-600">
          {t('contact.unavailable.body')}
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex min-h-11 items-center gap-2 rounded bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
          autoFocus
        >
          <Mail size={18} aria-hidden="true" />
          {EMAIL}
        </a>
      </div>
    </dialog>
  )
}
