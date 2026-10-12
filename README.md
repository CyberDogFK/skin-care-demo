# Glow Care Demo Store

An educational demo online store for skincare products, built to practice
**Google Tag Manager**, **Google Analytics 4** and **Meta Pixel** setup.

Visitors can browse products, add them to a cart, go through checkout and
complete a simulated purchase. The site is in Ukrainian and prices are in UAH.

> This is a demo for learning only. It takes no real orders or payments and
> stores no customer data.

**Live site:** https://cyberdogfk.github.io/skin-care-demo/

**Status:** Part A — the store is complete and has **no analytics code**.
Tracking (dataLayer, Google Tag Manager, GA4, Meta Pixel) is added in Part B.

## Light and dark theme

- With no saved choice the site follows the operating system theme, and
  switches live when the OS setting changes.
- The sun/moon button in the header switches the theme manually.
- The choice is saved in `localStorage` under the key `glowcare_theme`.
  Delete that key to go back to following the OS.
- A small script in `index.html` applies the theme before the first paint,
  so there is no flash of the wrong theme.

## Technologies

- React + TypeScript
- Vite (development server and build)
- CSS with design tokens (light and dark theme)
- Lucide React (icons)

## Run locally

### 1. Install Node.js

Install Node.js **22 LTS** (or 20.19+) from [nodejs.org](https://nodejs.org).
Check the versions in a terminal:

```bash
node -v
npm -v
```

### 2. Get the project

```bash
git clone git@github.com:CyberDogFK/skin-care-demo.git
cd skin-care-demo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page
reloads automatically when you change the code.

## Other commands

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run build`   | Builds the production version into `dist/`     |
| `npm run preview` | Serves the production build locally to test it |
| `npm run lint`    | Checks the code for errors with ESLint         |

## Deployment (GitHub Pages)

The site is deployed automatically by GitHub Actions
(`.github/workflows/deploy.yml`):

1. Every push to `main` (or a manual run from the **Actions** tab) starts the
   workflow.
2. The **build** job runs `npm ci`, `npm run lint` and `npm run build` with
   `BASE_PATH=/<repo>/`, because the site lives at
   `https://<user>.github.io/<repo>/`. Locally the base is `/`.
3. The **deploy** job publishes `dist/` to GitHub Pages.

Every push to `main` updates the live site, so push only commits that leave
the site working.

### Enable Pages in your fork

1. Fork the repository (it must be public for free GitHub Pages).
2. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push a commit to `main` or run the workflow from the **Actions** tab.
4. The site appears at `https://<your-user>.github.io/<repo>/`.

### Page refresh on deep links

GitHub Pages has no rewrite rules, so opening
`/skin-care-demo/product/cream_001` directly would normally give a 404.
`public/404.html` saves the requested URL in `sessionStorage` and redirects
to the site root; the router (`src/router/router.ts`) restores the URL on
startup with `history.replaceState`. The visitor ends up on the page they
asked for.

### Alternatives

Netlify or Vercel can deploy the same repository: connect the GitHub repo,
use build command `npm run build`, output folder `dist`, keep the base path
`/` (no `BASE_PATH`), and add an SPA rewrite of all paths to `/index.html`
instead of using `404.html`.

## Project structure

```text
.github/workflows/  GitHub Pages deployment
public/             Files copied as-is (favicon, 404.html fallback)
src/
  assets/           Hero and product images
  components/       UI pieces (header, cart, checkout form, …) + CSS modules
  context/          Cart and theme state (React context + providers)
  data/             Product catalog and delivery methods
  hooks/            useCart, useTheme and small helpers
  pages/            One component per route
  router/           Tiny History API router, Link component, useRoute
  styles/           Global styles and design tokens (light/dark)
  types/            Shared TypeScript types
  utils/            Order storage, validation, pluralization
tech_details/       Stage instructions and requirements
```
