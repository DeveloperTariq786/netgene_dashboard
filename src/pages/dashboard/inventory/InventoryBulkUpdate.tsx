import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/core/hooks/use-toast";
import { ROUTES } from "@/core/config/routes";
import { Loader } from "@/components/loader/Loader";
import { Copy, ArrowRight } from "lucide-react";
import { FormPageHeader, FormActions } from "@/components/shared";

type BulkUpdateItem = {
    id: string;
    name: string;
    sku: string;
    price: number;
    image: string;
    currentStock: number;
    unit: string;
    operation: "add" | "reduce";
    changeQty: number;
    newUnit: string;
};

export default function InventoryBulkUpdate() {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState<BulkUpdateItem[]>([]);

    // Quick Fill State
    const [quickOperation, setQuickOperation] = useState<"add" | "reduce">("add");
    const [quickQty, setQuickQty] = useState<string>("");

    // Footer State
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [reason, setReason] = useState("");

    useEffect(() => {
        // In a real app, we would fetch items based on IDs passed in location.state
        // For now, we'll mock the data based on the selected count
        const selectedIds = location.state?.selectedIds || [];

        const timer = setTimeout(() => {
            const mockItems: BulkUpdateItem[] = [
                {
                    id: "1",
                    name: "Minimalist Leather Watch",
                    sku: "ACC-001",
                    price: 129.00,
                    image: "https://placehold.co/48x48/6366f1/ffffff?text=Watch",
                    currentStock: 45,
                    unit: "pcs",
                    operation: "add",
                    changeQty: 0,
                    newUnit: "pcs"
                },
                {
                    id: "2",
                    name: "Premium Cotton Socks",
                    sku: "APP-055",
                    price: 24.50,
                    image: "https://placehold.co/48x48/10b981/ffffff?text=Socks",
                    currentStock: 120,
                    unit: "dozen",
                    operation: "add",
                    changeQty: 0,
                    newUnit: "dozen"
                }
            ];
            // Filter or duplicate to match selected count if needed, for now just use mock
            setItems(mockItems);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [location.state]);

    const handleApplyQuickFill = () => {
        const qty = parseInt(quickQty) || 0;
        setItems(items.map(item => ({
            ...item,
            operation: quickOperation,
            changeQty: qty
        })));
        toast({
            title: "Quick Fill Applied",
            description: `Applied ${quickOperation} ${qty} to all items`,
        });
    };

    const updateItem = (id: string, field: keyof BulkUpdateItem, value: any) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const calculateNewStock = (item: BulkUpdateItem) => {
        if (item.operation === "add") {
            return item.currentStock + item.changeQty;
        }
        return Math.max(0, item.currentStock - item.changeQty);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Bulk Update Successful",
            description: `Updated stock for ${items.length} items`,
        });
        navigate(ROUTES.DASHBOARD.INVENTORY);
    };

    if (isLoading) {
        return <Loader fullScreen size="lg" message="Loading selected items..." />;
    }

    return (
        <div className="space-y-6">
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

                        <div className="flex bg-white rounded-md border shadow-sm p-1">
                            <button
                                type="button"
                                className={`px-3 py-1 text-sm font-medium rounded-sm transition-colors ${quickOperation === "add" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
                                onClick={() => setQuickOperation("add")}
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                className={`px-3 py-1 text-sm font-medium rounded-sm transition-colors ${quickOperation === "reduce" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-50"}`}
                                onClick={() => setQuickOperation("reduce")}
                            >
                                Reduce
                            </button>
                        </div>

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
                                <div key={item.id} className="bg-white border rounded-lg p-4 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                                    {/* Product Info */}
                                    <div className="flex items-center gap-4 min-w-[280px]">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover border shadow-sm" />
                                        <div>
                                            <h3 className="font-medium text-base text-gray-900">{item.name}</h3>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <Badge variant="secondary" className="text-xs font-normal bg-gray-100 text-gray-700 rounded-sm px-1.5">
                                                    {item.sku}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Current Stock */}
                                    <div className="min-w-[100px]">
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Current</div>
                                        <div className="font-semibold text-lg text-gray-900">{item.currentStock} <span className="text-sm font-normal text-muted-foreground">{item.unit}</span></div>
                                    </div>

                                    {/* Operation & Qty */}
                                    <div className="flex items-center gap-3 flex-1">
                                        <Select
                                            value={item.operation}
                                            onValueChange={(val: "add" | "reduce") => updateItem(item.id, "operation", val)}
                                        >
                                            <SelectTrigger className={`w-[120px] h-10 ${item.operation === "add" ? "text-blue-600 border-blue-200 bg-blue-50/30" : "text-orange-600 border-orange-200 bg-orange-50/30"}`}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="add">Add (+)</SelectItem>
                                                <SelectItem value="reduce">Reduce (-)</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Input
                                            type="number"
                                            className="w-28 h-10 text-center font-medium text-lg"
                                            value={item.changeQty || ""}
                                            onChange={(e) => updateItem(item.id, "changeQty", parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                        />

                                        <Select
                                            value={item.newUnit}
                                            onValueChange={(val) => updateItem(item.id, "newUnit", val)}
                                        >
                                            <SelectTrigger className="w-[110px] h-10">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pcs">pcs</SelectItem>
                                                <SelectItem value="dozen">dozen</SelectItem>
                                                <SelectItem value="kg">kg</SelectItem>
                                                <SelectItem value="liter">liter</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* New Stock */}
                                    <div className="min-w-[140px] text-right pl-4 border-l">
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">New Stock</div>
                                        <div className="flex items-center justify-end gap-2">
                                            <span className={`font-bold text-lg ${item.operation === "add" ? "text-primary" : "text-orange-600"}`}>
                                                {calculateNewStock(item)}
                                            </span>
                                            <span className="text-sm text-muted-foreground">{item.newUnit}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info Section */}
                        <div className="p-6 border-t bg-white">
                            <div className="grid grid-cols-2 gap-8 max-w-4xl">
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
                                <div className="space-y-3">
                                    <Label htmlFor="reason" className="text-base">Reason (Optional)</Label>
                                    <Input
                                        id="reason"
                                        placeholder="e.g. Monthly Restock"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
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
                />
            </form>
        </div>
    );
}
