import { ThemeToggle } from './components/ThemeToggle'
import { CartProvider } from './context/CartProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { PRODUCTS, formatPrice } from './data/products'
import { useCart } from './hooks/useCart'
import { Link } from './router/Link'
import { useRoute } from './router/useRoute'

// TEMPORARY (Stage 2, checkpoint 1): a test page for the router, cart and
// theme. Replaced by the real header, footer and pages at checkpoint 2.
function FoundationCheck() {
  const { route, path, hash } = useRoute()
  const {
    lines,
    itemCount,
    total,
    addToCart,
    increment,
    decrement,
    removeFromCart,
    clearCart,
  } = useCart()

  return (
    <main className="container" style={{ paddingBlock: 'var(--space-7)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Glow Care</h1>
        <ThemeToggle />
      </div>

      <h2>Router</h2>
      <p>
        route: <strong>{JSON.stringify(route)}</strong>
        <br />
        path: <code>{path}</code> hash: <code>{hash || '—'}</code>
      </p>
      <nav style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Link to="/">/</Link>
        <Link to="/#catalog">/#catalog</Link>
        <Link to="/product/serum_002">/product/serum_002</Link>
        <Link to="/product/unknown">/product/unknown</Link>
        <Link to="/cart">/cart</Link>
        <Link to="/checkout">/checkout</Link>
        <Link to="/confirmation">/confirmation</Link>
        <Link to="/oops">/oops</Link>
      </nav>

      <h2 style={{ marginTop: 'var(--space-7)' }}>Cart</h2>
      <p>
        items: {itemCount}, total: {formatPrice(total)}
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {PRODUCTS.map((product) => (
          <button key={product.id} onClick={() => addToCart(product.id)}>
            + {product.name}
          </button>
        ))}
        <button onClick={clearCart}>clear</button>
      </div>
      <ul>
        {lines.map((line) => (
          <li key={line.product.id}>
            {line.product.name} × {line.quantity} ={' '}
            {formatPrice(line.lineTotal)}{' '}
            <button onClick={() => increment(line.product.id)}>+</button>
            <button onClick={() => decrement(line.product.id)}>−</button>
            <button onClick={() => removeFromCart(line.product.id)}>
              remove
            </button>
          </li>
        ))}
      </ul>

      <section id="catalog" style={{ marginTop: '120vh' }}>
        <h2>#catalog anchor</h2>
      </section>
    </main>
  )
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <FoundationCheck />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
