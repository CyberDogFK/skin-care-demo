import { isDeliveryMethodId } from '../data/delivery'
import type { CartLine, DeliveryMethodId, Order } from '../types/shop'

const LAST_ORDER_KEY = 'glowcare_last_order'

/** "GC-20261003-4F7K2Q": date + 6 random base-36 characters. */
export function generateTransactionId(date = new Date()): string {
  const day = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('')

  const random = Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map((byte) => (byte % 36).toString(36))
    .join('')
    .toUpperCase()

  return `GC-${day}-${random}`
}

/** Builds an order from the cart. Contains NO personal data. */
export function createOrder(
  lines: CartLine[],
  deliveryMethod: DeliveryMethodId
): Order {
  return {
    transactionId: generateTransactionId(),
    items: lines.map((line) => ({
      productId: line.product.id,
      name: line.product.name,
      price: line.product.price,
      quantity: line.quantity,
    })),
    total: lines.reduce((sum, line) => sum + line.lineTotal, 0),
    deliveryMethod,
    createdAt: new Date().toISOString(),
  }
}

export function saveLastOrder(order: Order): void {
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order))
  } catch {
    // Storage blocked: the confirmation page will show "no order found"
  }
}

function isOrder(value: unknown): value is Order {
  if (typeof value !== 'object' || value === null) return false
  const order = value as Record<string, unknown>
  return (
    typeof order.transactionId === 'string' &&
    typeof order.total === 'number' &&
    typeof order.createdAt === 'string' &&
    typeof order.deliveryMethod === 'string' &&
    isDeliveryMethodId(order.deliveryMethod) &&
    Array.isArray(order.items) &&
    order.items.every(
      (item) =>
        typeof item?.productId === 'string' &&
        typeof item?.name === 'string' &&
        typeof item?.price === 'number' &&
        typeof item?.quantity === 'number'
    )
  )
}

export function loadLastOrder(): Order | null {
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isOrder(parsed) ? parsed : null
  } catch {
    return null
  }
}
