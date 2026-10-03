import { ProductDetails } from '../components/ProductDetails'
import { getProductById } from '../data/products'
import { NotFoundPage } from './NotFoundPage'

export function ProductPage({ productId }: { productId: string }) {
  const product = getProductById(productId)

  if (!product) {
    return (
      <NotFoundPage
        title="Товар не знайдено"
        message="Можливо, його вже немає в каталозі або посилання містить помилку."
      />
    )
  }

  // key resets the quantity when moving between products
  return (
    <div className="container page">
      <ProductDetails key={product.id} product={product} />
    </div>
  )
}
