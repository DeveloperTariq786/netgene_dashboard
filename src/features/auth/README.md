# Auth Feature Structure

This directory contains all authentication-related functionality organized in a feature-based architecture.

## Structure

```
src/features/auth/
├── components/           # Auth-specific UI components
│   ├── AuthCard.tsx
│   ├── AuthDivider.tsx
│   ├── AuthTabs.tsx
│   ├── PasswordStrengthIndicator.tsx
│   ├── ProviderButtons.tsx
│   ├── SocialLoginButton.tsx
│   └── index.ts
├── hooks/               # Auth-specific custom hooks
│   └── index.ts
├── services/            # Auth API services
│   └── index.ts
├── store/               # Auth state management
│   └── index.ts
├── types/               # Auth TypeScript types
│   └── index.ts
├── index.ts             # Main export file
└── README.md
```

## Organization Principles

### **components/**
Authentication-specific UI components
- Login/Signup forms
- Social login buttons
- Password strength indicators
- Authentication cards and layouts

### **hooks/**
Custom React hooks for authentication
- `useAuth`: Main authentication hook
- `useLogin`: Handle login flow
- `useSignup`: Handle signup flow
- `useSession`: Manage user session
- `useLogout`: Handle logout

### **services/**
Authentication API communication layer
- `login`: User login
- `signup`: User registration
- `logout`: User logout
- `resetPassword`: Password reset
- `verifyEmail`: Email verification
- `refreshToken`: Token refresh

### **store/**
Authentication state management
- User session state
- Authentication status
- Token management
- Auth actions and selectors

### **types/**
TypeScript type definitions for auth
- `AuthUser`: User information
- `AuthSession`: Session data
- `LoginCredentials`: Login form data
- `SignupCredentials`: Signup form data
- `AuthError`: Error handling types

## Import Examples

```typescript
// Auth components
import { 
  AuthCard, 
  PasswordStrengthIndicator,
  SocialLoginButton 
} from "@/features/auth";

// Auth types
import type { 
  AuthUser, 
  LoginCredentials, 
  AuthSession 
} from "@/features/auth";

// Auth hooks (when implemented)
import { useAuth, useLogin } from "@/features/auth";

// Auth services (when implemented)
import { login, signup, logout } from "@/features/auth";
```

## Example Implementations

### Creating a Custom Hook

```typescript
// src/features/auth/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import type { AuthUser, AuthSession } from '../types';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkSession();
  }, []);

  const checkSession = async () => {
    // Implementation
    setLoading(false);
  };

  return { user, session, loading };
}

// Export from hooks/index.ts
export { useAuth } from "./useAuth";
```

### Creating a Service

```typescript
// src/features/auth/services/authService.ts
import type { LoginCredentials, AuthSession } from '../types';

export async function login(
  credentials: LoginCredentials
): Promise<AuthSession> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
}

// Export from services/index.ts
export { login } from "./authService";
```

### Using Types

```typescript
// In a component
import type { LoginCredentials } from "@/features/auth";

function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  
  // Component logic
}
```

## Best Practices

1. **Secure credential handling**: Never log or store passwords in plain text
2. **Token management**: Store tokens securely, implement refresh logic
3. **Error handling**: Provide clear, user-friendly error messages
4. **Type safety**: Always use TypeScript types for auth data
5. **Session persistence**: Implement proper session storage
6. **Auth state**: Centralize authentication state management
7. **Protected routes**: Use auth state to protect authenticated routes

## Integration with Lovable Cloud

When using Lovable Cloud (Supabase), the auth feature should integrate with:
- Supabase Auth for authentication
- Edge functions for server-side auth logic
- Supabase database for user profiles
- RLS policies for data security
