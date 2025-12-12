# Shared Form Components

This directory contains reusable form components that eliminate code duplication across Add and Edit forms throughout the dashboard.

## Components

### FormPageHeader

Displays a consistent page header with back navigation, title, and description.

**Usage:**
```tsx
import { FormPageHeader } from "@/components/shared";

<FormPageHeader
  title="Add New Product"
  description="Fill in the details to add a new product"
  backPath="/dashboard/products"
/>
```

**Props:**
- `title` (string): The main heading text
- `description` (string): Descriptive text below the title
- `backPath` (string): Navigation path for the back button

---

### ImageUploadSingle

Single image upload component with preview and delete functionality.

**Usage:**
```tsx
import { ImageUploadSingle } from "@/components/shared";

<ImageUploadSingle
  label="Brand Logo"
  value={formData.logo}
  onChange={(value) => setFormData({ ...formData, logo: value })}
  alt="Brand logo"
/>
```

**Props:**
- `label` (string): Label text displayed above the upload area
- `value` (string): Current image URL
- `onChange` (function): Callback when image is added or removed
- `alt` (string, optional): Alt text for the image. Defaults to "Uploaded image"

---

### ImageUploadMultiple

Multiple image upload component with preview and individual delete functionality.

**Usage:**
```tsx
import { ImageUploadMultiple } from "@/components/shared";

<ImageUploadMultiple
  label="Cover Images (Multiple)"
  values={formData.coverImages}
  onChange={(values) => setFormData({ ...formData, coverImages: values })}
/>
```

**Props:**
- `label` (string): Label text displayed above the upload area
- `values` (string[]): Array of current image URLs
- `onChange` (function): Callback when images are added or removed

---

### TagInput

Tag input component with add/remove functionality and keyboard support.

**Usage:**
```tsx
import { TagInput } from "@/components/shared";

<TagInput
  label="Tags"
  tags={formData.tags}
  onChange={(tags) => setFormData({ ...formData, tags })}
  placeholder="Type and press Enter"
/>
```

**Props:**
- `label` (string): Label text displayed above the input
- `tags` (string[]): Array of current tags
- `onChange` (function): Callback when tags are added or removed
- `placeholder` (string, optional): Input placeholder text. Defaults to "Type and press Enter"

**Features:**
- Press Enter or click Add button to add a tag
- Prevents duplicate tags
- Click X button on tag to remove it

---

### FormActions

Consistent form action buttons (Cancel and Submit) with navigation handling.

**Usage:**
```tsx
import { FormActions } from "@/components/shared";

<FormActions
  cancelPath="/dashboard/products"
  submitLabel="Add Product"
  isSubmitting={false}
/>
```

**Props:**
- `cancelPath` (string): Navigation path for the cancel button
- `submitLabel` (string): Text for the submit button
- `isSubmitting` (boolean, optional): Disable buttons during submission. Defaults to false

---

## Complete Example

Here's a complete example of using multiple shared components together:

```tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/core/hooks/use-toast";
import {
  FormPageHeader,
  ImageUploadSingle,
  TagInput,
  FormActions
} from "@/components/shared";

export default function ProductAdd() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    tags: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Product added",
      description: "The new product has been added successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <FormPageHeader
        title="Add New Product"
        description="Fill in the details to add a new product"
        backPath="/dashboard/products"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <TagInput
              label="Tags"
              tags={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploadSingle
              label="Product Logo"
              value={formData.logo}
              onChange={(value) => setFormData({ ...formData, logo: value })}
              alt="Product logo"
            />
          </CardContent>
        </Card>

        <FormActions
          cancelPath="/dashboard/products"
          submitLabel="Add Product"
        />
      </form>
    </div>
  );
}
```

## Benefits

- **Code Reusability**: Write once, use everywhere
- **Consistency**: All forms look and behave the same way
- **Maintainability**: Update component once to affect all usages
- **Type Safety**: Full TypeScript support with proper prop types
- **Accessibility**: Built-in accessibility features
- **Less Boilerplate**: Reduce form code by 50-70%
