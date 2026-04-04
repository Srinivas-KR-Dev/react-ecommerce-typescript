# React E-Commerce Application

AI-powered full stack e-commerce application built with React and TypeScript.

This project goes beyond a typical e-commerce app by integrating **AI-driven product search and a conversational shopping assistant**, designed using a retrieval-augmented approach to ensure accurate and context-aware responses.

This project includes a complete shopping flow with product browsing, cart management, checkout, order history, package tracking, AI-powered product discovery, and an AI shopping assistant backed by the companion Express + MongoDB API.

This is an ongoing project, and I plan to continue improving features, UI polish, testing coverage, and overall developer experience over time.

## Features

- Product listing with search
- AI Search (intent-based product discovery beyond keyword matching)
- AI Shopping Assistant (context-aware recommendations using real product data)
- Add to cart with quantity selection
- Shopping cart updates and item removal
- Delivery option selection
- Payment summary, INR price display, and order placement
- Orders history page
- Package tracking page
- Dark and light theme support
- Responsive desktop and mobile layout
- API integration with Axios
- Server-state caching and mutation handling with TanStack Query

## AI Architecture

This project implements a **retrieval-augmented pattern (RAG-style)** to power AI features.

### Flow:

User Query  
↓  
Backend Retrieval (keyword + scoring-based matching)  
↓  
Relevant Product Context  
↓  
LLM (Google Gemini)  
↓  
Grounded AI Response

### Key Design Decisions:

- Retrieval-first approach to reduce hallucination
- Structured prompts to control AI responses
- Hybrid system (AI + deterministic ranking) for reliability
- Context injection using real catalog data

This ensures AI responses are accurate, relevant, and production-safe.

## Why This Project Matters

- Demonstrates real-world AI integration in a production-style application
- Shows how to control and ground LLM responses using backend data
- Combines traditional backend engineering with modern AI capabilities
- Designed with scalability and reliability in mind

This project reflects how AI features are built in real applications, not just demos.

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Day.js](https://img.shields.io/badge/Day.js-111827?style=for-the-badge&logo=clockify&logoColor=white)
![React Compiler](https://img.shields.io/badge/React_Compiler-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Testing

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)

## Screenshots

The screenshots below show the current UI and main user flows.

### Home

![Home page](./screenshots/home.png)

### AI Search Results

![AI Search results](./screenshots/ai-search-result.png)

### AI Shopping Assistant

![AI Shopping Assistant results](./screenshots/ai-assistant-result.png)

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
- Ecommerce API running on `http://localhost:7000`
- Backend repo cloned at the same directory level as this repo

### API Setup

The frontend uses relative `/api` and `/images` paths in the codebase.

During local development, Vite proxies those requests to:

- `http://localhost:7000/api`
- `http://localhost:7000/images`

For the current setup, you only need the backend running on port `7000`.

### Start the app

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

Important:

- `npm run build` outputs directly into `../ecomm-backend-MongoDB/dist`
- this project is intentionally configured to work with the backend repo living alongside this repo
- if you clone only this frontend repo, update `build.outDir` in `vite.config.ts` before using the production build output

### Preview production build

```bash
npm run preview
```

## Testing

```bash
npx vitest run
```

```bash
npx vitest
```

```bash
npm run lint
```

Current automated coverage includes core flows for:

- product interactions
- checkout and payment summary
- orders and order details
- tracking loading state
- header search and AI Search
- AI Shopping Assistant
- money formatting

## Project Structure

```text
src/
  components/   Shared UI components (Header, AiAssistantChat, ErrorBoundary)
  context/      React context for theme management
  hooks/        TanStack Query hooks for API calls and mutations
  pages/        Route-level page components
  types/        Shared TypeScript interfaces and models
  utils/        Money formatting and query client setup
```

## Main Routes

- `/`
- `/checkout`
- `/orders`
- `/tracking/:orderId/:productId`

## Notes

- Theme preference is stored locally.
- AI Search and the AI Shopping Assistant are grounded on catalog data from the backend.
- The AI Shopping Assistant is mounted globally, so it stays available across the main routes.
- The AI Shopping Assistant uses a lightweight RAG-style architecture: relevant products are retrieved from the catalog and used to ground Gemini responses, reducing hallucination and improving answer accuracy.
- Server state is managed with React Query.
- `npm run build` outputs directly into the backend's `dist/` folder (`../ecomm-backend-MongoDB/dist`), where Express serves it as static files on the same origin, so `/api` and `/images` routes resolve automatically with no CORS configuration needed.

## Live Demo

**[srinivaskr.live](https://srinivaskr.live)**
Deployed on AWS Elastic Beanstalk | MongoDB Atlas | SSL enabled

Deployed using AWS Elastic Beanstalk, with MongoDB Atlas Cloud as the database and SSL certificate enabled for secure access.

## Author
**Srinivas K R** - [LinkedIn](https://www.linkedin.com/in/srinivas-kr-dev) | [GitHub](https://github.com/Srinivas-KR-Dev)

**Companion repos:**
- [Backend - MongoDB + Mongoose](https://github.com/Srinivas-KR-Dev/ecommerce-backend-mongodb)
- [Backend - PostgreSQL + Prisma](https://github.com/Srinivas-KR-Dev/ecommerce-backend-postgres-prisma)