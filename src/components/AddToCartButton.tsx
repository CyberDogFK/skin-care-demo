import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useTemporaryFlag } from '../hooks/useTemporaryFlag'

interface AddToCartButtonProps {
  productId: string
  productName: string
  quantity?: number
  className?: string
}

/** "Додати в кошик" with a short "Додано в кошик" confirmation. */
export function AddToCartButton({
  productId,
  productName,
  quantity = 1,
  className = '',
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [added, showAdded] = useTemporaryFlag()

  function handleClick() {
    addToCart(productId, quantity)
    showAdded()
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary ${className}`}
        onClick={handleClick}
      >
        {added ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <ShoppingBag size={18} aria-hidden="true" />
        )}
        {added ? 'Додано в кошик' : 'Додати в кошик'}
      </button>
      <span className="visually-hidden" role="status">
        {added ? `${productName} додано в кошик` : ''}
      </span>
    </>
  )
}
