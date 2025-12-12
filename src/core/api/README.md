# API Layer

This directory contains the API configuration and endpoint definitions for the application.

## Structure

```
api/
├── axios/              # Axios configuration
│   ├── client.ts      # Axios instance with interceptors
│   └── index.ts       # Exports
├── endpoints/          # API endpoint constants
│   ├── auth.ts        # Auth endpoints
│   └── index.ts       # Export all endpoints
└── README.md
```

## Axios Client

The `axios/client.ts` file provides a pre-configured Axios instance with:

- **Base URL**: Configured via `VITE_API_BASE_URL` environment variable
- **Global Headers**: `Content-Type: application/json`
- **Request Interceptor**: Automatically attaches JWT token to every request
- **Response Interceptor**: Handles 401 errors and redirects to login

### Usage

```typescript
import { apiClient } from '@/core/api/axios';

// GET request
const response = await apiClient.get('/users');

// POST request
const response = await apiClient.post('/users', userData);

// The token is automatically attached to headers
```

## Endpoints

Endpoint constants are organized by feature in the `endpoints/` directory.

### Auth Endpoints

```typescript
import { AUTH_ENDPOINTS } from '@/core/api/endpoints';

// Use in services
await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
```

## Adding New Endpoints

1. Create a new file in `endpoints/` (e.g., `products.ts`)
2. Define endpoint constants:

```typescript
export const PRODUCTS_ENDPOINTS = {
  LIST: '/products',
  DETAIL: (id: string) => `/products/${id}`,
  CREATE: '/products',
  UPDATE: (id: string) => `/products/${id}`,
  DELETE: (id: string) => `/products/${id}`,
} as const;
```

3. Export from `endpoints/index.ts`:

```typescript
export { PRODUCTS_ENDPOINTS } from './products';
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

For production, update the base URL accordingly.
