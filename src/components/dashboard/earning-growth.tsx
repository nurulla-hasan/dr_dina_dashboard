import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const chartData = [
  { month: "Jan", sales: 500 },
  { month: "Feb", sales: 250 },
  { month: "Mar", sales: 824 },
  { month: "Apr", sales: 900 },
  { month: "May", sales: 850 },
  { month: "Jun", sales: 880 },
  { month: "Jul", sales: 900 },
  { month: "Aug", sales: 500 },
  { month: "Sep", sales: 250 },
  { month: "Oct", sales: 850 },
  { month: "Nov", sales: 900 },
  { month: "Dec", sales: 850 },
];

const MonthlySalesChart = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">
            Monthly Sales
          </CardTitle>
        </div>
        <Select defaultValue="2025">
            <SelectTrigger className="w-25">
                <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-6 pl-0">
        <div className="h-100 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={32}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)", fontWeight: 500 }}
                interval={0}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={60}
                tickMargin={12}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)", fontWeight: 500 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                  cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                  content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                      return (
                          <div className="bg-background p-3 border shadow-xl rounded-xl">
                            <p className="text-xs text-foreground mb-1 font-medium">{payload[0].payload.month}</p>
                            <p className="text-lg font-bold text-primary">
                              ${payload[0].value}k
                            </p>
                          </div>
                      );
                      }
                      return null;
                  }}
              />
              <Bar
                dataKey="sales"
                fill="url(#salesGradient)"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySalesChart;