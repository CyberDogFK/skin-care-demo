import { ShoppingBag } from 'lucide-react'
import { Cart } from '../components/Cart'
import { EmptyState } from '../components/EmptyState'
import { useCart } from '../hooks/useCart'

export function CartPage() {
  const { lines } = useCart()

  return (
    <div className="container page">
      {lines.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Ваш кошик порожній"
          message="Додайте товари з каталогу, і вони з’являться тут."
          actionLabel="До каталогу"
          actionTo="/#catalog"
        />
      ) : (
        <>
          <h1 className="page-title">Кошик</h1>
          <Cart />
        </>
      )}
    </div>
  )
}
