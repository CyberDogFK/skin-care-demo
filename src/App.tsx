import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { CartProvider } from './context/CartProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import type { Route } from './router/router'
import { useRoute } from './router/useRoute'

function renderPage(route: Route) {
  switch (route.name) {
    case 'home':
      return <HomePage />
    case 'product':
      return <ProductPage productId={route.productId} />
    case 'cart':
      return <CartPage />
    case 'checkout':
      return <CheckoutPage />
    case 'confirmation':
      return <ConfirmationPage />
    case 'not-found':
      return <NotFoundPage />
  }
}

function Layout() {
  const { route, path } = useRoute()

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти до вмісту
      </a>
      <Header />
      {/* key: each page starts fresh (state, effects) on navigation */}
      <main id="main" key={path} tabIndex={-1}>
        {renderPage(route)}
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
