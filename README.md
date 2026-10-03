# Glow Care Demo Store

An educational demo online store for skincare products, built to practice
**Google Tag Manager**, **Google Analytics 4** and **Meta Pixel** setup.

Visitors can browse products, add them to a cart, go through checkout and
complete a simulated purchase. The site is in Ukrainian and prices are in UAH.

> This is a demo for learning only. It takes no real orders or payments and
> stores no customer data.

**Status:** in development. Analytics tracking will be added after the store
itself is finished and deployed.

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
