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
    <Card className="border-none shadow-sm bg-white dark:bg-sidebar rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Monthly Sales
          </CardTitle>
        </div>
        <Select defaultValue="2025">
            <SelectTrigger className="w-25 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm focus:ring-1 focus:ring-primary">
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
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 500 }}
                interval={0}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={60}
                tickMargin={12}
                tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 500 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                  cursor={{ fill: '#f9fafb' }}
                  content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                      return (
                          <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl">
                            <p className="text-xs text-gray-500 mb-1 font-medium">{payload[0].payload.month}</p>
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