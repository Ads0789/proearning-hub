import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Placeholder data for earnings
const earningsData = [
  { id: "txn_1", date: "2023-10-15", description: "Frontend Project - Phase 1", amount: 1200, status: "Paid", type: "Project" },
  { id: "txn_2", date: "2023-10-28", description: "Social Media Graphics Pack", amount: 350, status: "Paid", type: "Gig" },
  { id: "txn_3", date: "2023-11-05", description: "Tech Blog Post - AI Trends", amount: 150, status: "Pending", type: "Article" },
  { id: "txn_4", date: "2023-11-12", description: "E-commerce VA Services (Oct)", amount: 800, status: "Paid", type: "Monthly" },
  { id: "txn_5", date: "2023-11-20", description: "Consulting Session", amount: 250, status: "Processing", type: "Hourly" },
];

const totalEarnings = earningsData.filter(e => e.status === "Paid").reduce((sum, e) => sum + e.amount, 0);
const pendingEarnings = earningsData.filter(e => e.status === "Pending" || e.status === "Processing").reduce((sum, e) => sum + e.amount, 0);


export default function EarningsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground flex items-center">
          <DollarSign className="w-8 h-8 mr-3 text-accent" />
          My Earnings
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your income, view transaction history, and manage payouts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all completed opportunities</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">${pendingEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing or payment</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout (Est.)</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$---.--</div> {/* Placeholder */}
            <p className="text-xs text-muted-foreground">Scheduled for December 1, 2023</p> {/* Placeholder */}
          </CardContent>
        </Card>
      </div>
      
      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-xl">Transaction History</CardTitle>
              <CardDescription>A detailed record of your earnings.</CardDescription>
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earningsData.map((earning) => (
                <TableRow key={earning.id}>
                  <TableCell>{new Date(earning.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{earning.description}</TableCell>
                  <TableCell>{earning.type}</TableCell>
                  <TableCell className="text-right">${earning.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      earning.status === "Paid" ? "default" : 
                      earning.status === "Pending" ? "secondary" : 
                      "outline" // Processing or other statuses
                    }
                    className={
                        earning.status === "Paid" ? "bg-green-500/20 text-green-700 border-green-500/30" :
                        earning.status === "Pending" ? "bg-yellow-500/20 text-yellow-700 border-yellow-500/30" :
                        "bg-blue-500/20 text-blue-700 border-blue-500/30"
                    }
                    >
                      {earning.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
               {earningsData.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No transactions yet. Start earning to see your history!
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <div className="text-center mt-8">
            <Button variant="link" asChild>
                <a href="/settings/billing">Manage Payout Methods</a>
            </Button>
        </div>
    </div>
  );
}
