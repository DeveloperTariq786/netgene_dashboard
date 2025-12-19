import { apiClient } from '@/core/api/axios';
import { INVENTORY_ENDPOINTS } from '@/core/api/endpoint';
import {
    InventoryListResponse,
    InventoryListParams,
    UpdateInventoryData,
    UpdateInventoryResponse,
    BulkUpdateInventoryData,
    BulkUpdateInventoryResponse
} from '../types';

export const inventoryService = {
    listInventory: async (params?: InventoryListParams): Promise<InventoryListResponse> => {
        const response = await apiClient.get<InventoryListResponse>(
            INVENTORY_ENDPOINTS.LIST,
            { params }
        );
        return response.data;
    },

    updateInventory: async (inventoryId: string, data: UpdateInventoryData): Promise<UpdateInventoryResponse> => {
        const response = await apiClient.put<UpdateInventoryResponse>(
            `${INVENTORY_ENDPOINTS.UPDATE}?inventory_id=${inventoryId}`,
            data
        );
        return response.data;
    },

    bulkUpdateInventory: async (data: BulkUpdateInventoryData): Promise<BulkUpdateInventoryResponse> => {
        const response = await apiClient.put<BulkUpdateInventoryResponse>(
            INVENTORY_ENDPOINTS.BULK_UPDATE,
            data
        );
        return response.data;
    },
};
