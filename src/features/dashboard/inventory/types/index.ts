// Inventory-specific TypeScript types and interfaces

export interface InventoryItem {
    id: string;
    productId: string;
    sku: string;
    quantity: number;
    reorderLevel: number;
    status: "in_stock" | "low_stock" | "out_of_stock";
    createdAt: string;
    updatedAt: string;
}

export interface InventoryFormData {
    productId: string;
    sku: string;
    quantity: number;
    reorderLevel: number;
    status: "in_stock" | "low_stock" | "out_of_stock";
}
