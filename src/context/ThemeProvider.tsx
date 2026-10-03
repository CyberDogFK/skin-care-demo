import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ThemeContext, type Theme } from './ThemeContext'

/*
 * Theme rules (must match the pre-paint script in index.html):
 * - saved choice in localStorage "glowcare_theme" wins;
 * - otherwise follow the OS setting, live;
 * - the first click on the toggle saves an explicit choice.
 */

const STORAGE_KEY = 'glowcare_theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage blocked: the choice lasts until the page is closed
  }
}

/** The pre-paint script already set data-theme, so start from it. */
function readInitialTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.dataset.theme = theme

  // Keep the mobile browser bar color in sync with an explicit choice.
  const background = getComputedStyle(root)
    .getPropertyValue('--color-bg')
    .trim()
  if (background) {
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute('content', background))
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)
  const [hasSavedChoice, setHasSavedChoice] = useState(
    () => readSavedTheme() !== null
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Follow the OS live until the user makes an explicit choice.
  useEffect(() => {
    if (hasSavedChoice) return
    const media = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) =>
      setTheme(event.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [hasSavedChoice])

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light'
    saveTheme(next)
    setTheme(next)
    setHasSavedChoice(true)
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
