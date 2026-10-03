export interface Product {
  id: string
  name: string
  category: string
  price: number
  volume: string
  shortDescription: string
  description: string
  image: string
}

/** What is stored in the cart: only id + quantity, product data is looked up. */
export interface CartItem {
  productId: string
  quantity: number
}

/** A cart item joined with its product data. */
export interface CartLine {
  product: Product
  quantity: number
  lineTotal: number
}

export type DeliveryMethodId =
  'nova_poshta' | 'ukrposhta' | 'courier' | 'pickup'

export interface DeliveryMethod {
  id: DeliveryMethodId
  label: string
  description: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

/** A completed demo order. Contains NO personal data (name, email, phone). */
export interface Order {
  transactionId: string
  items: OrderItem[]
  total: number
  deliveryMethod: DeliveryMethodId
  createdAt: string
}
