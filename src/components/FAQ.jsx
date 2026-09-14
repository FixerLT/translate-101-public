import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const { t } = useTranslation()

  const items = t('faq.items', { returnObjects: true })

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section id="faq" className="py-24 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">{t('faq.title')}</h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg">
              <button
                onClick={() => toggle(i)}
                className="w-full min-h-11 flex items-center justify-between p-4 text-left font-medium hover:bg-slate-50 transition"
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  size={18}
                  className={`text-slate-400 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div id={`faq-panel-${i}`} className="px-4 pb-4 text-slate-600 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}