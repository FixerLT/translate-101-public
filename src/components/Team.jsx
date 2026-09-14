import { useTranslation } from 'react-i18next'

export default function Team() {
  const { t } = useTranslation()

  const members = [
    { key: 'mark' },
    { key: 'yurii' },
  ]

  return (
    <section id="team" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">{t('team.title')}</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          {members.map((member) => (
            <div key={member.key} className="bg-white p-6 rounded-lg border border-slate-200">
              <div className="font-semibold text-lg">{t(`team.${member.key}.name`)}</div>
              <div className="text-sm text-slate-500 mb-2">{t(`team.${member.key}.role`)}</div>
              <div className="text-slate-700">{t(`team.${member.key}.bio`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}