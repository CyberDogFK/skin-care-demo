import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import { formatPrice } from '../data/products'
import { useCart } from '../hooks/useCart'
import { Link } from '../router/Link'
import styles from './Cart.module.css'

export function Cart() {
  const {
    lines,
    itemCount,
    subtotal,
    total,
    increment,
    decrement,
    removeFromCart,
  } = useCart()

  return (
    <div className={styles.layout}>
      <ul className={styles.lines} aria-label="Товари в кошику">
        {lines.map(({ product, quantity, lineTotal }) => (
          <li key={product.id} className={styles.line}>
            <Link
              to={`/product/${product.id}`}
              className={styles.thumb}
              tabIndex={-1}
              aria-hidden="true"
            >
              <img src={product.image} alt="" width={96} height={96} />
            </Link>

            <div className={styles.info}>
              <Link to={`/product/${product.id}`} className={styles.name}>
                {product.name}
              </Link>
              <span className={styles.unitPrice}>
                {formatPrice(product.price)} · {product.volume}
              </span>
            </div>

            <div
              className={styles.quantity}
              role="group"
              aria-label={`Кількість: ${product.name}`}
            >
              <button
                type="button"
                className="icon-btn"
                onClick={() => decrement(product.id)}
                disabled={quantity <= 1}
                aria-label={`Зменшити кількість: ${product.name}`}
              >
                <Minus size={16} aria-hidden="true" />
              </button>
              <output className={styles.count} aria-live="polite">
                {quantity}
              </output>
              <button
                type="button"
                className="icon-btn"
                onClick={() => increment(product.id)}
                aria-label={`Збільшити кількість: ${product.name}`}
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>

            <span className={styles.lineTotal}>{formatPrice(lineTotal)}</span>

            <button
              type="button"
              className={`icon-btn ${styles.remove}`}
              onClick={() => removeFromCart(product.id)}
              aria-label={`Видалити з кошика: ${product.name}`}
            >
              <Trash2 size={16} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <aside className={styles.summary} aria-labelledby="cart-summary-title">
        <h2 id="cart-summary-title" className={styles.summaryTitle}>
          Разом
        </h2>
        <dl className={styles.rows}>
          <div className={styles.row}>
            <dt>Товари ({itemCount} шт.)</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className={styles.row}>
            <dt>Доставка</dt>
            <dd>Безкоштовно</dd>
          </div>
          <div className={`${styles.row} ${styles.total}`}>
            <dt>До сплати</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
        <Link to="/checkout" className="btn btn-primary btn-block">
          Оформити замовлення
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/#catalog" className={styles.continue}>
          Продовжити покупки
        </Link>
      </aside>
    </div>
  )
}
