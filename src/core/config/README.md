# Configuration Module

This directory contains centralized application configuration.

## Files

### routes.ts
Centralized route configuration with component mappings.

**Features:**
- Route path constants (ROUTES object)
- Lazy-loaded component imports
- Route configuration array with component mappings
- Type-safe route definitions

**Usage:**

```typescript
// Import route constants for navigation
import { ROUTES } from "@/core/config/routes";

// Navigate to a route
navigate(ROUTES.DASHBOARD.PRODUCTS);

// Navigate to a dynamic route
navigate(ROUTES.DASHBOARD.PRODUCTS_EDIT("123"));
```

**Adding New Routes:**

1. Add route path to ROUTES object:
```typescript
export const ROUTES = {
  // ... existing routes
  DASHBOARD: {
    // ... existing dashboard routes
    NEW_FEATURE: "/dashboard/new-feature",
    NEW_FEATURE_ADD: "/dashboard/new-feature/add",
  },
} as const;
```

2. Lazy load the component at top of file:
```typescript
const NewFeature = lazy(() => import("@/pages/dashboard/newfeature/NewFeature"));
const NewFeatureAdd = lazy(() => import("@/pages/dashboard/newfeature/NewFeatureAdd"));
```

3. Add to routeConfig array:
```typescript
export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.DASHBOARD.HOME,
    element: Dashboard,
    children: [
      // ... existing children
      {
        path: "new-feature",
        element: NewFeature,
      },
      {
        path: "new-feature/add",
        element: NewFeatureAdd,
      },
    ],
  },
];
```

That's it! The route will automatically be rendered in App.tsx.

## Benefits

✅ **Single Source of Truth**: All routes defined in one place
✅ **Type Safety**: TypeScript ensures route validity
✅ **Lazy Loading**: Automatic code splitting for better performance
✅ **Easy Maintenance**: Add/modify routes in one file
✅ **Consistent Structure**: Enforces route naming conventions
✅ **Auto-completion**: IDE support for route paths

## Route Structure

```
/                           → Login page (home)
/login                      → Login page
/register                   → Register page
/dashboard                  → Dashboard layout
  ├── (index)              → Dashboard home
  ├── users                → Users list
  │   ├── add              → Add user
  │   └── edit             → Edit user
  ├── products             → Products list
  │   ├── add              → Add product
  │   └── edit/:id         → Edit product (dynamic)
  ├── categories           → Categories list
  │   ├── add              → Add category
  │   └── edit             → Edit category
  ├── subcategories        → SubCategories list
  │   ├── add              → Add subcategory
  │   └── edit             → Edit subcategory
  ├── brand                → Brands list
  │   ├── add              → Add brand
  │   └── edit             → Edit brand
  └── orders               → Orders list
      └── :orderId         → Order detail (dynamic)
/*                          → Error page (catch-all)
```

## Performance

All routes use React's `lazy()` for code splitting:
- Reduces initial bundle size
- Components load on-demand
- Suspense boundaries with loading fallbacks
- Better performance for large applications
