import type { Product } from '../types/shop'
import cleanserImg from '../assets/products/cleanser.webp'
import creamImg from '../assets/products/cream.webp'
import serumImg from '../assets/products/serum.webp'
import sunscreenImg from '../assets/products/sunscreen.webp'

export const CURRENCY = 'UAH'

export const PRODUCTS: Product[] = [
  {
    id: 'cream_001',
    name: 'Зволожувальний крем',
    category: 'Креми',
    price: 450,
    volume: '50 мл',
    shortDescription: 'Легкий крем для щоденного глибокого зволоження.',
    description:
      'Ніжний крем з гіалуроновою кислотою та маслом ши відновлює баланс вологи, ' +
      'робить шкіру м’якою та пружною. Швидко вбирається, не залишає липкості. ' +
      'Підходить для щоденного використання вранці та ввечері.',
    image: creamImg,
  },
  {
    id: 'serum_002',
    name: 'Сироватка для обличчя',
    category: 'Сироватки',
    price: 620,
    volume: '30 мл',
    shortDescription: 'Сироватка з вітаміном C для сяйва та рівного тону.',
    description:
      'Концентрована сироватка з вітаміном C та ніацинамідом вирівнює тон, ' +
      'зменшує ознаки втоми та повертає шкірі природне сяйво. ' +
      'Наносьте 2–3 краплі на очищену шкіру перед кремом.',
    image: serumImg,
  },
  {
    id: 'cleanser_003',
    name: 'Очищувальний гель',
    category: 'Очищення',
    price: 380,
    volume: '150 мл',
    shortDescription: 'М’який гель для вмивання без відчуття стягнутості.',
    description:
      'Делікатний гель з алое вера та пантенолом очищує шкіру від забруднень ' +
      'і макіяжу, зберігаючи її природний захисний бар’єр. ' +
      'Підходить для всіх типів шкіри, зокрема чутливої.',
    image: cleanserImg,
  },
  {
    id: 'sunscreen_004',
    name: 'Сонцезахисний крем SPF 50',
    category: 'Захист від сонця',
    price: 550,
    volume: '50 мл',
    shortDescription: 'Високий захист від UVA/UVB без білих слідів.',
    description:
      'Легкий сонцезахисний крем з фільтрами широкого спектра захищає від ' +
      'UVA- та UVB-променів і передчасного старіння. Не залишає білих слідів, ' +
      'добре лягає під макіяж. Наносьте за 15 хвилин до виходу на сонце.',
    image: sunscreenImg,
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id)
}

const priceFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: CURRENCY,
  maximumFractionDigits: 0,
})

/** 450 -> "450 ₴" */
export function formatPrice(value: number): string {
  return priceFormatter.format(value)
}
