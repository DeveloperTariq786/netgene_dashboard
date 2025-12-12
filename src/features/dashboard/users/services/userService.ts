import { apiClient } from '@/core/api/axios';
import { USER_ENDPOINTS } from '@/core/api/endpoint';

export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: 'admin' | 'superadmin';
}

export interface UserResponse {
  success: boolean;
  message: string;
  User: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
    permission_component: Array<{
      can_add_superadmin: boolean;
      can_add_admin: boolean;
      can_add_records: boolean;
      can_update_records: boolean;
      can_delete_records: boolean;
      _id: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
}

export const userService = {
  createUser: async (data: CreateUserData): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>(
      USER_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },
};
