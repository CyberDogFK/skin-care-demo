import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import { getProductById } from '../data/products'
import type { CartItem, CartLine } from '../types/shop'
import { CartContext, type CartContextValue } from './CartContext'

const STORAGE_KEY = 'glowcare_cart'

type CartAction =
  | { type: 'ADD'; productId: string; quantity: number }
  | { type: 'INCREMENT'; productId: string }
  | { type: 'DECREMENT'; productId: string }
  | { type: 'REMOVE'; productId: string }
  | { type: 'CLEAR' }

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = items.find((item) => item.productId === action.productId)
      if (existing) {
        return items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        )
      }
      return [
        ...items,
        { productId: action.productId, quantity: action.quantity },
      ]
    }
    case 'INCREMENT':
      return items.map((item) =>
        item.productId === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    case 'DECREMENT':
      // Minimum is 1 — removing is done with the separate remove button.
      return items.map((item) =>
        item.productId === action.productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    case 'REMOVE':
      return items.filter((item) => item.productId !== action.productId)
    case 'CLEAR':
      return []
  }
}

/** Reads the saved cart, dropping anything invalid or no longer in the catalog. */
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const items: CartItem[] = []
    for (const entry of parsed) {
      const productId = entry?.productId
      const quantity = entry?.quantity
      if (
        typeof productId === 'string' &&
        getProductById(productId) &&
        Number.isInteger(quantity) &&
        quantity > 0 &&
        !items.some((item) => item.productId === productId)
      ) {
        items.push({ productId, quantity })
      }
    }
    return items
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage full or blocked: the cart still works until the page is closed
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    saveCart(items)
  }, [items])

  // Named actions: the single place where the cart changes
  // (Stage 4 adds analytics events here).
  const addToCart = useCallback((productId: string, quantity = 1) => {
    if (!getProductById(productId) || quantity < 1) return
    dispatch({ type: 'ADD', productId, quantity: Math.floor(quantity) })
  }, [])

  const increment = useCallback((productId: string) => {
    dispatch({ type: 'INCREMENT', productId })
  }, [])

  const decrement = useCallback((productId: string) => {
    dispatch({ type: 'DECREMENT', productId })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE', productId })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = items.flatMap((item) => {
      const product = getProductById(item.productId)
      return product
        ? [
            {
              product,
              quantity: item.quantity,
              lineTotal: product.price * item.quantity,
            },
          ]
        : []
    })
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)

    return {
      items,
      lines,
      itemCount,
      subtotal,
      total: subtotal,
      addToCart,
      increment,
      decrement,
      removeFromCart,
      clearCart,
    }
  }, [items, addToCart, increment, decrement, removeFromCart, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
