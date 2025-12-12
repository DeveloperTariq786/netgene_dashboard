import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/core/hooks/use-toast";
import { ROUTES } from "@/core/config/routes";
import {
  FormPageHeader,
  ImageUploadSingle,
  ImageUploadMultiple,
  FormActions,
  TagInput
} from "@/components/shared";
import { Loader } from "@/components/loader/Loader";
import { brandService } from "@/features/dashboard/brands";
import { categoryService } from "@/features/dashboard/categories";
import { subcategoryService } from "@/features/dashboard/subcategories";

type ProductFormData = {
  name: string;
  description: string;
  brand: string;
  category: string;
  subCategory: string;
  tags: string[];
  quantity: number;
  dimensionType: string;
  price: number;
  discount: number;
  newBadge: boolean;
  salesBadge: boolean;
  featured: boolean;
  avatar: string;
  avatarFile: File | null;
  coverImages: string[];
  coverImageFiles: File[];
};

type Brand = {
  _id: string;
  brand_name: string;
  brand_logo: string;
};

type Category = {
  category_id: string;
  category_name: string;
  category_logo: string;
};

type Subcategory = {
  sub_category_id: string;
  sub_category_name: string;
  sub_category_logo: string;
  category_name: string;
  parent_category?: string; // Derived field for filtering
};

const dimensionTypes = ["KG", "LITRE", "DOZEN", "PIECE"];

export default function ProductEdit() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { toast } = useToast();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    brand: "",
    category: "",
    subCategory: "",
    tags: [],
    quantity: 0,
    dimensionType: "PIECE",
    price: 0,
    discount: 0,
    newBadge: false,
    salesBadge: false,
    featured: false,
    avatar: "",
    avatarFile: null,
    coverImages: [],
    coverImageFiles: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [brandsRes, categoriesRes, subcategoriesRes] = await Promise.all([
          brandService.listBrands(),
          categoryService.listCategories(),
          subcategoryService.listSubcategories(),
        ]);

        setBrands(brandsRes.allBrands);
        setCategories(categoriesRes.catgoryProducts);

        // Map subcategories to include parent_category ID based on category_name
        const mappedSubcategories = subcategoriesRes.data.map(sub => {
          const parentCat = categoriesRes.catgoryProducts.find(c => c.category_name === sub.category_name);
          return {
            ...sub,
            parent_category: parentCat?.category_id
          };
        });

        setSubcategories(mappedSubcategories);

        // TODO: Fetch actual product data from backend when productId is available
        if (productId) {
          setFormData({
            name: "Wireless Headphones",
            description: "Premium wireless headphones",
            brand: brandsRes.allBrands[0]?._id || "",
            category: categoriesRes.catgoryProducts[0]?.category_id || "",
            subCategory: mappedSubcategories[0]?.sub_category_id || "",
            tags: ["audio", "wireless"],
            quantity: 45,
            dimensionType: "PIECE",
            price: 79.99,
            discount: 10,
            newBadge: true,
            salesBadge: false,
            featured: true,
            avatar: "",
            avatarFile: null,
            coverImages: [],
            coverImageFiles: [],
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load form data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, toast]);

  const actualPrice = formData.price - (formData.price * formData.discount / 100);
  const availableSubCategories = formData.category
    ? subcategories.filter(sub => sub.parent_category === formData.category)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Product updated",
      description: "The product has been updated successfully.",
    });

    navigate(ROUTES.DASHBOARD.PRODUCTS);
  };

  if (isLoading) {
    return <Loader fullScreen size="lg" message="Loading product data..." />;
  }

  return (
    <div className="space-y-6">
      <FormPageHeader
        title="Edit Product"
        description="Update product information"
        backPath={ROUTES.DASHBOARD.PRODUCTS}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Product Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id}>
                        {brand.brand_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value, subCategory: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCategory">Sub Category *</Label>
                <Select
                  value={formData.subCategory}
                  onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
                  disabled={!formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.category ? "Select sub category" : "Select category first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubCategories.map((subCat) => (
                      <SelectItem key={subCat.sub_category_id} value={subCat.sub_category_id}>
                        {subCat.sub_category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TagInput
              label="Tags"
              tags={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
              placeholder="Type and press Enter"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quantity & Dimension</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensionType">Dimension Type *</Label>
                <Select value={formData.dimensionType} onValueChange={(value) => setFormData({ ...formData, dimensionType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dimension" />
                  </SelectTrigger>
                  <SelectContent>
                    {dimensionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Product Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actualPrice">Final Price</Label>
                <Input
                  id="actualPrice"
                  value={actualPrice.toFixed(2)}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status & Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="newBadge" className="flex flex-col space-y-1">
                  <span>New Badge</span>
                  <span className="font-normal text-xs text-muted-foreground">Show as new product</span>
                </Label>
                <Switch
                  id="newBadge"
                  checked={formData.newBadge}
                  onCheckedChange={(checked) => setFormData({ ...formData, newBadge: checked })}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="salesBadge" className="flex flex-col space-y-1">
                  <span>Sales Badge</span>
                  <span className="font-normal text-xs text-muted-foreground">Show on sale</span>
                </Label>
                <Switch
                  id="salesBadge"
                  checked={formData.salesBadge}
                  onCheckedChange={(checked) => setFormData({ ...formData, salesBadge: checked })}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="featured" className="flex flex-col space-y-1">
                  <span>Featured</span>
                  <span className="font-normal text-xs text-muted-foreground">Highlight this product</span>
                </Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUploadSingle
              label="Avatar (Main Product Image)"
              value={formData.avatar}
              onChange={(value) => setFormData(prev => ({ ...prev, avatar: value }))}
              onFileChange={(file) => setFormData(prev => ({ ...prev, avatarFile: file }))}
              alt="Product avatar"
            />

            <ImageUploadMultiple
              label="Cover Images (Multiple)"
              values={formData.coverImages}
              onChange={(values) => setFormData(prev => ({ ...prev, coverImages: values }))}
              onFilesChange={(files) => setFormData(prev => ({ ...prev, coverImageFiles: [...prev.coverImageFiles, ...files] }))}
            />
          </CardContent>
        </Card>

        <FormActions
          cancelPath={ROUTES.DASHBOARD.PRODUCTS}
          submitLabel="Update Product"
        />
      </form>
    </div>
  );
}
