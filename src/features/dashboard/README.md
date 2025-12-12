# Dashboard Feature Structure

This directory contains all dashboard-related features organized by domain with a complete feature-based architecture.

## Structure

```
src/features/dashboard/
├── components/           # Common dashboard components
│   ├── AppSidebar.tsx
│   ├── DashboardHeader.tsx
│   ├── ProfileMenu.tsx
│   └── index.ts
├── orders/              # Order management feature
│   ├── components/      # Order-specific UI components
│   ├── hooks/          # Order-specific custom hooks
│   ├── services/       # Order API services
│   ├── store/          # Order state management
│   ├── types/          # Order TypeScript types
│   └── index.ts
├── products/            # Product management feature
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── index.ts
├── categories/          # Category management feature
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── index.ts
├── subcategories/       # SubCategory management feature
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── index.ts
├── brands/              # Brand management feature
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── index.ts
├── users/               # User management feature
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── index.ts
└── index.ts             # Main export file
```

## Organization Principles

### 1. Common Components
Components used across multiple dashboard features stay in `src/features/dashboard/components/`:
- `AppSidebar`: Navigation sidebar
- `DashboardHeader`: Top header with breadcrumbs
- `ProfileMenu`: User profile menu

### 2. Feature-Specific Structure
Each feature (orders, products, categories, etc.) follows a consistent structure:

#### **components/**
Feature-specific UI components
- Should be reusable within the feature
- Handle presentation logic only
- Example: `OrderItemsCard`, `ProductTable`

#### **hooks/**
Custom React hooks for the feature
- Encapsulate feature-specific logic
- Handle data fetching and state management
- Example: `useOrders`, `useProductDetails`

#### **services/**
API communication layer
- Handle all API calls for the feature
- Pure functions that return promises
- Example: `fetchOrders`, `createProduct`, `updateCategory`

#### **store/**
State management (if needed)
- Feature-specific stores, actions, reducers
- Can use Context API, Zustand, Redux, etc.
- Example: order store with actions and selectors

#### **types/**
TypeScript type definitions
- Interfaces and types for the feature
- Ensures type safety across the feature
- Example: `Order`, `Product`, `Category` interfaces

### 3. Shared Components
Generic reusable components remain in `src/components/shared/`:
- `FormPageHeader`
- `ImageUploadSingle`
- `ImageUploadMultiple`
- `FormActions`
- `TagInput`

## Import Examples

```typescript
// Common dashboard components
import { AppSidebar, DashboardHeader, ProfileMenu } from "@/features/dashboard";

// Order-specific imports
import { 
  CustomerDetailsCard, 
  OrderItemsCard 
} from "@/features/dashboard/orders";

import type { Order, OrderStatus } from "@/features/dashboard/orders";

// Product-specific imports
import type { Product, ProductFormData } from "@/features/dashboard/products";

// Shared form components
import { FormPageHeader, ImageUploadSingle } from "@/components/shared";
```

## Adding New Feature Logic

### Adding a Custom Hook

```typescript
// src/features/dashboard/orders/hooks/useOrders.ts
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Hook logic here
  
  return { orders, loading };
}

// src/features/dashboard/orders/hooks/index.ts
export { useOrders } from "./useOrders";

// Usage in pages
import { useOrders } from "@/features/dashboard/orders";
```

### Adding a Service

```typescript
// src/features/dashboard/orders/services/orderService.ts
export async function fetchOrders() {
  const response = await fetch('/api/orders');
  return response.json();
}

// src/features/dashboard/orders/services/index.ts
export { fetchOrders } from "./orderService";

// Usage in hooks or components
import { fetchOrders } from "@/features/dashboard/orders";
```

### Adding Types

```typescript
// src/features/dashboard/orders/types/order.ts
export interface Order {
  id: string;
  status: OrderStatus;
  // ... other fields
}

// src/features/dashboard/orders/types/index.ts
export type { Order } from "./order";

// Usage anywhere
import type { Order } from "@/features/dashboard/orders";
```

## Best Practices

1. **Keep components focused**: Each component should have a single responsibility
2. **Use TypeScript**: Always define types for data structures
3. **Centralize API calls**: All API logic should be in services
4. **Custom hooks for logic**: Extract complex logic into custom hooks
5. **Export from index.ts**: Always export through the feature's index.ts for clean imports
6. **Colocate related code**: Keep feature-specific code together in its feature folder
