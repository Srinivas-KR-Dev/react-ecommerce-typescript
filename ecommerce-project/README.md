# React E-Commerce Application

Modern e-commerce web application built with React and TypeScript.

This project includes a complete shopping flow with product browsing, cart management, checkout, order history, package tracking, API integration, and dark/light theme support.

This is an ongoing project, and I plan to continue improving features, UI polish, and overall developer experience over time.

## Features

- Product listing with search
- Add to cart with quantity selection
- Shopping cart updates and item removal
- Delivery option selection
- Payment summary and order placement
- Orders history page
- Package tracking page
- API integration with Axios
- Data caching and mutation handling with TanStack Query
- Dark and light theme toggle
- Responsive desktop and mobile layout

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- Axios
- Day.js

### Testing

- Vitest
- React Testing Library

## Screenshots

### Home

![Home page](./screenshots/home.png)

### Checkout

![Checkout page](./screenshots/checkout.png)

### Orders

![Orders page](./screenshots/orders.png)

### Tracking

![Tracking page](./screenshots/tracking.png)

### Not Found

![Not found page](./screenshots/not-found.png)

## Installation

```bash
git clone https://github.com/Srinivas-KR-Dev/react-ecommerce-typescript
cd react-ecommerce-typescript
npm install
```

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Ecommerce API running on `http://localhost:5000`

The frontend uses the Vite proxy for:

- `/api`
- `/images`

### Start the app

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Testing

```bash
npx vitest run
```

## Project Structure

```text
src/
  components/   Shared UI components
  context/      Theme context
  hooks/        API hooks with React Query
  pages/        Home, checkout, orders, tracking, not found
  types/        Shared TypeScript models
  utils/        Helpers and query client setup
```

## Main Routes

- `/`
- `/checkout`
- `/orders`
- `/tracking/:orderId/:productId`

## Notes

- Theme preference is stored locally.
- Server state is managed with React Query.
- The current build output is configured to emit into `../ecommerce-backend/dist`.

## Author

Srinivas-KR-DEV
