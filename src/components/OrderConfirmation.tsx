import { CircleCheck } from 'lucide-react'
import { Link } from '../router/Link'
import type { Order } from '../types/shop'
import { OrderSummary } from './OrderSummary'
import styles from './OrderConfirmation.module.css'

const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className={styles.confirmation}>
      <div className={styles.header}>
        <span className={styles.icon}>
          <CircleCheck size={36} aria-hidden="true" />
        </span>
        <h1 className={styles.title}>Дякуємо за замовлення!</h1>
        <p className={styles.text}>
          Це демо-замовлення: оплата не списується, товари не надсилаються.
        </p>
      </div>

      <dl className={styles.facts}>
        <div>
          <dt>Номер замовлення</dt>
          <dd className={styles.transactionId}>{order.transactionId}</dd>
        </div>
        <div>
          <dt>Дата</dt>
          <dd>{dateFormatter.format(new Date(order.createdAt))}</dd>
        </div>
      </dl>

      <OrderSummary
        title="Склад замовлення"
        items={order.items}
        total={order.total}
        deliveryMethod={order.deliveryMethod}
      />

      <Link to="/" className={`btn btn-primary ${styles.home}`}>
        Повернутися на головну
      </Link>
    </div>
  )
}
