import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/core/hooks/use-toast";
import { ROUTES } from "@/core/config/routes";
import { Loader } from "@/components/loader/Loader";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { FormPageHeader, FormActions } from "@/components/shared";

type InventoryData = {
    productName: string;
    sku: string;
    image: string;
    stockLevel: number;
    stockUnit: string;
};

export default function InventoryEdit() {
    const navigate = useNavigate();
    const { inventoryId } = useParams();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    // Form State
    const [operation, setOperation] = useState<"add" | "reduce">("add");
    const [quantity, setQuantity] = useState<string>("0");
    const [selectedUnit, setSelectedUnit] = useState("pcs");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [reason, setReason] = useState("");

    const [data, setData] = useState<InventoryData>({
        productName: "",
        sku: "",
        image: "",
        stockLevel: 0,
        stockUnit: "pcs",
    });

    useEffect(() => {
        // Simulate fetching data
        const timer = setTimeout(() => {
            setData({
                productName: "Minimalist Leather Watch",
                sku: "ACC-001",
                image: "https://placehold.co/48x48/6366f1/ffffff?text=Watch",
                stockLevel: 45,
                stockUnit: "pcs",
            });
            setSelectedUnit("pcs");
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [inventoryId]);

    const currentStock = data.stockLevel;
    const changeAmount = parseInt(quantity) || 0;
    const newTotal = operation === "add"
        ? currentStock + changeAmount
        : Math.max(0, currentStock - changeAmount);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Stock updated",
            description: `Successfully ${operation === "add" ? "added" : "removed"} ${changeAmount} ${selectedUnit}. New total: ${newTotal}`,
        });
        navigate(ROUTES.DASHBOARD.INVENTORY);
    };

    if (isLoading) {
        return <Loader fullScreen size="lg" message="Loading inventory data..." />;
    }

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="Update Stock"
                description={`Manage inventory levels for ${data.productName}`}
                backPath={ROUTES.DASHBOARD.INVENTORY}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader className="pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <CardTitle>Stock Information</CardTitle>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100 rounded-sm font-normal">
                                    {data.sku}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8 pt-6">
                        {/* Product Summary */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-lg border border-gray-100">
                            <img
                                src={data.image}
                                alt={data.productName}
                                className="w-16 h-16 rounded-md object-cover shadow-sm"
                            />
                            <div>
                                <h3 className="font-medium text-lg">{data.productName}</h3>
                                <p className="text-muted-foreground mt-1">
                                    Current Stock: <span className="font-semibold text-foreground">{data.stockLevel} {data.stockUnit}</span>
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Left Column: Operation & Quantity */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-base">Operation</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            type="button"
                                            variant={operation === "add" ? "default" : "outline"}
                                            className={`h-12 text-base ${operation === "add" ? "bg-blue-600 hover:bg-blue-700 text-white hover:text-white border-blue-600 shadow-md" : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-700"}`}
                                            onClick={() => setOperation("add")}
                                        >
                                            <Plus className="w-5 h-5 mr-2" />
                                            Add Stock
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={operation === "reduce" ? "default" : "outline"}
                                            className={`h-12 text-base ${operation === "reduce" ? "bg-orange-600 hover:bg-orange-700 text-white hover:text-white border-orange-600 shadow-md" : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-700"}`}
                                            onClick={() => setOperation("reduce")}
                                        >
                                            <Minus className="w-5 h-5 mr-2" />
                                            Reduce Stock
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-base">Quantity & Unit</Label>
                                    <div className="flex gap-3">
                                        <Input
                                            type="number"
                                            min="0"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            className="flex-1 h-12 text-lg"
                                        />
                                        <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                                            <SelectTrigger className="w-[140px] h-12">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pcs">pcs</SelectItem>
                                                <SelectItem value="kg">kg</SelectItem>
                                                <SelectItem value="liter">liter</SelectItem>
                                                <SelectItem value="dozen">dozen</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between text-sm pt-2 px-1">
                                        <span className="text-muted-foreground">New Total Calculation:</span>
                                        <div className="flex items-center gap-3 font-medium text-base">
                                            <span className="text-muted-foreground">{currentStock}</span>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                            <span className={operation === "add" ? "text-primary" : "text-orange-600"}>
                                                {newTotal} {selectedUnit}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Date & Reason */}
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
                                <div className="space-y-3">
                                    <Label htmlFor="reason" className="text-base">Reason (Optional)</Label>
                                    <Input
                                        id="reason"
                                        placeholder="e.g., Return, Purchase, Adjustment"
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
                    submitLabel="Confirm Update"
                />
            </form>
        </div>
    );
}
