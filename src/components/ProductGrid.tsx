import { PRODUCTS } from '../data/products'
import { ProductCard } from './ProductCard'
import styles from './ProductGrid.module.css'

export function ProductGrid() {
  return (
    <section
      id="catalog"
      className={`container ${styles.section}`}
      aria-labelledby="catalog-title"
    >
      <div className={styles.heading}>
        <span className="pill">Каталог</span>
        <h2 id="catalog-title">Наші продукти</h2>
        <p className={styles.subtitle}>
          Чотири кроки базового догляду: очищення, сироватка, зволоження та
          захист від сонця.
        </p>
      </div>

      <ul className={styles.grid}>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
