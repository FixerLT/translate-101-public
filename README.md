# translate101 Landing Page

Single-page React landing for translate101. Desktop-first, i18n-ready.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Host it anywhere (AWS S3, Vercel, Netlify, your free AWS instance, etc.).

## Project Structure

```
├── public/
│   ├── assets/
│   │   ├── audios/
│   │   │   └── samples.json       # Audio metadata (label, duration, src)
│   │   └── texts/
│   │       └── samples.json       # Translation sample metadata
│   └── locales/
│       ├── en/
│       │   └── translation.json   # All English UI text
│       └── uk/
│           └── translation.json   # All Ukrainian UI text
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx            # App entry
    ├── App.jsx             # Root component
    ├── index.css           # Tailwind directives
    ├── i18n/
    │   └── config.js       # i18next setup (URL param, localStorage, navigator)
    └── components/
        ├── Hero.jsx        # Screen 1
        ├── Work.jsx        # Screen 2 — loads samples from /assets
        ├── AudioPlayer.jsx # Narration player UI
        ├── TranslationCarousel.jsx # Slider loaded from /assets
        ├── Pricing.jsx     # Screen 3
        ├── FAQ.jsx         # Screen 4 part 1
        ├── Team.jsx        # Screen 4 part 2
        └── LanguageSelector.jsx # URL-param language list
```

## Stack

- **Vite** — Fast dev server and bundler
- **React 18** — UI library
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icons
- **react-i18next + i18next + i18next-browser-languagedetector + i18next-http-backend** — Localization

## Localization

- Default: English (`en`)
- Supported: English (`en`), Ukrainian (`uk`)
- Switcher: horizontal list of buttons (top-right corner)
- Detection order: URL query param (`?lng=uk`) → localStorage → browser language

## Adding / Removing Samples

- **Audio:** Edit `public/assets/audios/samples.json`. Add a new object with `id`, `duration`, `domain`, `label`, `src`.
- **Text:** Edit `public/assets/texts/samples.json`. Add a new object with `id`, `pair`, `domain`, `original`, `translation`.
- No code changes needed. The app fetches these on mount.

## Notes

- Audio players are visual placeholders. Wire the `src` field to real MP3s when ready.
- CTA buttons use `mailto:translate.101.team@gmail.com` until a real form is built.
- The page is responsive by default (Tailwind mobile-first). Desktop is the primary design target.