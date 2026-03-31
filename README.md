# Weather Forecast App

A compact pet project built with React, TypeScript, Vite, Material UI, and TanStack Query, powered by [WeatherAPI](https://www.weatherapi.com/).

The application lets users search for a city, view its current weather, keep a local search history, remove history entries, and undo removals. Search history items can be selected again to show weather for that city. While the page session is active, repeated selections may be served from the React Query cache instead of making a new network request.

## Features

- Search cities with autocomplete suggestions
- View:
  - current temperature
  - weather description
  - daily minimum and maximum temperatures
  - wind speed
- Persist search history in `localStorage`
- Reuse a history item to show weather again
- Remove history items
- Undo a remove action

## Tech Stack

- React 19
- TypeScript
- Vite
- React Compiler
- Material UI
- TanStack Query
- ESLint
- pnpm

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://api.weatherapi.com/v1
VITE_WEATHER_API_KEY=YOUR_API_KEY_HERE
```

Or copy the example file:

```bash
cp .env.example .env
```

### Run locally

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Run linting

```bash
pnpm lint
```
