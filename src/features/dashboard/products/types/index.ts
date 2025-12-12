// Product-specific TypeScript types and interfaces

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  subCategoryId?: string;
  brandId?: string;
  images: File[];
  tags: string[];
  status: "active" | "inactive" | "draft";
}
