import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { toast } from "@/core/hooks/use-toast";
import { ROUTES } from "@/core/config/routes";
import {
  CustomerDetailsCard,
  ShippingInformationCard,
  OrderItemsCard,
  PriceSummaryCard,
  OrderHistoryCard,
} from "@/features/dashboard/orders";
export default function OrderDetail() {
  const navigate = useNavigate();
  const {
    orderId
  } = useParams();

  // Mock order data
  const orderData = {
    id: orderId || "ORD-001",
    currentStatus: "Processing",
    placedOn: "Jun 9, 2025, 02:50 PM",
    lastUpdated: "Jun 9, 2025, 02:55 PM",
    customer: {
      name: "Developers Tariq",
      phone: "7889396003"
    },
    shipping: {
      recipient: "Developer Tariq",
      address: "Baba Pora Budgam, Jammu and Kashmir - 191111",
      mobile: "7889396003",
      type: "Home"
    },
    items: [{
      id: 1,
      product: "abc",
      image: "/placeholder.svg",
      qty: 1,
      unitPrice: 100.00,
      total: 100.00
    }],
    pricing: {
      subtotal: 100.00,
      discount: -0.00,
      shipping: 0.00,
      tax: 12.00,
      grandTotal: 112.00
    },
    history: [{
      id: 1,
      status: "Pending",
      description: "Order created",
      previousStatus: "Pending",
      timestamp: "Jun 9, 2025, 02:50 PM"
    }, {
      id: 2,
      status: "Processing",
      description: "Order is being processed",
      previousStatus: "Pending",
      timestamp: "Jun 9, 2025, 02:55 PM"
    }, {
      id: 3,
      status: "Confirmed",
      description: "Order confirmed",
      previousStatus: "Processing",
      timestamp: "Jun 9, 2025, 03:00 PM"
    }]
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Pending": "bg-yellow-500 hover:bg-yellow-500",
      "Processing": "bg-blue-500 hover:bg-blue-500",
      "Confirmed": "bg-green-500 hover:bg-green-500",
      "Shipped": "bg-purple-500 hover:bg-purple-500",
      "Out for Delivery": "bg-orange-500 hover:bg-orange-500",
      "Delivered": "bg-green-600 hover:bg-green-600",
      "Cancelled": "bg-red-500 hover:bg-red-500"
    };
    return colors[status] || "bg-gray-500 hover:bg-gray-500";
  };

  const handlePrintInvoice = () => {
    toast({
      title: "Printing Invoice",
      description: "Invoice is being prepared for printing..."
    });
  };
  const handleStatusChange = (status: string) => {
    toast({
      title: "Status Updated",
      description: `Order status changed to: ${status}`
    });
  };
  return <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" className="mb-4" onClick={() => navigate(ROUTES.DASHBOARD.ORDERS)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders List
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-primary">Order #{orderData.id}</h1>
              <Badge className={`${getStatusColor(orderData.currentStatus)} text-white`}>
                {orderData.currentStatus}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Update Status
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleStatusChange("Pending")}>
                  Change to Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Processing")}>
                  Change to Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Confirmed")}>
                  Change to Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Shipped")}>
                  Change to Shipped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Out for Delivery")}>
                  Change to Out for Delivery
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Delivered")}>
                  Change to Delivered
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Cancelled")} className="text-destructive">
                  Cancel Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <CustomerDetailsCard customer={orderData.customer} />
          <ShippingInformationCard shipping={orderData.shipping} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsCard items={orderData.items} />
          <PriceSummaryCard pricing={orderData.pricing} />
          <OrderHistoryCard history={orderData.history} />
        </div>
      </div>
    </div>;
}