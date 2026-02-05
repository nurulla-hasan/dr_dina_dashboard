
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", active: 90, newUsers: 60 },
  { month: "Feb", active: 75, newUsers: 55 },
  { month: "Mar", active: 80, newUsers: 62 },
  { month: "Apr", active: 65, newUsers: 48 },
  { month: "May", active: 85, newUsers: 70 },
  { month: "Jun", active: 78, newUsers: 65 },
  { month: "Jul", active: 88, newUsers: 72 },
  { month: "Aug", active: 82, newUsers: 68 },
  { month: "Sep", active: 79, newUsers: 63 },
  { month: "Oct", active: 81, newUsers: 66 },
  { month: "Nov", active: 77, newUsers: 60 },
  { month: "Dec", active: 83, newUsers: 69 },
];

const chartConfig = {
  active: {
    label: "Active User",
    color: "var(--primary)",
  },
  newUsers: {
    label: "New User",
    color: "oklch(0.78 0.12 145)", // light green-ish, can tweak
  },
} satisfies ChartConfig;

const UserGrowthChart = () => {
  return (
    <Card className="border-muted/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium font-crimson">
          User Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-55 w-full"
        >
          <BarChart data={chartData} barCategoryGap={12}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={30}
              tickMargin={4}
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="active"
              radius={[4, 4, 0, 0]}
              fill="var(--color-active)"
            />
            <Bar
              dataKey="newUsers"
              radius={[4, 4, 0, 0]}
              fill="var(--color-newUsers)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;