import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CheckoutForm } from '../components/CheckoutForm'
import { OrderSummary } from '../components/OrderSummary'
import { useCart } from '../hooks/useCart'
import { Link } from '../router/Link'
import { navigate } from '../router/router'
import type { DeliveryMethodId } from '../types/shop'
import { createOrder, saveLastOrder } from '../utils/orders'
import styles from './CheckoutPage.module.css'

export function CheckoutPage() {
  const { lines, total, clearCart } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodId | ''>(
    ''
  )
  // Set right before the cart is cleared, so the "empty cart" redirect
  // below does not fire while we are moving to the confirmation page.
  const orderPlaced = useRef(false)

  useEffect(() => {
    if (lines.length === 0 && !orderPlaced.current) {
      navigate('/cart', { replace: true })
    }
  }, [lines.length])

  if (lines.length === 0) return null

  function handleValidSubmit(method: DeliveryMethodId) {
    orderPlaced.current = true
    const order = createOrder(lines, method)
    saveLastOrder(order)
    clearCart()
    navigate('/confirmation')
  }

  const summaryItems = lines.map(({ product, quantity }) => ({
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity,
  }))

  return (
    <div className="container page">
      <Link to="/cart" className={styles.back}>
        <ArrowLeft size={16} aria-hidden="true" />
        Повернутися до кошика
      </Link>
      <h1 className="page-title">Оформлення замовлення</h1>

      <div className={styles.layout}>
        <CheckoutForm
          onDeliveryChange={setDeliveryMethod}
          onValidSubmit={handleValidSubmit}
        />
        <OrderSummary
          className={styles.summary}
          items={summaryItems}
          total={total}
          deliveryMethod={deliveryMethod}
        />
      </div>
    </div>
  )
}
