import { Leaf, Rabbit, ShieldCheck, Truck, type LucideIcon } from 'lucide-react'
import styles from './Benefits.module.css'

interface Benefit {
  icon: LucideIcon
  title: string
  text: string
}

const BENEFITS: Benefit[] = [
  {
    icon: Leaf,
    title: 'Натуральні інгредієнти',
    text: 'Рослинні екстракти та олії у кожній формулі.',
  },
  {
    icon: ShieldCheck,
    title: 'Дерматологічно протестовано',
    text: 'Підходить навіть для чутливої шкіри.',
  },
  {
    icon: Truck,
    title: 'Швидка доставка',
    text: 'Безкоштовна доставка по всій Україні (демо).',
  },
  {
    icon: Rabbit,
    title: 'Без тестування на тваринах',
    text: 'Cruelty-free на всіх етапах виробництва.',
  },
]

export function Benefits() {
  return (
    <section
      className={`container ${styles.section}`}
      aria-labelledby="benefits-title"
    >
      <h2 id="benefits-title" className="visually-hidden">
        Наші переваги
      </h2>
      <ul className={styles.list}>
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <li key={title} className={styles.item}>
            <span className={styles.icon}>
              <Icon size={22} aria-hidden="true" />
            </span>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
