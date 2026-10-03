import { formatPrice } from '../data/products'
import { Link } from '../router/Link'
import type { Product } from '../types/shop'
import { AddToCartButton } from './AddToCartButton'
import styles from './ProductCard.module.css'

export function ProductCard({ product }: { product: Product }) {
  const productPath = `/product/${product.id}`

  return (
    <article className={styles.card}>
      {/* Duplicate of the title link, hidden from keyboard/screen readers */}
      <Link
        to={productPath}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          className={styles.image}
          src={product.image}
          alt=""
          width={800}
          height={800}
          loading="lazy"
        />
      </Link>

      <div className={styles.body}>
        <span className="pill">{product.category}</span>
        <h3 className={styles.name}>
          <Link to={productPath}>{product.name}</Link>
        </h3>
        <p className={styles.description}>{product.shortDescription}</p>

        <div className={styles.meta}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <span className={styles.volume}>{product.volume}</span>
        </div>

        <div className={styles.actions}>
          <Link to={productPath} className="btn btn-outline">
            Детальніше
          </Link>
          <AddToCartButton productId={product.id} productName={product.name} />
        </div>
      </div>
    </article>
  )
}
