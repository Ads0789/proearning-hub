import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, CalendarRange, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, Pie, Cell, ResponsiveContainer, BarChart, PieChart as RechartsPieChart } from "recharts"; // Renamed PieChart to RechartsPieChart
import Image from "next/image";

// Placeholder chart data
const barChartData = [
  { month: "Jan", earnings: 4000 },
  { month: "Feb", earnings: 3000 },
  { month: "Mar", earnings: 5000 },
  { month: "Apr", earnings: 4500 },
  { month: "May", earnings: 6000 },
  { month: "Jun", earnings: 5500 },
];

const pieChartData = [
  { name: "Frontend Projects", value: 400, fill: "hsl(var(--chart-1))" },
  { name: "Graphic Design", value: 300, fill: "hsl(var(--chart-2))"  },
  { name: "Content Writing", value: 200, fill: "hsl(var(--chart-3))"  },
  { name: "Consulting", value: 278, fill: "hsl(var(--chart-4))"  },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--chart-1))",
  },
  // Add other keys from pieChartData for legend
  "Frontend Projects": { label: "Frontend", color: "hsl(var(--chart-1))" },
  "Graphic Design": { label: "Design", color: "hsl(var(--chart-2))" },
  "Content Writing": { label: "Writing", color: "hsl(var(--chart-3))" },
  "Consulting": { label: "Consulting", color: "hsl(var(--chart-4))" },
} satisfies import("@/components/ui/chart").ChartConfig;


export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-primary" />
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Visualize your earnings, track performance, and gain insights.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
            <Button variant="outline"><CalendarRange className="mr-2 h-4 w-4" /> Date Range: Last 30 Days</Button>
            {/* Add more filters if needed */}
        </div>
        <Button><Download className="mr-2 h-4 w-4" /> Download Report (PDF)</Button>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Monthly Earnings Trend</CardTitle>
            <CardDescription>Your earnings over the past 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={barChartData} accessibilityLayer>
                <Bar dataKey="earnings" radius={4}>
                    {/* Fill is handled by chartConfig now */}
                </Bar>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Earnings by Category</CardTitle>
            <CardDescription>Breakdown of your income sources.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                        <Pie dataKey="value" data={pieChartData} nameKey="name" cx="50%" cy="50%" outerRadius={100} label >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-xl">Detailed Performance Metrics</CardTitle>
            <CardDescription>Key indicators of your earning activities.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-md bg-secondary/30">
                <p className="text-xs text-muted-foreground">Avg. Earnings per Opportunity</p>
                <p className="text-2xl font-bold text-primary">$250.75</p> {/* Placeholder */}
            </div>
            <div className="p-4 border rounded-md bg-secondary/30">
                <p className="text-xs text-muted-foreground">Opportunities Completed</p>
                <p className="text-2xl font-bold text-primary">15</p> {/* Placeholder */}
            </div>
            <div className="p-4 border rounded-md bg-secondary/30">
                <p className="text-xs text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-500">92%</p> {/* Placeholder */}
            </div>
            <div className="p-4 border rounded-md bg-secondary/30">
                <p className="text-xs text-muted-foreground">Most Profitable Skill</p>
                <p className="text-lg font-bold text-primary">React Dev</p> {/* Placeholder */}
            </div>
        </CardContent>
      </Card>
      
      <div className="text-center py-8">
        <FileText className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground">More Advanced Reports Coming Soon!</h3>
        <p className="text-sm text-muted-foreground">We&apos;re working on providing even deeper insights into your earnings and performance.</p>
      </div>

    </div>
  );
}
