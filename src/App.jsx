import { Suspense } from 'react'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Pricing from './components/Pricing.jsx'
import FAQ from './components/FAQ.jsx'
import TeamAndContact from './components/TeamAndContact.jsx'
import LanguageSelector from './components/LanguageSelector.jsx'

function App() {
  return (
    <div className="font-sans">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:shadow-lg">Skip to work</a>
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-600">Loading...</div>}>
        <main>
          <Hero />
          <Work />
        <Pricing />
        <FAQ />
        <TeamAndContact />
        </main>
      </Suspense>
    </div>
  )
}

export default App