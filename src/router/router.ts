/*
 * A tiny client-side router built on the History API.
 *
 * Why not react-router? The store has only 5 routes, and having ONE small
 * file where every route change happens keeps things easy to follow.
 *
 * Paths inside the app never include the base path:
 *   app path "/cart"  <->  browser URL "/skin-care-demo/cart" (GitHub Pages)
 * BASE comes from Vite (`base` option) and is "/" in local development.
 */

import { getProductById } from '../data/products'

export type Route =
  | { name: 'home' }
  | { name: 'product'; productId: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'confirmation' }
  | { name: 'not-found' }

export interface Location {
  /** App path without the base, always starts with "/" */
  path: string
  /** "#catalog" or "" */
  hash: string
  route: Route
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '') // "" or "/skin-care-demo"

/** Key used by public/404.html (GitHub Pages fallback, Stage 3). */
const REDIRECT_KEY = 'glowcare_redirect'

const SITE_NAME = 'Glow Care'

// ---------- Path helpers ----------

/** "/skin-care-demo/cart" -> "/cart" */
function stripBase(pathname: string): string {
  const path =
    BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  return path.startsWith('/') ? path : `/${path}`
}

/** "/cart" -> "/skin-care-demo/cart" (use for every href) */
export function withBase(to: string): string {
  return `${BASE}${to.startsWith('/') ? to : `/${to}`}`
}

export function matchRoute(path: string): Route {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path

  if (clean === '/') return { name: 'home' }
  if (clean === '/cart') return { name: 'cart' }
  if (clean === '/checkout') return { name: 'checkout' }
  if (clean === '/confirmation') return { name: 'confirmation' }

  const product = clean.match(/^\/product\/([^/]+)$/)
  if (product) {
    return { name: 'product', productId: decodeURIComponent(product[1]) }
  }

  return { name: 'not-found' }
}

export function getRouteTitle(route: Route): string {
  switch (route.name) {
    case 'home':
      return `${SITE_NAME} — догляд за шкірою`
    case 'product': {
      const product = getProductById(route.productId)
      return product
        ? `${product.name} — ${SITE_NAME}`
        : `Товар не знайдено — ${SITE_NAME}`
    }
    case 'cart':
      return `Кошик — ${SITE_NAME}`
    case 'checkout':
      return `Оформлення замовлення — ${SITE_NAME}`
    case 'confirmation':
      return `Замовлення підтверджено — ${SITE_NAME}`
    case 'not-found':
      return `Сторінку не знайдено — ${SITE_NAME}`
  }
}

// ---------- Scrolling ----------

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Smoothly scrolls to an element by id. Returns false if it is not rendered. */
export function scrollToId(id: string): boolean {
  const element = document.getElementById(id)
  if (!element) return false
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
  return true
}

/** Waits a few frames for the new page to render, then scrolls to the hash. */
function scrollToHashWhenReady(hash: string, attempts = 10): void {
  requestAnimationFrame(() => {
    if (!scrollToId(hash.slice(1)) && attempts > 0) {
      scrollToHashWhenReady(hash, attempts - 1)
    }
  })
}

// ---------- Store (read by useRoute via useSyncExternalStore) ----------

function readLocation(): Location {
  const path = stripBase(window.location.pathname)
  return { path, hash: window.location.hash, route: matchRoute(path) }
}

let current: Location = readLocation()
const listeners = new Set<() => void>()

function update(): void {
  current = readLocation()
  document.title = getRouteTitle(current.route)
  listeners.forEach((listener) => listener())
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getLocation(): Location {
  return current
}

// ---------- Navigation ----------

export function navigate(to: string, options: { replace?: boolean } = {}) {
  const url = new URL(withBase(to), window.location.origin)
  const samePage = stripBase(url.pathname) === current.path

  if (url.href !== window.location.href) {
    const method = options.replace ? 'replaceState' : 'pushState'
    window.history[method](null, '', url.pathname + url.search + url.hash)
    update()
  }

  if (url.hash) {
    if (samePage) scrollToId(url.hash.slice(1))
    else scrollToHashWhenReady(url.hash)
  } else if (!samePage) {
    window.scrollTo(0, 0)
  }
}

// ---------- Startup ----------

function restoreGithubPagesRedirect(): void {
  try {
    const redirect = sessionStorage.getItem(REDIRECT_KEY)
    if (redirect) {
      sessionStorage.removeItem(REDIRECT_KEY)
      window.history.replaceState(null, '', redirect)
    }
  } catch {
    // sessionStorage blocked: the user simply lands on the home page
  }
}

restoreGithubPagesRedirect()
update()

if (current.hash) scrollToHashWhenReady(current.hash)

window.addEventListener('popstate', update)
