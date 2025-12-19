// Auth API endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/v1/admin/login',
  REGISTER: '/api/v1/admin/register',
  LOGOUT: '/api/v1/admin/logout',
  REFRESH_TOKEN: '/api/v1/admin/refresh',
  VERIFY_EMAIL: '/api/v1/admin/verify-email',
  FORGOT_PASSWORD: '/api/v1/admin/forgot-password',
  RESET_PASSWORD: '/api/v1/admin/reset-password',
  ME: '/api/v1/admin/me',
} as const;

// Brand API endpoints
export const BRAND_ENDPOINTS = {
  CREATE: '/api/v1/admin/add-brand',
  LIST: '/api/v1/admin/brands/products',
  UPDATE: '/api/v1/admin/update-brand',
  DELETE: '/api/v1/admin/delete-brand',
} as const;

// Category API endpoints
export const CATEGORY_ENDPOINTS = {
  CREATE: '/api/v1/admin/add-category',
  LIST: '/api/v1/admin/categories/sub-categories',
  UPDATE: '/api/v1/admin/update-category',
  DELETE: '/api/v1/admin/category',
} as const;

// Subcategory API endpoints
export const SUBCATEGORY_ENDPOINTS = {
  CREATE: '/api/v1/admin/add-subcategory',
  LIST: '/api/v1/admin/sub-categories/products',
  UPDATE: '/api/v1/admin/update-subcategory',
  DELETE: '/api/v1/admin/delete-subcategory',
} as const;

// User API endpoints
export const USER_ENDPOINTS = {
  CREATE: '/api/v1/admin/user',
  LIST: '/api/v1/admin/users',
  UPDATE: '/api/v1/admin/user',
  DELETE: '/api/v1/admin/user',
} as const;

// Product API endpoints
export const PRODUCT_ENDPOINTS = {
  CREATE: '/api/v1/admin/add-product',
  LIST: '/api/v1/admin/products',
  UPDATE: '/api/v1/admin/update-product',
  DELETE: '/api/v1/admin/delete-product',
} as const;

// Metrics (Dimensions/Units) API endpoints
export const METRICS_ENDPOINTS = {
  ADD: '/api/v1/admin/add-metrics',
  LIST: '/api/v1/admin/metrics',
} as const;

// Inventory API endpoints
export const INVENTORY_ENDPOINTS = {
  LIST: '/api/v1/admin/inventory',
  UPDATE: '/api/v1/admin/update-inventory',
  BULK_UPDATE: '/api/v1/admin/bulk-inventory-update',
} as const;
