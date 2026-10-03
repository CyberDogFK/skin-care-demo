import { PackageOpen } from 'lucide-react'
import { useState } from 'react'
import { EmptyState } from '../components/EmptyState'
import { OrderConfirmation } from '../components/OrderConfirmation'
import { loadLastOrder } from '../utils/orders'

export function ConfirmationPage() {
  // The order is created on checkout submit and only READ here,
  // so refreshing this page shows the same order and creates nothing new.
  const [order] = useState(loadLastOrder)

  return (
    <div className="container page">
      {order ? (
        <OrderConfirmation order={order} />
      ) : (
        <EmptyState
          icon={PackageOpen}
          title="Замовлення не знайдено"
          message="Тут з’явиться підтвердження після оформлення замовлення."
          actionLabel="До каталогу"
          actionTo="/#catalog"
        />
      )}
    </div>
  )
}
