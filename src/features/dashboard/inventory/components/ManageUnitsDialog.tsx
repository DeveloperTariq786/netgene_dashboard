import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tag, Plus, Trash2, X } from "lucide-react";

interface ManageUnitsDialogProps {
    units: string[];
    onUnitsChange?: (units: string[]) => void;
}

export function ManageUnitsDialog({ units: initialUnits, onUnitsChange }: ManageUnitsDialogProps) {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState<string[]>(initialUnits);
    const [newUnit, setNewUnit] = useState("");

    const handleAddUnit = () => {
        if (newUnit.trim() && !units.includes(newUnit.trim().toLowerCase())) {
            const updatedUnits = [...units, newUnit.trim().toLowerCase()];
            setUnits(updatedUnits);
            onUnitsChange?.(updatedUnits);
            setNewUnit("");
        }
    };

    const handleDeleteUnit = (unitToDelete: string) => {
        const updatedUnits = units.filter(unit => unit !== unitToDelete);
        setUnits(updatedUnits);
        onUnitsChange?.(updatedUnits);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddUnit();
        }
    };

    const handleDone = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white hover:bg-primary hover:text-white shadow-sm">
                    <Tag className="h-4 w-4" />
                    Manage Units
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-primary" />
                            <DialogTitle>Manage Units</DialogTitle>
                        </div>
                    </div>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {/* Add Unit Input */}
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="New unit (e.g. box)"
                            value={newUnit}
                            onChange={(e) => setNewUnit(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1"
                        />
                        <Button
                            onClick={handleAddUnit}
                            size="icon"
                            className="shrink-0"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Available Dimensions */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase">
                            Available Dimensions
                        </h4>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                            {units.map((unit, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-accent/50 transition-colors group"
                                >
                                    <span className="text-sm font-medium">{unit}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleDeleteUnit(unit)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {units.length === 0 && (
                                <div className="text-center py-8 text-sm text-muted-foreground">
                                    No units added yet. Add your first unit above.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Done Button */}
                    <div className="flex justify-end pt-2">
                        <Button onClick={handleDone}>
                            Done
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
