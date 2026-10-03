import { Link } from '../router/Link'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <Link to="/" className={styles.logo}>
            Glow Care
          </Link>
          <p className={styles.tagline}>Ніжний догляд для сяйва вашої шкіри</p>
        </div>
        <p className={styles.disclaimer}>
          Навчальний демо-магазин. Реальні замовлення та оплати не здійснюються.
        </p>
        <p className={styles.copy}>© {year} Glow Care Demo</p>
      </div>
    </footer>
  )
}
