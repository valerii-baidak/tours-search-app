# 🧳 Tours Search — React Test Assignment

A client-side application for tour search with asynchronous results fetching, data caching, and race condition protection.

## 🚀 Live Demo
👉 https://tours-search-app.vercel.app/

## 🧱 Architecture

The application is built with clear separation of concerns:

UI → Hooks → Services → API

- **UI** — rendering only
- **Hooks** — feature logic
- **Services** — business logic (polling, cancel, cache)
- **API** — interaction with mock data

## ✨ Functionality

### Destination Search
- autocomplete (countries / cities / hotels)
- debounce (250ms)
- keyboard navigation
- race condition protection

### Tours Search
- async lifecycle (start → polling → result)
- retry on errors
- active search cancellation
- hotel caching

### UI
- loading / error / empty states
- responsive grid (2 → 1 cards)
- CSS Modules

## ⚡ Performance

The project uses **React Compiler (experimental)** to automatically optimize rendering and reduce the need for manual memoization.

## ⚙️ Tech Stack

- React
- TypeScript
- CSS Modules
- React Compiler (experimental)
- Custom hooks
- Mock API

## ▶️ Run locally

```bash
npm install
npm run dev