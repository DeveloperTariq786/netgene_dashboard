// User-specific TypeScript types and interfaces

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "manager" | "user";
  avatar?: string;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: "admin" | "manager" | "user";
  avatar?: File;
  status: "active" | "inactive" | "suspended";
}
