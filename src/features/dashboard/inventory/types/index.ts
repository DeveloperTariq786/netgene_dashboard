// Inventory-specific TypeScript types and interfaces

export interface InventoryItem {
    _id: string;
    product_stock: number;
    product_code: string;
    stock_status: string;
    createdAt: string;
    product_name: string;
    product_url: string;
    dimension_name: string;
}

export interface InventoryListResponse {
    success: boolean;
    message: string;
    currentPage: number;
    limit: number;
    totalPages: number;
    data: InventoryItem[];
}

export interface InventoryListParams {
    page?: number;
    limit?: number;
}

export interface UpdateInventoryData {
    product_stock: number;
    date: string;
}

export interface UpdateInventoryResponse {
    success: boolean;
    message: string;
}

export interface BulkInventoryItem {
    inventory_id: string;
    product_stock: number;
    date: string;
}

export interface BulkUpdateInventoryData {
    bulk_inventory: BulkInventoryItem[];
}

export interface BulkUpdateInventoryResponse {
    success: boolean;
    message: string;
}
