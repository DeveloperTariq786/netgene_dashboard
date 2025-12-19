import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useToast } from "@/core/hooks/use-toast";
import { ROUTES } from "@/core/config/routes";
import { Loader } from "@/components/loader/Loader";
import { Plus, ArrowRight } from "lucide-react";
import { FormPageHeader, FormActions } from "@/components/shared";
import { inventoryService } from "@/features/dashboard/inventory";
import { InventoryItem } from "@/features/dashboard/inventory/types";

export default function InventoryEdit() {
    const navigate = useNavigate();
    const { inventoryId } = useParams();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [quantity, setQuantity] = useState<string>("0");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const [data, setData] = useState<InventoryItem | null>(null);

    useEffect(() => {
        if (inventoryId) {
            fetchInventoryItem();
        }
    }, [inventoryId]);

    const fetchInventoryItem = async () => {
        try {
            setIsLoading(true);
            // Fetch inventory list and find the item by ID
            const response = await inventoryService.listInventory({ page: 1, limit: 100 });
            if (response.success) {
                const item = response.data.find(i => i._id === inventoryId);
                if (item) {
                    setData(item);
                } else {
                    toast({
                        title: "Error",
                        description: "Inventory item not found",
                        variant: "destructive",
                    });
                    navigate(ROUTES.DASHBOARD.INVENTORY);
                }
            }
        } catch (error: any) {
            console.error("Error fetching inventory:", error);
            toast({
                title: "Error",
                description: error?.response?.data?.message || "Failed to load inventory item",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const currentStock = data?.product_stock || 0;
    const changeAmount = parseInt(quantity) || 0;
    const newTotal = currentStock + changeAmount;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inventoryId) return;

        try {
            setIsSubmitting(true);
            const response = await inventoryService.updateInventory(inventoryId, {
                product_stock: newTotal,
                date: date.replace(/-/g, ':'),
            });

            if (response.success) {
                toast({
                    title: "Stock updated",
                    description: response.message || `Successfully added ${changeAmount} ${data?.dimension_name}. New total: ${newTotal}`,
                });
                navigate(ROUTES.DASHBOARD.INVENTORY);
            }
        } catch (error: any) {
            console.error("Error updating inventory:", error);
            toast({
                title: "Error",
                description: error?.response?.data?.message || "Failed to update inventory",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <Loader fullScreen size="lg" message="Loading inventory data..." />;
    }

    if (!data) {
        return null;
    }

    return (
        <div className="space-y-6">
            {isSubmitting && <Loader fullScreen size="lg" message="Updating stock..." />}
            <FormPageHeader
                title="Update Stock"
                description={`Manage inventory levels for ${data.product_name}`}
                backPath={ROUTES.DASHBOARD.INVENTORY}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader className="pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <CardTitle>Stock Information</CardTitle>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100 rounded-sm font-normal">
                                    {data.product_code}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8 pt-6">
                        {/* Product Summary */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-lg border border-gray-100">
                            <img
                                src={data.product_url}
                                alt={data.product_name}
                                className="w-16 h-16 rounded-md object-cover shadow-sm"
                            />
                            <div>
                                <h3 className="font-medium text-lg">{data.product_name}</h3>
                                <p className="text-muted-foreground mt-1">
                                    Current Stock: <span className="font-semibold text-foreground">{data.product_stock} {data.dimension_name}</span>
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Left Column: Quantity */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-base">Add Quantity</Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="h-12 text-lg"
                                    />
                                    <div className="flex items-center justify-between text-sm pt-2 px-1">
                                        <span className="text-muted-foreground">New Total Calculation:</span>
                                        <div className="flex items-center gap-3 font-medium text-base">
                                            <span className="text-muted-foreground">{currentStock}</span>
                                            <Plus className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">{changeAmount}</span>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-primary">
                                                {newTotal} {data.dimension_name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Date */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="date" className="text-base">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <FormActions
                    cancelPath={ROUTES.DASHBOARD.INVENTORY}
                    submitLabel="Confirm Update"
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
}

