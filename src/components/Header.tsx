import { ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { Link } from '../router/Link'
import { useRoute } from '../router/useRoute'
import { itemsLabel } from '../utils/plural'
import { ThemeToggle } from './ThemeToggle'
import styles from './Header.module.css'

export function Header() {
  const { route } = useRoute()
  const { itemCount } = useCart()

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="Glow Care — головна">
          Glow Care
        </Link>

        <nav className={styles.nav} aria-label="Основна навігація">
          <Link
            to="/"
            className={`${styles.navLink} ${styles.hideOnMobile}`}
            aria-current={route.name === 'home' ? 'page' : undefined}
          >
            Головна
          </Link>
          <Link to="/#catalog" className={styles.navLink}>
            Каталог
          </Link>
          <Link
            to="/cart"
            className={`${styles.navLink} ${styles.hideOnMobile}`}
            aria-current={route.name === 'cart' ? 'page' : undefined}
          >
            Кошик
          </Link>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Link
            to="/cart"
            className={styles.cart}
            aria-label={`Кошик: ${itemsLabel(itemCount)}`}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {itemCount > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
