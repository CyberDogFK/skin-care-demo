import { getDeliveryMethod } from '../data/delivery'
import { formatPrice, getProductById } from '../data/products'
import type { DeliveryMethodId } from '../types/shop'
import styles from './OrderSummary.module.css'

export interface SummaryItem {
  productId: string
  name: string
  price: number
  quantity: number
}

interface OrderSummaryProps {
  items: SummaryItem[]
  total: number
  deliveryMethod: DeliveryMethodId | ''
  title?: string
  className?: string
}

/** Read-only list of products, delivery and total (checkout + confirmation). */
export function OrderSummary({
  items,
  total,
  deliveryMethod,
  title = 'Ваше замовлення',
  className = '',
}: OrderSummaryProps) {
  return (
    <section
      className={`${styles.summary} ${className}`}
      aria-labelledby="order-summary-title"
    >
      <h2 id="order-summary-title" className={styles.title}>
        {title}
      </h2>

      <ul className={styles.items}>
        {items.map((item) => {
          const image = getProductById(item.productId)?.image
          return (
            <li key={item.productId} className={styles.item}>
              {image && (
                <img
                  className={styles.thumb}
                  src={image}
                  alt=""
                  width={56}
                  height={56}
                />
              )}
              <span className={styles.name}>
                {item.name}
                <span className={styles.qty}>
                  {item.quantity} × {formatPrice(item.price)}
                </span>
              </span>
              <span className={styles.lineTotal}>
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          )
        })}
      </ul>

      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>Доставка</dt>
          <dd>
            {deliveryMethod
              ? getDeliveryMethod(deliveryMethod).label
              : 'Не обрано'}
          </dd>
        </div>
        <div className={styles.row}>
          <dt>Вартість доставки</dt>
          <dd>Безкоштовно (демо)</dd>
        </div>
        <div className={`${styles.row} ${styles.total}`}>
          <dt>Разом</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
    </section>
  )
}
