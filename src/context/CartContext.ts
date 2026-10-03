import { createContext } from 'react'
import type { CartItem, CartLine } from '../types/shop'

export interface CartContextValue {
  items: CartItem[]
  /** Items joined with product data, in the order they were added */
  lines: CartLine[]
  /** Total number of units (2 creams + 1 serum = 3) */
  itemCount: number
  subtotal: number
  /** Equals subtotal: delivery is free in the demo */
  total: number

  addToCart: (productId: string, quantity?: number) => void
  increment: (productId: string) => void
  decrement: (productId: string) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
