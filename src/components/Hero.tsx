import { ArrowRight } from 'lucide-react'
import heroImage from '../assets/hero.webp'
import { formatPrice, getProductById } from '../data/products'
import { Link } from '../router/Link'
import { scrollToId } from '../router/router'
import { AddToCartButton } from './AddToCartButton'
import styles from './Hero.module.css'

const FEATURED_PRODUCT_ID = 'serum_002'

export function Hero() {
  const featured = getProductById(FEATURED_PRODUCT_ID)

  return (
    <section
      className={`container ${styles.hero}`}
      aria-labelledby="hero-title"
    >
      <div className={styles.frame}>
        <img
          className={styles.image}
          src={heroImage}
          alt=""
          width={1600}
          height={900}
          fetchPriority="high"
        />
        <div className={styles.overlay} aria-hidden="true" />

        <div className={styles.content}>
          <span className={styles.label}>Догляд для шкіри</span>
          <h1 id="hero-title" className={styles.title}>
            Ніжний догляд для сяйва вашої шкіри
          </h1>
          <p className={styles.text}>
            Прості ритуали з м’якими формулами, які зволожують, захищають і
            повертають шкірі природне сяйво.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToId('catalog')}
          >
            Обрати догляд
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        {featured && (
          <aside className={styles.card} aria-label="Рекомендований продукт">
            <Link
              to={`/product/${featured.id}`}
              className={styles.cardImage}
              tabIndex={-1}
              aria-hidden="true"
            >
              <img src={featured.image} alt="" width={96} height={96} />
            </Link>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>
                <Link to={`/product/${featured.id}`}>{featured.name}</Link>
              </p>
              <p className={styles.cardText}>{featured.shortDescription}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardPrice}>
                  {formatPrice(featured.price)}
                </span>
                <AddToCartButton
                  productId={featured.id}
                  productName={featured.name}
                  className={styles.cardButton}
                />
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}
