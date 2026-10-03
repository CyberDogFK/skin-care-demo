import { Sparkles } from 'lucide-react'
import hero from './assets/hero.webp'

// Stage 1 placeholder: checks fonts, tokens, theme and image import.
// Replaced by the real layout and router in Stage 2.
function App() {
  return (
    <main className="container" style={{ paddingBlock: 'var(--space-8)' }}>
      <p style={{ color: 'var(--color-muted)' }}>
        <Sparkles size={16} aria-hidden="true" /> Сайт у розробці
      </p>
      <h1>Glow Care</h1>
      <p>Ніжний догляд для сяйва вашої шкіри.</p>
      <img
        src={hero}
        alt="Жінка з рушником на голові після догляду за шкірою"
        width={1600}
        height={900}
        style={{
          borderRadius: 'var(--radius-lg)',
          marginTop: 'var(--space-6)',
        }}
      />
    </main>
  )
}

export default App
