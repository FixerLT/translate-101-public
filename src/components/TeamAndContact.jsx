import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Mail, MessageCircle, Phone, Send } from 'lucide-react'
import ContactUnavailableDialog from './ContactUnavailableDialog.jsx'

export default function TeamAndContact() {
  const { t } = useTranslation()
  const [unavailableChannel, setUnavailableChannel] = useState(null)
  const closeDialog = useCallback(() => setUnavailableChannel(null), [])

  const team = [{ key: 'mark' }, { key: 'yurii' }]
  const channels = [
    { icon: Globe, label: 'Instagram', value: '@translate.101', color: 'text-pink-600' },
    { icon: Send, label: 'Telegram', value: '@translate101', color: 'text-blue-500' },
    { icon: MessageCircle, label: 'WhatsApp', value: t('contact.comingSoon'), color: 'text-green-600' },
    { icon: Phone, label: t('contact.phone'), value: t('contact.comingSoon'), color: 'text-slate-900' },
  ]

  return (
    <section id="team-contact" className="grid grid-cols-1 md:grid-cols-2">
      <div id="team" className="bg-white px-4 py-24">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-left">{t('team.title')}</h2>
          <div className="space-y-6">
            {team.map((member) => (
              <article key={member.key} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold">{t(`team.${member.key}.name`)}</h3>
                <p className="mb-2 text-sm text-slate-500">{t(`team.${member.key}.role`)}</p>
                <p className="text-slate-700">{t(`team.${member.key}.bio`)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div id="contact" className="bg-slate-50 px-4 py-24">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-4 text-3xl font-bold">{t('contact.title')}</h2>
          <p className="mx-auto mb-10 max-w-xl text-slate-600">{t('contact.subtitle')}</p>

          <a
            href="mailto:translate.101.team@gmail.com"
            className="mb-8 inline-flex min-h-11 items-center gap-2 rounded bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800"
          >
            <Mail size={18} aria-hidden="true" />
            translate.101.team@gmail.com
          </a>

          <p className="mb-4 text-sm text-slate-500">{t('contact.otherChannels')}</p>
          <div className="mb-10 grid grid-cols-2 gap-4">
            {channels.map((channel) => (
              <button
                type="button"
                key={channel.label}
                onClick={() => setUnavailableChannel(channel.label)}
                className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-400 hover:shadow-sm"
                aria-haspopup="dialog"
              >
                <channel.icon size={28} className={channel.color} aria-hidden="true" />
                <span className="font-semibold">{channel.label}</span>
                <span className="text-sm text-slate-600">{channel.value}</span>
              </button>
            ))}
          </div>

          <p className="text-sm text-slate-500">{t('contact.emailOnly')}</p>
        </div>
      </div>

      <ContactUnavailableDialog channel={unavailableChannel} onClose={closeDialog} />
    </section>
  )
}
