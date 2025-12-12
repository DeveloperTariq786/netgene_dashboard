import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/config/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Layers, X } from "lucide-react";
import { Loader } from "@/components/loader/Loader";
import { ManageUnitsDialog } from "@/features/dashboard/inventory";

interface InventoryItem {
    id: string;
    name: string;
    category: string;
    image: string;
    sku: string;
    price: number;
    priceUnit: string;
    stockLevel: number;
    stockUnit: string;
    stockStatus: "in_stock" | "low_stock" | "out_of_stock";
}

export default function Inventory() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [stockFilter, setStockFilter] = useState<string>("all");
    const [availableUnits, setAvailableUnits] = useState<string[]>(["pcs", "kg", "liter", "dozen"]);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const [inventoryItems] = useState<InventoryItem[]>([
        {
            id: "1",
            name: "Minimalist Leather Watch",
            category: "Accessories",
            image: "https://placehold.co/48x48/6366f1/ffffff?text=Watch",
            sku: "ACC-001",
            price: 129.00,
            priceUnit: "pcs",
            stockLevel: 45,
            stockUnit: "pcs",
            stockStatus: "in_stock"
        },
        {
            id: "2",
            name: "Premium Cotton Socks",
            category: "Apparel",
            image: "https://placehold.co/48x48/8b5cf6/ffffff?text=Socks",
            sku: "APP-055",
            price: 24.50,
            priceUnit: "dozen",
            stockLevel: 120,
            stockUnit: "dozen",
            stockStatus: "in_stock"
        },
        {
            id: "3",
            name: "Organic Arabica Coffee Beans",
            category: "Groceries",
            image: "https://placehold.co/48x48/f59e0b/ffffff?text=Coffee",
            sku: "GRO-102",
            price: 18.00,
            priceUnit: "kg",
            stockLevel: 12,
            stockUnit: "kg",
            stockStatus: "in_stock"
        },
        {
            id: "4",
            name: "Cold Press Orange Juice",
            category: "Beverages",
            image: "https://placehold.co/48x48/ef4444/ffffff?text=Juice",
            sku: "BEV-774",
            price: 6.99,
            priceUnit: "liter",
            stockLevel: 0,
            stockUnit: "liter",
            stockStatus: "out_of_stock"
        },
        {
            id: "5",
            name: "Canvas Weekender Bag",
            category: "Travel",
            image: "https://placehold.co/48x48/10b981/ffffff?text=Bag",
            sku: "TRV-009",
            price: 85.00,
            priceUnit: "pcs",
            stockLevel: 8,
            stockUnit: "pcs",
            stockStatus: "low_stock"
        }
    ]);

    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStockFilter = stockFilter === "all" ||
            (stockFilter === "in_stock" && item.stockStatus === "in_stock") ||
            (stockFilter === "low_stock" && item.stockStatus === "low_stock") ||
            (stockFilter === "out_of_stock" && item.stockStatus === "out_of_stock");

        return matchesSearch && matchesStockFilter;
    });



    const toggleItemSelection = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllItems = () => {
        if (selectedItems.length === filteredItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredItems.map(item => item.id));
        }
    };

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your product inventory and stock levels
                    </p>
                </div>
                <ManageUnitsDialog
                    units={availableUnits}
                    onUnitsChange={setAvailableUnits}
                />
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <CardTitle>Product Inventory</CardTitle>
                            <CardDescription className="mt-1.5">
                                Track and update product stock levels
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">Filters:</span>
                                <Select value={stockFilter} onValueChange={setStockFilter}>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="All Stock Levels" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Stock Levels</SelectItem>
                                        <SelectItem value="in_stock">In Stock</SelectItem>
                                        <SelectItem value="low_stock">Low Stock (&lt; 10)</SelectItem>
                                        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="relative lg:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="overflow-x-auto p-0">
                    <div className="min-w-full inline-block align-middle">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                                            onCheckedChange={toggleAllItems}
                                        />
                                    </TableHead>
                                    <TableHead>PRODUCT</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>STOCK LEVEL</TableHead>
                                    <TableHead>STATUS</TableHead>
                                    <TableHead className="text-right">ACTIONS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                            No products found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedItems.includes(item.id)}
                                                    onCheckedChange={() => toggleItemSelection(item.id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-12 h-12 rounded-md object-cover"
                                                    />
                                                    <div>
                                                        <div className="font-medium">{item.name}</div>
                                                        <div className="text-sm text-muted-foreground">{item.category}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {item.stockLevel} {item.stockUnit}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {item.stockStatus === "in_stock" && (
                                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none font-medium">
                                                        In Stock
                                                    </Badge>
                                                )}
                                                {item.stockStatus === "low_stock" && (
                                                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none shadow-none font-medium">
                                                        Low Stock
                                                    </Badge>
                                                )}
                                                {item.stockStatus === "out_of_stock" && (
                                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none shadow-none font-medium">
                                                        Out of Stock
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => navigate(ROUTES.DASHBOARD.INVENTORY_EDIT(item.id))}
                                                >
                                                    Update
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            {isLoading && <Loader fullScreen message="Loading inventory..." />}

            {/* Bulk Action Bar */}
            {selectedItems.length > 0 && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-white border shadow-lg rounded-full px-6 py-3 flex items-center gap-6 animate-in slide-in-from-bottom-4 fade-in duration-200">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 h-6 min-w-6 flex items-center justify-center rounded-full px-1.5">
                                {selectedItems.length}
                            </Badge>
                            <span className="text-sm font-medium text-gray-600">Selected</span>
                        </div>

                        <div className="h-4 w-px bg-gray-200" />

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium h-auto py-1 px-2"
                            onClick={() => navigate(ROUTES.DASHBOARD.INVENTORY_BULK_UPDATE, { state: { selectedIds: selectedItems } })}
                        >
                            <Layers className="w-4 h-4 mr-2" />
                            Bulk Update Stock
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 h-auto py-1 px-2"
                            onClick={() => setSelectedItems([])}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
