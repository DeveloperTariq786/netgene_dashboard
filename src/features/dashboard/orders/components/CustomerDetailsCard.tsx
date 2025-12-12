import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import type { OrderCustomer } from "../types";

interface CustomerDetailsCardProps {
  customer: OrderCustomer;
}

export function CustomerDetailsCard({ customer }: CustomerDetailsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          Customer Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Name:</p>
          <p className="font-medium">{customer.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Phone:</p>
          <p className="font-medium">{customer.phone}</p>
        </div>
      </CardContent>
    </Card>
  );
}
