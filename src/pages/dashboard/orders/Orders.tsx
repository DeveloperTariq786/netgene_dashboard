import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ROUTES } from "@/core/config/routes";
import { Loader } from "@/components/loader/Loader";

interface Order {
  id: string;
  customer: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  amount: number;
}

export default function Orders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "Tariq Mir",
      date: "2024-01-15",
      status: "Delivered",
      amount: 299.99
    },
    {
      id: "ORD-002",
      customer: "John Doe",
      date: "2024-01-16",
      status: "Processing",
      amount: 499.50
    },
    {
      id: "ORD-003",
      customer: "Sarah Smith",
      date: "2024-01-17",
      status: "Pending",
      amount: 199.00
    },
    {
      id: "ORD-004",
      customer: "Michael Johnson",
      date: "2024-01-18",
      status: "Delivered",
      amount: 750.25
    },
    {
      id: "ORD-005",
      customer: "Emma Williams",
      date: "2024-01-19",
      status: "Cancelled",
      amount: 350.00
    },
    {
      id: "ORD-006",
      customer: "David Brown",
      date: "2024-01-20",
      status: "Shipped",
      amount: 425.00
    },
    {
      id: "ORD-007",
      customer: "Lisa Anderson",
      date: "2024-01-21",
      status: "Processing",
      amount: 189.99
    },
    {
      id: "ORD-008",
      customer: "Robert Taylor",
      date: "2024-01-22",
      status: "Pending",
      amount: 599.00
    },
    {
      id: "ORD-009",
      customer: "Jennifer Martinez",
      date: "2024-01-23",
      status: "Delivered",
      amount: 329.50
    },
    {
      id: "ORD-010",
      customer: "William Garcia",
      date: "2024-01-24",
      status: "Shipped",
      amount: 275.75
    },
    {
      id: "ORD-011",
      customer: "Mary Rodriguez",
      date: "2024-01-25",
      status: "Pending",
      amount: 449.99
    },
    {
      id: "ORD-012",
      customer: "James Wilson",
      date: "2024-01-26",
      status: "Processing",
      amount: 679.00
    },
    {
      id: "ORD-013",
      customer: "Patricia Moore",
      date: "2024-01-27",
      status: "Delivered",
      amount: 159.99
    },
    {
      id: "ORD-014",
      customer: "Christopher Lee",
      date: "2024-01-28",
      status: "Cancelled",
      amount: 299.00
    },
    {
      id: "ORD-015",
      customer: "Linda Harris",
      date: "2024-01-29",
      status: "Shipped",
      amount: 539.99
    },
    {
      id: "ORD-016",
      customer: "Mark Thompson",
      date: "2024-01-30",
      status: "Pending",
      amount: 399.00
    },
    {
      id: "ORD-017",
      customer: "Nancy Clark",
      date: "2024-01-31",
      status: "Processing",
      amount: 229.50
    },
    {
      id: "ORD-018",
      customer: "Daniel Lewis",
      date: "2024-02-01",
      status: "Delivered",
      amount: 789.99
    }
  ]);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "Processing":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "Shipped":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case "Delivered":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage customer orders
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription className="mt-1.5">
                View and manage customer orders
              </CardDescription>
            </div>
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-full inline-block align-middle">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{order.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(ROUTES.DASHBOARD.ORDER_DETAIL(order.id))}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {totalPages > 1 && (
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
      {isLoading && <Loader fullScreen message="Loading orders..." />}
    </div>
  );
}
