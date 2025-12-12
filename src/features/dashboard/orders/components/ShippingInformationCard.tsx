import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { OrderShipping } from "../types";

interface ShippingInformationCardProps {
  shipping: OrderShipping;
}

export function ShippingInformationCard({ shipping }: ShippingInformationCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Recipient:</p>
          <p className="font-medium">{shipping.recipient}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Address:</p>
          <p className="font-medium">{shipping.address}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Mobile:</p>
          <p className="font-medium">{shipping.mobile}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Type:</p>
          <p className="font-medium">{shipping.type}</p>
        </div>
      </CardContent>
    </Card>
  );
}
