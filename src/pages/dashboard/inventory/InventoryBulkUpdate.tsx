import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/core/hooks/use-toast";
import { ROUTES } from "@/core/config/routes";
import { Loader } from "@/components/loader/Loader";
import { Copy } from "lucide-react";
import { FormPageHeader, FormActions } from "@/components/shared";
import { inventoryService } from "@/features/dashboard/inventory";
import { InventoryItem } from "@/features/dashboard/inventory/types";

type BulkUpdateItem = InventoryItem & {
    changeQty: number;
};

export default function InventoryBulkUpdate() {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [items, setItems] = useState<BulkUpdateItem[]>([]);

    // Quick Fill State
    const [quickQty, setQuickQty] = useState<string>("");

    // Footer State
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const selectedIds = location.state?.selectedIds || [];
        if (selectedIds.length > 0) {
            fetchInventoryItems(selectedIds);
        } else {
            toast({
                title: "Error",
                description: "No items selected for bulk update",
                variant: "destructive",
            });
            navigate(ROUTES.DASHBOARD.INVENTORY);
        }
    }, [location.state]);

    const fetchInventoryItems = async (selectedIds: string[]) => {
        try {
            setIsLoading(true);
            const response = await inventoryService.listInventory({ page: 1, limit: 100 });
            if (response.success) {
                const selectedItems = response.data
                    .filter(item => selectedIds.includes(item._id))
                    .map(item => ({ ...item, changeQty: 0 }));

                if (selectedItems.length === 0) {
                    toast({
                        title: "Error",
                        description: "Selected items not found",
                        variant: "destructive",
                    });
                    navigate(ROUTES.DASHBOARD.INVENTORY);
                    return;
                }

                setItems(selectedItems);
            }
        } catch (error: any) {
            console.error("Error fetching inventory:", error);
            toast({
                title: "Error",
                description: error?.response?.data?.message || "Failed to load inventory items",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyQuickFill = () => {
        const qty = parseInt(quickQty) || 0;
        setItems(items.map(item => ({
            ...item,
            changeQty: qty
        })));
        toast({
            title: "Quick Fill Applied",
            description: `Applied +${qty} to all items`,
        });
    };

    const updateItem = (id: string, field: keyof BulkUpdateItem, value: any) => {
        setItems(items.map(item =>
            item._id === id ? { ...item, [field]: value } : item
        ));
    };

    const calculateNewStock = (item: BulkUpdateItem) => {
        return item.product_stock + item.changeQty;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            const bulkData = {
                bulk_inventory: items.map(item => ({
                    inventory_id: item._id,
                    product_stock: calculateNewStock(item),
                    date: date.replace(/-/g, ':'),
                }))
            };

            const response = await inventoryService.bulkUpdateInventory(bulkData);

            if (response.success) {
                toast({
                    title: "Bulk Update Successful",
                    description: response.message || `Updated stock for ${items.length} items`,
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
        return <Loader fullScreen size="lg" message="Loading selected items..." />;
    }

    return (
        <div className="space-y-6">
            {isSubmitting && <Loader fullScreen size="lg" message="Updating stock..." />}
            <FormPageHeader
                title="Bulk Stock Update"
                description={`Updating ${items.length} selected items`}
                backPath={ROUTES.DASHBOARD.INVENTORY}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader className="pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <CardTitle>Bulk Operations</CardTitle>
                        </div>
                    </CardHeader>

                    {/* Quick Fill Bar */}
                    <div className="bg-blue-50/50 border-b px-6 py-4 flex items-center gap-4 flex-wrap">
                        <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">Quick Fill:</span>

                        <span className="text-sm font-medium text-gray-600">Add</span>

                        <Input
                            placeholder="Qty"
                            className="w-24 h-9 bg-white"
                            type="number"
                            value={quickQty}
                            onChange={(e) => setQuickQty(e.target.value)}
                        />

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-9 bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                            onClick={handleApplyQuickFill}
                        >
                            <Copy className="w-3.5 h-3.5 mr-2" />
                            Apply to All
                        </Button>
                    </div>

                    <CardContent className="p-0">
                        {/* Items List */}
                        <div className="p-6 space-y-4 bg-white min-h-[300px]">
                            {items.map((item) => (
                                <div key={item._id} className="bg-white border rounded-lg p-4 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                                    {/* Product Info */}
                                    <div className="flex items-center gap-4 min-w-[280px]">
                                        <img src={item.product_url} alt={item.product_name} className="w-16 h-16 rounded-md object-cover border shadow-sm" />
                                        <div>
                                            <h3 className="font-medium text-base text-gray-900">{item.product_name}</h3>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <Badge variant="secondary" className="text-xs font-normal bg-gray-100 text-gray-700 rounded-sm px-1.5">
                                                    {item.product_code}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Current Stock */}
                                    <div className="min-w-[100px]">
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Current</div>
                                        <div className="font-semibold text-lg text-gray-900">{item.product_stock} <span className="text-sm font-normal text-muted-foreground">{item.dimension_name}</span></div>
                                    </div>

                                    {/* Operation & Qty */}
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50/50 px-3 py-2 rounded border border-blue-200">Add (+)</span>

                                        <Input
                                            type="number"
                                            className="w-28 h-10 text-center font-medium text-lg"
                                            value={item.changeQty || ""}
                                            onChange={(e) => updateItem(item._id, "changeQty", parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                        />
                                    </div>

                                    {/* New Stock */}
                                    <div className="min-w-[140px] text-right pl-4 border-l">
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">New Stock</div>
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="font-bold text-lg text-primary">
                                                {calculateNewStock(item)}
                                            </span>
                                            <span className="text-sm text-muted-foreground">{item.dimension_name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info Section */}
                        <div className="p-6 border-t bg-white">
                            <div className="max-w-md">
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
                    submitLabel="Confirm Updates"
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
}
