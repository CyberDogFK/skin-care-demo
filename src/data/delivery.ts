import type { DeliveryMethod, DeliveryMethodId } from '../types/shop'

// Delivery is free in the demo, so the order total always equals the cart total.
export const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: 'nova_poshta',
    label: 'Нова Пошта',
    description: 'До відділення або поштомату, 1–2 дні',
  },
  {
    id: 'ukrposhta',
    label: 'Укрпошта',
    description: 'До відділення, 3–5 днів',
  },
  {
    id: 'courier',
    label: 'Кур’єр',
    description: 'Доставка за адресою, 1–2 дні',
  },
  {
    id: 'pickup',
    label: 'Самовивіз',
    description: 'З демо-шоуруму Glow Care, сьогодні',
  },
]

export function getDeliveryMethod(id: DeliveryMethodId): DeliveryMethod {
  return DELIVERY_METHODS.find((method) => method.id === id)!
}

export function isDeliveryMethodId(value: string): value is DeliveryMethodId {
  return DELIVERY_METHODS.some((method) => method.id === value)
}
