import { Minus, Plus } from 'lucide-react'
import styles from './QuantitySelector.module.css'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label?: string
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  label = 'Кількість',
}: QuantitySelectorProps) {
  return (
    <div className={styles.selector} role="group" aria-label={label}>
      <button
        type="button"
        className="icon-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Зменшити кількість"
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output className={styles.value} aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="icon-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Збільшити кількість"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
