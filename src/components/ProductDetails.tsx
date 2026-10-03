import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { formatPrice } from '../data/products'
import { Link } from '../router/Link'
import type { Product } from '../types/shop'
import { AddToCartButton } from './AddToCartButton'
import { QuantitySelector } from './QuantitySelector'
import styles from './ProductDetails.module.css'

export function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <article className={styles.details}>
      <Link to="/#catalog" className={styles.back}>
        <ArrowLeft size={16} aria-hidden="true" />
        До каталогу
      </Link>

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
          />
        </div>

        <div className={styles.info}>
          <span className="pill">{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.volume}>{product.volume}</p>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.buy}>
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              quantity={quantity}
            />
          </div>

          <Link to="/cart" className={styles.toCart}>
            Перейти до кошика
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
