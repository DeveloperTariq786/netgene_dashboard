import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import type { OrderPricing } from "../types";

interface PriceSummaryCardProps {
  pricing: OrderPricing;
}

export function PriceSummaryCard({ pricing }: PriceSummaryCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          Price Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-medium">₹{pricing.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Discount:</span>
          <span className="font-medium">₹{pricing.discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping:</span>
          <span className="font-medium">₹{pricing.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (GST):</span>
          <span className="font-medium">₹{pricing.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="font-semibold">Grand Total:</span>
          <span className="font-bold text-lg text-primary">₹{pricing.grandTotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
